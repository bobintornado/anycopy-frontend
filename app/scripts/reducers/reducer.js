import { combineReducers } from 'redux';
import * as navTypes from "../constants/Nav"

var defaultS = {
	navState: navTypes.COPYS,
	searchText: "",
	copys: [],
	enterAddCopyMode: false,
	isFetchingMoreCopysFromParse: false,
	noMoreCopysFromParse: false
}

export default function App(state = {}, action) {
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
			      object: action.object,
			      index: action.index,
			      enterAddCopyMode: false
			    });
		case "enterAddCopyMode":
			return Object.assign({}, state, {
			      enterAddCopyMode: true
			    });	
		case "addCopys":
			return Object.assign({}, state, {
				copys: [...state.copys, ...action.copys]
			});
		case "addNewCopy":
			return Object.assign({}, state, {
				copys: [ action.copy, ...state.copys]
			});
		case "updateLocalCopy": 
			return Object.assign({}, state, {
				copys: [
					...state.copys.slice(0, action.index),
					Object.assign({}, state.copys[action.index], {
						title: action.title,
						content: action.content
			      	}),
				    ...state.copys.slice(action.index + 1)
				]
			});
		case "deleteLocalCopy": 
			return Object.assign({}, state, {
				copys: [
					...state.copys.slice(0, action.index),
				    ...state.copys.slice(action.index + 1)
				]
			});
		case "startFetchingCopys": 
			return Object.assign({}, state, {
			      isFetchingMoreCopysFromParse: true
			    });
		case "endFetchingCopys": 
			return Object.assign({}, state, {
			      isFetchingMoreCopysFromParse: false
			    });	
		case "noMoreCopysFromParse": 
			return Object.assign({}, state, {
					isFetchingMoreCopysFromParse: false,
			    	noMoreCopysFromParse: true
			    });
		default:
			return defaultS;
	}
}