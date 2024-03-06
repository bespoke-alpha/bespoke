import { registerTransform } from "../mixin.js";
export const S = {};
registerTransform({
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
registerTransform({
    transform: emit => str => {
        str = str.replace(/(setTitlebarHeight[\w(){}.,&$!=;"" ]+)(\{version:[\w_\$][\w_\$\d]*,)/, "$1__Platform=$2");
        Object.defineProperty(globalThis, "__Platform", {
            set: emit,
        });
        return str;
    },
    then: async (Platform) => {
        const { expose } = await import("./platform.js");
        Object.assign(S, expose({ Platform }));
    },
    glob: /^\/xpui\.js/,
});
registerTransform({
    transform: emit => str => {
        str = str.replace(/(,[\w_\$][\w_\$\d]*=)(([$\w,.:=;(){}]+\(\{session:[\w_\$][\w_\$\d]*,features:[\w_\$][\w_\$\d]*,seoExperiment:[\w_\$][\w_\$\d]*\}))/, "$1__ReduxStore=$2");
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
registerTransform({
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
    then: async (Snackbar) => {
        const { expose } = await import("./webpack.js");
        const { Platform } = S;
        Object.assign(S, expose({ Snackbar, Platform }));
    },
    glob: /^\/vendor~xpui\.js/,
});
// TODO: replace with a custom enqueueCustomSnackbar wrapper
registerTransform({
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
registerTransform({
    transform: emit => str => {
        str = str.replace(/([\w_\$][\w_\$\d]*)=((?:function|\()([\w$.,{}()= ]+(?:springConfig|overshootClamping)){2})/, "$1=__ReactFlipToolkitSpring=$2");
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
        const matches = str.matchAll(/(=new [\w_\$][\w_\$\d]*\.[\w_\$][\w_\$\d]*\("(?<name>\w+)","(?<operation>query|mutation)","(?<sha256Hash>[\w\d]{64})",null\))/g);
        S.GraphQLDefinitions = {
            query: {},
            mutation: {},
        };
        for (const match of matches) {
            const { name, operation, sha256Hash } = match.groups;
            S.GraphQLDefinitions[operation][name] = { name, operation, sha256Hash, value: null };
        }
        emit();
        return str;
    },
    glob: /.+\.js$/,
});
registerTransform({
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
registerTransform({
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
