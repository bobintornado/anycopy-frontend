import Parse from 'parse'
import flatten from '../helpers/flatten'

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

export function updateCopy(title, content, index, object){
	return dispatch => {
		var parseClass = Parse.Object.extend(object.id.className);
		var query = new Parse.Query(parseClass);
		return query.get(object.id.objectId).then(function (targetObj) {
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

export function deleteParseCopy(object,index){
	return dispatch => {
		var parseClass = Parse.Object.extend(object.id.className);
		var query = new Parse.Query(parseClass);
		return query.get(object.id.objectId).then(function (targetObj) {
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

export function fetchAllCopys() {
	return dispatch => {
		return (new Parse.Query('ParseNote')).equalTo('status', 1).count(function function_name(number) {
			var times = number / 1000;
			times = Math.ceil(number / 1000);
			for (var index = 0; index < times; index++) {
				var query = (new Parse.Query('ParseNote')).equalTo('status', 1).limit(1000).descending("updatedAt").skip(1000 * index)
				query.find(function(results) {
					dispatch(addCopys(results.map(flatten)))
				})
			}
		});
	};
}

// global state actions

export function enterAddCopyMode() {
	return {
		type: "enterAddCopyMode"
	}
}

export function editCopy(object,index) {
	return {
		type: "copy",
		object: object,
		index: index
	}
}