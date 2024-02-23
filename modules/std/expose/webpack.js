import { fp } from "/hooks/deps.js";
import { findBy } from "/hooks/util.js";
// TODO: extract functions
export function expose({ Snackbar, Platform }) {
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
    const webpack = {
        require,
        chunks,
        modules,
        exports,
        exportedFunctions,
        exportedContexts,
        exportedForwardRefs,
        exportedMemos,
    };
    const useContextMenuState = findBy("useContextMenuState")(exportedFunctions);
    const menus = Object.fromEntries(exportedMemos.flatMap(m => {
        const str = m.type.toString();
        const match = str.match(/value:"([\w-]+)"/);
        const name = match?.[1] ?? "";
        const type = {
            album: "Album",
            show: "PodcastShow",
            artist: "Artist",
            track: "Track",
        }[name];
        return type ? [[`${type}Menu`, m]] : [];
    }));
    const cards = Object.fromEntries(exports
        .flatMap(m => {
        try {
            const str = m.toString();
            const match = str.match(/featureIdentifier:"([^"]+)"/);
            if (!match)
                return [];
            const name = match[1];
            const type = name[0].toUpperCase() + name.slice(1);
            return [[type, m]];
        }
        catch (e) {
            return [];
        }
    })
        .concat([["Profile", exportedMemos.find(m => m.type.toString().includes(`featureIdentifier:"profile"`))]]));
    const enqueueCustomSnackbar = findBy("enqueueCustomSnackbar", "headless")(exportedFunctions);
    const React = modules.find(m => m.createElement);
    const ReactJSX = modules.find(m => m.jsx);
    const ReactDOM = modules.find(m => m.createRoot);
    const ReactDOMServer = modules.find(m => m.renderToString);
    const Color = Object.assign(findBy("static fromHex")(exportedFunctions), { CSSFormat: exports.find(m => m.RGBA) });
    const [classnamesModuleID] = chunks.find(([_, v]) => v.toString().includes("[native code]") && !v.toString().includes("<anonymous>"));
    const classnames = require(classnamesModuleID);
    const [ContextMenuModuleID] = chunks.find(([_, v]) => v.toString().includes("toggleContextMenu"));
    const [playlistMenuChunkID] = chunks.find(([, v]) => v.toString().includes('value:"playlist"') && v.toString().includes("canView") && v.toString().includes("permissions"));
    // const [dropdownChunkID] = chunks.find(([, v]) => v.toString().includes("dropDown") && v.toString().includes("isSafari"));
    const RemoteConfigProvider = findBy("resolveSuspense", "configuration")(exportedFunctions);
    const SliderComponent = exportedFunctions.find(m => m.toString().includes("onStepBackward") && !m.toString().includes("volume"));
    const ReactComponents = {
        SettingColumn: findBy("setSectionFilterMatchQueryValue", "filterMatchQuery")(exportedFunctions),
        SettingText: findBy("textSubdued", "dangerouslySetInnerHTML")(exportedFunctions),
        SettingToggle: findBy("condensed", "onSelected")(exportedFunctions),
        IconComponent: findBy("$iconColor", 'role:"img"')(exportedFunctions),
        Text: exportedForwardRefs.find(m => m.render.toString().includes("paddingBottom") && m.render.toString().includes("className")),
        TextComponent: exports.find(m => m.h1 && m.render),
        PlaylistMenu: Object.values(require(playlistMenuChunkID)).find(m => typeof m === "function" || typeof m === "object"),
        // Dropdown: Object.values(require(dropdownChunkID)).find(m => typeof m === "function"),
        ContextMenu: Object.values(require(ContextMenuModuleID))[0],
        ConfirmDialog: findBy("isOpen", "shouldCloseOnEsc", "onClose")(exportedFunctions),
        Tooltip: findBy("hover-or-focus", "tooltip")(exportedFunctions),
        Menu: findBy("getInitialFocusElement", "children")(exportedFunctions),
        MenuItem: findBy("handleMouseEnter", "onClick")(exportedFunctions),
        MenuItemSubMenu: findBy("subMenuIcon")(exportedFunctions),
        Slider: React.createElement(props => React.createElement(RemoteConfigProvider, { configuration: Platform.getRemoteConfiguration() }, React.createElement(SliderComponent, props))),
        RemoteConfigProvider,
        RightClickMenu: findBy("action", "open", "trigger", "right-click")(exportedFunctions),
        PanelHeader: exportedFunctions.find(m => m.toString().includes("panel") && m.toString().includes("actions")),
        PanelContent: findBy(m => m.render.toString().includes("scrollBarContainer"))(exportedForwardRefs) || findBy("scrollBarContainer")(exportedFunctions),
        PanelSkeleton: findBy("label", "aside")(exportedFunctions) || findBy(m => m.render.toString().includes("section"))(exportedForwardRefs),
        ButtonPrimary: findBy(m => m.displayName === "ButtonPrimary")(exportedForwardRefs),
        ButtonSecondary: findBy(m => m.displayName === "ButtonSecondary")(exportedForwardRefs),
        ButtonTertiary: findBy(m => m.displayName === "ButtonTertiary")(exportedForwardRefs),
        Snackbar: {
            wrapper: findBy("encore-light-theme", "elevated")(exportedFunctions),
            simpleLayout: findBy("leading", "center", "trailing")(exportedFunctions),
            ctaText: findBy("ctaText")(exportedFunctions),
            styledImage: findBy("placeholderSrc")(exportedFunctions),
        },
        Chip: findBy(m => m.render.toString().includes("invertedDark") && m.render.toString().includes("isUsingKeyboard"))(exportedForwardRefs),
        Toggle: findBy("onSelected", 'type:"checkbox"')(exportedFunctions),
        Cards: {
            Default: findBy('"card-click-handler"')(exportedFunctions),
            Hero: findBy('"herocard-click-handler"')(exportedFunctions),
            CardImage: findBy("isHero", "withWaves")(exportedFunctions),
            ...cards,
        },
        Router: findBy("navigationType", "static")(exportedFunctions),
        Routes: findBy(/\([\w$]+\)\{let\{children:[\w$]+,location:[\w$]+\}=[\w$]+/)(exportedFunctions),
        Route: findBy(/^function [\w$]+\([\w$]+\)\{\(0,[\w$]+\.[\w$]+\)\(\!1\)\}$/)(exportedFunctions),
        StoreProvider: findBy("notifyNestedSubs", "serverState")(exportedFunctions),
        ...menus,
        GenericModal: findBy("GenericModal")(exportedFunctions),
    };
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
        useQuery: findBy(/^function [\w_$]+\(([\w_$]+),([\w_$]+)\)\{return\(0,[\w_$]+\.[\w_$]+\)\(\1,[\w_$]+\.[\w_$]+,\2\)\}$/)(exportedFunctions),
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
    const [URIModuleID] = chunks.find(([id, v]) => v.toString().includes("Invalid Spotify URI!") && Object.keys(require(id)).length > 1);
    const URIModule = require(URIModuleID);
    // biome-ignore lint/complexity/noBannedTypes: ffs
    const [Types, ...vs] = Object.values(URIModule);
    const TypesKeys = Object.keys(Types);
    const isTestFn = fn => TypesKeys.some(t => fn.toString().includes(`${t}}`));
    const isCreateFn = fn => TypesKeys.some(t => fn.toString().includes(`${t},`));
    const CaseLikeThis = s => s.split("_").map(fp.capitalize).join("");
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
    const URI = {
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
        useContextMenuState,
        enqueueCustomSnackbar,
        React,
        ReactJSX,
        ReactDOM,
        ReactDOMServer,
        classnames,
        Color,
        ReactComponents,
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
        URI,
        extractColorPreset,
    };
}
