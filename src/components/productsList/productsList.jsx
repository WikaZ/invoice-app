import React, {Component} from 'react';
import {passProduct} from "./dbProductListHelper"
// import './App.css';
import {AgGridReact} from '@ag-grid-community/react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import {db} from '../../db/dbconfig';
import {AllCommunityModules} from '@ag-grid-community/all-modules';

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
                    console.log('RowData: ', doc.data())
                    console.log( "docs: ", querySnapshot.docs);
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
                   {/*<button onClick={this.onAddRow}>Add Row</button>*/}
                    {/*<button onClick={this.onAddRow.bind(this)}>Add Row</button>*/}
                    {/*<button onClick={this.onInsertRowAt2.bind(this)}>Insert Row @ 2</button>*/}
                    {/*<button onClick={this.updateItems.bind(this)}>Update First 5</button>*/}
                    {/*<button onClick={this.onRemoveSelected.bind(this)}>Remove Selected</button>*/}
                    {/*<button onClick={this.getRowData.bind(this)}>Get Row Data</button>*/}
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