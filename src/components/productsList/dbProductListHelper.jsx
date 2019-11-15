// Add a new document in collection "cities"
//  db.collection("productList").doc("VqUP5n7POyFxV6Ph0cOG").set({
//     rate: "1 ",
//     product: "Usługa",
//     qty:"12",
//     unit:"szt",
//     vat:"5%"
// })
//     .then(function() {
//         console.log("Document successfully written!");
//     })
//     .catch(function(error) {
//         console.error("Error writing document: ", error);
//     });


import {db} from "../../db/dbconfig";

// get data
//
// basereloadTable = () => {
//
//     db.collection('products').get().then(
//         querySnapshot => {
//             let rowData = [];
//             querySnapshot.docs.forEach(doc => {
//                 console.log('RowData: ', doc.data());
//                 rowData.push(doc.data());
//             });
//             this.setState({
//                 rowData: rowData
//             });
//         }
//     );
//
// };



// wydrukowac nowa strone

// onBtPrint = () => {
//     var gridApi = this.gridApi;
//     // setPrinterFriendly(gridApi);
//     setTimeout(function () {
//         print();
//         // setNormal(gridApi);
//     }, 2000);
// };