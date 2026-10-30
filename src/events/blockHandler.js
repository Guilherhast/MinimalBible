export function blockHandler(eventType, selector, newHandler=(event)=>console.log(`Event blocked in ${event.target}`)){
	document.addEventListener(
		eventType,
		(event) => {
			const target = event.target.closest(selector);

			if (!target) return;

			event.preventDefault();
			event.stopImmediatePropagation();

			// Your replacement behavior
			newHandler(event);
		},
		true
	);
}
