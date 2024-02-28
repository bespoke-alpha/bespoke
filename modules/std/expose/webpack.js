import { capitalize } from "../deps.js";
import { findBy } from "/hooks/util.js";
// ! Clean this file
const exposeReactComponents = ({ require, chunks, exports, exportedFunctions, exportedMemos, exportedForwardRefs }, React, Platform) => {
    const exportedFCs = exportedFunctions;
    const Menus = Object.fromEntries(exportedMemos.flatMap(m => {
        const str = m.type.toString();
        const match = str.match(/value:"([\w-]+)"/);
        const name = match?.[1] ?? "";
        const type = {
            album: "Album",
            show: "PodcastShow",
            artist: "Artist",
            track: "Track",
        }[name];
        return type ? [[type, m]] : [];
    }));
    const Cards = Object.assign({
        Default: findBy('"card-click-handler"')(exportedFCs),
        Hero: findBy('"herocard-click-handler"')(exportedFCs),
        CardImage: findBy("isHero", "withWaves")(exportedFCs),
    }, Object.fromEntries(exports
        .flatMap(m => {
        try {
            const str = m.toString();
            const match = str.match(/featureIdentifier:"(.+?)"/);
            if (!match)
                return [];
            const name = match[1];
            return [[capitalize(name), m]];
        }
        catch (e) {
            return [];
        }
    })
        .concat([["Profile", exportedMemos.find(m => m.type.toString().includes(`featureIdentifier:"profile"`))]])));
    const [ContextMenuModuleID] = chunks.find(([_, v]) => v.toString().includes("toggleContextMenu"));
    const [playlistMenuChunkID] = chunks.find(([, v]) => v.toString().includes('value:"playlist"') && v.toString().includes("canView") && v.toString().includes("permissions"));
    const RemoteConfigProviderComponent = findBy("resolveSuspense", "configuration")(exportedFCs);
    const Slider = exportedFCs.find(m => m.toString().includes("onStepBackward") && !m.toString().includes("volume"));
    const exportedMemoFRefs = exportedMemos.filter(m => m.type.$$typeof === Symbol.for("react.forward_ref"));
    const Nav = exportedMemoFRefs.find(m => m.type.render.toString().includes("navigationalRoot"));
    const NavTo = exportedMemoFRefs.find(m => m.type.render.toString().includes("pageId"));
    return {
        SettingColumn: findBy("setSectionFilterMatchQueryValue", "filterMatchQuery")(exportedFCs),
        SettingText: findBy("textSubdued", "dangerouslySetInnerHTML")(exportedFCs),
        SettingToggle: findBy("condensed", "onSelected")(exportedFCs),
        IconComponent: findBy("$iconColor", 'role:"img"')(exportedFCs),
        Text: exportedForwardRefs.find(m => m.render.toString().includes("paddingBottom") && m.render.toString().includes("className")),
        TextComponent: exports.find(m => m.h1 && m.render),
        ContextMenu: Object.values(require(ContextMenuModuleID))[0],
        RightClickMenu: findBy("action", "open", "trigger", "right-click")(exportedFCs),
        ConfirmDialog: findBy("isOpen", "shouldCloseOnEsc", "onClose")(exportedFCs),
        Tooltip: findBy("hover-or-focus", "tooltip")(exportedFCs),
        Menu: findBy("getInitialFocusElement", "children")(exportedFCs),
        MenuItem: findBy("handleMouseEnter", "onClick")(exportedFCs),
        MenuItemSubMenu: findBy("subMenuIcon")(exportedFCs),
        Slider,
        Nav,
        NavTo,
        RemoteConfigProvider: ({ configuration = Platform.getRemoteConfiguration(), children }) => React.createElement(RemoteConfigProviderComponent, { configuration }, children),
        // TODO: better nomenclature
        Scrollable: findBy("applyLightThemeControls")(exportedFunctions),
        PanelHeader: exportedFCs.find(m => m.toString().includes("panel") && m.toString().includes("actions")),
        PanelContent: findBy(m => m.render.toString().includes("scrollBarContainer"))(exportedForwardRefs) || findBy("scrollBarContainer")(exportedFCs),
        PanelSkeleton: findBy("label", "aside")(exportedFCs) || findBy(m => m.render.toString().includes("section"))(exportedForwardRefs),
        ButtonPrimary: findBy(m => m.displayName === "ButtonPrimary")(exportedForwardRefs),
        ButtonSecondary: findBy(m => m.displayName === "ButtonSecondary")(exportedForwardRefs),
        ButtonTertiary: findBy(m => m.displayName === "ButtonTertiary")(exportedForwardRefs),
        Snackbar: {
            wrapper: findBy("encore-light-theme", "elevated")(exportedFCs),
            simpleLayout: findBy("leading", "center", "trailing")(exportedFCs),
            ctaText: findBy("ctaText")(exportedFCs),
            styledImage: findBy("placeholderSrc")(exportedFCs),
        },
        Chip: findBy(m => m.render.toString().includes("invertedDark") && m.render.toString().includes("isUsingKeyboard"))(exportedForwardRefs),
        Toggle: findBy("onSelected", 'type:"checkbox"')(exportedFCs),
        Router: findBy("navigationType", "static")(exportedFCs),
        Routes: findBy(/\([\w$]+\)\{let\{children:[\w$]+,location:[\w$]+\}=[\w$]+/)(exportedFCs),
        Route: findBy(/^function [\w$]+\([\w$]+\)\{\(0,[\w$]+\.[\w$]+\)\(\!1\)\}$/)(exportedFCs),
        StoreProvider: findBy("notifyNestedSubs", "serverState")(exportedFCs),
        Cards,
        Menus,
        PlaylistMenu: Object.values(require(playlistMenuChunkID)).find(m => typeof m === "function" || typeof m === "object"),
        GenericModal: findBy("GenericModal")(exportedFCs),
        Tracklist: findBy("nrValidItems")(exportedMemos),
        TracklistRow: findBy("track-icon")(exportedMemos),
    };
};
const exposeURI = ({ require, chunks }) => {
    const [URIModuleID] = chunks.find(([id, v]) => v.toString().includes("Invalid Spotify URI!") && Object.keys(require(id)).length > 1);
    const URIModule = require(URIModuleID);
    const [Types, ...vs] = Object.values(URIModule);
    const TypesKeys = Object.keys(Types);
    const isTestFn = fn => TypesKeys.some(t => fn.toString().includes(`${t}}`));
    const isCreateFn = fn => TypesKeys.some(t => fn.toString().includes(`${t},`));
    const CaseLikeThis = s => s.split("_").map(capitalize).join("");
    const fnsByType = Object.groupBy(vs, fn => (isTestFn(fn) ? "test" : isCreateFn(fn) ? "create" : undefined));
    const is = Object.fromEntries(fnsByType.test.map(fn => [CaseLikeThis(fn.toString().match(/([\w_\d]{2,})\}/)[1]), fn]));
    const create = Object.fromEntries(fnsByType.create.map(fn => [CaseLikeThis(fn.toString().match(/([\w_\d]{2,})\,/)[1]), fn]));
    const uniqueFns = fnsByType[undefined];
    const findAndExcludeBy = (...strings) => {
        const i = uniqueFns.findIndex(f => strings.every(str => f.toString().includes(str)));
        return uniqueFns.splice(i, 1)[0];
    };
    const isSameIdentity = findAndExcludeBy("PLAYLIST");
    const urlEncode = findAndExcludeBy(".URI");
    const idToHex = findAndExcludeBy("22===");
    const hexToId = findAndExcludeBy("32===");
    const from = findAndExcludeBy("allowedTypes");
    const fromString = findAndExcludeBy("Argument `uri` must be a string.");
    return {
        Types,
        isSameIdentity,
        urlEncode,
        idToHex,
        hexToId,
        from,
        fromString,
        is: Object.assign(is, {
            PlaylistV1OrV2: uniqueFns[0],
        }),
        create,
    };
};
const exposeWebpack = () => {
    const require = globalThis.webpackChunkclient_web.push([[Symbol()], {}, re => re]);
    const chunks = Object.entries(require.m);
    const modules = chunks.map(([id]) => require(id));
    const exports = modules
        .filter(module => typeof module === "object")
        .flatMap(module => {
        try {
            return Object.values(module);
        }
        catch (_) { }
    })
        .filter(Boolean);
    // biome-ignore lint/complexity/noBannedTypes: ffs
    const isFunction = (obj) => typeof obj === "function";
    const exportedFunctions = exports.filter(isFunction);
    const exportedReactObjects = Object.groupBy(exports, x => x.$$typeof);
    const exportedContexts = exportedReactObjects[Symbol.for("react.context")];
    const exportedForwardRefs = exportedReactObjects[Symbol.for("react.forward_ref")];
    const exportedMemos = exportedReactObjects[Symbol.for("react.memo")];
    return {
        require,
        chunks,
        modules,
        exports,
        exportedFunctions,
        exportedContexts,
        exportedForwardRefs,
        exportedMemos,
    };
};
// TODO: extract functions
export function expose({ Snackbar, Platform }) {
    const webpack = exposeWebpack();
    const { require, chunks, modules, exports, exportedFunctions, exportedContexts, exportedForwardRefs, exportedMemos } = webpack;
    const [ReactRouterModuleID] = chunks.find(([_, v]) => v.toString().includes("React Router"));
    const ReactRouterModule = Object.values(require(ReactRouterModuleID));
    // https://github.com/remix-run/react-router/blob/main/packages/react-router/lib/hooks.tsx#L131
    const useMatch = findBy("let{pathname:", /\(([\w_\$][\w_\$\d]*),([\w_\$][\w_\$\d]*)\)\),\[\2,\1\]/)(ReactRouterModule);
    const useContextMenuState = findBy("useContextMenuState")(exportedFunctions);
    const enqueueCustomSnackbar = findBy("enqueueCustomSnackbar", "headless")(exportedFunctions);
    const React = modules.find(m => m.createElement);
    const ReactJSX = modules.find(m => m.jsx);
    const ReactDOM = modules.find(m => m.createRoot);
    const ReactDOMServer = modules.find(m => m.renderToString);
    const Color = Object.assign(findBy("static fromHex")(exportedFunctions), { CSSFormat: exports.find(m => m.RGBA) });
    const [classnamesModuleID] = chunks.find(([_, v]) => v.toString().includes("[native code]") && !v.toString().includes("<anonymous>"));
    const classnames = require(classnamesModuleID);
    const ReactHooks = {
        DragHandler: findBy("dataTransfer", "data-dragging")(exportedFunctions),
        useExtractedColor: exportedFunctions.find(m => m.toString().includes("extracted-color") || (m.toString().includes("colorRaw") && m.toString().includes("useEffect"))),
    };
    const [infiniteQueryChunkID] = chunks.find(([_, v]) => v.toString().includes("fetchPreviousPage") && v.toString().includes("getOptimisticResult"));
    const ReactQuery = {
        PersistQueryClientProvider: findBy("persistOptions")(exportedFunctions),
        QueryClient: findBy("defaultMutationOptions")(exportedFunctions),
        QueryClientProvider: findBy("use QueryClientProvider")(exportedFunctions),
        notifyManager: modules.find(m => m.setBatchNotifyFunction),
        useMutation: findBy("mutateAsync")(exportedFunctions),
        useQuery: findBy(/^function [\w_\$][\w_\$\d]*\(([\w_\$][\w_\$\d]*),([\w_\$][\w_\$\d]*)\)\{return\(0,[\w_\$][\w_\$\d]*\.[\w_\$][\w_\$\d]*\)\(\1,[\w_\$][\w_\$\d]*\.[\w_\$][\w_\$\d]*,\2\)\}$/)(exportedFunctions),
        useQueryClient: findBy("client", "Provider", "mount")(exportedFunctions),
        useSuspenseQuery: findBy("throwOnError", "suspense", "enabled")(exportedFunctions),
        useInfiniteQuery: Object.values(require(infiniteQueryChunkID)).find(m => typeof m === "function"),
    };
    const ReactFlipToolkit = {
        Flipper: exportedFunctions.find(m => m.prototype?.getSnapshotBeforeUpdate),
        Flipped: exportedFunctions.find(m => m.displayName === "Flipped"),
    };
    const SnackbarProvider = findBy("enqueueSnackbar called with invalid argument")(exportedFunctions);
    const useSnackbar = findBy(/^function\(\)\{return\(0,[\w$]+\.useContext\)\([\w$]+\)\}$/)(exportedFunctions);
    const _reservedPanelIds = exports.find(m => m.BuddyFeed);
    const Mousetrap = modules.find(m => m.addKeycodes);
    const Locale = exports.find(m => m.getTranslations);
    const createUrlLocale = findBy("has", "baseName", "language")(exportedFunctions);
    const imageAnalysis = findBy(/\![\w$]+\.isFallback|\{extractColor/)(exportedFunctions);
    const fallbackPreset = exports.find(m => m.colorDark);
    const extractColorPreset = async (image) => {
        const analysis = await imageAnalysis(Platform.getGraphQLLoader(), image);
        for (const result of analysis) {
            if ("isFallback" in result === false) {
                result.isFallback = fallbackPreset === result; // Why ?
            }
        }
        return analysis;
    };
    return {
        webpack,
        useMatch,
        useContextMenuState,
        enqueueCustomSnackbar,
        React,
        ReactJSX,
        ReactDOM,
        ReactDOMServer,
        classnames,
        Color,
        ReactComponents: exposeReactComponents(webpack, React, Platform),
        ReactHooks,
        ReactQuery,
        ReactFlipToolkit,
        SnackbarProvider,
        useSnackbar,
        _reservedPanelIds,
        Mousetrap,
        Locale,
        createUrlLocale,
        Snackbar,
        URI: exposeURI(webpack),
        extractColorPreset,
    };
}
