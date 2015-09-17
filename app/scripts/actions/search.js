import Parse from 'parse'
import flatten from '../helpers/flatten'
import store from '../store/configureStore'

export function search(text) {
	return {
		type: "search",
		text: text
	}
}

export function addNewSearchResults(results) {
	return {
		type: "addNewSearchResults",
		results: results
	}
}

export function addMoreSearchResults(results) {
	return {
		type: "addMoreSearchResults",
		results: results
	}
}

export function searchFromParse (text) {
	return dispatch => {
		var status = 1;
		if (store.getState().navState !== 'copys') {
			status = -7;
		}
		var queryTitle = (new Parse.Query('ParseNote')).contains("title", text)
		var queryContent = (new Parse.Query('ParseNote')).contains("content", text)
		var mainQuery = Parse.Query.or(queryTitle, queryContent).equalTo('status', status).descending("updatedAt").limit(25)
		return mainQuery.find(function(results) {
			dispatch(addNewSearchResults(results.map(flatten)))
		});
	}
}

export function noMoreCopysFromParse() {
	return {
		type: "noMoreCopysFromParse"
	}
}

// test later
export function loadMoreSearchFromParse(text) {
	return dispatch => {
		var status = 1;
		if (store.getState().navState !== 'copys') {
			status = -7;
		}
		// fetch more copys based on the updated time of last local copy
		var currentLocalCopys = store.getState().searchResults
		var lastLocalCopy = currentLocalCopys[currentLocalCopys.length - 1]

		var queryTitle = (new Parse.Query('ParseNote')).contains("title", text)
		var queryContent = (new Parse.Query('ParseNote')).contains("content", text)
		var mainQuery = Parse.Query.or(queryTitle, queryContent).equalTo('status', status).descending("updatedAt").lessThan("updatedAt", lastLocalCopy.updatedAt).limit(25)

		return mainQuery.find(function(results) {
			if (results.length > 0) {
				dispatch(addMoreSearchResults(results.map(flatten)));
				dispatch(endFetchingCopysFromParse());
			} else {
				dispatch(noMoreCopysFromParse())
			}
		})	
	}
}

export function endFetchingCopysFromParse() {
	return {
		type: "endFetchingCopys"
	}
}