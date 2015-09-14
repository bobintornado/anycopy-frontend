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
			"status": 7
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
		// subContent by first 100
		var subContent = this.props.content.length > 100 ? this.props.content.substring(0,100) + "...." : this.props.content
		return (
			<div className="grid-item">
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
		        	    {subContent}
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