import { S } from "../expose/index.js";
const { React } = S;
const { ButtonSecondary } = S.ReactComponents;
export var FieldType;
(function (FieldType) {
    FieldType["BUTTON"] = "button";
    FieldType["TOGGLE"] = "toggle";
    FieldType["INPUT"] = "input";
    FieldType["HIDDEN"] = "hidden";
})(FieldType || (FieldType = {}));
import SettingsSectionRegistry from "../registers/settingsSection.js";
export class Settings {
    getName() {
        return this.name;
    }
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.sectionFields = {};
        this.finalize = () => {
            SettingsSectionRegistry.register(S.React.createElement(this.SettingsSection, null), () => true);
            return this;
        };
        this.addButton = (props) => {
            this.addField(FieldType.BUTTON, props, this.ButtonField);
            return this;
        };
        this.addToggle = (props, defaultValue = () => false) => {
            this.addField(FieldType.TOGGLE, props, this.ToggleField, defaultValue);
            return this;
        };
        this.addInput = (props, defaultValue = () => "") => {
            this.addField(FieldType.INPUT, props, this.InputField, defaultValue);
            return this;
        };
        this.getId = (nameId) => ["settings", this.id, nameId].join(":");
        this.useStateFor = (id) => {
            const [value, setValueState] = React.useState(Settings.getFieldValue(id));
            return [
                value,
                (newValue) => {
                    if (newValue !== undefined) {
                        setValueState(newValue);
                        Settings.setFieldValue(id, newValue);
                    }
                },
            ];
        };
        this.SettingsSection = () => (S.React.createElement(S.SettingsSection, { filterMatchQuery: this.name },
            S.React.createElement(S.SettingsSectionTitle, null, this.name),
            Object.values(this.sectionFields)));
        this.SettingField = ({ field, children }) => (S.React.createElement(S.ReactComponents.SettingColumn, { filterMatchQuery: field.id },
            S.React.createElement("div", { className: "x-settings-firstColumn" },
                S.React.createElement(S.ReactComponents.SettingText, { htmlFor: field.id }, field.desc)),
            S.React.createElement("div", { className: "x-settings-secondColumn" }, children)));
        this.ButtonField = (field) => (S.React.createElement(this.SettingField, { field: field },
            S.React.createElement(ButtonSecondary, { id: field.id, buttonSize: "sm", onClick: field.onClick, className: "x-settings-button" }, field.text)));
        this.ToggleField = (field) => {
            const id = this.getId(field.id);
            const [value, setValue] = this.useStateFor(id);
            return (S.React.createElement(this.SettingField, { field: field },
                S.React.createElement(S.ReactComponents.SettingToggle, { id: field.id, value: Settings.getFieldValue(id), onSelected: (checked) => {
                        setValue(checked);
                        field.onSelected?.(checked);
                    }, className: "x-settings-button" })));
        };
        this.InputField = (field) => {
            const id = this.getId(field.id);
            const [value, setValue] = this.useStateFor(id);
            return (S.React.createElement(this.SettingField, { field: field },
                S.React.createElement("input", { className: "x-settings-input", id: field.id, dir: "ltr", value: Settings.getFieldValue(id), type: field.inputType, onChange: e => {
                        const value = e.currentTarget.value;
                        setValue(value);
                        field.onChange?.(value);
                    } })));
        };
        this.proxy = new Proxy({}, {
            get: (target, prop) => Settings.getFieldValue(this.getId(prop.toString())),
            set: (target, prop, newValue) => {
                const id = this.getId(prop.toString());
                if (Settings.getFieldValue(id) === newValue)
                    return false;
                Settings.setFieldValue(id, newValue);
                return true;
            },
        });
    }
    static fromModule(mod) {
        return new Settings(mod.getName(), mod.getIdentifier());
    }
    get cfg() {
        return this.proxy;
    }
    addField(type, opts, fieldComponent, defaultValue) {
        if (defaultValue !== undefined) {
            const settingId = this.getId(opts.id);
            Settings.setDefaultFieldValue(settingId, defaultValue);
        }
        const field = Object.assign({}, opts, { type });
        this.sectionFields[opts.id] = React.createElement(fieldComponent, field);
    }
    static { this.getFieldValue = (id) => JSON.parse(localStorage[id] ?? "null"); }
    static { this.setFieldValue = (id, newValue) => {
        localStorage[id] = JSON.stringify(newValue ?? null);
    }; }
    static { this.setDefaultFieldValue = async (id, defaultValue) => {
        if (Settings.getFieldValue(id) === null)
            Settings.setFieldValue(id, await defaultValue());
    }; }
}
import { REACT_FIBER, waitForElement } from "./util.js";
import { createIconComponent } from "./createIconComponent.js";
const SettingsIcon = () => createIconComponent({
    semanticColor: "textSubdued",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/></svg>',
});
const History = S.Platform.getHistory();
export const SettingsButton = ({ section }) => {
    const { Tooltip, ButtonTertiary } = S.ReactComponents;
    return (S.React.createElement(Tooltip, { label: "Settings", renderInline: true, placement: "top" },
        S.React.createElement(ButtonTertiary, { buttonSize: "sm", onClick: async () => {
                History.push("/preferences");
                const searchButton = await waitForElement(".DQ9fp5DjBJxKHeHqtFwC .wCl7pMTEE68v1xuZeZiB");
                const recUp = fiber => {
                    const { type } = fiber;
                    if (type.$$typeof === Symbol.for("react.provider") && type._context._currentValue.setFilter)
                        return fiber;
                    return recUp(fiber.return);
                };
                const filterContext = recUp(searchButton[REACT_FIBER]);
                const { setFilter } = filterContext.pendingProps.value;
                setFilter(section);
            }, "aria-label": "Settings", iconOnly: SettingsIcon })));
};
export const createSettings = (mod) => {
    if (!mod.settings) {
        mod.settings = Settings.fromModule(mod);
    }
    return [mod.settings, S.React.createElement(SettingsButton, { section: mod.settings.getName() })];
};
