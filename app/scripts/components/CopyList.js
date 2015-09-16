import React from 'react';
import CopyListView from './CopyListView';
import { connect } from 'react-redux';

class CopyList extends React.Component {
	render() {
		return (
			<div className="copyList" >
				{this.props.copys.map(function(c,index) {
					if (c.title.indexOf(this.props.searchText) === -1 && c.content.indexOf(this.props.searchText) === -1) {
						return;
					} else {
						return (
							<CopyListView key={c.id} content = {c.content} obj={c} objIndex={index}/>
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
    searchText: state.searchText,
    copys: state.copys
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