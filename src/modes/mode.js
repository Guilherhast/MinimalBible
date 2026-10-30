export class Mode {
	constructor(name, handler, start = () => {}, end = () => {}){
		this.name = name;
		this.handler = handler;
		this.start = start;
		this.end = end;
	}

	handle(e){
		this.handler.handle(e);
	}
}
