import React from 'react';
import ReactDOM from 'react-dom';

let active = {
    color: "#010601",
    backgroundColor: "rgba(170, 160, 0, 0.91)"
};
let notActive = {
    color: "#010601",
    backgroundColor: "rgba(1, 6, 1, 0.32)"
}

class CommonData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: "Faktura",
            invoiceNumber: "01/2019",
            date: "2019-01-01",
            address: "Jk",
            terms: "2019-01-01",
            isActive: notActive,
            isShow: false,
            errors: {
                invoice: "",
                invoiceNumber: " ",
                date: " ",
                address: " ",
                terms: " "
            }


        }
    }

    // str = this.state.date albo value w event handleGetData
    // walidacja dla daty-- zmieniamy format daty i sprawdzamy w kazdym miesiacu
    changeFormatDay = (str) => {
        let day = str.substr(8, 2);

        console.log(day, "day");
        let firstChar = day.substr(0, 1);
        console.log(firstChar, "firstCh");

        if (Number(firstChar) === 0) {
            return Number(day.slice(-1));
        } else if (Number(firstChar) > 3) {
            return false;
        } else {
            return Number(day);
        }

    };

    validatemonth31 = (str) => {
        let month = str.substr(5, 2);
        console.log(month, "month");
        return ((month === "01" || month === "03" || month === "05" || month === "07" || month === "08" || month === "10" || month === "12") && this.changeFormatDay(str) > 0 && this.changeFormatDay(str) < 31);
    };

    validatemonth30 = (str) => {
        let month = str.substr(5, 2);
        console.log(month, "month");
        return ((month === "04" || month === "06" || month === "09" || month === "11") && this.changeFormatDay(str) > 0 && this.changeFormatDay(str) < 30);
    };

    validatemonth29 = (str) => {
        let month = str.substr(5, 2);
        console.log(month, "month");
        return (month === "02" && this.changeFormatDay(str) > 0 && this.changeFormatDay(str) < 29);
    };


    validateMonth = (str) => {
        let month = str.substr(5, 2);
        console.log(month, "month");
        return this.validatemonth29(str) || this.validatemonth30(str) || this.validatemonth31(str)

    };
// sprawdzamy, czy value w obj error sa puste---> w render
    isEmpty = (el) => {
        return el === ""
    };


    handleGetData = (e) => {
        e.preventDefault();
        this.handleValidateData(e);
        this.setState({
            [e.target.name]: e.currentTarget.value
        });
        let errors = this.state.errors;
        const {name, value} = e.target;
        console.log('Name: ', name);
        const validateDate = RegExp(/^2[0-9]{3}-[0-9]{2}-[0-9]{2}$/g);
        const validateInvoice = RegExp(/^[a-z]{2,}$/g);
        const validateNum = RegExp(/^[1-9]{1,}\/|-[1-9]{1,}$/g);
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
            case 'date':
                errors.date =
                    !validateDate.test(value) ? 'Proszę wpisac datę w formacie rrrr-mm-dd!'
                        : (!this.validateMonth(value) ? 'Niewłaściwy dzień lub miesiąc' : '');

                break;
            case 'address':
                errors.address =
                    value !== "" && typeof value === "string"
                        ? ''
                        : 'Proszę wpisać adres!';
                break;
            case 'terms':
                errors.terms =
                    !validateDate.test(value)
                        ? 'Proszę wpisac datę sprzedaży w formacie rrrr-mm-dd!'
                        : (!this.validateMonth(value) ? 'Niewłaściwy dzień lub miesiąc' : '');
                break;
            default:
                break;
        }


        this.setState({
            errors, [name]: value
        });


//test!!!!!! klucze this.state.errors  wipisac wszystkie błedy!!!
        console.log(Object.keys(this.state.errors), "obj error");
        Object.keys(this.state.errors).forEach((key) => {
            console.log(this.state.errors[key], "key")
        })


    };


    // event dla submit --> active/ not active btn zapisz

    handleValidateData = (e) => {
        e.preventDefault();
        if (Object.values(this.state.errors).every(this.isEmpty)) {
            this.setState({
                isActive: active,
                isShow: true
            })
        }

    };

    render() {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        return (
            <>
                <form action="" onSubmit={this.handleValidateData}>
                    <div className={'formWrapper'}>
                        <div className={'formInvoice'}>
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
                                <input type="text" placeholder={"rrrr-mm-dd"} value={this.state.date}
                                       name={"date"} onChange={this.handleGetData} required/>
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
                                <input type="text" placeholder={"rrrr-mm-dd"} value={this.state.terms}
                                       name={"terms"} onChange={this.handleGetData} required/>
                            </label>
                        </div>
                        <input type="submit" value={"GOTOWE"} style={this.state.isActive}/>
                    </div>
                </form>

                {!this.state.isShow ? Object.values(this.state.errors).map((el, i) => {
                    return (

                        <p key={i} style={{listStyleType: "none"}}> {el}</p>

                    )
                }) : null}


            </>
        )
    }


}

export default CommonData;