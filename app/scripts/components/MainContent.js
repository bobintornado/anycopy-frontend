import React from 'react';
import CopyList from './CopyList';
import Bin from './Bin'
import { connect } from 'react-redux';
import searchAction from '../actions/search'
import store from '../store/configureStore'
import { Provider } from 'react-redux';

const contents = {
	"copys" : <Provider store={store}>
			    {() => <CopyList />}
			  </Provider>, 
	"bin": <Bin />
}

class MainContent extends React.Component {
	constructor() {
		super();
	}

	search() {
		store.dispatch(searchAction(React.findDOMNode(this.refs.search).value));
	}

	render() {
		return ( 
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 main">
	            <div className="search">
	                <input type="text" className="form-control" placeholder="Search" onChange={this.search.bind(this)}
	                	ref="search"/>
	            </div>
	            {contents[this.props.navState]}
	        </div>
        );
	}
}

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    navState: state.navState
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