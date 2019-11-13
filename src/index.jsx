import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import style from './scss/index.scss';
import *  as firebase from 'firebase';


var firebaseConfig = {
	apiKey: "AIzaSyA1EHzaQaEos3rLFDrwqiJgoxOr3eSgOJw",
	authDomain: "invoice-generator-3ef22.firebaseapp.com",
	databaseURL: "https://invoice-generator-3ef22.firebaseio.com",
	projectId: "invoice-generator-3ef22",
	storageBucket: "invoice-generator-3ef22.appspot.com",
	messagingSenderId: "532412143501",
	appId: "1:532412143501:web:cf92e824228c12a9904fc4"
};
firebase.initializeApp(firebaseConfig);





ReactDOM.render(<App/>, document.getElementById("root"));