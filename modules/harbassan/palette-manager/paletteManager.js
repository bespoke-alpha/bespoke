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
class PaletteManager {
    static instance;
    local_palettes;
    static_palettes;
    curr_palette;
    stylesheet;
    constructor(){
        this.local_palettes = JSON.parse(localStorage.getItem("palettes") || "[]");
        this.static_palettes = [
            {
                name: "Spotify • default",
                local: false,
                fields: def_fields
            }
        ];
        this.curr_palette = JSON.parse(localStorage.getItem("curr_palette") || "null") || this.static_palettes[0];
        this.stylesheet = document.createElement("style");
        document.head.appendChild(this.stylesheet);
        this.writePalette(this.curr_palette);
    }
    static getInstance() {
        if (!PaletteManager.instance) {
            PaletteManager.instance = new PaletteManager();
        }
        return PaletteManager.instance;
    }
    getPalettes() {
        return [
            ...this.local_palettes,
            ...this.static_palettes
        ];
    }
    getPalette(name) {
        if (name === "def") return this.static_palettes[0];
        return this.getPalettes().find((palette)=>palette.name === name);
    }
    fromPartial(partial_palette, local = true) {
        return {
            name: partial_palette.name,
            local: local,
            fields: {
                ...def_fields,
                ...partial_palette.fields
            }
        };
    }
    hexToRgb(hex) {
        const r = Number.parseInt(hex.slice(1, 3), 16);
        const g = Number.parseInt(hex.slice(3, 5), 16);
        const b = Number.parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    }
    stringifyPalette(palette) {
        return Object.entries(palette.fields).flatMap(([name, value])=>[
                `--spice-${name}: ${value};`,
                `--spice-rgb-${name}: ${this.hexToRgb(value)};`
            ]).join(" ");
    }
    writePalette(palette) {
        this.stylesheet.innerHTML = `.encore-dark-theme { ${this.stringifyPalette(palette)} }`;
    }
    togglePalette(name) {
        const palette = this.getPalette(name);
        this.curr_palette = palette;
        this.writePalette(palette);
        localStorage.setItem("curr_palette", JSON.stringify(palette));
    }
    // local palettes
    createLocal(partial_palette) {
        const palette = this.fromPartial(partial_palette);
        this.local_palettes.push(palette);
        localStorage.setItem("palettes", JSON.stringify(this.local_palettes));
        return palette;
    }
    updateLocal(name, new_fields) {
        const palette = this.getPalette(name);
        palette.fields = new_fields;
        localStorage.setItem("palettes", JSON.stringify(this.local_palettes));
        if (this.curr_palette.name === name) {
            this.writePalette(palette);
        }
    }
    deleteLocal(name) {
        this.local_palettes = this.local_palettes.filter((palette)=>palette.name !== name);
        localStorage.setItem("palettes", JSON.stringify(this.local_palettes));
    }
    renameLocal(name, new_name) {
        const palette = this.getPalette(name);
        palette.name = new_name;
        localStorage.setItem("palettes", JSON.stringify(this.local_palettes));
        this.togglePalette(new_name);
    }
    // static palettes
    createStatics(partial_palettes, provider) {
        const palettes = partial_palettes.map((palette)=>{
            palette.name = `${palette.name} • ${provider}`;
            return this.fromPartial(palette, false);
        });
        this.static_palettes.push(...palettes);
    }
    getCurrPalette() {
        return this.curr_palette;
    }
}
const paletteManager = PaletteManager.getInstance();
export default paletteManager;
