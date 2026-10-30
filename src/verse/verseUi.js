export class VerseUi { // Verse getter?
	static __query;

	static choose(types = [], reader = document){
		VerseUi.__query = types.find(t => reader.querySelector(t.interfaceQuery()));
		if (VerseUi.__query === undefined){
			const msg = "Could not find a matching interface";
			console.log(msg);
			throw new Error(msg);
		}
	}

	//Relative functions ( get from one element)
	static getSelectableWithUsfmChildren(element){
		return element.closest(VerseUi.__query.selectableWithUsfmChildren());
	}


	// General functions ( get from whole dom or reader )
	static getSelectableVerseContainersByUsfm(dataUsfm, reader = document){
		return [...reader.querySelectorAll(
			VerseUi.__query.selectableElementHavingDataUsfmChildrenQuery(dataUsfm)
		)];
	}

	static getSelectedUsfmList(reader = document){
		return reader.querySelectorAll(this.__query.insideSelectedWithAnyUsfm())
	}

	static getSpansWithContent(dataUsfm, reader = document){
		reader.querySelectorAll(this.__query.getSpansWithContent(dataUsfm));
	}

	static getTitleElement(reader = document){
		return document.querySelector(this.__query.titleQuery());
	}

	// Query functions
	static getSelectedClass(){
		return VerseUi.__query.selectedClass();
	}

}

export class VerseUi_old {
	static __isMultiline;
	static __selector
	static __retriever
	static __reader;

	static choose(reader = document){
		VerseUi.__reader = reader;
		VerseUi.__isMultiline = !reader.querySelector(`div[class$="_p"] > [data-usfm]`);
		consol.log(`Choosing interface ${VerseUi.__isMultiline ? "Multiline" : "SingleLine"}.`);
		VerseUi.__selector = VerseUi.__isMultiline ? VerseUi.__toggleMultiByUsfm : VerseUi.__toggleSingleByUsfm;
		VerseUi.__retriever = VerseUi.__isMultiline ? VerseUi.__getSeletedUsfmFromMulti : VerseUi.__getSeletedUsfmFromSingle;
	}


	// Toggle verse selection
	static toggleByUsfm(dataUsfm){
		VerseUi.__selector(dataUsfm);
	}

	static __toggleMultiByUsfm(dataUsfm){
		[...VerseUi.__reader.querySelectorAll(`div:has(>[data-usfm="${dataUsfm}"])`)]
			.slice(0, -1)
			.forEach(div => div.classList.toggle('selectedVerse'));
	}
	static __toggleSingleByUsfm(dataUsfm){
		[...VerseUi.__reader.querySelectorAll(`[data-usfm="${dataUsfm}"]`)]
			.forEach(div => div.classList.toggle('selectedVerse'));
	}

	// Return selected usfms
	static getSelectedUsfmList(){
		return [... new Set([...VerseUi.__retriever()].map(e => e.dataset.usfm))];
	}

	static __getSeletedUsfmFromSingle(){
		// TODO Add an nth-child to reduce processing
		return VerseUi.__reader.querySelectorAll(".selectedVerse[data-usfm]")
	}

	static __getSeletedUsfmFromMulti(){
		return VerseUi.__reader.querySelectorAll(".selectedVerse [data-usfm]")
	}


}
