import React from 'react';
import ParseReact from 'parse-react';
import Parse from 'parse';
import { connect } from 'react-redux';

class CopyEditModal extends React.Component {
	save() {
		var title = React.findDOMNode(this.refs.title).value;
	    var content = React.findDOMNode(this.refs.content).value;
		ParseReact.Mutation.Set(this.props.object, {
			title: title,
			content: content
		}).dispatch()
		$('#editModal').modal('toggle')
	}

	render() {
		return (
			<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title" id="editModalLabel">Edit</h4>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="title" className="control-label">Title:</label>
									<input type="text" className="form-control" id="title" ref="title"/>
								</div>
								<div className="form-group">
									<label htmlFor="Content" className="control-label">Content:</label>
									<textarea className="form-control" id="Content" ref="content"></textarea>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" onClick={this.save.bind(this)}>Save</button>
						</div>
					</div>
				</div>
			</div>
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
)(CopyEditModal);