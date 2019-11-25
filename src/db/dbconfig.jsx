import *  as firebase from 'firebase';

// Required for side-effects
require("firebase/firestore");


var firebaseConfig = {
    apiKey: "AIzaSyC3fQhO2NSuqm9u_3Z7otu5RNSLNXScnCk",
    authDomain: "mojefaktury-8bd42.firebaseapp.com",
    databaseURL: "https://mojefaktury-8bd42.firebaseio.com",
    projectId: "mojefaktury-8bd42",
    storageBucket: "mojefaktury-8bd42.appspot.com",
    messagingSenderId: "17858788706",
    appId: "1:17858788706:web:4197f2428508be0640803b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export var db = firebase.firestore();
var dbRef = firebase.database().ref("MojeFaktury");
console.log(dbRef, "dbref");

// wyslat
// onButtonClickAdd = () => {
//     console.log("dodaj usluge");
//     db.collection("productList").doc().set({
//         rate: "1 ",
//         product: "Usługa",
//         qty: "12",
//         unit: "szt",
//         vat: "5%"
//     })
//         .then(function () {
//             console.log("Document successfully written!");
//         })
//         .catch(function (error) {
//             console.error("Error writing document: ", error);
//         });
// };
