import React from 'react';
import CopyList from './CopyList';
import Bin from './Bin'
import CopyDetail from './CopyDetail.js'
import { connect } from 'react-redux';
import searchAction from '../actions/search'
import { loadMoreCopysFromParse, startFetchingMoreCopysFromParse } from '../actions/copy'
import store from '../store/configureStore'
import { Provider } from 'react-redux';

const contents = {
	"copys" : <Provider store={store}>
			    {() => <CopyList />}
			  </Provider>, 
	"bin": <Provider store={store}>
			    {() => <Bin />}
			</Provider>
}


function domNodeIsReachingEnd(scrollingNode) {
	// if less than 300 pixels, return reaching end
	return scrollingNode.scrollHeight - scrollingNode.scrollTop - scrollingNode.clientHeight < 300 ? true : false
}


class MainContent extends React.Component {
	constructor() {
		super();
	}

	search() {
		store.dispatch(searchAction(React.findDOMNode(this.refs.search).value));
	}

	// handle scrolling event and automatically load more
	handleScroll(event) {
		var node = React.findDOMNode(this.refs.copyList);
		if (domNodeIsReachingEnd(node) && !this.props.isFetchingMoreCopysFromParse) {
			// trigger load more event
			store.dispatch(startFetchingMoreCopysFromParse());
			store.dispatch(loadMoreCopysFromParse());
		}
	}

	render() {
		return ( 
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 main">
	            <div ref='copyList' className="col-xs-3 col-sm-3 col-md-3 col-lg-3 CopyList" onScroll={this.handleScroll.bind(this)}>
	            	<div className="search">
		                <input type="text" className="form-control" placeholder="Search" onChange={this.search.bind(this)}
		                	ref="search"/>
		            </div>
	            	{contents[this.props.navState]}	
	            </div>
	            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 rightCopyDetail">
	            	<CopyDetail />
	            </div>
	        </div>
        );
	}
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    navState: state.navState,
    isFetchingMoreCopysFromParse: state.isFetchingMoreCopysFromParse
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);