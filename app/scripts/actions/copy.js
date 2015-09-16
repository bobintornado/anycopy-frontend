import Parse from 'parse'
import flatten from '../helpers/flatten'
import store from '../store/configureStore'

// for local store updating 

export function addNewCopy(copy) {
	return {
		type: "addNewCopy",
		copy: copy
	}
}

export function updateLocalCopy(title, content, index) {
	return {
		type: "updateLocalCopy",
		title: title,
		content: content,
		index: index
	}
}

export function updateCopy(title, content, index, object) {
	return dispatch => {
		var parseClass = Parse.Object.extend(object.id.className);
		var query = new Parse.Query(parseClass);
		return query.get(object.id.objectId).then(function(targetObj) {
			targetObj.set("title", title);
			targetObj.set("content", content);
			targetObj.save();
			dispatch(updateLocalCopy(title, content, index));
		})
	}
}

export function deleteLocalCopy(index) {
	return {
		type: "deleteLocalCopy",
		index: index
	}
}

export function deleteParseCopy(object, index) {
	return dispatch => {
		var parseClass = Parse.Object.extend(object.id.className);
		var query = new Parse.Query(parseClass);
		return query.get(object.id.objectId).then(function(targetObj) {
			targetObj.set("status", -7);
			targetObj.save();
			dispatch(deleteLocalCopy(index));
		})
	}
}


// fetch copys from server actions

export function addCopys(copys) {
	return {
		type: "addCopys",
		copys: copys
	}
}

export function fetchInitialCopys() {
	// fetch initial 100 notes
	return dispatch => {
		var query = (new Parse.Query('ParseNote')).equalTo('status', 1).descending("updatedAt").limit(100);
		return query.find(function(results) {
			dispatch(addCopys(results.map(flatten)))
		});
	}
}

export function startFetchingMoreCopysFromParse() {
	return {
		type: "startFetchingCopys"
	}
}

export function endFetchingCopysFromParse() {
	return {
		type: "endFetchingCopys"
	}
}

export function loadMoreCopysFromParse() {
	return dispatch => {
		// fetch more copys based on the updated time of last local copy
		var currentLocalCopys = store.getState().copys
		var lastLocalCopy = currentLocalCopys[currentLocalCopys.length - 1]
		console.log(lastLocalCopy.updatedAt);
		var query = (new Parse.Query('ParseNote')).equalTo('status', 1).descending("updatedAt").lessThan("updatedAt", lastLocalCopy.updatedAt).limit(100);
		return query.find(function(results) {
			console.log('load more copys from parse results');
			console.log(results);
			dispatch(addCopys(results.map(flatten)));
			console.log('end fetching more');
			dispatch(endFetchingCopysFromParse());
		})	
	}
}

// global state actions

export function enterAddCopyMode() {
	return {
		type: "enterAddCopyMode"
	}
}

export function editCopy(object, index) {
	return {
		type: "copy",
		object: object,
		index: index
	}
}