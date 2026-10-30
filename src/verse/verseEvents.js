import {VerseData} from "./verseData";
import {VerseActions} from "./verseActions";
import {VerseUi} from "./verseUi";

export class VerseEvents{
	static toggleClickedVerse(event){
		const usfm = VerseData.getDataUsfm(event.target);

		console.log("Selecting: ");
		console.log(VerseUi.getSelectableVerseContainersByUsfm(usfm));
		console.log("Stoped here. It is selecting the chapter");

		VerseActions.toggleAllByUsfm(
			VerseUi.getSelectableVerseContainersByUsfm(usfm),
			VerseUi.getSelectedClass()
		);

	}
}
