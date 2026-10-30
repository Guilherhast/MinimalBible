export class Handler {
	static skip = () => {};
	static keyMaps;

	constructor(entries){
		//TODO: Add last to facilitate call to last action
		this.__skipEmptyFromList(entries, ['preHandler', 'postHandler', 'default']);
		Handler.keyMaps = new Map(Object.entries(entries));
	}

	handle(event){
		this.__fire('preHandler', event);
		if (Handler.keyMaps.has(event.key)) (this.__fire(event.key, event));
		else this.__fire('default'); // else could be ommited
		this.__fire('postHandler', event);
	}

	__fire(key, event){
		console.log(this);
		(Handler.keyMaps.get(key))(event);
	}

	__skipEmptyFromList(obj, list){
		list.forEach(k => this.__skipEmpty(obj, k));
	}

	__skipEmpty(obj, key){
		if(!Object.hasOwn(obj, key))
			obj[key] = Handler.skip;
	}

}
