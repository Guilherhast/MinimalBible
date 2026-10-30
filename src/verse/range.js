export class Range{
	constructor(first){
		this.last = first;
		this.str = first+'';
		this.chain=false;
	}

	// Static functions
	static fromArray(arr){
		if(!arr) return '';
		const sorted = [... new Set(arr)].map(v=>parseInt(v)).sort();
		const range = new Range(arr.shift());
		arr.forEach(el=>range.add(el));
		return range.finish();
	}

	// Instance functions
	add(item){
		if(this.last+1 == item) this.keepRange();
		else this.startRange(item);
		this.last=item;
	}

	keepRange(){
		if(!this.chain){
			this.chain = true;
			this.str+='-';
		}
	}

	startRange(item){
		if(this.chain){
			this.chain = false;
			this.str += '' + this.last;
		}
		this.str+=','+item;
	}

	finish(){
		if(this.chain) this.str += '' + this.last;
		return this.str;
	}


}
