import React from 'react';

import Home from './home.jsx'
import Clients from './clients.jsx'
import Products from './products.jsx'
import Invoice from './invoice.jsx'
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
        this.state = {}
    }

    render() {
        return (
            <>
                <HashRouter>
                    <>
                        <nav className={"o"}>
                            <ul>
                                <Link to={"/"}> Strona główna</Link>
                                <Link to={"/klienci"}>Moi klienci</Link>
                                <Link to={"/usługi"}> Moje Usługi</Link>
                                <Link to={"/faktury"}>Moje Faktury</Link>
                            </ul>
                        </nav>
                        <Switch>
                            <Route exact path='/' component={Home}/>
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