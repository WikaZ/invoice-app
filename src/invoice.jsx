import React from 'react';
import ReactDOM from 'react-dom';
import InvoiceList from "./components/InvoiceList/invoiceList";

class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <InvoiceList/>
        )
    }
}


export default Invoice;