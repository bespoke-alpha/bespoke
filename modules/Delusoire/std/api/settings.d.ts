/// <reference types="react" />
type Task<A> = (() => Awaited<A>) | (() => Promise<Awaited<A>>);
type OmitType<A> = Omit<A, "type">;
export declare enum FieldType {
    BUTTON = "button",
    TOGGLE = "toggle",
    INPUT = "input",
    HIDDEN = "hidden"
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
import type { Module } from "/hooks/module.js";
export declare class Settings<A = Record<string, never>> {
    private name;
    private id;
    sectionFields: {
        [key: string]: JSX.Element;
    };
    private proxy;
    private constructor();
    static fromModule(mod: Module): Settings<Record<string, never>>;
    get cfg(): A;
    finalize: () => this;
    addButton: <I extends string>(props: OmitType<ButtonField<I>>) => this;
    addToggle: <I extends string>(props: OmitType<ToggleField<I>>, defaultValue?: Task<boolean>) => Settings<A & { [X in I]: boolean; }>;
    addInput: <I extends string>(props: OmitType<InputField<I>>, defaultValue?: Task<string>) => Settings<A & { [X in I]: string; }>;
    private addField;
    getId: (nameId: string) => string;
    private useStateFor;
    static getFieldValue: <R>(id: string) => R;
    static setFieldValue: (id: string, newValue: any) => void;
    private static setDefaultFieldValue;
    private SettingsSection;
    SettingField: ({ field, children }: {
        field: SettingsField;
        children?: any;
    }) => JSX.Element;
    ButtonField: (field: ButtonField) => JSX.Element;
    ToggleField: (field: ToggleField) => JSX.Element;
    InputField: (field: InputField) => JSX.Element;
}
export declare const createSettings: (mod: Module & {
    settings?: Settings;
}) => Settings<Record<string, never>>;
export {};
