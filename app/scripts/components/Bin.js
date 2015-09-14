import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import DeleteCopyListView from './DeleteCopyListView'

const ParseComponent = ParseReact.Component(React);

export default class Bin extends ParseComponent {
	constructor() {
		super();
	}

	observe(props, state) {
		return {
			copys: (new Parse.Query('ParseNote')).equalTo('status', -7).limit(1000).descending("updatedAt")
		};
	}

	render() {
		console.log('render bin');
		return (
			<div>
				{this.data.copys.map(function(c) {
					return (
						<DeleteCopyListView key={c.id} content={c.content} tilte={c.title} obj={c} />
					);
		        }, this)}
			</div>
		);
	}
}