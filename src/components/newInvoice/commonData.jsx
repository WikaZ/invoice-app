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

        isActive: "notActive"
        ,
        isShow: false
        ,
        rowIsAdded: false,
        rowIndex: 0,
        rowTab:[
            {product: "",
            qty: "",
            rate: "",
            unit: "",
            vat: ""}
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
        accountErrors: []
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

    handlePassVat = (arg) => {
        console.log(arg, "przekazany arg");
        this.setState({
            vat: arg,

        })
    }


    handleGetData = (e) => {
        e.preventDefault();

        let stateChange = {
            [e.target.name]: e.currentTarget.value
        };

        let errors = this.state.errors;
        const {name, value} = e.target;
        console.log('Name: ', name);
        const validateInvoice = RegExp(/^[a-z]{2,}$/g);
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


// wysylame dane

    handlePassData = (e) => {
        e.preventDefault();
        console.log(this.state, "state");

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
                product: this.state.product,
                qty: this.state.qty,
                rate: this.state.rate,
                unit: this.state.unit,
                vat: this.state.vat
            }
        )
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    };


// rozliczenie
// checkIsProductData=()=>{
//     return every([this.state.product, this.state.qty, this.state.rate , this.state.unit , this.state.vat])
// }
//
// every=(arr)=>{
//     arr.every(el=>el)
// };
    AddSubtotal = (e) => {
        e.preventDefault();
        console.log("zaczynam liczyc vat");
        let {qty, rate, vat, subtotal, grossPrice, accountErrors} = this.state;
        let accErrors = [];
        if ([this.state.product, this.state.qty, this.state.rate, this.state.unit, this.state.vat].every(el => el)) {
            console.log("wszystkie dane sa, mozemy policzyc");
            let subtotal;
            subtotal = qty * rate;
            let vatValue = (subtotal / 100) * vat;
            let grossPrice;
            grossPrice = subtotal + vatValue;
// nie zmienia w state

            this.initialState.subtotal = subtotal;
            this.initialState.grossPrice = grossPrice;

            this.setState(this.initialState);

            console.log(grossPrice, "gr price");
            console.log(subtotal, "subt");
        } else {
            accErrors.push("Proszę poprawnie wypełnić dane");
            this.setState({
                accountErrors: accErrors
            })
        }
    };
// dodaj nowy wiersz

    handleAddRow = () => {


        this.setState({
            rowIndex: this.state.rowIndex + 1,
            rowIsAdded: true
        });
        this.createRow();

        console.log("dodano wiersz", this.state.rowIndex, ": rowIndex")

    };

    createRow=()=>{

        this.state.rowTab.push(
            {product: "",
                qty: "",
                rate: "",
                unit: "",
                vat: ""}
        );

       this.state.rowTab.map((el, i)=>{
           return <tr>{el}</tr>
       })
        console.log(this.state.rowTab, "tab");
    }


    render() {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        return (
            <>
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


                        {/*<div className={'myData'}>*/}
                        {/*    <label> Sprzedawca*/}
                        {/*        <select name="" id="" value={this.state.businessName}*/}
                        {/*                onChange={this.handleGetData}>*/}
                        {/*            <option value="inne " name={"businessName"}>Inne</option>*/}
                        {/*            <option value="mojaFirma" name={"businessName"}>Moja firma</option>*/}

                        {/*        </select>*/}
                        {/*    </label>*/}
                        {/*    <label> NIP <input type="text" placeholder={"000-000-00-00"} name={"businessNumber"}*/}
                        {/*                       value={this.state.businessNumber} onChange={this.handleGetData}*/}
                        {/*                       disabled={"disabled"}/></label>*/}
                        {/*    <label>Adres<input type="text" placeholder={"ulica, nr, m"} name={"businessAddress"}*/}
                        {/*                       value={this.state.businessAddress}*/}
                        {/*                       onChange={this.handleGetData} disabled={"disabled"}/></label>*/}
                        {/*    <label>Kod pocztowy<input type="text" placeholder={"00-000"} name={"businessPostalCode"}*/}
                        {/*                              value={this.state.businessPostalCode}*/}
                        {/*                              onChange={this.handleGetData} disabled={"disabled"}/></label>*/}
                        {/*    <label>Podpis<input type="text" value={this.state.businessSignature}*/}
                        {/*                        name={"businessSignature"} onChange={this.handleGetData}*/}
                        {/*                        disabled={"disabled"}/></label>*/}

                        {/*</div>*/}
                        <div className={"clientData"}>

                            Klient<SelectOrTypeClient getDataFromSelect={this.handlePassClientName}/>
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
                                    <tr>
                                        <td><input type="text" value={this.state.product} name={"product"}
                                                   onChange={this.handleGetData} placeholder={'Nazwa usługi'}/></td>
                                        <td><input type="text" value={this.state.rate} name={"rate"}
                                                   onChange={this.handleGetData} placeholder={"00 zl"}/></td>
                                        <td><input type="number" min={"0"} value={this.state.qty} name={"qty"}
                                                   onChange={this.handleGetData}/></td>
                                        <td><input type="text" value={this.state.unit} name={"unit"}
                                                   onChange={this.handleGetData} placeholder={'szt/g'}/></td>
                                        <SelectVat handlePassVat={this.handlePassVat} vatData={[23, 8, 5, 0]}/>

                                        <td><input type="text" value={this.state.subtotal} name={"subtotal"}
                                        /></td>
                                        <td><input type="text" value={this.state.grossPrice} name={"grossPrice"}
                                        /></td>
                                    </tr>

    {/*/////////////////////////////////////*dodajemy nowy wiersz*/////////////////////////////////////////////*/}
                                    this.state.rowIsAdded ? this.state.rowTab.map((el,i)=>{

                                        return (
                                            <>
                                                <tr key={i}>
                                                    <td><input type="text" value={this.state.rowTab.product} name={"product"}
                                                               onChange={this.handleGetData} placeholder={'Nazwa usługi'}/></td>
                                                    <td><input type="text" value={this.state.rowTab.rate} name={"rate"}
                                                               onChange={this.handleGetData} placeholder={"00 zl"}/></td>
                                                    <td><input type="number" min={"0"} value={this.state.rowTab.qty} name={"qty"}
                                                               onChange={this.handleGetData}/></td>
                                                    <td><input type="text" value={this.state.rowTab.unit} name={"unit"}
                                                               onChange={this.handleGetData} placeholder={'szt/g'}/></td>
                                                    <SelectVat handlePassVat={this.handlePassVat} vatData={[23, 8, 5, 0]}/>

                                                    <td><input type="text" value={this.state.rowTab.subtotal} name={"subtotal"}
                                                    /></td>
                                                    <td><input type="text" value={this.state.rowTab.grossPrice} name={"grossPrice"}
                                                    /></td>
                                                </tr>
                                            </>
                                        )
                                        })

                                         : null}
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
                        <input type="submit" value={"GOTOWE"} className={this.state.isActive}
                               onClick={this.handlePassData}/>
                        <input type="button" name={'account_data'} value={"CALC"} className={"calc"}
                               onClick={this.AddSubtotal}/>
                        <input type="button" name={"addRow"} value={"DODAJ WIERSZ"} className={"calc"}
                               onClick={this.handleAddRow}/>
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