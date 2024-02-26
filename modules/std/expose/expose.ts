import type { RegisterTransformFN } from "/hooks/transforms/transform.js";

import type { ExposedPlatform, Platform } from "./platform.js";
import type { ExposedWebpack, Snackbar } from "./webpack.js";
import type { Tippy } from "tippy.js";
import type { spring } from "react-flip-toolkit";
import type { Store } from "redux";

export type GraphQLDefinition = any;
export type GraphQLDefinitions = Record<string, GraphQLDefinition>;
export type ReduxStore = Store;
export type ReactFlipToolkitSpring = typeof spring;
export type SettingsSectionProps = { filterMatchQuery: string };
export type SettingsSection = (props: SettingsSectionProps) => JSX.Element;
export type SettingsSectionTitleProps = {};
export type SettingsSectionTitle = (props: SettingsSectionTitleProps) => JSX.Element;

export type ExposedOther = {
	GraphQLDefinitions: GraphQLDefinitions;
	enqueueImageSnackbar: any;
	ReduxStore: ReduxStore;
	Tippy: Tippy;
	ReactFlipToolkitSpring: ReactFlipToolkitSpring;
	SettingsSection: SettingsSection;
	SettingsSectionTitle: SettingsSectionTitle;
};

export const S = {} as ExposedPlatform & ExposedWebpack & ExposedOther;

export function expose(registerTransform: RegisterTransformFN) {
	registerTransform<Tippy>({
		transform: emit => str => {
			str = str.replace(/(([\w_\$][\w_\$\d]*)\.setDefaultProps=)/, "__Tippy=$2;$1");
			Object.defineProperty(globalThis, "__Tippy", {
				set: emit,
			});
			return str;
		},
		then: Tippy => {
			S.Tippy = Tippy;
		},
		glob: /^\/vendor~xpui\.js/,
	});

	registerTransform<Platform>({
		transform: emit => str => {
			str = str.replace(/(setTitlebarHeight[\w(){}.,&$!=;"" ]+)(\{version:[\w_\$][\w_\$\d]*,)/, "$1__Platform=$2");
			Object.defineProperty(globalThis, "__Platform", {
				set: emit,
			});
			return str;
		},
		then: async Platform => {
			const { expose } = await import("./platform.js");
			Object.assign(S, expose({ Platform }));
		},
		glob: /^\/xpui\.js/,
	});

	registerTransform<ReduxStore>({
		transform: emit => str => {
			str = str.replace(
				/(,[\w_\$][\w_\$\d]*=)(([$\w,.:=;(){}]+\(\{session:[\w_\$][\w_\$\d]*,features:[\w_\$][\w_\$\d]*,seoExperiment:[\w_\$][\w_\$\d]*\}))/,
				"$1__ReduxStore=$2",
			);
			Object.defineProperty(globalThis, "__ReduxStore", {
				set: emit,
			});
			return str;
		},
		then: ReduxStore => {
			S.ReduxStore = ReduxStore;
		},
		glob: /^\/xpui\.js/,
	});

	registerTransform<Snackbar>({
		transform: emit => str => {
			str = str.replace(/(\.call\(this,[\w_\$][\w_\$\d]*\)\|\|this\)\.enqueueSnackbar)/, "$1=__Snackbar");
			let __Snackbar = undefined;
			Object.defineProperty(globalThis, "__Snackbar", {
				set: value => {
					emit(value);
					__Snackbar = value;
				},
				get: () => __Snackbar,
			});
			return str;
		},
		then: async Snackbar => {
			const { expose } = await import("./webpack.js");
			const { Platform } = S;
			Object.assign(S, expose({ Snackbar, Platform }));
		},
		glob: /^\/vendor~xpui\.js/,
	});

	// TODO: replace with a custom enqueueCustomSnackbar wrapper
	registerTransform<any>({
		transform: emit => str => {
			str = str.replace(/(\(\({[^}]*,\s*imageSrc)/, "__enqueueImageSnackbar=$1");
			Object.defineProperty(globalThis, "__enqueueImageSnackbar", {
				set: emit,
			});
			return str;
		},
		then: enqueueImageSnackbar => {
			S.enqueueImageSnackbar = enqueueImageSnackbar;
		},
		glob: /^\/xpui\.js/,
		noAwait: true,
	});

	registerTransform<ReactFlipToolkitSpring>({
		transform: emit => str => {
			str = str.replace(
				/([\w_\$][\w_\$\d]*)=((?:function|\()([\w$.,{}()= ]+(?:springConfig|overshootClamping)){2})/,
				"$1=__ReactFlipToolkitSpring=$2",
			);
			Object.defineProperty(globalThis, "__ReactFlipToolkitSpring", { set: emit });
			return str;
		},
		then: ReactFlipToolkitSpring => {
			S.ReactFlipToolkitSpring = ReactFlipToolkitSpring;
		},
		glob: /^\/vendor~xpui\.js/,
	});

	registerTransform({
		transform: emit => str => {
			str = str.replace(
				/((?:\w+ ?)?[\w_\$][\w_\$\d]*=)(\{kind:"Document",definitions:\[\{(?:\w+:[\w"]+,)+name:\{(?:\w+:[\w"]+,?)+value:("\w+"))/,
				"$1__GraphQLDefinitions[$3]=$2",
			);
			globalThis.__GraphQLDefinitions = new Proxy(
				{},
				{
					set(_, key, value) {
						S.GraphQLDefinitions[key as string] = value;
						return true;
					},
				},
			);
			S.GraphQLDefinitions = {};
			emit();
			return str;
		},
		glob: /^\/xpui\.js/,
	});

	registerTransform<SettingsSection>({
		transform: emit => str => {
			str = str.replace(/(\.jsxs\)\()([\w_\$][\w_\$\d]*)([^=]*"desktop.settings.compatibility")/, "$1(__SettingsSection=$2)$3");
			Object.defineProperty(globalThis, "__SettingsSection", { set: emit });
			return str;
		},
		then: SettingsSection => {
			S.SettingsSection = SettingsSection;
		},
		glob: /^\/xpui\.js/,
		noAwait: true,
	});

	registerTransform<SettingsSectionTitle>({
		transform: emit => str => {
			str = str.replace(/("desktop.settings.compatibility"[^=]*?\.jsx\)\()([\w_\$][\w_\$\d]*)/, "$1(__SettingsSectionTitle=$2)");
			Object.defineProperty(globalThis, "__SettingsSectionTitle", { set: emit });
			return str;
		},
		then: SettingsSectionTitle => {
			S.SettingsSectionTitle = SettingsSectionTitle;
		},
		glob: /^\/xpui\.js/,
		noAwait: true,
	});
}
