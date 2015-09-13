import React from 'react';
import ParseReact from 'parse-react';
import store from '../store/configureStore'
import editCopy from '../actions/copy'

export default class Copy extends React.Component {
	constructor(props) {
	    super(props);
	}

	deleteCopy() {
		ParseReact.Mutation.Set(this, {
			"level": 7
		}).dispatch()
	}

	edit() {
		var editModal = $('#editModal')
		editModal.find('.modal-body input').val(this.title)
		editModal.find('.modal-body textarea').val(this.content)
		editModal.modal('toggle')
		store.dispatch(editCopy(this));
	}

	// with inline if for copy title
	render() {
		return (
			<div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3">
			    <div className="panel panel-default">
			    	{(() => {
			            if (this.props.obj.title) {
			              return (
			              	<div className="panel-heading" onClick={this.edit.bind(this.props.obj)} >
			              		{this.props.obj.title}
			    			</div>);
			            }
			        })()}
		        	<div className="panel-body" onClick={this.edit.bind(this.props.obj)}>
		        	    {this.props.content}
		        	</div>
		        	<div className="panel-footer">
		        		<button type="button" className="btn btn-danger btn-xs" 
		        			onClick={this.deleteCopy.bind(this.props.obj)}>Delete</button>	
		        	</div>
			    </div>
			</div>
		);
	}
}

Copy.propTypes = { content: React.PropTypes.string };
Copy.defaultProps = { content: "Loading...", level:0 };