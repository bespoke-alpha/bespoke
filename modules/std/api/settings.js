import { S } from "../expose/expose.js";
import { _ } from "/hooks/deps.js";
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
export class SettingsSection {
    constructor(name) {
        this.name = name;
        this.sectionFields = {};
        this.pushSettings = () => {
            SettingsSectionRegistry.register(S.React.createElement(this.SettingsSection, null), _.stubTrue);
        };
        this.toObject = () => new Proxy({}, {
            get: (target, prop) => SettingsSection.getFieldValue(this.getId(prop.toString())),
            set: (target, prop, newValue) => {
                const id = this.getId(prop.toString());
                if (SettingsSection.getFieldValue(id) === newValue)
                    return false;
                SettingsSection.setFieldValue(id, newValue);
                return true;
            },
        });
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
            const [value, setValueState] = React.useState(SettingsSection.getFieldValue(id));
            return [
                value,
                (newValue) => {
                    if (newValue !== undefined) {
                        setValueState(newValue);
                        SettingsSection.setFieldValue(id, newValue);
                    }
                },
            ];
        };
        this.SettingsSection = () => (S.React.createElement(S.SettingsSection, { filterMatchQuery: this.name },
            S.React.createElement(S.SettingsSectionTitle, null, this.name),
            Object.values(this.sectionFields)));
        this.SettingField = ({ field, children }) => (S.React.createElement(S.ReactComponents.SettingColumn, { filterMatchQuery: field.id },
            S.React.createElement("div", { className: "GMGmbx5FRBd6DOVvzSgk" },
                S.React.createElement(S.ReactComponents.SettingText, { htmlFor: field.id }, field.desc)),
            S.React.createElement("div", { className: "yNitN64xoLNhzJlkfzOh" }, children)));
        this.ButtonField = (field) => (S.React.createElement(this.SettingField, { field: field },
            S.React.createElement(ButtonSecondary, { id: field.id, buttonSize: "sm", onClick: field.onClick, className: "rFFJg1UIumqUUFDgo6n7" }, field.text)));
        this.ToggleField = (field) => {
            const id = this.getId(field.id);
            const [value, setValue] = this.useStateFor(id);
            return (S.React.createElement(this.SettingField, { field: field },
                S.React.createElement(S.ReactComponents.SettingToggle, { id: field.id, value: SettingsSection.getFieldValue(id), onSelected: (checked) => {
                        setValue(checked);
                        field.onSelected?.(checked);
                    }, className: "rFFJg1UIumqUUFDgo6n7" })));
        };
        this.InputField = (field) => {
            const id = this.getId(field.id);
            const [value, setValue] = this.useStateFor(id);
            return (S.React.createElement(this.SettingField, { field: field },
                S.React.createElement("input", { className: "SkbGMKYv49KtJNB5XxdX", id: field.id, dir: "ltr", value: SettingsSection.getFieldValue(id), type: field.inputType, onChange: e => {
                        const value = e.currentTarget.value;
                        setValue(value);
                        field.onChange?.(value);
                    } })));
        };
        this.id = _.kebabCase(name);
    }
    addField(type, opts, fieldComponent, defaultValue) {
        if (defaultValue !== undefined) {
            const settingId = this.getId(opts.id);
            SettingsSection.setDefaultFieldValue(settingId, defaultValue);
        }
        const field = Object.assign({}, opts, { type });
        this.sectionFields[opts.id] = React.createElement(fieldComponent, field);
    }
    static { this.getFieldValue = (id) => JSON.parse(localStorage[id] ?? "null"); }
    static { this.setFieldValue = (id, newValue) => {
        localStorage[id] = JSON.stringify(newValue ?? null);
    }; }
    static { this.setDefaultFieldValue = async (id, defaultValue) => {
        if (SettingsSection.getFieldValue(id) === null)
            SettingsSection.setFieldValue(id, await defaultValue());
    }; }
}
