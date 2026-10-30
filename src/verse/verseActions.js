import { VerseUi } from "./verseUi";

export class VerseActions {

	static toggleAllByUsfm(elements, className){
		elements.forEach(div=>div.classList.toggle(className));

	}

	static unselectAllByUsfm(elements, className){
		elements.forEach(div=>div.classList.remove(className));
	}
}

