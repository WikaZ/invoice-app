import React, {Component} from 'react';
import {render} from 'react-dom';
// import logo from './logo.svg';
// import './App.css';
import {AgGridReact} from '@ag-grid-community/react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import {AllCommunityModules} from '@ag-grid-community/all-modules';

function columnDef(headerName, fieldName, sortable, filter, checkboxSelection, editable, width) {
    return {
        headerName: headerName,
        field: fieldName,
        sortable: sortable,
        filter: filter,
        checkboxSelection: checkboxSelection,
        editable: editable,
        width: width
    }
}

class ClientsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                columnDef("Nabywca", "clientName", true, true, true, true, 100),
                columnDef("NIP", "clientNumber", true, true, true, true, 100),
                columnDef("Adres", "clientAddress", true, true, true, true, 100),
                columnDef("Kod Pocztowy", "clientPostalCode", true, true, true, true, 100),
                columnDef("Podpis", "clientSignature", true, true, true, true, 100),


            ],
            // tylko przyklad, pozniej usunac
            rowData: [{
                invoice: "Faktura ",
                invoiceNumber: "01/2019",
                date: "12-12-2010",
                address: "Jk",
                terms: "12.01.2011",
                businessName: "Al",
                businessNumber: "000000000",
                businessAddress: "SK",
                businessPostalCode: "01-248",
                businessSignature: "Ola",
                clientName: "Karamelka",
                clientNumber: "000111111",
                clientAddress: "Hr",
                clientPostalCode: "00-235",
                clientSignature: " Kar"


            },
                {
                    invoice: "Faktura ",
                    invoiceNumber: "10/2019",
                    date: "13-12-2010",
                    address: "KJ",
                    terms: "13.01.2011",
                    businessName: "Kl",
                    businessNumber: "000000000",
                    businessAddress: "SK",
                    businessPostalCode: "01-248",
                    businessSignature: "Ola",
                    clientName: "Korzhyk",
                    clientNumber: "000111111",
                    clientAddress: "Ko",
                    clientPostalCode: "00-235",
                    clientSignature: " Ko"


                },
                {
                    invoice: "Faktura ",
                    invoiceNumber: "10/2019",
                    date: "13-12-2010",
                    address: "KJ",
                    terms: "13.01.2011",
                    businessName: "Kl",
                    businessNumber: "000000000",
                    businessAddress: "SK",
                    businessPostalCode: "01-248",
                    businessSignature: "Ola",
                    clientName: "Kompot",
                    clientNumber: "000111111",
                    clientAddress: "Hr",
                    clientPostalCode: "00-235",
                    clientSignature: " Kom"


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
            </div>
        );
    }
}

export default ClientsList;