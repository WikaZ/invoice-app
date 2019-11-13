import React, {Component} from 'react';
import {render} from 'react-dom';
// import logo from './logo.svg';
// import './App.css';
import {AgGridReact} from '@ag-grid-community/react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import *  as firebase from 'firebase';

function columnDef(headerName, fieldName, sortable, filter, checkboxSelection) {
    return {
        headerName: headerName,
        field: fieldName,
        sortable: sortable,
        filter: filter,
        checkboxSelection: checkboxSelection
    }
}

class InvoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "ala",
            columnDefs: [
                columnDef("Dokument", "invoice", true, true, true),
                columnDef("Numer", "invoiceNumber", true, true, true),
                columnDef("Data wystawienia", "date", true, true, true),
                columnDef("Adres", "address", true, true, true),
                columnDef("Data Sprzedaży", "terms", true, true, true),
                columnDef("Sprzedawca", "businessName", true, true, true),
                columnDef("NIP", "businessNumber", true, true, true),
                columnDef("Adres", "businessAddress", true, true, true),
                columnDef("Kod pocztowy", "businessPostalCode", true, true, true),
                columnDef("Podpis", "businessSignature", true, true, true),
                columnDef("Nabywca", "clientName", true, true, true),
                columnDef("NIP", "clientNumber", true, true, true),
                columnDef("Adres", "clientAddress", true, true, true),
                columnDef("Kod Pocztowy", "clientPostalCode", true, true, true),
                columnDef("Podpis", "clientSignature", true, true, true),
            ],
            // tylko przyklad, pozniej usunac
            rowData: [{
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
                rate: "",
                product: "",
                qty:"",
                unit:"",
                vat:""


            },
                {
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
                    rate: "",
                    product: "",
                    qty:"",
                    unit:"",
                    vat:""


                }]
        }
    }



    // fn dla onClick na selected row
    onButtonClick = () => {
        console.log("mam wszystkie dane tej faktury");

    };
// Here, we replaced the rowData assignment in the constructor with a data fetch from a remote service
    // componentDidMount() {
    //     fetch('https://api.myjson.com/bins/15psn9')
    //         .then(result => result.json())
    //         .then(rowData => this.setState({rowData}))
    // }

    render() {
        return (
            <>
                <div
                    className="ag-theme-balham mainTable"
                    style={{
                        height: '100vh',
                        width: '100vw'
                    }}
                >
                    <button onClick={this.onButtonClick}>Get selected rows</button>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        modules={AllCommunityModules}
                        rowSelection="single">
                    </AgGridReact>
                    <p style={{color: 'red'}}>{this.state.name}</p>
                </div>
            </>
        );
    }
}

export default InvoiceList;


// ??????????????????
// jesli lista jest dluga i sie nie miesci??
//     suma rate (12,34 + 24,67)