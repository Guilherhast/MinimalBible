import {Range} from "./range";
import {VerseUi} from "./verseUi";

export class VerseData {

	static getDataUsfm(element){
		return VerseUi.getSelectableWithUsfmChildren(element).dataset.usfm;
	}

	static buildVerseData(dataUsfm, reader = document){
		//ISA.63.1
		/*
		const selector = `span[class$='verse'][data-usfm="${dataUsfm}"]`;
		const spanWithContent = [...document.querySelectorAll(selector)];
		*/
		const spanWithContentList = VerseUi.getSpansWithContent(dataUsfm, reader);
		console.log("Spans with contents");
		console.log(spanWithContentList);

		const label = `[${spanWithContentList[0].querySelector('[class$=label]').innerHTML}]`;
		const innerData = spanWithContentList
			.map(
				e => e.querySelector('[class$="content"').innerHTML)
			.join("").trim();
		return [label, innerData].join(" ");

	}

	static getSelectedData(){

		const allUsfmElements = VerseUi.getSelectedUsfmList();

		// Do nothing if there is no data
		if (!allUsfmElements.length) return '';


		const allUsfm = [...new Set([...allUsfmElements].map(el => el.dataset.usfm))];

		const verseNumbers = [];
		const versesContents = [];

		// Interact and proccess numbers
		allUsfm.forEach(usfm => {
			verseNumbers.push(usfm.split('.').at(-1));
			versesContents.push(VerseData.buildVerseData(usfm));
		});

		const rangeStr = Range.fromArray(verseNumbers);
		const chapter = VerseUi.getTitleElement().innerHTML;

		// Return calculated data
		return `${chapter}:${rangeStr}\n${versesContents.join("")}\n${window.location.href}?range=${rangeStr}`;
	}

}
