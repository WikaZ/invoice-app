import React from 'react';
import InvoiceForm from "./components/newInvoice/invoiceForm";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <InvoiceForm/>

            </>)

    }
}

export default Home;