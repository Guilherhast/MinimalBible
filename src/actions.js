
// Defining auxiliary functions
// Event type
// "click"
// ".target-selector"

// Build verse data:

// Defining functions to copy
async function editClipboard(){
	const old = await navigator.clipboard.readText();

	const lines = old.split("\n");
	if (lines.length >= 2){
		lines.splice(0, 0, lines.at(-2), "");
		lines.splice(-2, 1);
	}

	await navigator.clipboard.writeText(lines.join("\n"));
}

function advancedCopy(){
	FalseClicker.safeClick('copy', copyButtonQuery);
	editClipboard();
}
