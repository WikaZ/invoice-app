import React from 'react';

import Home from './home.jsx'
import Clients from './clients.jsx'
import Products from './products.jsx'
import Invoice from './invoice.jsx'
import MyInvoiceData from "./components/myData/myInvoiceData";
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <HashRouter>
                    <>
                        <nav>
                            <ul>
                                <Link to={"/"} className={"mainNav"}> Moje Dane</Link>
                                <Link to={"/moje_dane"} className={"mainNav"}> Strona główna</Link>
                                <Link to={"/klienci"} className={"mainNav"}>Moi klienci</Link>
                                <Link to={"/usługi"} className={"mainNav"}> Moje Usługi</Link>
                                <Link to={"/faktury"} className={"mainNav"}>Moje Faktury</Link>
                            </ul>
                        </nav>
                        <Switch>
                            <Route exact path='/' component={MyInvoiceData} />
                            <Route path='/moje_dane' component={Home}/>
                            <Route path='/klienci' component={Clients}/>
                            <Route path='/usługi' component={Products}/>
                            <Route path='/faktury' component={Invoice}/>
                        </Switch>
                    </>
                </HashRouter>
            </>
        )
    }
}


export default NavBar;