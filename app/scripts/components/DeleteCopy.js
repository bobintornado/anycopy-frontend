import React from 'react';
import ParseReact from 'parse-react';

export default class DeleteCopy extends React.Component {
	restoreCopy() {
		ParseReact.Mutation.Set(this, {
			"status": 1
		}).dispatch()
	}

	render() {
		// subContent by first 100
		var subContent = this.props.content.length > 100 ? this.props.content.substring(0,100) + "...." : this.props.content
		return (
			<div className="grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3">
			    <div className="panel panel-default">
		        	<div className="panel-body">
		        	    {subContent}
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