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
class SchemeManager {
	private static instance: SchemeManager;
	private local_schemes: Schemes;
	private static_schemes: Schemes;
	private curr_scheme: Scheme;
	private stylesheet: HTMLStyleElement;

	private constructor() {
		this.local_schemes = JSON.parse(localStorage.getItem("schemes") || "[]");
		this.static_schemes = [{ name: "Spotify • default", local: false, fields: def_fields }];
		this.curr_scheme = JSON.parse(localStorage.getItem("curr_scheme") || "null") || this.static_schemes[0];
		this.stylesheet = document.createElement("style");
		document.head.appendChild(this.stylesheet);
		this.writeScheme(this.curr_scheme);
	}

	public static getInstance(): SchemeManager {
		if (!SchemeManager.instance) {
			SchemeManager.instance = new SchemeManager();
		}
		return SchemeManager.instance;
	}

	public getSchemes(): Schemes {
		return [...this.local_schemes, ...this.static_schemes];
	}

	public getScheme(name: string): Scheme {
		if (name === "def") return this.static_schemes[0];
		return this.getSchemes().find(scheme => scheme.name === name);
	}

	private fromPartial(partial_scheme: PartialScheme, provider: boolean | string = false): Scheme {
		return {
			name: provider ? `${partial_scheme.name} • ${provider}` : partial_scheme.name,
			local: !provider,
			fields: { ...def_fields, ...partial_scheme.fields },
		};
	}

	private hexToRgb(hex: string): string {
		const r = Number.parseInt(hex.slice(1, 3), 16);
		const g = Number.parseInt(hex.slice(3, 5), 16);
		const b = Number.parseInt(hex.slice(5, 7), 16);

		return `${r}, ${g}, ${b}`;
	}

	private stringifyScheme(scheme: Scheme): string {
		return Object.entries(scheme.fields)
			.flatMap(([name, value]) => [`--spice-${name}: ${value};`, `--spice-rgb-${name}: ${this.hexToRgb(value)};`])
			.join(" ");
	}

	private writeScheme(scheme: Scheme): void {
		this.stylesheet.innerHTML = `.encore-dark-theme { ${this.stringifyScheme(scheme)} }`;
	}

	public toggleScheme(name: string): void {
		const scheme = this.getScheme(name);
		this.curr_scheme = scheme;
		this.writeScheme(scheme);
		localStorage.setItem("curr_scheme", JSON.stringify(scheme));
	}

	// local schemes
	public createLocal(partial_scheme: PartialScheme): Scheme {
		const scheme = this.fromPartial(partial_scheme);
		this.local_schemes.push(scheme);
		localStorage.setItem("schemes", JSON.stringify(this.local_schemes));
		return scheme;
	}

	public updateLocal(name: string, new_fields: SchemeFields): void {
		const scheme = this.getScheme(name);
		scheme.fields = new_fields;
		localStorage.setItem("schemes", JSON.stringify(this.local_schemes));
		if (this.curr_scheme.name === name) {
			this.writeScheme(scheme);
		}
	}

	public deleteLocal(name: string): void {
		this.local_schemes = this.local_schemes.filter(scheme => scheme.name !== name);
		localStorage.setItem("schemes", JSON.stringify(this.local_schemes));
	}

	public renameLocal(name: string, new_name: string): void {
		const scheme = this.getScheme(name);
		scheme.name = new_name;
		localStorage.setItem("schemes", JSON.stringify(this.local_schemes));
		this.toggleScheme(new_name);
	}

	// static schemes
	public createStatics(partial_schemes: PartialScheme[], provider: string): void {
		const schemes = partial_schemes.map(scheme => this.fromPartial(scheme, provider));
		this.static_schemes.push(...schemes);
	}

	public getCurrScheme(): Scheme {
		return this.curr_scheme;
	}
}

const schemeManager = SchemeManager.getInstance();
export default schemeManager;
