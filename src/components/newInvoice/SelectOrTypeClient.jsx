import React from 'react';
import {db} from '../../db/dbconfig';

class SelectOrTypeClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            currentUserVal: '',
            elementIndex: "",
            rowData: []
        }
    }


    componentDidMount() {
        db.collection('clients').orderBy('clientName').get().then(
            querySnapshot => {
                const clientsData = [];
                querySnapshot.docs.forEach(doc => {
                    console.log('RowData: ', doc.data())
                    console.log("docs: ", querySnapshot.docs);
                    clientsData.push(doc.data());
                });
                this.setState({
                    rowData: clientsData,

                });
                console.log(this.state.rowData, "wszystkie dane klientow");
            }
        );

    }

    checkIsFunction = (value) => {
        console.log(value, "arg current val");
        if (typeof this.props.getDataFromSelect === 'function') {
            this.props.getDataFromSelect(this.state.rowData[value]);
        }
    };
    handleGetInputValue = (e) => {
        e.preventDefault();
        this.setState({
            currentUserVal: e.target.value,
        });

        this.checkIsFunction(e.target.value);

    };



    render() {

        return (
            <>

                <select name="clientName" id="" value={this.state.currentUserVal} onChange={this.handleGetInputValue}>
                    {this.state.rowData.map((el, i) => {
                        return (
                            <option key={i} value={i} >{el.clientName}</option>
                        )

                    })}


                </select>





            </>
        )
    }
}

export default SelectOrTypeClient;