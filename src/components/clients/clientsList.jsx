import React, {Component} from 'react';
import {render} from 'react-dom';
// import logo from './logo.svg';
// import './App.css';
import {AgGridReact} from '@ag-grid-community/react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import AddClientForm from './addClient'
import Button from 'react-bootstrap/Button'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {db} from "../../db/dbconfig";


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
            showPopUp: false,
            columnDefs: [
                columnDef("Nabywca", "clientName", true, true, true, true, 100),
                columnDef("NIP", "clientNumber", true, true, false, true, 100),
                columnDef("Adres", "clientAddress", true, true, false, true, 100),
                columnDef("Miasto", "clientCity", true, true, false, true, 100),
                columnDef("Kod Pocztowy", "clientPostalCode", true, true, false, true, 100),
                columnDef("Podpis", "clientSignature", true, true, false, true, 100),


            ],
            // tylko przyklad, pozniej usunac
            rowData: this.createRowData(),
        }

    }

    createRowData = () => {
        this.reloadTable();
        console.log('Finished row data');
        return [];
    };
    // set row
    reloadTable = () => {

        db.collection('clients').get().then(
            querySnapshot => {
                let rowData = [];
                querySnapshot.docs.forEach(doc => {
                    console.log('clientsData: ', doc.data());
                    rowData.push(doc.data());
                });
                this.setState({
                    rowData: rowData
                });
            }
        );


    };



    handleTogglePopup = () => {
        this.setState({
                showPopUp: !this.state.showPopUp
            }
        )
    };
// Here, we replaced the rowData assignment in the constructor with a data fetch from a remote service
    // componentDidMount() {
    //     fetch('https://api.myjson.com/bins/15psn9')
    //         .then(result => result.json())
    //         .then(rowData => this.setState({rowData}))
    // }

    // szerokosc tabelki
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

                    <div id="grid-wrapper" style={{width: "100%", height: "100%"}}>
                        <Button variant="secondary"
                                onClick={this.handletogglePopup}>Dodaj klienta</Button>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            modules={AllCommunityModules}
                            rowSelection="single"
                            onGridSizeChanged={this.onGridSizeChanged.bind(this)}>
                        </AgGridReact>
                    </div>
                </div>
                {this.state.showPopUp && <AddClientForm  handletogglePopup={this.handleTogglePopup}/>}
            </>
        );
    }
}

export default ClientsList;