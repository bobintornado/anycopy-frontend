import { combineReducers } from 'redux';
import * as navTypes from "../constants/Nav"

var defaultS = {
	navState: navTypes.COPYS,
	searchText: ""
}

export default function App(state = {}, action) {
	console.log('this');
	switch (action.type) {
		case navTypes.NAV:
			return Object.assign({}, state, {
			      navState: action.navState
			    }); 
		case "search":
			return Object.assign({}, state, {
			      searchText: action.text
			    });
		case "copy":
			return Object.assign({}, state, {
			      object: action.object
			    });
		default:
			return defaultS;
	}
}