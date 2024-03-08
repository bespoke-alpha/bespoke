import { S } from "../expose/index.js";

type Task<A> = (() => Awaited<A>) | (() => Promise<Awaited<A>>);

const { React } = S;
const { ButtonSecondary } = S.ReactComponents;

type OmitType<A> = Omit<A, "type">;

export enum FieldType {
	BUTTON = "button",
	TOGGLE = "toggle",
	INPUT = "input",
	HIDDEN = "hidden",
}

export interface BaseField<I extends string> {
	id: I;
	type: FieldType;
	desc: string;
}

export type SettingsField = HiddenField | InputField | ButtonField | ToggleField;

export interface ButtonField<I extends string = any> extends BaseField<I> {
	type: FieldType.BUTTON;
	text: string;
	onClick?: () => void;
}
export interface ToggleField<I extends string = any> extends BaseField<I> {
	type: FieldType.TOGGLE;
	onSelected?: (checked: boolean) => void;
}

export interface InputField<I extends string = any> extends BaseField<I> {
	type: FieldType.INPUT;
	inputType: string;
	onChange?: (value: string) => void;
}

export interface HiddenField<I extends string = any> extends BaseField<I> {
	type: FieldType.HIDDEN;
}

import SettingsSectionRegistry from "../registers/settingsSection.js";
import type { Module } from "/hooks/module.js";

export class Settings<A = Record<string, never>> {
	public sectionFields: { [key: string]: JSX.Element } = {};
	private proxy;

	getName() {
		return this.name;
	}

	private constructor(
		private name: string,
		private id: string,
	) {
		this.proxy = new Proxy(
			{},
			{
				get: (target, prop) => Settings.getFieldValue(this.getId(prop.toString())),
				set: (target, prop, newValue) => {
					const id = this.getId(prop.toString());
					if (Settings.getFieldValue(id) === newValue) return false;
					Settings.setFieldValue(id, newValue);
					return true;
				},
			},
		);
	}

	static fromModule(mod: Module) {
		return new Settings(mod.getName(), mod.getIdentifier());
	}

	get cfg() {
		return this.proxy as A;
	}

	finalize = () => {
		SettingsSectionRegistry.register(<this.SettingsSection />, () => true);
		return this;
	};

	addButton = <I extends string>(props: OmitType<ButtonField<I>>) => {
		this.addField(FieldType.BUTTON, props, this.ButtonField);
		return this;
	};

	addToggle = <I extends string>(props: OmitType<ToggleField<I>>, defaultValue: Task<boolean> = () => false) => {
		this.addField(FieldType.TOGGLE, props, this.ToggleField, defaultValue);
		return this as Settings<A & { [X in I]: boolean }>;
	};

	addInput = <I extends string>(props: OmitType<InputField<I>>, defaultValue: Task<string> = () => "") => {
		this.addField(FieldType.INPUT, props, this.InputField, defaultValue);
		return this as Settings<A & { [X in I]: string }>;
	};

	private addField<SF extends SettingsField>(type: SF["type"], opts: OmitType<SF>, fieldComponent: React.FC<SF>, defaultValue?: any) {
		if (defaultValue !== undefined) {
			const settingId = this.getId(opts.id);
			Settings.setDefaultFieldValue(settingId, defaultValue);
		}
		const field = Object.assign({}, opts, { type }) as SF;
		this.sectionFields[opts.id] = React.createElement(fieldComponent, field);
	}

	getId = (nameId: string) => ["settings", this.id, nameId].join(":");

	private useStateFor = <A,>(id: string) => {
		const [value, setValueState] = React.useState(Settings.getFieldValue<A>(id));

		return [
			value,
			(newValue: A) => {
				if (newValue !== undefined) {
					setValueState(newValue);
					Settings.setFieldValue(id, newValue);
				}
			},
		] as const;
	};

	static getFieldValue = <R,>(id: string): R => JSON.parse(localStorage[id] ?? "null");

	static setFieldValue = (id: string, newValue: any) => {
		localStorage[id] = JSON.stringify(newValue ?? null);
	};

	private static setDefaultFieldValue = async (id: string, defaultValue: Task<any>) => {
		if (Settings.getFieldValue(id) === null) Settings.setFieldValue(id, await defaultValue());
	};

	private SettingsSection = () => (
		<S.SettingsSection filterMatchQuery={this.name}>
			<S.SettingsSectionTitle>{this.name}</S.SettingsSectionTitle>
			{Object.values(this.sectionFields)}
		</S.SettingsSection>
	);

	SettingField = ({ field, children }: { field: SettingsField; children?: any }) => (
		<S.ReactComponents.SettingColumn filterMatchQuery={field.id}>
			<div className="x-settings-firstColumn">
				<S.ReactComponents.SettingText htmlFor={field.id}>{field.desc}</S.ReactComponents.SettingText>
			</div>
			<div className="x-settings-secondColumn">{children}</div>
		</S.ReactComponents.SettingColumn>
	);

	ButtonField = (field: ButtonField) => (
		<this.SettingField field={field}>
			<ButtonSecondary id={field.id} buttonSize="sm" onClick={field.onClick} className="x-settings-button">
				{field.text}
			</ButtonSecondary>
		</this.SettingField>
	);

	ToggleField = (field: ToggleField) => {
		const id = this.getId(field.id);
		const [value, setValue] = this.useStateFor<boolean>(id);
		return (
			<this.SettingField field={field}>
				<S.ReactComponents.SettingToggle
					id={field.id}
					value={Settings.getFieldValue(id)}
					onSelected={(checked: boolean) => {
						setValue(checked);
						field.onSelected?.(checked);
					}}
					className="x-settings-button"
				/>
			</this.SettingField>
		);
	};

	InputField = (field: InputField) => {
		const id = this.getId(field.id);
		const [value, setValue] = this.useStateFor<string>(id);
		return (
			<this.SettingField field={field}>
				<input
					className="x-settings-input"
					id={field.id}
					dir="ltr"
					value={Settings.getFieldValue(id)}
					type={field.inputType}
					onChange={e => {
						const value = e.currentTarget.value;
						setValue(value);
						field.onChange?.(value);
					}}
				/>
			</this.SettingField>
		);
	};
}

import { REACT_FIBER, waitForElement } from "./util.js";
import { createIconComponent } from "./createIconComponent.js";

const SettingsIcon = () =>
	createIconComponent({
		semanticColor: "textSubdued",
		icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/></svg>',
	});

const History = S.Platform.getHistory();

interface SettingsButtonProps {
	section: string;
}

export const SettingsButton = ({ section }: SettingsButtonProps): React.ReactElement<HTMLButtonElement> => {
	const { Tooltip, ButtonTertiary } = S.ReactComponents;

	return (
		<Tooltip label="Settings" renderInline={true} placement="top">
			<ButtonTertiary
				buttonSize="sm"
				onClick={async () => {
					History.push("/preferences");
					const searchButton = await waitForElement(".DQ9fp5DjBJxKHeHqtFwC .wCl7pMTEE68v1xuZeZiB");
					const recUp = fiber => {
						const { type } = fiber;
						if (type.$$typeof === Symbol.for("react.provider") && type._context._currentValue.setFilter) return fiber;
						return recUp(fiber.return);
					};

					const filterContext = recUp(searchButton[REACT_FIBER]);

					const { setFilter } = filterContext.pendingProps.value;
					setFilter(section);
				}}
				aria-label="Settings"
				iconOnly={SettingsIcon}
			/>
		</Tooltip>
	);
};

export const createSettings = (mod: Module & { settings?: Settings }) => {
	if (!mod.settings) {
		mod.settings = Settings.fromModule(mod);
	}

	return [mod.settings, <SettingsButton section={mod.settings.getName()} />] as const;
};
