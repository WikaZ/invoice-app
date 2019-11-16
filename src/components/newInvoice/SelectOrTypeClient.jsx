import React from 'react';
import {db} from '../../db/dbconfig';

class SelectOrTypeClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            currentUserVal: "",

            rowData: []
        }
    }



    componentDidMount() {
        db.collection('clients').get().then(
            querySnapshot => {
                const clientsData = [];
                querySnapshot.docs.forEach(doc => {
                    console.log('RowData: ', doc.data())
                    console.log("docs: ", querySnapshot.docs);
                    clientsData.push(doc.data());
                });
                this.setState({
                    rowData: clientsData
                })
            }
        );

    }

    checkIsFunction = () => {
        console.log("ojokokoko", this.props.getDataFromSelect);
        console.log(this.state.currentUserVal, "arg current val");
        if (typeof this.props.getDataFromSelect === 'function') {
            this.props.getDataFromSelect(this.state.currentUserVal);
        }
    };
    handleGetInputValue = (e) => {
        e.preventDefault();
        this.setState({
            currentUserVal: e.target.value,


        });
        this.checkIsFunction();
    };

    render() {

        return (
            <>
                {/*onChange={this.checkIsFunction(this.state.currentUserVal)}*/}
                <select name="clientName" id="" value={this.state.currentUserVal} onChange={this.handleGetInputValue}>
                    {this.state.rowData.map((el, i) => {
                        return (
                            <option key={i} value={el.clientName}>{el.clientName}</option>
                        )

                    })}

                    <option value={"client"}> Klient</option>
                </select>


                {/*{this.state.showInput ?*/}
                {/*    <div>*/}
                {/*        <input type="text" value={this.state.currentUserVal} />*/}
                {/*        <input type="submit" value={"wyslij"}/>*/}
                {/*    </div> : null}*/}


            </>
        )
    }
}

export default SelectOrTypeClient;