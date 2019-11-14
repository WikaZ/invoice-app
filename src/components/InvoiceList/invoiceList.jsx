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
                qty: "",
                unit: "",
                vat: ""


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
                    qty: "",
                    unit: "",
                    vat: ""


                }]
        }
    }

    onGridSizeChanged(params) {
        var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
        var columnsToShow = [];
        var columnsToHide = [];
        var totalColsWidth = 0;
        var allColumns = params.columnApi.getAllColumns();
        for (var i = 0; i < allColumns.length; i++) {
            var column = allColumns[i];
            totalColsWidth += column.getMinWidth();
            if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.colId);
            } else {
                columnsToShow.push(column.colId);
            }
        }
        params.columnApi.setColumnsVisible(columnsToShow, true);
        params.columnApi.setColumnsVisible(columnsToHide, false);
        params.api.sizeColumnsToFit();
    }

    // fn dla onClick na selected row
    onButtonClick = () => {
        console.log("mam wszystkie dane tej faktury");

    };


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
                    <div id="grid-wrapper" style={{width: "100%", height: "100%"}}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            modules={AllCommunityModules}
                            rowSelection="single"
                            onGridSizeChanged={this.onGridSizeChanged.bind(this)}>
                        </AgGridReact>
                    </div>

                </div>
            </>
        );
    }
}

export default InvoiceList;


