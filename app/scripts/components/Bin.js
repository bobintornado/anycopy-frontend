import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';
import DeleteCopy from './DeleteCopy';

const ParseComponent = ParseReact.Component(React);

export default class Bin extends ParseComponent {
	constructor() {
		super();
	}

	observe(props, state) {
		return {
			copys: (new Parse.Query('ParseNote')).equalTo('status', 7).limit(1000).descending("updatedAt")
		};
	}

	componentDidUpdate() {
		var grid = document.querySelector('.grid');
		console.log(grid);
		var msnry = new Masonry( grid, {
		  itemSelector: '.grid-item',
		  gutter: 4
		});
	}

	render() {
		return (
			<div className="grid">
				{this.data.copys.map(function(c) {
		          return (
		          	<DeleteCopy key={c.id} content = {c.content} obj={c} />
		          );
		        }, this)}
			</div>
		);
	}
}