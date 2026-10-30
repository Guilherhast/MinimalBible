function deepClean(root = window, name = "none", replacement = () => {}){
	const regex = name instanceof RegExp ? name : new RegExp(name);
	const visited = new WeakSet();
	let count = 0;

	function isTraversable(value){
		return (
			value !== null &&
			(typeof value === "object" || typeof value === "function") &&
			!visited.has(value)
		);
	}

	function replaceFunction(target, key, descriptor){
		regex.lastIndex = 0;

		if (!regex.test(key) || typeof descriptor.value !== "function"){
			return;
		}

		try {
			Object.defineProperty(target, key, {
				...descriptor,
				value: replacement,
			});
			count++;
		} catch {
			// Skip properties that cannot be modified.
		}
	}

	function search(target){
		if (!isTraversable(target)) return;

		visited.add(target);

		let keys;

		try {
			keys = Object.getOwnPropertyNames(target);
		} catch {
			return;
		}

		for (const key of keys){
			let descriptor;

			try {
				descriptor = Object.getOwnPropertyDescriptor(target, key);
			} catch {
				continue;
			}

			if (!descriptor) continue;

			replaceFunction(target, key, descriptor);

			if ("value" in descriptor){
				search(descriptor.value);
			}
		}
	}

	search(root);
	return count;
}

