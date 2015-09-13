import React from 'react';

export default class DeleteCopy extends React.Component {
	render() {
		return (
			<div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3">
			    <div className="panel panel-default">
			        <div className="panel-body">
			            {this.props.content}
			        </div>
			        <div>
			        	<div>
			        		<button type="button" className="btn btn-default btn-xs"> Restore </button>
			        		<button type="button" className="btn btn-default btn-xs"> Copy to Clipboard </button>	
			        		<button type="button" className="btn btn-danger btn-xs"> Delete Forever </button>	
			        	</div>
			        </div>
			    </div>
			</div>
		);
	}
}
