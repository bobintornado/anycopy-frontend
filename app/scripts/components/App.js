import React from 'react';
import LeftNavBar from './LeftNavBar';
import MainContent from './MainContent';
import Parse from 'parse'
import { fetchInitialCopys } from '../actions/copy'
import store from '../store/configureStore'

Parse.initialize('Qe5rFk8qdUYnTURwyqIuEIRPFXonnFGujWpASGuM', 'WHhs8MnVrfNQLtXPyYQUXLJ6tMPtLg1xOX6ShJLR');

export default class App extends React.Component {
	constructor() {
		super();
		store.dispatch(fetchInitialCopys());
	}

	render() {
		return ( 
			<div className="container-fluid">
            	<LeftNavBar />
            	<MainContent />
            </div>
        );
	}
}