import menu from "./menu.js";
import root from "./root.js";
import route from "./route.js";
import navlink from "./navlink.js";
import playbarControl from "./playbarControl.js";
import playbarWidget from "./playbarWidget.js";
import settingsSection from "./settingsSection.js";
import topbarLeftButton from "./topbarLeftButton.js";
import topbarRightButton from "./topbarRightButton.js";
// It's ugly, but we gotta do it statically to get type completions
const registers = { menu, root, route, navlink, playbarControl, playbarWidget, settingsSection, topbarLeftButton, topbarRightButton };
export class Registrar {
    constructor(id) {
        this.id = id;
        this.ledger = new Map();
    }
    register(type, item, predicate = () => true) {
        this.ledger.set(item, type);
        registers[type].register(item, predicate);
    }
    unregister(type, item) {
        this.ledger.delete(item);
        registers[type].unregister(item);
    }
    dispose() {
        for (const [item, type] of this.ledger.entries())
            this.unregister(type, item);
        this.ledger.clear();
        this.ledger = undefined;
    }
}
