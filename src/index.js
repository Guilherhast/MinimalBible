// Importing necessary modules
import { Mode, ModeManager,} from "./modes";
import { Handler, FalseClicker, blockHandler,} from "./events";
import {UIType, VerseEvents, VerseUi, VerseData} from "./verse";

// Defining queries for used elements
const copyButtonQuery = `[data-testid="chapter-content"]>div>div:nth-child(2)>div>div>div:nth-child(2)`;
const closeButtonQuery = `[data-testid="chapter-content"]>div>div:nth-child(2)>div>div>button`;
const chapterQuery = "[class$='chapter']";

// Cofigure for specific interfaces
const clsEnd = s=>`[class$="${s}"]`;
//const gUsfm = u=>`[data-usfm${u?('="'+u+'"'):''}]`;
const changeVerse = (v,op)=>{
	if(!v || v === "") return "";
	const arr = v.split('.');
	arr[arr.length - 1] = op(parseInt(arr[arr.length-1]));
	return arr.join(".");
}

const lastUsfm = u=>{
	return changeVerse(u, i=>i-1);
}
const nextUsfm = u=>{
	return changeVerse(u, i=>i+1);
}

const gUsfm = u=>`[data-usfm${u?(`="${u}"`):''}]`;

const selectedClss = 'selectedVerse'; // Prefix for selected verses

//const selector = `span[class$='verse'][data-usfm="${dataUsfm}"]`;

// Verse in multiple lines
const multiLine = new UIType(
	// Check if element exists
	`div${clsEnd("_chapter")} > div${clsEnd("_q1")} > span${gUsfm()}`,
	// Query to add to selected items
	`${selectedClss}`,
	// Query to closest that has data-usfm
	`${gUsfm()}`,
	// Query to get selectable elements by usfm
	//u=>`div:has(>${gUsfm(u)})`,
	//u=>`div:not(:has(${gUsfm()}:not(${gUsfm(u)}))):has(${gUsfm(u)}])`,
	//u=>`div:has(${gUsfm(u)}):not(:has(${gUsfm()}):not(${gUsfm(u)}))`,
	//u=>`div:has(>${gUsfm(u)}):not(:has(>${gUsfm()}:not(${gUsfm(u)})))`,
	u=>`div:has(>${gUsfm(u)}):not(:has(>${gUsfm(nextUsfm(u))}):not(${clsEnd("chapter")}))`, // And after this I called it a day!
	u=>`span${clsEnd("verse")}${gUsfm(u)}`,
	`div.${selectedClss}>${gUsfm()}:nth-child(2)`,
	"",
	"",
	""
);

VerseUi.choose([
	multiLine
]);


// Erasing default verse click handler
blockHandler("click", chapterQuery, e=>VerseEvents.toggleClickedVerse(e));

// Defining modes

const globalMode = new Mode(
	"global",
	new Handler({
		'preHandler': (e)=> console.log(`Handling key '${e.key}'.`),
		'a': (e) => ModeManager.setMode('actions'),
		//'c': () => ModeManager.setMode('choose'),
	}),
	function (){console.log(`Entering ${this.name} mode`)},
	function (){console.log(`Exiting ${this.name} mode`)},
);


const actionsMode = new Mode(
	"actions",
	new Handler({
		'preHandler': (e)=> console.log(`Handling action '${e.key}'.`),
		'a': (e) => advancedCopy(),
		'c': (e) => advancedCopy(),
		'x': (e) => FalseClicker.safeClick('close', closeButtonQuery),
		'postHandler': (e) => ModeManager.setMode('global'),
	}),
	function (){console.log(`Entering ${this.name} mode`)},
	function (){console.log(`Exiting ${this.name} mode`)},
);

// Activate mode manager
const modeList = [globalMode, actionsMode];

const shouldApplyAction = (e) => {
	const target = e.target;
	return !(target instanceof HTMLInputElement ||
		target instanceof HTMLTextAreaElement ||
		target instanceof HTMLSelectElement ||
		target.isContentEditable);
}

ModeManager.activate("global", modeList, shouldApplyAction);

// Defining user accessible debug functions
window.gsd = function (){ return VerseData.getSelectedData() }
