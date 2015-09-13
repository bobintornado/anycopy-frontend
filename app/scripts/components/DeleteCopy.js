import React from 'react';
import ParseReact from 'parse-react';

export default class DeleteCopy extends React.Component {
	restoreCopy() {
		ParseReact.Mutation.Set(this, {
			"level": 1
		}).dispatch()
	}

	render() {
		return (
			<div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3">
			    <div className="panel panel-default">
		        	<div className="panel-body">
		        	    {this.props.content}
		        	</div>
		        	<div className="panel-footer">
		        		<button type="button" className="btn btn-default btn-xs"
		        			onClick={this.restoreCopy.bind(this.props.obj)} > 
		        			Restore </button>
		        	</div>
			    </div>
			</div>
		);
	}
}