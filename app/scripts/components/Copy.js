import React from 'react';
import ParseReact from 'parse-react';

export default class Copy extends React.Component {
	constructor(props) {
	    super(props);
	}

	deleteCopy() {
		console.log('delete');
		console.log(this);
		ParseReact.Mutation.Set(this, {
			"level": 7
		}).dispatch()
	}

	render() {
		return (
			<div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3">
			    <div className="panel panel-default">
			        <div className="panel-body">
			            {this.props.content}
			        </div>
			        <div>
			        	<div>
			        		<button type="button" className="btn btn-default btn-xs">Copy to Clipboard</button>	
			        		<button type="button" className="btn btn-danger btn-xs" 
			        			onClick={this.deleteCopy.bind(this.props.obj)}>Delete</button>	
			        	</div>
			        </div>
			    </div>
			</div>
		);
	}
}

Copy.propTypes = { content: React.PropTypes.string };
Copy.defaultProps = { content: "Loading...", level:0 };