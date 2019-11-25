import React from 'react';
import ReactDOM from 'react-dom';
import dateUtils from './functionHelper';
import {db} from '../../db/dbconfig';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectOrTypeClient from "./SelectOrTypeClient"
import SelectVat from "./selectVat"
import AddNewRowProdData from "./addNewRowProdData"
import moment from 'moment';
import InvoicePreview from '../invoicePreview/invoicePreview';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button'


class CommonData extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;

    }

    initialState = {
        invoice: "Faktura",
        invoiceNumber: "01/2019",
        date: moment("2019-01-01", "YYYY-MM-DD"),
        address: "Jk",
        terms: moment("2019-01-01", "YYYY-MM-DD"),
        businessName: "",
        businessNumber: "",
        businessAddress: "",
        businessPostalCode: "",
        businessSignature: "",
        clientName: "",
        clientNumber: "",
        clientAddress: "",
        clientPostalCode: "",
        clientSignature: "",

        product: "",
        qty: "",
        rate: "",
        unit: "",
        vat: "23",
        subtotal: "0",
        grossPrice: "0",
        mainSubtotal: "",
        mainGrossPrice: "",

        isActive: "notActive"
        ,
        isShow: false
        ,
        rowIndex: 0,
        rowTab: [
            {
                product: "",
                qty: "",
                rate: "",
                unit: "",
                vat: "23"
            }
        ]
        ,
        errors: {
            invoice: "",
            invoiceNumber: "",
            date: "",
            address: "",
            terms: "",
            businessName: "",
            businessNumber: "",
            businessAddress: "",
            businessPostalCode: "",
            businessSignature: "",
            clientName: "",
            clientNumber: "",
            clientAddress: "",
            clientPostalCode: "",
            clientSignature: "",
            product: "",
            qty: "",
            rate: "",
            unit: "",
            vat: ""
        }
        ,
        accountErrors: [],
        showPopup: false,
        invoiceId: 0
    };

// sprawdzamy, czy value w obj error sa puste---> w render
    isEmpty = (el) => {
        return el === ""
    };

    handleChangeDate = (date) => {

        let errors = this.state.errors;
        console.log('Date changed:', date);
        errors.date =
            !date ? 'Proszę wpisac datę w formacie rrrr-mm-dd!'
                : null;

        console.log(errors);
        let stateChange = {
            errors,
            date: date ? moment(date) : null
        };

        this.handleValidateData(stateChange);

        this.setState(stateChange);
    };

    handleChangeTerms = (terms) => {

        let errors = this.state.errors;
        console.log('Date changed:', terms);
        errors.terms =
            !terms ? 'Proszę wpisac datę w formacie rrrr-mm-dd!'
                : null;
        console.log(moment(terms).format("YYYY-MM-DD").toString());
        console.log(typeof moment().toString());
        console.log(errors);
        let stateChange = {
            errors,
            terms: terms ? moment(terms) : null
        };
        this.handleValidateData(stateChange);

        this.setState(stateChange);
    };

// dane z komponentu selectOr TypeClient
    handlePassClientName = (arg) => {
        console.log(arg, "handlePassClientName przekazany arg", arg);
        this.setState({
            ...arg
        })
    };

    handlePassVat = (i, arg) => {
        let rowTab = this.state.rowTab;
        let row = rowTab[i];
        row.vat = arg;
        this.setState({
            rowTab: rowTab
        });
        console.log(arg, "przekazany arg");
    };


    handleGetData = (e) => {
        e.preventDefault();

        let stateChange = {
            [e.target.name]: e.currentTarget.value
        };

        let errors = this.state.errors;
        const {name, value} = e.target;
        console.log('Name: ', name);
        const validateInvoice = RegExp(/^[a-zA-Z 0-9]{2,}$/g);
        const validateNum = RegExp(/^[0-9]{1,}\/|-[0-9]{1,}$/g);
        switch (name) {
            case 'invoice':
                errors.invoice =
                    validateInvoice.test(value)
                        ? ""
                        : 'Proszę wpisac nazwę';
                break;
            case 'invoiceNumber':
                errors.invoiceNumber =
                    validateNum.test(value)
                        ? ''
                        : 'Numer faktury jest barzdo waZny!';
                break;

            case 'address':
                errors.address =
                    value !== "" && typeof value === "string"
                        ? ''
                        : 'Proszę wpisać adres!';
                break;
            case 'terms':
                errors.terms =
                    !dateUtils.validateDate(value)
                        ? 'Proszę wpisac datę sprzedaży w formacie rrrr-mm-dd!' : '';
                break;
            default:
                break;
        }

        stateChange.errors = errors;
        stateChange[name] = value;
        this.handleValidateData(stateChange);
        this.setState(stateChange);


//test!!!!!! klucze this.state.errors  wipisac wszystkie błedy!!!
        console.log(Object.keys(this.state.errors), "obj error");
        Object.keys(this.state.errors).forEach((key) => {
            console.log(this.state.errors[key], "key")
        })


    };


// event dla submit --> active/ not active btn zapisz

    handleValidateData = (stateChange) => {
        if (Object.values(stateChange.errors).every(this.isEmpty)) {
            stateChange.isActive = "active";
            stateChange.isShow = true;
        } else {
            stateChange.isShow = false;
            stateChange.isActive = "notActive";
        }

    };

    dateOrNull = (fieldName) => {
        const value = this.state[fieldName];
        return value ? value.toDate() : null;
    };

// open/close new window
    togglePopup = () => {
        this.interval = setTimeout(() => {

            this.setState({
                showPopup: !this.state.showPopup
            })
        }, 3000)


    }

    componentWillUnmount() {
        clearTimeout(this.interval)
    }

// wysylame dane

    handlePassData = (e) => {
        e.preventDefault();
        console.log(this.state, "state");
        this.setState({
            invoiceId: this.state.invoiceId + 1
        });

        console.log(this.state.invoiceId, "id kazdej faktury");

        db.collection("invoice").doc().set({
                invoice: this.state.invoice,
                invoiceNumber: this.state.invoiceNumber,
                date: (this.state.date).format('YYYY-MM-DD').toString(),
                address: this.state.address,
                terms: (this.state.terms).format('YYYY-MM-DD').toString(),
                businessName: this.state.businessName,
                businessNumber: this.state.businessNumber,
                businessAddress: this.state.businessAddress,
                businessPostalCode: this.state.businessPostalCode,
                businessSignature: this.state.businessSignature,
                clientName: this.state.clientName,
                clientNumber: this.state.clientNumber,
                clientAddress: this.state.clientAddress,
                clientPostalCode: this.state.clientPostalCode,
                clientSignature: this.state.clientSignature,
                productInfo: this.state.rowTab,
                invoiceId: this.state.invoiceId
                // product: this.state.product,
                // qty: this.state.qty,
                // rate: this.state.rate,
                // unit: this.state.unit,
                // vat: this.state.vat
            }
        )
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        this.togglePopup();


    };

// rozliczenie

    AddSubtotal = (e) => {
        e.preventDefault();
        console.log("zaczynam liczyc vat");

        let rowTab = this.state.rowTab;
        rowTab.map((el, i) => {
            console.log("Calc: el=", el);
            let subtotal = el.rate * el.qty;
            el.subtotal = subtotal;
            // console.log("Partials:", 1 + el.vat, 1 + el.vat / 100);
            let grossPrice = el.subtotal * (1 + parseInt(el.vat) / 100);
            el.grossPrice = grossPrice;
            console.log(subtotal, "subtotalw petli");
            console.log(el.grossPrice, "gr price");
        });
        let mainSubtotal = 0;
        let mainGrossPrice = 0;
        rowTab.map((el, i) => {
            mainSubtotal += el.subtotal;
            mainGrossPrice += el.grossPrice;
            console.log(mainSubtotal, mainGrossPrice, "mainsub i maingross");
        });
        this.setState({
            rowTab: rowTab,
            mainSubtotal: mainSubtotal,
            mainGrossPrice: mainGrossPrice
        });


    };
// dodaj nowy wiersz

    handleAddRow = () => {


        this.setState({
            rowIndex: this.state.rowIndex + 1
        });
        this.createRow();

        console.log("dodano wiersz", this.state.rowIndex, ": rowIndex")

    };

    createRow = (e) => {

        this.state.rowTab.push(
            {
                product: "",
                qty: "",
                rate: "",
                unit: "",
                vat: "23"
            }
        );


        console.log(this.state.rowTab, "tab");
    };

    modifyRow = (i, fieldName, value) => {
        let rowTab = this.state.rowTab;
        let row = rowTab[i];
        row[fieldName] = value;
        console.log("Modified row: ", this.state.rowTab);
        this.setState({
            rowTab: rowTab
        });
    };

    getModifyFunction = (i, fieldName) => {
        return (event) => this.modifyRow(i, fieldName, event.target.value);
    };


    render() {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        return (
            <>
                <div className={"mainDashboard"}>
                    <form action="" onSubmit={this.handleValidateData}>
                        <div className={'formWrapper'}>
                            <div className={'commonInvoiceData'}>
                                <label> Dokument
                                    <input type="text" placeholder={"faktura"} value={this.state.invoice}
                                           name={"invoice"} onChange={this.handleGetData} required/>
                                </label>
                            </div>
                            <div className={'formInvoiceNumber'}>
                                <label> Numer
                                    <input type="text" placeholder={`${month}/${year}`} value={this.state.invoiceNumber}
                                           name={"invoiceNumber"} onChange={this.handleGetData} required/>
                                </label>
                            </div>
                            <div className={'formDate'}>
                                <label>Data wystawienia
                                    <DatePicker dateFormat="yyyy-MM-dd" selected={this.dateOrNull('date')}
                                                onChange={this.handleChangeDate}/>
                                </label>
                            </div>
                            <div className={'formAddress'}>
                                <label>Miejsce wystawienia
                                    <input type="text" value={this.state.address} name={"address"}
                                           onChange={this.handleGetData} required/>
                                </label>
                            </div>
                            <div className={'formTerms'}>
                                <label>Data sprzedaży
                                    <DatePicker dateFormat="yyyy-MM-dd" selected={this.dateOrNull('terms')}
                                                onChange={this.handleChangeTerms}/>
                                </label>
                            </div>


                            <div className={"clientData"}>

                                Klient <SelectOrTypeClient getDataFromSelect={this.handlePassClientName}/>
                                <label> NIP <input type="text" placeholder={"000-000-00-00"}
                                                   value={this.state.clientNumber}
                                                   name={"clientNumber"}
                                                   onChange={this.handleGetData} disabled={"disabled"}/></label>
                                <label>Adres<input type="text" placeholder={"ulica, nr, m"}
                                                   value={this.state.clientAddress}
                                                   name={"clientAddress"}
                                                   onChange={this.handleGetData} disabled={"disabled"}/></label>
                                <label>Kod pocztowy<input type="text" placeholder={"00-000"}
                                                          value={this.state.clientPostalCode} name={"clientPostalCode"}
                                                          onChange={this.handleGetData} disabled={"disabled"}/></label>
                                <label>Podpis<input type="text" value={this.state.clientSignature}
                                                    name={"clientSignature"} onChange={this.handleGetData}
                                                    disabled={"disabled"}/></label>
                            </div>
                            <div className={"itemDescription"}>
                                <div>
                                    <table>
                                        <thead className={"description"}>
                                        <tr>
                                            <th>Nazwa usługi</th>
                                            <th>Cena</th>
                                            <th>Ilość</th>
                                            <th>Jednostka miary</th>
                                            <th>Stawka VAT</th>
                                            <th>Kwota faktury Netto</th>
                                            <th>Kwota faktury Brutto</th>

                                        </tr>
                                        </thead>
                                        <tbody>

                                        {/*/////////////////////////////////////*dodajemy nowy wiersz*/////////////////////////////////////////////*/}
                                            this.state.rowTab.map((el, i) => {

                                                return (
                                                    <>
                                                        <tr key={i}>
                                                            <td><input type="text" value={el.product} name={"product"}
                                                                       onChange={this.getModifyFunction(i, "product")}
                                                                       placeholder={'Nazwa usługi'}/></td>
                                                            <td><input type="text" value={el.rate} name={"rate"}
                                                                       onChange={this.getModifyFunction(i, "rate")}
                                                                       placeholder={"00 zl"}/></td>
                                                            <td><input type="number" min={"0"} value={el.qty}
                                                                       name={"qty"}
                                                                       onChange={this.getModifyFunction(i, "qty")}/>
                                                            </td>
                                                            <td><input type="text" value={el.unit} name={"unit"}
                                                                       onChange={this.getModifyFunction(i, "unit")}
                                                                       placeholder={'szt/g'}/></td>
                                                            <SelectVat handlePassVat={(e) => this.handlePassVat(i, e)}
                                                                       vatData={[23, 8, 5, 0]}/>

                                                            <td><input type="text" value={el.subtotal} name={"subtotal"}
                                                            /></td>
                                                            <td><input type="text" value={el.grossPrice}
                                                                       name={"grossPrice"}
                                                            /></td>
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>SUMA NETTO:</th>
                                            <th><input type="text" value={this.state.mainSubtotal}/></th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>SUMA :</th>
                                            <th><input type="text" value={this.state.mainGrossPrice}/></th>
                                        </tr>

                                        </tfoot>
                                    </table>

                                </div>
                            </div>
                            < div className={"btnGroup"}>
                                <ButtonGroup>
                                    <Button className={this.state.isActive} variant="secondary"
                                            onClick={this.handlePassData}>Pokaż fakturę</Button>
                                    <Button variant="secondary"
                                            onClick={this.AddSubtotal}>Policz</Button>
                                    <Button variant="secondary"
                                            onClick={this.handleAddRow}>Dodaj wiersz</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </form>

                    {this.state.accountErrors.map((el, i) => {
                        return (
                            <p>{el}</p>
                        )
                    })}


                    {!this.state.isShow ? Object.values(this.state.errors).filter(el => !this.isEmpty(el)).map((el, i) => {
                        return (

                            <p key={i} style={{listStyleType: "none"}}> {el}</p>

                        )
                    }) : null}
                </div>
                {this.state.showPopup ?
                    <InvoicePreview closePopup={this.togglePopup} productData={this.state.rowTab}
                                    invoiceId={this.state.invoiceId} myInvoiceData={this.state}/> : null}
            </>
        )
    }


}

export default CommonData;

// wyslat
// onButtonClickAdd = () => {
//     console.log("dodaj nabywce do listy ");
//     db.collection("productList").doc().set({
//         rate: "1 ",
//         product: "Usługa",
//         qty: "12",
//         unit: "szt",
//         vat: "5%"
//     })
//         .then(function () {
//             console.log("Document successfully written!");
//         })
//         .catch(function (error) {
//             console.error("Error writing document: ", error);
//         });
// };

//
// AddSubtotal = () => {
//     let {qty, rate, vat, subtotal, grossPrice, accountErrors} = this.state;
//     if (checkIsProductData) {
//         let subtotal;
//         subtotal = qty * rate;
//         let vatValue = subtotal / 100 * vat;
//         let grossPrice;
//         grossPrice = subtotal + vatValue;
//         this.setState = ({
//             subtotal: subtotal,
//             grossPrice: grossPrice
//         })
//     } else {
//         accountErrors.push("Proszę poprawnie wypełnić dane")
//     }
// }
//
// checkIsProductData = () => {
//     return every([this.state.product, this.state.qty, this.state.rate, this.state.unit, this.state.vat])
// }
//
// every = (arr) => {
//     arr.every(el => el)
// };