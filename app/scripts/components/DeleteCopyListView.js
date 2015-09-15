import React from 'react';
import store from '../store/configureStore'
import { editCopy } from '../actions/copy'

export default class DeleteCopyListView extends React.Component {
	select() {
		store.dispatch(editCopy(this));
	}

	render() {
		var subContent = this.props.content.length > 40 ? this.props.content.substring(0,40) + "...." : this.props.content
		return (
			<div className="cell" onClick={this.select.bind(this.props.obj)} >
		    	{(() => {
		            if (this.props.obj.title) {
		              return (
		              	<div  >
		              		<h4>{this.props.obj.title}</h4>
		    			</div>);
		            }
		        })()}
	        	<div>
	        	    {subContent}
	        	</div>
			</div>
		);
	}
}

DeleteCopyListView.propTypes = { content: React.PropTypes.string };
DeleteCopyListView.defaultProps = { content: "Loading...", level:0 };