// import React, {Component} from 'react';
// import {passProduct} from "./dbProductListHelper"
// // import './App.css';
// import {AgGridReact} from '@ag-grid-community/react';
// import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
// import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
// import {db} from '../../db/dbconfig';
// import {AllCommunityModules} from '@ag-grid-community/all-modules';
//
// function columnDef(headerName, fieldName, sortable, filter, checkboxSelection, editable, minWidth) {
//     return {
//         headerName: headerName,
//         field: fieldName,
//         sortable: sortable,
//         filter: filter,
//         checkboxSelection: checkboxSelection,
//         editable: editable,
//         minWidth: minWidth
//     }
// }
//
//
// class ProductsList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             columnDefs: [
//                 columnDef("Usługa", "product", true, true, true, true, 300),
//                 columnDef("Cena", "rate", true, true, false, true, 80),
//                 columnDef("Ilość", "qty", true, true, false, true, 120),
//                 columnDef("Jednostka Miary", "unit", true, true, false, true, 120),
//                 columnDef("Stawka VAT", "vat", true, true, false, true, 120),
//             ],
//
//             // rowData: this.createRowData(),
//             rowData: this.createRowData(),
//             defaultColDef: {width: 100},
//             domLayout: "autoHeight"
//
//
//         }
//
//     }
//
//     createRowData = () => {
//         this.reloadTable();
//
//         console.log('Finished row data');
//         return [];
//     };
//
//
//
//     reloadTable = () => {
//
//         // db.collection("productList").doc().set({
//         //         // invoice: this.state.columnDefs[0],
//         //         // invoiceNumber: this.state.columnDefs[1]
//         //         // date: (this.state.date).format('YYYY-MM-DD').toString(),
//         //         // address: this.state.address,
//         //         // terms: (this.state.terms).format('YYYY-MM-DD').toString(),
//         //         // businessName: this.state.businessName,
//         //         // businessNumber: this.state.businessNumber,
//         //         // businessAddress: this.state.businessAddress,
//         //         // businessPostalCode: this.state.businessPostalCode,
//         //         // businessSignature: this.state.businessSignature,
//         //         // clientName: this.state.clientName,
//         //         // clientNumber: this.state.clientNumber,
//         //         // clientAddress: this.state.clientAddress,
//         //         // clientPostalCode: this.state.clientPostalCode,
//         //         // clientSignature: this.state.clientSignature,
//         //         // product: this.state.product,
//         //         // qty: this.state.qty,
//         //         // rate: this.state.rate,
//         //         // unit: this.state.unit,
//         //         // vat: this.state.vat
//         //     }
//         // )
//         //     .then(function () {
//         //         console.log("Document successfully written!");
//         //     })
//         //     .catch(function (error) {
//         //         console.error("Error writing document: ", error);
//         //     });
//
//     };
//
//     onGridSizeChanged(params) {
//         var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
//         var columnsToShow = [];
//         var columnsToHide = [];
//         var totalColsWidth = 0;
//         var allColumns = params.columnApi.getAllColumns();
//         for (var i = 0; i < allColumns.length; i++) {
//             var column = allColumns[i];
//             totalColsWidth += column.getMinWidth();
//             if (totalColsWidth > gridWidth) {
//                 columnsToHide.push(column.colId);
//             } else {
//                 columnsToShow.push(column.colId);
//             }
//         }
//         params.columnApi.setColumnsVisible(columnsToShow, true);
//         params.columnApi.setColumnsVisible(columnsToHide, false);
//         params.api.sizeColumnsToFit();
//     }
//
// // copy
//     onGridReady = params => {
//         this.gridApi = params.api;
//         this.gridColumnApi = params.columnApi;
//     };
//
//     getRowData() {
//         var rowData = [];
//         this.gridApi.forEachNode(function(node) {
//             rowData.push(node.data);
//         });
//         console.log(this.gridApi.node.data ,"Row Data:");
//
//     }
//
//     onAddRow() {
//         var newItem = createNewRowData();
//         console.log(this.gridApi, "gridApi");
//
//         var res = this.gridApi.updateRowData({ add: [newItem] });
//
//         printResult(res, "res");
//
//     }
//
//
//     onRemoveSelected() {
//         var selectedData = this.gridApi.getSelectedRows();
//         var res = this.gridApi.updateRowData({ remove: selectedData });
//         printResult(res);
//     }
//
//     saveRowData(){
//
//     }
//
//     // copy end
//     render() {
//
//         return (
//             <>
//
//
//                 <div
//                     className="ag-theme-balham mainTable"
//                     style={{
//                         height: '100vh',
//                         width: '100vw'
//                     }}
//                 >
//
//                     <div id="grid-wrapper" style={{width: "100%", height: "100%"}}>
//
//                         <AgGridReact
//                             columnDefs={this.state.columnDefs}
//                             rowData={this.state.rowData}
//                             modules={AllCommunityModules}
//                             rowSelection="single"
//                             onGridSizeChanged={this.onGridSizeChanged.bind(this)}
//                             onGridReady={this.onGridReady}>
//                         </AgGridReact>
//
//                     </div>
//                 </div>
// <div>
//                 <button onClick={this.onAddRow.bind(this)}>Add Row</button>
//                 <button onClick={this.onRemoveSelected.bind(this)}>Remove Selected</button>
//
//             </div>
//
//
//
//             </>
//
//
//         );
//     }
// }
//
// export default ProductsList;
//
// var newCount = 1;
//
// function createNewRowData() {
//     setRowData()
//     return {
//         number: newCount++,
//         product: ''
//     };
// }
//
// function setRowData() {
//     console.log("nowy wiersz");
// }
//
//
//
// function printResult(res) {
//     console.log("---------------------------------------");
//     if (res.add) {
//         res.add.forEach(function(rowNode) {
//             console.log("Added Row Node", rowNode.data);
//         });
//     }
//     if (res.remove) {
//         res.remove.forEach(function(rowNode) {
//             console.log("Removed Row Node", rowNode);
//         });
//     }
//     if (res.update) {
//         res.update.forEach(function(rowNode) {
//             console.log("Updated Row Node", rowNode.data);
//         });
//     }
// }


import React, {Component} from 'react';
import {render} from 'react-dom';
// import logo from './logo.svg';
// import './App.css';
import {AgGridReact} from '@ag-grid-community/react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import AddProductForm from './addProduct'
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

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopUp: false,
            columnDefs: [
                columnDef("Nazwa usługi", "product", true, true, true, true, 100),
                columnDef("Jednostka miary", "productUnit", true, true, false, true,100 ),
                columnDef("Cena", "productRate", true, true, false, true,100),

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
        db.collection('productList').get().then(
            querySnapshot => {
                let rowData = [];
                querySnapshot.docs.forEach(doc => {
                    console.log('productListData: ', doc.data());
                    rowData.push(doc.data());
                });

                this.setState({

                    rowData: rowData
                });
            }
        );


    };

    getLastSelectedNode(){
        let rows = gridApi.getSelectedRows();
        if(rows.length > 0)
            console.log(rows[rows.length - 1]);
        else
            console.log('No rows selected');
    }

    handleTogglePopup = () => {
        this.setState({
                showPopUp: !this.state.showPopUp
            }
        );

        if(!this.state.showPopUp){
            console.log("reload table");
            this.reloadTable();
        }
    };

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
                        width: '100vw',
                        margin:"0 auto",
                        textAlign:"center"
                    }}

                >

                    <div id="grid-wrapper" style={{width: "100%", height: "100%"}}>
                        <Button variant="secondary"
                                onClick={this.handleTogglePopup} className={'addBtn'}>Dodaj usługę</Button>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            modules={AllCommunityModules}
                            rowSelection="single"
                            onGridSizeChanged={this.onGridSizeChanged.bind(this)}
                            onSelectionChanged={this.getLastSelectedNode.bind(this)}
                        >
                        </AgGridReact>
                    </div>
                </div>
                {this.state.showPopUp && <AddProductForm  handleTogglePopup={this.handleTogglePopup}/>}
            </>
        );
    }
}

export default ProductList;