export class UIType {
	titleQuery = ()=>"h1";
	
	/**
	* @method constructor
	* @param {string|Function} interfaceQuery - Query for element whose existence confirms the interface has all other queries
	* @param {string|Function} selectedClass - Class to add to selected elements
	* @param {string|Function} selectableWithUsfm - Selectable div containing elements with usfm
	* @param {string|Function} selectableHavingCurrentUsfmChildrenQuery - Query to get all selectable containers which will be marked when selecting a verse
	* @param {string|Function} spanWithContentQuery - Query to get all span elements with verse content (label, text)
	* @param {string|Function} insideSelectedWithAnyUsfm - Query to elements having any usfm and inside a selected div
	* @param {string|Function} queryToElementContainingNumberOfVerseByUsfm - Query to get the label of each verse using usfm
	* @param {string|Function} queryToElementContainingContentOfVerseByUsfm - Query to get the content of all elements by usfm
	*/
	constructor(
		interfaceQuery,
		selectedClass,
		selectableWithUsfm,
		selectableHavingCurrentUsfmChildrenQuery,
		spanWithContentQuery,
		insideSelectedWithAnyUsfm,
		queryToElementContainingNumberOfVerseByUsfm,
		queryToElementContainingContentOfVerseByUsfm
	){
		const toFunc = (arg) => (typeof arg === 'function' ? arg : () => arg);

		this.interfaceQuery = toFunc(interfaceQuery);
		this.selectedClass = toFunc(selectedClass);
		this.selectableWithUsfmChildren = toFunc(selectableWithUsfm);
		this.selectableElementHavingDataUsfmChildrenQuery = toFunc(selectableHavingCurrentUsfmChildrenQuery);
		this.spanWithContentQuery = toFunc(spanWithContentQuery);
		this.insideSelectedWithAnyUsfm = toFunc(insideSelectedWithAnyUsfm);
		this.labelEl = toFunc(queryToElementContainingNumberOfVerseByUsfm);
		this.contentEl = toFunc(queryToElementContainingContentOfVerseByUsfm);

		console.log("Ui type created");
		console.log(this);
	}
}

