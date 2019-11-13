import React, {Component} from 'react';
import {passProduct} from "./dbProductListHelper"
// import './App.css';
import {AgGridReact} from '@ag-grid-community/react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import {AllCommunityModules} from '@ag-grid-community/all-modules';

function columnDef(headerName, fieldName, sortable, filter, checkboxSelection,editable, width ) {
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

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                columnDef("Cena", "rate", true, true, true,true,80),
                columnDef("Usługa", "product", true, true, true,true,300 ),
                columnDef("Ilość", "qty", true, true, true,true,120 ),
                columnDef("Jednostka Miary", "unit", true, true, true,true,120 ),
                columnDef("Stawka VAT", "vat", true, true, true,true,120 ),
            ],
            // tylko przyklad, pozniej usunac
            rowData: [{
                rate: "1 ",
                product: "Usługa",
                qty:"",
                unit:"",
                vat:""

            }

                ],

        }

    }
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };


    onAddRow() {
        var newItem = createNewRowData();
      console.log(newItem);
    }


        // fn dla onClick na selected row
    onButtonClickRemove = () => {
        console.log("usun usluge");
    };

    onButtonClickAdd=()=>{
        console.log("dodaj usluge");
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
                <button onClick={this.onButtonClickRemove.bind(this)}>Usuń usługę</button>
                <button onClick={this.onAddRow.bind(this)}>Dodaj nową usługę</button>
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

export default ProductsList;

var newCount = 1;
function createNewRowData() {
    setRowData()
    return {
        number: newCount++,
        product: ""
    };
}
function setRowData() {
    console.log("nowy wiersz");
}