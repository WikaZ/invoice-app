import React, {Component} from 'react';
import {passProduct} from "./dbProductListHelper"
// import './App.css';
import {AgGridReact} from '@ag-grid-community/react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
// import *  as firebase from 'firebase';
// var db = firebase.firestore();
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


const arrayLength = 5;

function createRowData() {
    var rowData = [];
    for (var i = 0; i < arrayLength; i++) {
        var item = {
            rate: "a",
            product: "a",
            qty: "a",
            unit: "a",
            vat: "a"

        };
        rowData.push(item);
    }
    return rowData;
}

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                columnDef("Cena", "rate", true, true, true, true, 80),
                columnDef("Usługa", "product", true, true, true, true, 300),
                columnDef("Ilość", "qty", true, true, true, true, 120),
                columnDef("Jednostka Miary", "unit", true, true, true, true, 120),
                columnDef("Stawka VAT", "vat", true, true, true, true, 120),
            ],

            rowData: createRowData(),
            defaultColDef: {width: 100}


        }

    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    onBtPrinterFriendly() {
        var eGridDiv = document.querySelector("#myGrid");
        eGridDiv.style.width = "";
        eGridDiv.style.height = "";
        this.gridApi.setDomLayout("print");
    }


    onAddRow() {
        var newItem = createNewRowData();
        console.log(newItem);
    }


    // fn dla onClick na selected row
    onButtonClickRemove = () => {
        console.log("usun usluge");
    };

    onButtonClickAdd = () => {
        console.log("dodaj usluge");
        // db.collection("productList").doc("VqUP5n7POyFxV6Ph0cOG").set({
        //     rate: "1 ",
        //     product: "Usługa",
        //     qty: "12",
        //     unit: "szt",
        //     vat: "5%"
        // })
        //     .then(function () {
        //         console.log("Document successfully written!");
        //     })
        //     .catch(function (error) {
        //         console.error("Error writing document: ", error);
        //     });
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
                <button onClick={this.onButtonClickAdd.bind(this)}>Dodaj nową usługę</button>
                <button onClick={this.onBtPrinterFriendly.bind(this)}>Printer Friendly Layout</button>
                <div
                    id="myGrid"
                    style={{
                        height: "200px",
                        width: "400px"
                    }}
                    className="ag-theme-balham"
                >
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        modules={AllCommunityModules}
                        rowSelection="single"
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                </div>
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