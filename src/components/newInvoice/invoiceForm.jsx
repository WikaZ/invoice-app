import React from 'react';
import CommonData from "./commonData";
import From from "./from";
import To from "./to";
import SendMainData from './sendMainData'


class InvoiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <CommonData/>
                {/*<From/>*/}
                {/*<To/>*/}
                {/*<SendMainData/>*/}
            </>
        )
    }
}

export default InvoiceForm;