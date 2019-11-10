import React from 'react';
import ReactDOM from 'react-dom';


class CommonData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: "",
            invoiceNumber: "",
            date: "",
            address: "",
            terms: "",
            errors: {
                invoice: "",
                invoiceNumber: " ",
                date: " ",
                address: " ",
                terms: " "
            },
            showItem: false


        }
    }


    handleGetData = (e) => {
        e.preventDefault();
        this.handleValidateData(e);
        this.setState({
            [e.target.name]: e.currentTarget.value
        });
        let errors = this.state.errors;
        const {name, value} = e.target;
        console.log('Name: ', name);
        const validateDate = RegExp(/^[1-9]{4}-[1-9]{2}-[1-9]{2}$/g);
        const validateInvoice = RegExp(/^[a-z]{2,}$/g);
        const validateNum = RegExp(/^[1-9]{1,}\S[1-9]{1,}$/g);
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
                    validateDate.test(value) ? ''
                        : 'Proszę wpisac datę w formacie rrrr-mm-dd!';
                break;
            case 'address':
                errors.address =
                    value !== "" && typeof value === "string"
                        ? ''
                        : 'Proszę wpisać adres!';
                break;
            case 'terms':
                errors.terms =
                    validateDate.test(value)
                        ? ''
                        : 'Proszę wpisac datę w formacie rrrr-mm-dd!';
                break;
            default:
                break;
        }


        this.setState({
            errors, [name]: value
        });

        // console.log(this.state.errors, "bledy w sTATE");
        // this.state(this.state.errors).map((el,i)=>{
        //     console.log(el);
        // })
// klucze this.state.errors
        console.log(Object.keys(this.state.errors), "obj error");
        Object.keys(this.state.errors).forEach((key)=>{
            console.log(this.state.errors[key])
        })
    };




    handleValidateData = (e) => {
        e.preventDefault();


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
                        <input type="submit" value={"GOTOWE"}/>
                    </div>
                </form>
            </>
        )
    }
}

export default CommonData;