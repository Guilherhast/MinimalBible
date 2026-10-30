export class FalseClicker {
	static elementMap = new Map();

	static add(key, query){
		const obj = document.querySelector(query);
		if (!obj) console.error(`No element matches the query ${query}`);
		if (this.elementMap.has(key))
			console.warn(`Overwriting ${key} with ${query}`);
		this.elementMap.set(key, document.querySelector(query));
	}

	static addList(list){
		list.forEach(o => this.add(o.key, o.query));
	}

	static safeClick(key, query){
		if (query && !this.elementMap.has(key)) this.add(key, query);
		this.click(key);
	}

	static click(key, query){
		this.elementMap.get(key).click();
	}
}
