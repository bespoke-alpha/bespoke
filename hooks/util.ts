type Predicate<A> = (input: A) => boolean;
export function findBy(...tests: Array<string | RegExp | Predicate<any>>) {
	const testFns = tests.map((test): Predicate<any> => {
		switch (typeof test) {
			case "string":
				return x => x.toString().includes(test);
			case "function":
				return x => test(x);
			default: // assume regex
				return x => test.test(x.toString());
		}
	});
	const testFn = (x: any) => testFns.map(t => t(x)).every(Boolean);
	return <A>(xs: A[]) => xs.find(testFn);
}

export const readFile = (path: string) => fetch(path).then(res => res.text());
export const readJSON = (path: string) => fetch(path).then(res => res.json());

export const findMatchingPos = (str: string, start: number, direction: 1 | -1, pair: [string, string], scopes: number) => {
	let l = scopes;
	let i = start + direction;

	while (l > 0) {
		const c = str[i];
		i += direction;
		if (c === pair[0]) l++;
		else if (c === pair[1]) l--;
	}

	return i;
};

export const matchLast = (str: string, pattern: RegExp) => {
	const matches = str.matchAll(pattern);
	return Array.from(matches).at(-1)!;
};

export const visited = new Map();
export const type = (obj, access: string): string => {
	if (typeof obj?.then === "function") return "Promise<any>";
	if (obj instanceof Map) return "Map<any,any>";
	if (obj instanceof Set) return "Set<any>";
	if (obj instanceof Uint8Array) return "Uint8Array";
	if (obj instanceof HTMLElement) return "HTMLElement";
	if (obj instanceof Element) return "Element";

	const wrapVisited = obj => {
		const typeRef = visited.get(obj);
		if (typeRef) return typeRef;
		visited.set(obj, access);
	};

	switch (typeof obj) {
		case "function": {
			const cached = wrapVisited(obj);
			if (cached) return cached;
			const s = obj.toString();
			const matches = s.match(/^[\w ]*\((.*?\))/);
			if (!matches) return "(a)=>any";
			const params = matches[1];
			let count = 0;
			let levels = 0;
			for (const c of params) {
				switch (c) {
					case "{":
						levels++;
						break;
					case "}":
						levels--;
						break;
					case ",":
						if (levels === 0) count++;
						break;
				}
			}
			if (count === 0) {
				let ret = "any";
				try {
					ret = type(obj(), `ReturnType<${access}>`);
				} catch (_) {}
				return `()=>${ret}`;
			}
			const identifiers = "abcdefghijklmnopqrstuvwzyz_$".split("");
			return `(${identifiers.slice(0, count).join(",")})=>any`;
		}
		case "object": {
			if (obj === null) return "null";
			const p = Object.getPrototypeOf(obj);
			let cached: string;
			if (p !== Object.prototype && p.constructor) {
				cached = wrapVisited(p);
			} else {
				cached = wrapVisited(obj);
			}
			if (cached) return cached;
			if (Array.isArray(obj)) {
				const types = obj.map((e, i) => type(e, `${access}[${i}]`));
				const uniqueTypes = Object.values(Object.groupBy(types, t => t)).map(v => v[0]);
				return `Array<${uniqueTypes.sort().join("|")}>`;
			}

			let prototype = obj;
			const keys = [];
			while (prototype !== Object.prototype) {
				keys.push(...Object.getOwnPropertyNames(prototype));
				prototype = Object.getPrototypeOf(prototype);
			}
			const uniqueKeys = Array.from(new Set(keys));
			const blacklist = ["constructor"];
			return `{${uniqueKeys
				.filter(k => !blacklist.includes(k))
				.sort()
				.map(k => `"${k}":${type(obj[k], `${access}["${k}"]`)}`)
				.join(";")}}`;
		}
		default:
			return typeof obj;
	}
};
