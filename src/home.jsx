import React from 'react';
import CommonData from './components/newInvoice/commonData';
import FromData from './components/newInvoice/from';
import ToData from './components/newInvoice/to';
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
                {/*<CommonData/>*/}
                {/*<FromData/>*/}
                {/*<ToData/>*/}
            </>)

    }
}

export default Home;