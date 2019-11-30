import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import style from './scss/index.scss';

require('file-loader?name=[name].[ext]!./worker.html');






ReactDOM.render(<App/>, document.getElementById("root"));