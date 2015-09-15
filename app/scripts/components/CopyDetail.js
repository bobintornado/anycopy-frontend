import React from 'react';
import ParseReact from 'parse-react';
import Parse from 'parse';
import { connect } from 'react-redux';
import store from '../store/configureStore'
import { addNewCopy, updateCopy, deleteParseCopy } from '../actions/copy'
import flatten from '../helpers/flatten'

class CopyDetail extends React.Component {
	constructor() {
		super();
		this.state = {
        	title: "",
        	content: ""
        }
	}

	create() {
		var title = React.findDOMNode(this.refs.title).value;
	    var content = React.findDOMNode(this.refs.content).value;
	    title = title == "" ? content.substring(0,20) : title
		var p = ParseReact.Mutation.Create("ParseNote", {
			title: title,
			content: content,
			status: 1,
			ACL: new Parse.ACL(Parse.User.current())
		}).dispatch();
		// don't do optimistic updated yet
		p.then(function(newCopy) {
			store.dispatch(addNewCopy(flatten(newCopy)))
		});
		this.setState({
			object: false
		}); 
	}

	save() {
		var title = React.findDOMNode(this.refs.title).value;
	    var content = React.findDOMNode(this.refs.content).value;
		store.dispatch(updateCopy(title, content, this.props.index, this.props.object))
	}

	deleteCopy() {
		store.dispatch(deleteParseCopy(this.props.object, this.props.index));
		this.setState({object: undefined});	
	}

	restore() {
		ParseReact.Mutation.Set(this.props.object, {
			status: 1
		}).dispatch()
		this.setState({object: undefined});		
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.enterAddCopyMode) {
			this.setState({title: "", content: "", object:true });	
		} else {
			this.setState({title: nextProps.object.title, content: nextProps.object.content, object:nextProps.object });	
		}
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
				          			if (this.props.enterAddCopyMode) {
				          				return (
							          		<div className="form-group action">
			          							<button type="button" className="btn btn-primary btn-sm btn-action"
			          								onClick={this.create.bind(this)}>Create</button>
			          						</div>);
				          			} else if (this.state.object.status == -7) {
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
          							<input type="text" className="form-control" id="title" ref="title" value={this.state.title} onChange={this.handleChange.bind(this)}/>
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
    object: state.object,
    index: state.index,
    enterAddCopyMode: state.enterAddCopyMode
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