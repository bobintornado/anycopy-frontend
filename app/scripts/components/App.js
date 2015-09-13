import React from 'react';
import LeftNavBar from './LeftNavBar';
import MainContent from './MainContent';
import CopyEditModal from './CopyEditModal';
import Parse from 'parse'

Parse.initialize('Qe5rFk8qdUYnTURwyqIuEIRPFXonnFGujWpASGuM', 'WHhs8MnVrfNQLtXPyYQUXLJ6tMPtLg1xOX6ShJLR');

export default class App extends React.Component {
	render() {
		return ( 
			<div className="container-fluid">
            	<LeftNavBar />
            	<MainContent />
            	<CopyEditModal />
            </div>
        );
	}
}