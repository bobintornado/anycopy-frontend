import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import Copy from './Copy';
import { connect } from 'react-redux';

const ParseComponent = ParseReact.Component(React);

class CopyList extends ParseComponent {
	constructor() {
		super();
	}

	observe(props, state) {
		return {
			copys: (new Parse.Query('ParseNote')).equalTo('level', 1).descending("updatedAt")
		};
	}

	render() {
		return (
			<div>
				<div>{this.props.filterText}</div>
				{this.data.copys.map(function(c) {
					if (c.title.indexOf(this.props.searchText) === -1 || c.content.indexOf(this.props.searchText) === -1) {
						return;
					} else {
						return (
							<Copy key={c.id} content = {c.content} obj={c}/>
						);		
					}
		          
		        }, this)}
			</div>
		);
	}
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    searchText: state.searchText
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CopyList);