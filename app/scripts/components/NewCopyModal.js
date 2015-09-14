import React from 'react';
import ParseReact from 'parse-react';
import Parse from 'parse';

export default class NewCopyModal extends React.Component {
	create() {
		var title = React.findDOMNode(this.refs.title).value;
	    var content = React.findDOMNode(this.refs.content).value;
		ParseReact.Mutation.Create("ParseNote", {
			title: title,
			content: content,
			status: 1,
			ACL: new Parse.ACL(Parse.User.current())
		}).dispatch()
		$('#myModal').modal('toggle')
	}

	render() {
		return (
			<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title" id="myModalLabel">Create New Copy</h4>
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
							<button type="button" className="btn btn-primary" onClick={this.create.bind(this)}>Create</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}