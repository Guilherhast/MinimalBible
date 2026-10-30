function logMethods(root = window, name = "none"){
	const regex = name instanceof RegExp
		? name
		: new RegExp(name);

	const visited = new WeakSet();
	const queue = [{value: root, path: []}];
	const results = [];

	while (queue.length){
		const {value, path} = queue.shift();

		if (
			value === null ||
			(typeof value !== "object" && typeof value !== "function") ||
			visited.has(value)
		){
			continue;
		}

		visited.add(value);

		let keys;

		try {
			keys = Object.getOwnPropertyNames(value);
		} catch {
			continue;
		}

		for (const key of keys){
			let descriptor;

			try {
				descriptor = Object.getOwnPropertyDescriptor(value, key);
			} catch {
				continue;
			}

			if (!descriptor || !("value" in descriptor)){
				continue;
			}

			const child = descriptor.value;
			const childPath = [...path, key];

			regex.lastIndex = 0;

			if (
				typeof child === "function" &&
				regex.test(key)
			){
				results.push({
					name: key,
					path: childPath,
					access: childPath.reduce(
						(expr, part) =>
							`${expr}[${JSON.stringify(part)}]`,
						"root"
					),
					fn: child,
				});
			}

			if (
				child !== null &&
				(typeof child === "object" ||
					typeof child === "function") &&
				!visited.has(child)
			){
				queue.push({
					value: child,
					path: childPath,
				});
			}
		}
	}

	return results;
}
