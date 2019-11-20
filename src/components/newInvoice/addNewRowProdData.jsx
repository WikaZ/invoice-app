import React from 'react';
import ReactDOM from 'react-dom';
import dateUtils from './functionHelper';
import {db} from '../../db/dbconfig';
import SelectVat from "./selectVat";

class AddNewRowProdData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: "",
            qty: "",
            rate: "",
            unit: "",
            vat: "23",
            subtotal: "0",
            grossPrice: "0"
        }
    }

    render() {
        return (
            <>
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

            </>
        )
    }
}

export default AddNewRowProdData;