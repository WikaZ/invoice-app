import React from 'react';
import ReactDOM from 'react-dom';


class CommonData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: "",
            invoiceNumber:"",
            date: "",
            address: "",
            terms: "",
            errors: {
                invoice: "",
                invoiceNumber: "",
                date: "",
                address: "",
                terms: ""
            }

        }
    }

    handleGetData = (e) => {
        e.preventDefault();
        this.handleValidateData(e);
        this.setState({
            [e.target.name]: e.currentTarget.value
        })

    };

    handleValidateData = (e) => {
        e.preventDefault();
        let errors = this.state.errors;
        const {name, value} = e.target;
        console.log('Name: ', name);
        const validateDate = RegExp(/^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/);
        switch (name) {
            case 'invoice':
                errors.invoice =
                    !value.length || typeof value !== "string"
                        ? 'Czy to jest faktura?!'
                        : '';
                break;
            case 'invoiceNumber':
                errors.invoiceNumber =
                    value.length
                        ? ''
                        : 'Numer faktury jest barzdo waZny!';
                break;
            case 'date':
                errors.date =
                    validateDate.test(value)
                        ? ''
                        : 'Proszę wpisac datę w formacie rrrr-mm-dd!';
                break;
            case 'address':
                errors.address =
                    value.length
                        ? ''
                        : 'Proszę wpisać adres!';
                break;
            case 'terms':
                errors.date =
                    validateDate.test(value)
                        ? ''
                        : 'Proszę wpisac datę w formacie rrrr-mm-dd!';
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value}, () => {
            console.log(errors)
        })
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
                                       name={"invoice"} onChange={this.handleGetData}/>
                            </label>
                        </div>
                        <div className={'formInvoiceNumber'}>
                            <label> Numer
                                <input type="text" placeholder={`${month}/${year}`} value={this.state.invoiceNumber}
                                       name={"invoiceNumber"} onChange={this.handleGetData}/>
                            </label>
                        </div>
                        <div className={'formDate'}>
                            <label>Data wystawienia
                                <input type="text" placeholder={"rrrr-mm-dd"} value={this.state.date}
                                       name={"date"} onChange={this.handleGetData}/>
                            </label>
                        </div>
                        <div className={'formAddress'}>
                            <label>Miejsce wystawienia
                                <input type="text" value={this.state.address} name={"address"}
                                       onChange={this.handleGetData}/>
                            </label>
                        </div>
                        <div className={'formTerms'}>
                            <label>Data sprzedaży
                                <input type="text" placeholder={"rrrr-mm-dd"} value={this.state.terms}
                                       name={"terms"} onChange={this.handleGetData}/>
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