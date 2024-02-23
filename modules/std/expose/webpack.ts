import { fp } from "/hooks/deps.js";
import { findBy } from "/hooks/util.js";

import type { EnqueueSnackbar, OptionsObject } from "notistack";
import type { NamedExoticComponent, ForwardRefExoticComponent, Context } from "react";
import type { Flipped, Flipper } from "react-flip-toolkit";
import type { SnackbarProvider, useSnackbar } from "notistack";
import type _Snackbar from "notistack";
export type Snackbar = typeof _Snackbar;
import type _React from "react";
export type React = typeof _React;
import type _ReactDOM from "react-dom";
export type ReactDOM = typeof _ReactDOM;
import type _ReactDOMServer from "react-dom/server";
export type ReactDOMServer = typeof _ReactDOMServer;
import type _classNames from "classnames";
export type classNames = typeof _classNames;
import type { QueryClient, QueryClientProvider, notifyManager, useMutation, useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import type _Mousetrap from "mousetrap";
export type Mousetrap = typeof _Mousetrap;
import type { Platform } from "./platform.js";

type ParsableAsURI = any;

type IsThisURIType<A extends keyof URITypes> = (url: ParsableAsURI) => url is URIClass<A>;

type URIClass<A extends keyof URITypes> = any;

export type URITypes = {
	AD: "ad";
	ALBUM: "album";
	GENRE: "genre";
	QUEUE: "queue";
	APPLICATION: "application";
	ARTIST: "artist";
	ARTIST_TOPLIST: "artist-toplist";
	ARTIST_CONCERTS: "artist-concerts";
	AUDIO_FILE: "audiofile";
	COLLECTION: "collection";
	COLLECTION_ALBUM: "collection-album";
	COLLECTION_ARTIST: "collection-artist";
	COLLECTION_MISSING_ALBUM: "collection-missing-album";
	COLLECTION_TRACK_LIST: "collectiontracklist";
	CONCEPT: "concept";
	CONCERT: "concert";
	CONTEXT_GROUP: "context-group";
	CULTURAL_MOMENT: "cultural-moment";
	DAILY_MIX: "dailymix";
	EMPTY: "empty";
	EPISODE: "episode";
	FACEBOOK: "facebook";
	FOLDER: "folder";
	FOLLOWERS: "followers";
	FOLLOWING: "following";
	IMAGE: "image";
	INBOX: "inbox";
	INTERRUPTION: "interruption";
	LIBRARY: "library";
	LIVE: "live";
	ROOM: "room";
	EXPRESSION: "expression";
	LOCAL: "local";
	LOCAL_TRACK: "local";
	LOCAL_ALBUM: "local-album";
	LOCAL_ARTIST: "local-artist";
	MERCH: "merch";
	MERCHHUB: "merchhub";
	MOSAIC: "mosaic";
	PLAYLIST: "playlist";
	PLAYLIST_V2: "playlist-v2";
	PRERELEASE: "prerelease";
	PROFILE: "profile";
	PUBLISHED_ROOTLIST: "published-rootlist";
	RADIO: "radio";
	ROOTLIST: "rootlist";
	SEARCH: "search";
	SHOW: "show";
	SOCIAL_SESSION: "socialsession";
	SPECIAL: "special";
	STARRED: "starred";
	STATION: "station";
	TEMP_PLAYLIST: "temp-playlist";
	TOPLIST: "toplist";
	TRACK: "track";
	TRACKSET: "trackset";
	USER_TOPLIST: "user-toplist";
	USER_TOP_TRACKS: "user-top-tracks";
	UNKNOWN: "unknown";
	VIDEO: "video";
	MEDIA: "media";
	QUESTION: "question";
	POLL: "poll";
	RESPONSE: "response";
	COURSE: "course";
	LESSON: "lesson";
	CANVAS: "canvas";
};

type WebpackRequire = any;

export type ExposedWebpack = ReturnType<typeof expose>;

// TODO: extract functions
export function expose({ Snackbar, Platform }: { Snackbar: Snackbar; Platform: Platform }) {
	const require = globalThis.webpackChunkclient_web.push([[Symbol()], {}, re => re]) as WebpackRequire;
	const chunks = Object.entries(require.m);
	const modules = chunks.map(([id]) => require(id));
	const exports = modules
		.filter(module => typeof module === "object")
		.flatMap(module => {
			try {
				return Object.values(module);
			} catch (_) {}
		})
		.filter(Boolean) as any[];

	// biome-ignore lint/complexity/noBannedTypes: ffs
	const isFunction = (obj): obj is Function => typeof obj === "function";
	const exportedFunctions = exports.filter(isFunction);

	const exportedReactObjects = Object.groupBy(exports, x => x.$$typeof);
	const exportedContexts = exportedReactObjects[Symbol.for("react.context") as any] as Array<Context<any>>;
	const exportedForwardRefs = exportedReactObjects[Symbol.for("react.forward_ref") as any] as Array<ForwardRefExoticComponent<any>>;
	const exportedMemos = exportedReactObjects[Symbol.for("react.memo") as any] as Array<NamedExoticComponent>;

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

	const menus = Object.fromEntries(
		exportedMemos.flatMap(m => {
			const str = (m as any).type.toString();
			const match = str.match(/value:"([\w-]+)"/);
			const name = match?.[1] ?? "";
			const type = {
				album: "Album",
				show: "PodcastShow",
				artist: "Artist",
				track: "Track",
			}[name];
			return type ? [[`${type}Menu`, m]] : [];
		}),
	);

	const cards = Object.fromEntries(
		exports
			.flatMap(m => {
				try {
					const str = m.toString();
					const match = str.match(/featureIdentifier:"([^"]+)"/);
					if (!match) return [];
					const name = match[1];
					const type = name[0].toUpperCase() + name.slice(1);
					return [[type, m]];
				} catch (e) {
					return [];
				}
			})
			.concat([["Profile", exportedMemos.find(m => (m as any).type.toString().includes(`featureIdentifier:"profile"`))]]),
	);

	type FN_enqueueCustomSnackbar_OPTS = (Omit<OptionsObject, "key"> & { keyPrefix: string }) | (OptionsObject & { identifier: string });
	const enqueueCustomSnackbar = findBy("enqueueCustomSnackbar", "headless")(exportedFunctions) as (
		element: React.ReactElement,
		opts: FN_enqueueCustomSnackbar_OPTS,
	) => ReturnType<EnqueueSnackbar>;

	const React = modules.find(m => m.createElement) as React;
	const ReactJSX = modules.find(m => m.jsx);
	const ReactDOM = modules.find(m => m.createRoot) as ReactDOM;
	const ReactDOMServer = modules.find(m => m.renderToString) as ReactDOMServer;
	const Color = Object.assign(findBy("static fromHex")(exportedFunctions), { CSSFormat: exports.find(m => m.RGBA) });

	const [classnamesModuleID] = chunks.find(([_, v]) => v.toString().includes("[native code]") && !v.toString().includes("<anonymous>"));
	const classnames = require(classnamesModuleID) as classNames;

	const [ContextMenuModuleID] = chunks.find(([_, v]) => v.toString().includes("toggleContextMenu"));
	const [playlistMenuChunkID] = chunks.find(
		([, v]) => v.toString().includes('value:"playlist"') && v.toString().includes("canView") && v.toString().includes("permissions"),
	);
	// const [dropdownChunkID] = chunks.find(([, v]) => v.toString().includes("dropDown") && v.toString().includes("isSafari"));

	const RemoteConfigProvider = findBy("resolveSuspense", "configuration")(exportedFunctions);
	const SliderComponent = exportedFunctions.find(
		m => m.toString().includes("onStepBackward") && !m.toString().includes("volume"),
	) as () => React.JSX.Element;

	const ReactComponents = {
		SettingColumn: findBy("setSectionFilterMatchQueryValue", "filterMatchQuery")(exportedFunctions),
		SettingText: findBy("textSubdued", "dangerouslySetInnerHTML")(exportedFunctions),
		SettingToggle: findBy("condensed", "onSelected")(exportedFunctions),
		IconComponent: findBy("$iconColor", 'role:"img"')(exportedFunctions),
		Text: exportedForwardRefs.find(m => (m as any).render.toString().includes("paddingBottom") && (m as any).render.toString().includes("className")),
		TextComponent: exports.find(m => m.h1 && m.render),
		PlaylistMenu: Object.values(require(playlistMenuChunkID)).find(m => typeof m === "function" || typeof m === "object"),
		// Dropdown: Object.values(require(dropdownChunkID)).find(m => typeof m === "function"),
		ContextMenu: Object.values(require(ContextMenuModuleID))[0],
		ConfirmDialog: findBy("isOpen", "shouldCloseOnEsc", "onClose")(exportedFunctions),
		Tooltip: findBy("hover-or-focus", "tooltip")(exportedFunctions),
		Menu: findBy("getInitialFocusElement", "children")(exportedFunctions),
		MenuItem: findBy("handleMouseEnter", "onClick")(exportedFunctions),
		MenuItemSubMenu: findBy("subMenuIcon")(exportedFunctions),
		Slider: React.createElement(props =>
			React.createElement(
				RemoteConfigProvider as any,
				{ configuration: Platform.getRemoteConfiguration() },
				React.createElement(SliderComponent, props),
			),
		),
		RemoteConfigProvider,
		RightClickMenu: findBy("action", "open", "trigger", "right-click")(exportedFunctions),
		PanelHeader: exportedFunctions.find(m => m.toString().includes("panel") && m.toString().includes("actions")),
		PanelContent:
			findBy(m => m.render.toString().includes("scrollBarContainer"))(exportedForwardRefs) || findBy("scrollBarContainer")(exportedFunctions),
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
		useExtractedColor: exportedFunctions.find(
			m => m.toString().includes("extracted-color") || (m.toString().includes("colorRaw") && m.toString().includes("useEffect")),
		),
	};

	const [infiniteQueryChunkID] = chunks.find(([_, v]) => v.toString().includes("fetchPreviousPage") && v.toString().includes("getOptimisticResult"));

	const ReactQuery = {
		PersistQueryClientProvider: findBy("persistOptions")(exportedFunctions),
		QueryClient: findBy("defaultMutationOptions")(exportedFunctions) as unknown as QueryClient,
		QueryClientProvider: findBy("use QueryClientProvider")(exportedFunctions) as typeof QueryClientProvider,
		notifyManager: modules.find(m => m.setBatchNotifyFunction) as typeof notifyManager,
		useMutation: findBy("mutateAsync")(exportedFunctions) as typeof useMutation,
		useQuery: findBy(/^function [\w_$]+\(([\w_$]+),([\w_$]+)\)\{return\(0,[\w_$]+\.[\w_$]+\)\(\1,[\w_$]+\.[\w_$]+,\2\)\}$/)(
			exportedFunctions,
		) as typeof useQuery,
		useQueryClient: findBy("client", "Provider", "mount")(exportedFunctions) as typeof useQueryClient,
		useSuspenseQuery: findBy("throwOnError", "suspense", "enabled")(exportedFunctions),
		useInfiniteQuery: Object.values(require(infiniteQueryChunkID)).find(m => typeof m === "function") as typeof useInfiniteQuery,
	};

	const ReactFlipToolkit = {
		Flipper: exportedFunctions.find(m => m.prototype?.getSnapshotBeforeUpdate) as unknown as Flipper,
		Flipped: exportedFunctions.find(m => (m as any).displayName === "Flipped") as typeof Flipped,
	};

	const SnackbarProvider = findBy("enqueueSnackbar called with invalid argument")(exportedFunctions) as unknown as SnackbarProvider;
	const useSnackbar = findBy(/^function\(\)\{return\(0,[\w$]+\.useContext\)\([\w$]+\)\}$/)(exportedFunctions) as typeof useSnackbar;

	const _reservedPanelIds = exports.find(m => m.BuddyFeed) as Record<string, number>;
	const Mousetrap = modules.find(m => m.addKeycodes) as Mousetrap;
	const Locale = exports.find(m => m.getTranslations);
	const createUrlLocale = findBy("has", "baseName", "language")(exportedFunctions);

	const [URIModuleID] = chunks.find(([id, v]) => v.toString().includes("Invalid Spotify URI!") && Object.keys(require(id)).length > 1);
	const URIModule = require(URIModuleID);
	// biome-ignore lint/complexity/noBannedTypes: ffs
	const [Types, ...vs] = Object.values(URIModule) as [URITypes, ...Function[]];
	const TypesKeys = Object.keys(Types);

	const isTestFn = fn => TypesKeys.some(t => fn.toString().includes(`${t}}`));
	const isCreateFn = fn => TypesKeys.some(t => fn.toString().includes(`${t},`));

	const CaseLikeThis = s => s.split("_").map(fp.capitalize).join("");

	const fnsByType = Object.groupBy(vs, fn => (isTestFn(fn) ? "test" : isCreateFn(fn) ? "create" : undefined));
	const is = Object.fromEntries(fnsByType.test.map(fn => [CaseLikeThis(fn.toString().match(/([\w_\d]{2,})\}/)[1]), fn])) as {
		Ad: IsThisURIType<any>;
		Album: IsThisURIType<any>;
		Application: IsThisURIType<any>;
		Artist: IsThisURIType<any>;
		CollectionAlbum: IsThisURIType<any>;
		CollectionArtist: IsThisURIType<any>;
		Collection: IsThisURIType<any>;
		Concert: IsThisURIType<any>;
		Episode: IsThisURIType<any>;
		Folder: IsThisURIType<any>;
		LocalTrack: IsThisURIType<any>;
		Playlist: IsThisURIType<any>;
		PlaylistV2: IsThisURIType<any>;
		Profile: IsThisURIType<any>;
		Radio: IsThisURIType<any>;
		Show: IsThisURIType<any>;
		SocialSession: IsThisURIType<any>;
		Station: IsThisURIType<any>;
		Track: IsThisURIType<any>;
	};
	const create = Object.fromEntries(fnsByType.create.map(fn => [CaseLikeThis(fn.toString().match(/([\w_\d]{2,})\,/)[1]), fn])) as {
		Album: any;
		Application: any;
		Artist: any;
		CollectionAlbum: any;
		CollectionArtist: any;
		Collection: any;
		Concert: any;
		Episode: any;
		Folder: any;
		LocalAlbum: any;
		LocalArtist: any;
		PlaylistV2: any;
		Prerelease: any;
		Profile: any;
		Queue: any;
		Search: any;
		Show: any;
		SocialSession: any;
		Station: any;
		Track: any;
		UserToplist: any;
	};
	const uniqueFns = fnsByType[undefined as keyof typeof fnsByType];

	const findAndExcludeBy = (...strings) => {
		const i = uniqueFns.findIndex(f => strings.every(str => f.toString().includes(str)));
		return uniqueFns.splice(i, 1)[0];
	};

	const isSameIdentity = findAndExcludeBy("PLAYLIST") as (a: ParsableAsURI, b: ParsableAsURI) => boolean;
	const urlEncode = findAndExcludeBy(".URI") as (str: string) => string;
	const idToHex = findAndExcludeBy("22===") as (str: string) => string;
	const hexToId = findAndExcludeBy("32===") as (str: string) => string;
	const from = findAndExcludeBy("allowedTypes") as (uri: ParsableAsURI) => URIClass<any>;
	const fromString = findAndExcludeBy("Argument `uri` must be a string.") as (str: string) => URIClass<any>;

	const URI = {
		Types,
		isSameIdentity,
		urlEncode,
		idToHex,
		hexToId,
		from,
		fromString,
		is: Object.assign(is, {
			PlaylistV1OrV2: uniqueFns[0] as IsThisURIType<any>,
		}),
		create,
	};

	const imageAnalysis = findBy(/\![\w$]+\.isFallback|\{extractColor/)(exportedFunctions);
	const fallbackPreset = exports.find(m => m.colorDark);
	const extractColorPreset = async image => {
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
