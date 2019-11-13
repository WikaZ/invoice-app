import React from 'react';
import ReactDOM from 'react-dom';
import ClientsList from "./components/clients/clientsList";

class Clients extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return(
           <ClientsList/>
        )
    }
}

export default Clients;