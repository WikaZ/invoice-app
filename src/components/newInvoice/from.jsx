import React from 'react';
import ReactDOM from 'react-dom';

class FromData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {

        return (
            <>
                <form action="">
                    <label> Sprzedawca <input type="text" placeholder={"Nazwa firmy"}/></label>
                    <label> NIP <input type="text" placeholder={"000-000-00-00"}/></label>
                    <label>Adres<input type="text" placeholder={"ulica, nr, m"}/></label>
                    <label>Kod pocztowy<input type="text" placeholder={"00-000"}/></label>
                    <label>Podpis<input type="text"/></label>
                    <input type="submit" value={"GOTOWE"}/>

                </form>
            </>
        )
    }
}

export default FromData;