import * as types from "../constants/Nav"

export default function navTo(tab) {
	console.log('emit action');
	return {
		type: types.NAV,
		navState: tab
	}
}