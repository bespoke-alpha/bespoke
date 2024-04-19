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
    playbar_active: "#1ed760"
};
// store
class SchemeManager {
    static instance;
    local_schemes;
    static_schemes;
    curr_scheme;
    stylesheet;
    constructor(){
        this.local_schemes = JSON.parse(localStorage.getItem("schemes") || "[]");
        this.static_schemes = [
            {
                name: "Spotify • default",
                local: false,
                fields: def_fields
            }
        ];
        this.curr_scheme = JSON.parse(localStorage.getItem("curr_scheme") || "null") || this.static_schemes[0];
        this.stylesheet = document.createElement("style");
        document.head.appendChild(this.stylesheet);
        this.writeScheme(this.curr_scheme);
    }
    static getInstance() {
        if (!SchemeManager.instance) {
            SchemeManager.instance = new SchemeManager();
        }
        return SchemeManager.instance;
    }
    getSchemes() {
        return [
            ...this.local_schemes,
            ...this.static_schemes
        ];
    }
    getScheme(name) {
        if (name === "def") return this.static_schemes[0];
        return this.getSchemes().find((scheme)=>scheme.name === name);
    }
    fromPartial(partial_scheme, provider = false) {
        return {
            name: provider ? `${partial_scheme.name} • ${provider}` : partial_scheme.name,
            local: !provider,
            fields: {
                ...def_fields,
                ...partial_scheme.fields
            }
        };
    }
    hexToRgb(hex) {
        const r = Number.parseInt(hex.slice(1, 3), 16);
        const g = Number.parseInt(hex.slice(3, 5), 16);
        const b = Number.parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    }
    stringifyScheme(scheme) {
        return Object.entries(scheme.fields).flatMap(([name, value])=>[
                `--spice-${name}: ${value};`,
                `--spice-rgb-${name}: ${this.hexToRgb(value)};`
            ]).join(" ");
    }
    writeScheme(scheme) {
        this.stylesheet.innerHTML = `.encore-dark-theme { ${this.stringifyScheme(scheme)} }`;
    }
    toggleScheme(name) {
        const scheme = this.getScheme(name);
        this.curr_scheme = scheme;
        this.writeScheme(scheme);
        localStorage.setItem("curr_scheme", JSON.stringify(scheme));
    }
    // local schemes
    createLocal(partial_scheme) {
        const scheme = this.fromPartial(partial_scheme);
        this.local_schemes.push(scheme);
        localStorage.setItem("schemes", JSON.stringify(this.local_schemes));
        return scheme;
    }
    updateLocal(name, new_fields) {
        const scheme = this.getScheme(name);
        scheme.fields = new_fields;
        localStorage.setItem("schemes", JSON.stringify(this.local_schemes));
        if (this.curr_scheme.name === name) {
            this.writeScheme(scheme);
        }
    }
    deleteLocal(name) {
        this.local_schemes = this.local_schemes.filter((scheme)=>scheme.name !== name);
        localStorage.setItem("schemes", JSON.stringify(this.local_schemes));
    }
    renameLocal(name, new_name) {
        const scheme = this.getScheme(name);
        scheme.name = new_name;
        localStorage.setItem("schemes", JSON.stringify(this.local_schemes));
        this.toggleScheme(new_name);
    }
    // static schemes
    createStatics(partial_schemes, provider) {
        const schemes = partial_schemes.map((scheme)=>this.fromPartial(scheme, provider));
        this.static_schemes.push(...schemes);
    }
    getCurrScheme() {
        return this.curr_scheme;
    }
}
const schemeManager = SchemeManager.getInstance();
export default schemeManager;
