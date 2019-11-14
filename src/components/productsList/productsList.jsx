import React, {Component} from 'react';
import {passProduct} from "./dbProductListHelper"
// import './App.css';
import {AgGridReact} from '@ag-grid-community/react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import {db} from '../../db/dbconfig';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
// import *  as firebase from 'firebase';
// var db = firebase.firestore();
function columnDef(headerName, fieldName, sortable, filter, checkboxSelection, editable, minWidth) {
    return {
        headerName: headerName,
        field: fieldName,
        sortable: sortable,
        filter: filter,
        checkboxSelection: checkboxSelection,
        editable: editable,
        minWidth: minWidth
    }
}


const arrayLength = 5;


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

            rowData: this.createRowData(),
            defaultColDef: {width: 100},
            domLayout: "autoHeight"


        }

    }

    createRowData = () => {
        this.reloadTable();
        console.log('Finished row data');
        return [];
    };

    reloadTable = () => {

        db.collection('productList').get().then(
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


    onBtPrinterFriendly() {
        var eGridDiv = document.querySelector("#grid-wrapper");
        eGridDiv.style.width = "";
        eGridDiv.style.height = "";
        eGridDiv.style.margin = "0 auto";
        this.gridApi.setDomLayout("print");
    }
     setPrinterFriendly(api) {
        var eGridDiv = document.querySelector("#grid-wrapper");
        eGridDiv.style.width = "";
        eGridDiv.style.height = "";
        api.setDomLayout("print");
    }


    // onBtNormal() {
    //     var eGridDiv = document.querySelector("#grid");
    //     eGridDiv.style.width = "800px";
    //     eGridDiv.style.height = "400px";
    //     this.gridApi.setDomLayout(null);
    // }

    onBtPrint = () => {
        var gridApi = this.gridApi;
        // setPrinterFriendly(gridApi);
        setTimeout(function () {
            print();
            // setNormal(gridApi);
        }, 2000);
    };

    onAddRow() {
        var newItem = createNewRowData();
        console.log(newItem);
    }


    // fn dla onClick na selected row
    onButtonClickRemove = () => {
        console.log("usun usluge");
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
                <button onClick={this.onButtonClick}>Get selected rows</button>

                    <div
                        className="ag-theme-balham mainTable"
                        style={{
                            height: '100vh',
                            width: '100vw'
                        }}
                    >

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

                <button onClick={this.onBtPrint.bind(this)}>Print</button>
            </>


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

function setPrinterFriendly(api) {
    var eGridDiv = document.querySelector("#grid-wrapper");
    eGridDiv.style.width = "";
    eGridDiv.style.height = "";
    api.setDomLayout("print");
}

function setNormal(api) {
    var eGridDiv = document.querySelector("#grid-wrapper");
    eGridDiv.style.width = "600px";
    eGridDiv.style.height = "200px";
    api.setDomLayout(null);
}