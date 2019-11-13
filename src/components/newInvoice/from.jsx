import React from 'react';
import ReactDOM from 'react-dom';

class FromData extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        businessName: "",
        businessNumber: "",
        businessAddress: "",
        businessPostalCode: "",
        businessSignature: ""

    };

    getData = (e) => {
        this.initialState = {
            [name]: e.currentTarget.value
        }
    }

    render() {

        return (
            <>
                <form action="">
                    <label> Sprzedawca
                        <select name="" id="" value={this.initialState.businessName} onChange={this.getData}>
                            <option value="inne" name={"businessName"}>Inne</option>
                        </select>
                    </label>
                    <label> NIP <input type="text" placeholder={"000-000-00-00"} name={"businessPostalCode"}
                                       value={this.initialState.businessNumber} onChange={this.getData}/></label>
                    <label>Adres<input type="text" placeholder={"ulica, nr, m"} name={"businessAddress"}
                                       value={this.initialState.businessAddress} onChange={this.getData}/></label>
                    <label>Kod pocztowy<input type="text" placeholder={"00-000"} name={"businessPostalCode"}
                                              value={this.initialState.businessPostalCode}
                                              onChange={this.getData}/></label>
                    <label>Podpis<input type="text" value={this.initialState.businessSignature}
                                        name={"businessSignature"} onChange={this.getData}/></label>
                    <div className={"myData"}>
                        <label> Sprzedawca
                            <select name="" id="" value={this.initialState.businessName} onChange={this.getData}>
                                <option value="inne" name={"businessName"}>Inne</option>
                            </select>
                        </label>
                        <label> NIP <input type="text" placeholder={"000-000-00-00"} name={"businessPostalCode"}
                                           value={this.initialState.businessNumber} onChange={this.getData}/></label>
                        <label>Adres<input type="text" placeholder={"ulica, nr, m"} name={"businessAddress"}
                                           value={this.initialState.businessAddress} onChange={this.getData}/></label>
                        <label>Kod pocztowy<input type="text" placeholder={"00-000"} name={"businessPostalCode"}
                                                  value={this.initialState.businessPostalCode} onChange={this.getData}/></label>
                        <label>Podpis<input type="text" value={this.initialState.businessSignature}
                                            name={"businessSignature"} onChange={this.getData}/></label>
                    </div>
                </form>
            </>
        )
    }
}

export default FromData;