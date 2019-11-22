import React, {Component} from 'react';
import {render} from 'react-dom';
import {AgGridReact} from '@ag-grid-community/react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import {db} from "../../db/dbconfig";


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
                columnDef("Numer", "invoiceNumber", true, true ,false),
                columnDef("Data wystawienia", "date", true, true ,false),
                columnDef("Adres", "address", true, true ,false),
                columnDef("Data Sprzedaży", "terms", true, true ,false),
                columnDef("Nabywca", "clientName", true, true ,false),
                columnDef("NIP", "clientNumber", true, true ,false),
                columnDef("Adres", "clientAddress", true, true ,false),
                columnDef("Kod Pocztowy", "clientPostalCode", true, true ,false),
                columnDef("Podpis", "clientSignature", true, true ,false),
                columnDef("", "product", true, true ,false),

            ],
            // tylko przyklad, pozniej usunac
            rowData: this.createRowData(),
        }
    }

// wszystkie dane z bazy --> to, co wpisal uzytkownik do form na ekr glownym
    createRowData = () => {
        this.reloadTable();
        console.log('Finished row data');
        return [];
    };

    reloadTable = () => {

        db.collection('invoice').get().then(
            querySnapshot => {
                let rowData = [];
                querySnapshot.docs.forEach(doc => {
                    console.log('RowData: ', doc.data());
                    rowData.push(doc.data());
                });
                this.setState({
                    rowData: rowData
                });
            }
        );


    };

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


