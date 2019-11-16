import React from 'react';
import {db} from '../../db/dbconfig';

class SelectVat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: [...this.props.vatData],
            selectedVat: '',

        }
    }


    checkIsFunction = (vat) => {
        console.log("ojokokoko", this.props.handlePassVat);
        console.log(this.props.handlePassVat, vat,"arg current vat");
        if (typeof this.props.handlePassVat === 'function') {
            this.props.handlePassVat(vat);
        }
    };
    handleGetInputValue = (e) => {
        e.preventDefault();
        this.setState({
            selectedVat: e.target.value,
        });

        this.checkIsFunction(e.target.value);
        // this.getIndex(i)
    };


    render() {
console.log(this.state.selectedVat);
        return (
            <>

                <select name="vat" id="" value={this.state.selectedVat} onChange={this.handleGetInputValue}>
                    {this.state.rowData.map((el, i) => {
                        return (
                            <option key={i} value={el}>{el}</option>
                        )

                    })}


                </select>


            </>
        )
    }
}

export default SelectVat;