import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from "./nav";
// import 'bootstrap/dist/css/bootstrap.min.css';

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





ReactDOM.render(<App/>, document.getElementById("root"))