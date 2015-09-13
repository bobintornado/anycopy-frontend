import { combineReducers } from 'redux';
import * as navTypes from "../constants/Nav"

var defaultS = {
	navState: navTypes.COPYS 
}

function navState(state = {}, action) {
	switch (action.type) {
		case navTypes.NAV:
			return Object.assign({}, state, {
			      navState: action.navState
			    }); 
		default:
			return defaultS;
	}
}

export default navState