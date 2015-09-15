import React from 'react';
import ParseReact from 'parse-react';
import Parse from 'parse';
import { connect } from 'react-redux';

class CopyDetail extends React.Component {
	constructor() {
		super();
		this.state = {
        	title: "",
        	content: ""
        }
	}

	save() {
		var title = React.findDOMNode(this.refs.title).value;
	    var content = React.findDOMNode(this.refs.content).value;
		ParseReact.Mutation.Set(this.props.object, {
			title: this.state.title,
			content: this.state.content
		}).dispatch()
	}

	deleteCopy() {
		ParseReact.Mutation.Set(this.props.object, {
			status: -7
		}).dispatch()
		this.setState({object: undefined});	
	}

	restore() {
		ParseReact.Mutation.Set(this.props.object, {
			status: 1
		}).dispatch()
		this.setState({object: undefined});		
	}

	componentWillReceiveProps(nextProps) {
		this.setState({title: nextProps.object.title, content: nextProps.object.content, object:nextProps.object});	
	}

	handleChange(event) {
		if (event.target.type == 'text') {
			this.setState({title: event.target.value});	
		} else {
			this.setState({content: event.target.value});	
		}
	}

	render() {
		var title = this.state.title
		return (
			<form className="heightVH100">
					{(() => {
				        if (this.state.object) {
				          return (
				          	<div>
				          		{(() => {
			          		        if (this.state.object.status == -7) {
			          		          	return (
							          		<div className="form-group action">
			          							<button type="button" className="btn btn-info btn-sm btn-action"
			          								onClick={this.restore.bind(this)}>Restore</button>
			          						</div>);
			          		        } else {
			          		        	return (
							          		<div className="form-group action">
								          		<button type="button" className="btn btn-info btn-sm btn-action"
								          			onClick={this.save.bind(this)}>Save</button>
								          		<button type="button" className="btn btn-danger btn-sm btn-action"
								          			style= {{float:"right"}}
			          								onClick={this.deleteCopy.bind(this)}>Delete</button>
			          						</div>);
			          		        }
				          		 })()}
          		          		<div className="form-group">
          							<label htmlFor="title" className="control-label"><h3>Title</h3></label>
          							<input type="text" className="form-control" id="title" ref="title" value={title} onChange={this.handleChange.bind(this)}/>
          						</div>
          						<div className="form-group">
          							<label htmlFor="Content" className="control-label"><h3>Content</h3></label>
          							<textarea className="form-control" id="CopyEditContent" ref="content" value={this.state.content} onChange={this.handleChange.bind(this)}></textarea>
          						</div>
							</div>);
				        } else {
				        	return (
				        		<div>
				        			<h1>
				        				 Please select a copy
				        			</h1>
				        		</div>
				        		);
				        }
				    })()}
			</form>
		);
	}
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    object: state.object
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CopyDetail);