import React, { Component } from 'react';
import "./App.css"; 
import Formulaire from "./Formulaire";

class App extends Component {

	state = {
    	fields: {}
  	};
 
	onSubmit = fields => {

		this.setState({ fields });
	};

	render() {
		return (
			<div className="App">
				<Formulaire onSubmit={ fields => this.onSubmit(fields) } />
				<p>{ JSON.stringify(this.state.fields, null, 2) }</p>
			</div>
		);
	}
}

export default App