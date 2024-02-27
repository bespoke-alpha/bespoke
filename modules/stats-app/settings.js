import { SettingsSection } from "/modules/std/api/settings.js";
const settings = new SettingsSection("Show The Genres")
    .addInput({
    id: "LFMApiKey",
    desc: "Last.FM API Key",
    inputType: "text",
}, () => "********************************")
    .addInput({ id: "LFMUsername", desc: "Last.FM username", inputType: "text" }, () => "Username")
    .addToggle({ id: "UseLFM", desc: "Use Last.FM for stats" })
    .addToggle({ id: "ShowArtistsPage", desc: "Show Artists page" }, () => true)
    .addToggle({ id: "ShowTracksPage", desc: "Show Tracks page" }, () => true)
    .addToggle({ id: "ShowAlbumsPage", desc: "Show Albums page (Requires Last.FM API Key)" })
    .addToggle({ id: "ShowGenresPage", desc: "Show Genres page" }, () => true)
    .addToggle({ id: "ShowLibraryPage", desc: "Show Library page" }, () => true)
    .addToggle({ id: "ShowChartsPage", desc: "Show Charts page (Requires Last.FM API Key)" }, () => true);
settings.pushSettings();
export const CONFIG = settings.toObject();
