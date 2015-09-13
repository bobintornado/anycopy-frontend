import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import Copy from './Copy';

const ParseComponent = ParseReact.Component(React);

export default class CopyList extends ParseComponent {
	constructor() {
		super();
	}

	observe(props, state) {
		return {
			copys: (new Parse.Query('ParseNote')).equalTo('level', 1)
		};
	}

	render() {
		return (
			<div>
				{this.data.copys.map(function(c) {
		          return (
		          	<Copy key={c.id} content = {c.content} obj={c}/>
		          );
		        }, this)}
			</div>
		);
	}
}