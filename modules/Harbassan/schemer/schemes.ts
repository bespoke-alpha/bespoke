// TODO: edit these keys
const def_fields = {
	text: "#ffffff",
	subtext: "#a7a7a7",
	base: "#000000",
	main: "#121212",
	main_elevated: "#242424",
	highlight: "#1a1a1a",
	highlight_elevated: "#2a2a2a",
	card: "#292929",
	button: "#1ed760",
	button_active: "#1ed760",
	notification: "#3d91f4",
	tab: "#b3b3b3",
	tab_active: "#ffffff",
	playbar: "#ffffff",
	playbar_active: "#1ed760",
};

// types
type SchemeFields = typeof def_fields & { [key: string]: string };
type Scheme = { name: string; local: boolean; fields: SchemeFields };
type PartialScheme = { name: string; fields: Partial<SchemeFields> };
type Schemes = Scheme[];

// store
let local_schemes: Schemes = JSON.parse(localStorage.getItem("schemes") || "[]");
const static_schemes: Schemes = [{ name: "Spotify • default", local: false, fields: def_fields }];
let curr_scheme: Scheme = JSON.parse(localStorage.getItem("curr_scheme") || "null") || static_schemes[0];

const stylesheet = document.createElement("style");
document.head.appendChild(stylesheet);

// main
function get_schemes() {
	return [...local_schemes, ...static_schemes];
}
function get_scheme(name: string) {
	if (name === "def") return static_schemes[0];
	return get_schemes().find(scheme => scheme.name === name);
}

function from_partial(partial_scheme: PartialScheme, provider: boolean | string = false) {
	return {
		name: provider ? `${partial_scheme.name} • ${provider}` : partial_scheme.name,
		local: !provider,
		fields: { ...def_fields, ...partial_scheme.fields },
	};
}
function hex_to_rgb(hex) {
	const r = Number.parseInt(hex.slice(1, 3), 16);
	const g = Number.parseInt(hex.slice(3, 5), 16);
	const b = Number.parseInt(hex.slice(5, 7), 16);

	return `${r}, ${g}, ${b}`;
}
function stringify_scheme(scheme: Scheme) {
	return Object.entries(scheme.fields)
		.flatMap(([name, value]) => [`--spice-${name}: ${value};`, `--spice-rgb-${name}: ${hex_to_rgb(value)};`])
		.join(" ");
}
function write_scheme(scheme: Scheme) {
	stylesheet.innerHTML = `.encore-dark-theme { ${stringify_scheme(scheme)} }`;
}

function toggle_scheme(name: string) {
	const scheme = get_scheme(name);
	curr_scheme = scheme;
	write_scheme(scheme);
	localStorage.setItem("curr_scheme", JSON.stringify(scheme));
}

// local schemes
function create_local(partial_scheme: PartialScheme) {
	local_schemes.push(from_partial(partial_scheme));
	localStorage.setItem("schemes", JSON.stringify(local_schemes));
}
function update_local(name: string, new_fields: SchemeFields) {
	const scheme = get_scheme(name);
	scheme.fields = new_fields;
	localStorage.setItem("schemes", JSON.stringify(local_schemes));
	if (curr_scheme.name === name) {
		write_scheme(scheme);
	}
}
function delete_local(name: string) {
	local_schemes = local_schemes.filter(scheme => scheme.name !== name);
	localStorage.setItem("schemes", JSON.stringify(local_schemes));
}
function rename_local(name: string, new_name: string) {
	const scheme = get_scheme(name);
	scheme.name = new_name;
	localStorage.setItem("schemes", JSON.stringify(local_schemes));
	toggle_scheme(new_name);
}

// static schemes
function create_statics(partial_schemes: PartialScheme[], provider: string) {
	const schemes = partial_schemes.map(scheme => from_partial(scheme, provider));
	static_schemes.push(...schemes);
}

write_scheme(curr_scheme);

export { curr_scheme, get_schemes, get_scheme, toggle_scheme, create_local, update_local, delete_local, rename_local, create_statics };
