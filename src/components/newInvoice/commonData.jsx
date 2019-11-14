import React from 'react';
import ReactDOM from 'react-dom';
import dateUtils from './functionHelper';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
        isActive: "notActive",
        isShow: false,
        errors: {
            invoice: "",
            invoiceNumber: "",
            date: "",
            address: "",
            terms: ""
        }
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

        console.log(errors);
        let stateChange = {
            errors,
            terms: terms ? moment(terms) : null
        };
        this.handleValidateData(stateChange);

        this.setState(stateChange);
    };


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

                        <input type="submit" value={"GOTOWE"} className={this.state.isActive}/>
                        <div className={'myData'}>
                            <label> Sprzedawca
                                <select name="" id="" value={this.initialState.businessName} onChange={this.getData}>
                                    <option value="inne" name={"businessName"}>Inne</option>
                                </select>
                            </label>
                            <label> NIP <input type="text" placeholder={"000-000-00-00"} name={"businessPostalCode"}
                                               value={this.initialState.businessNumber}
                                               onChange={this.getData}/></label>
                            <label>Adres<input type="text" placeholder={"ulica, nr, m"} name={"businessAddress"}
                                               value={this.initialState.businessAddress}
                                               onChange={this.getData}/></label>
                            <label>Kod pocztowy<input type="text" placeholder={"00-000"} name={"businessPostalCode"}
                                                      value={this.initialState.businessPostalCode}
                                                      onChange={this.getData}/></label>
                            <label>Podpis<input type="text" value={this.initialState.businessSignature}
                                                name={"businessSignature"} onChange={this.getData}/></label>

                        </div>
                        <div className={"clientsData"}>
                            <label> Nabywca <input type="text" placeholder={"Nazwa firmy"}/></label>
                            <label> NIP <input type="text" placeholder={"000-000-00-00"}/></label>
                            <label>Adres<input type="text" placeholder={"ulica, nr, m"}/></label>
                            <label>Kod pocztowy<input type="text" placeholder={"00-000"}/></label>
                            <label>Podpis<input type="text"/></label>
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
                                        <td><input type="text"/></td>
                                        <td><input type="text"/></td>
                                        <td><input type="number"/></td>
                                        <td><input type="text"/></td>
                                        <td><input type="text"/></td>
                                        <td><input type="text"/></td>
                                        <td><input type="text"/></td>
                                    </tr>

                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>SUMA:</th>
                                        <th><input type="text"/></th>
                                    </tr>

                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>

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