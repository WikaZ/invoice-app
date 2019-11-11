import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from "./nav";
import style from './scss/index.scss';


class App extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<>

				<NavBar/>
			</>
		)
	}
}





ReactDOM.render(<App/>, document.getElementById("root"));