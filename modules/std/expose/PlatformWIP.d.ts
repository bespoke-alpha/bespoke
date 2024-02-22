// CREDITS: ririxi

export type Get<A> = () => A;

export type PlatformWIP = {
	version: string;
	container: string;
	operatingSystem: "macOS" | "Windows" | "Linux" | "Chrome OS" | "Other";
	isDeveloperMode: boolean;
	isVideoSupported: boolean;
	enableCastConnect: boolean;
	initialUser: InitialUser;
	initialProductState: {
		[key: string]: any;
	};
	getServiceWorkerMessenger: Promise<any>;
	getSession: Get<Session>;
	getTransport: Get<Transport>;
	getEventSender: Get<EventSender>;
	getTranslations: Get<Translations>;
	getFeatureFlags: Get<FeatureFlags>;
	getHistory: Get<History>;
	getAdManagers: Get<AdManagers>;
	getRemoteConfiguration: Get<RemoteConfiguration>;
	getActionStoreAPI: Get<ActionStoreAPI>;
	getAuthorizationAPI: Get<AuthorizationAPI>;
	getClipboardAPI: Get<ClipboardAPI>;
	getConnectAPI: Get<ConnectAPI>;
	getSocialConnectAPI: Get<SocialConnectAPI>;
	getControlMessageAPI: Get<ControlMessageAPI>;
	getFacebookAPI: Get<FacebookAPI>;
	getFollowAPI: Get<FollowAPI>;
	// idk
	getGraphQLLoader: Get<(t, n, o = {}) => Promise<any>>;
	getLibraryAPI: Get<LibraryAPI>;
	getCurationAPI: Get<CurationAPI>;
	getLocalFilesAPI: Get<LocalFilesAPI>;
	getOfflineAPI: Get<OfflineAPI>;
	getPlatformData: Get<PlatformData>;
	getPlayerAPI: Get<PlayerAPI>;
	getShuffleAPI: Get<ShuffleAPI>;
	getPlayHistoryAPI: Get<PlayHistoryAPI>;
	getPlaylistAPI: Get<PlaylistAPI>;
	getPlaylistPermissionsAPI: Get<PlaylistPermissionsAPI>;
	getPrivateSessionAPI: Get<PrivateSessionAPI>;
	getPubSubAPI: Get<PubSubAPI>;
	getRecentlyPlayedAPI: Get<RecentlyPlayedAPI>;
	getReportAPI: Get<ReportAPI>;
	getRootlistAPI: Get<RootlistAPI>;
	getSegmentsAPI: Get<SegmentsAPI>;
	getShowAPI: Get<ShowAPI>;
	getAudiobooksPremiumConsumptionCapObserverAPI: Get<AudiobooksPremiumConsumptionCapObserverAPI>;
	getUpdateAPI: Get<UpdateAPI>;
	getUserAPI: Get<UserAPI>;
	getVideoAPI: Get<VideoAPI>;
	// TODO: empty object rn;
	getSEOExperiments: Get<any>;
	getSingAlongAPI: Get<SingAlongAPI>;
	getPlaybackAPI: Get<PlayHistoryAPI>;
	getUBILogger: Get<UBILogger>;
	getCollectionPlatformAPI: Get<CollectionPlatformAPI>;
	getLocalStorageAPI: Get<LocalStorageAPI>;
	getIndexedDbAPI: Get<IndexedDbAPI>;
	getEqualizerAPI: Get<EqualizerAPI>;
	getBuddyFeedAPI: Get<BuddyFeedAPI>;
	getSettingsAPI: Get<SettingsAPI>;
	getRequestBuilder: Get<RequestBuilder>;
};
type InitialUser = {
	displayName: string;
	images: { url: string; width: number; height: number }[];
	type: string;
	uri: string;
	username: string;
};
class VideoAPI {
	_cosmos: any;
	_eventSender: any;
	_events: any;
	_factories: any[];
	_hasMinimizeBitrateSupport: boolean;
	_hasPipSupport: boolean;
	_hasSubtitleSupport: boolean;
	_offlineCoordinator: any;
	_pendingEventsService: any;
	_pictureInPictureState: boolean;
	_playbackService: any;
	_prefsClient: any;
	_productStateService: any;
	_resolver: any;
	_scrobbleService: any;
	_showService: any;
	_subtitleLanguages: [];
	_videoContainer: any;

	createOfflineCoordinator(e): Promise<any>;
	createPlayerConfiguration(): Promise<any>;
	createVideoCoordinator(e): Promise<any>;
	getAccessToken(): any;
	getCapabilities(): any;
	getEvents(): any;
	getPictureInPictureState(): any;
	getPreferredSubtitleLanguage(): any;
	getProductState(): Promise<any>;
	getSubtitleLanguages(): Promise<any>;
	initialize(): Promise<any>;
	onManifestLoaded({ availableSubtitles: e }): void;
	onPictureInPictureChanged({ pictureInPicture: e }): void;
	reportVideMode(e): any;
	setFullscreen(e): any;
	setMinimizeBitrate(e): any;
	setPip(e): any;
	setPreferredSubtitleLanguage(e): any;
	setSubtitleLanguages(e): any;
	setWindow(e): any;
	videoModeToSurface(e): any;
}
class UserAPI {
	_cosmos: any;
	_events: any;
	_product_state_service: any;

	getEvents(): any;
	getProductState(): any;
	getUser(): Promise<InitialUser>;
}
class UpdateAPI {
	_cosmos: any;

	applyUpdate(): Promise<any>;
	getVersionInfo(): Promise<any>;
	prepareUpdate(): Promise<any>;
	subscribe(e): any;
}
class UBILogger {
	formatUiNavigateEvent: function;
	ubiLogger: {
		authenticateProvider: {
			isAuthenticated: function;
		};
		contextualProviders: {
			playContextUriProvider: {
				getPlayContextUri: function;
			};
			playbackIdProvider: {
				getPlaybackId: function;
			};
		};
		disableAutoBackgroundMonitoring: boolean;
		eventSender: any;
		pageInstanceIdProvider: {
			storageManager: storageManager;
		};
		pageUriProvider: {
			storageManager: storageManager;
		};
		pageViewLogger: any;
		storageManager: storageManager;
	};

	getPageInstanceId(): any;
	logImpression(e): any;
	logInteraction(e): any;
	logNavigation(e, t): any;
	logNavigationEnd(e): any;
	logNavigationStart(e): any;
	registerEventListeners(): any;
	unregisterEventListeners(): any;
}
class storageManager {
	storageAdapter: {
		items: {
			[key: string]: string;
		};
	};

	clear(): void;
	getItem(e): any;
	getStorageType(): any;
	removeItem(e): any;
	setItem(e, t): any;
}
class Transport {
	authenticate(): any;
	_Fetch: any;
	_XHR: any;
	_authenticateCalled: true;
	_authenticateWithToken(): any;
	// TODO: idk it's null so...
	_authenticationPromise: null;
	_connectCalled: boolean;
	_connectToEndpoints(): any;
	_connectionObserver: connectionObserver;
	_counter: TransportCounter;
	_disableAutoLogout: boolean;
	_disconnectBeforeUnload: boolean;
	_endpoints: {
		dealer: string;
		webapi: string;
		webgate: string;
	};
	_endpointsProvider(e): any;
	// empty object
	_forcePolyfillTypes: any;
	_initTime: number;
	_isReconnecting: boolean;
	_lastDisconnect: number;
	_lastToken: string;
	_lastTokenExpiry: number;
	_listeners: any;
	_metaListeners: any;
	_onAuthenticated(): any;
	_onAuthenticationFailed(): any;
	_onConnected(): any;
	// empty object
	_ownerRef: any;
	_parseProvidedToken(): any;
	_pluginMediator: any;
	_plugins: any;
	_quickDisconnectCount: number;
	_reconnectTimeout: number;
	_reconnectionRetries: number;
	// TODO: idk it's null so...
	_refreshTokenPromise: null;
	_requestMode: string;
	_stateAwareListeners: any;
	_stateAwareOperationMetrics: any;
	_stateAwareRunners: {
		connected: null;
		authenticated: null;
		connection_id: null;
		transport_connect: null;
		transport_authenticate: null;
	};
	_stateMask: number;
	_tokenProvider(): Promise<any>;
}
class connectionObserver {
	_listeners: any;
	_metaListneers: any;
	_navigator: Navigator;

	isOnline(): any;
}
class TransportCounter {
	_baseTime: number;
	_ceiling: number;
	_curve: string;
	_jitter: boolean;

	getTime(e): any;
}
type Translations = {
	[key: string]: string;
};
class SocialConnectAPI {
	currentSession: null;
	events: any;
	serviceEvents: any;
	shortLinkCache: any;
	socialConnectServiceClient: any;
	socialConnectStatus: "DISABLED" | string;
	urlDispenserServiceClient: any;
}
class SingAlongAPI {
	karaokeServiceClient: karaokeServiceClient;

	getCapabilities(): any;
	getStatus(): Promise<any>;
	setStatus(e): Promise<any>;
	setVocalVolume(e): Promise<any>;
}
class karaokeServiceClient {
	// empty object
	options: any;
	transport: any;

	getStatus(e, t): any;
	postStatus(e, t): any;
	postVocalVolume(e, t): any;
	subscribeToEvents(e, t): any;
}
class ShuffleAPI {
	isSmartShuffleEnabled: boolean;
	_contextualShuffle: any;
	_events: any;
	_history: Get<History>;
	_isDsaEnabled: boolean;
	_player: Get<PlayerAPI>;
	_playlistDataServiceClient: any;
	_playlistServiceClient: any;
	_smartShuffleEligibility: any;
	_userApi: Get<UserAPI>;

	getAvailableShuffleModes(e): Promise<any>;
	getEvents(): any;
	getShuffle(e): Promise<any>;
	setShuffle(e, t): Promise<any>;
	_syncShuffle(e, t): Promise<any>;
}
class ShowAPI {
	capabilities: {
		canFilter: boolean;
		canGetDefaultSort: boolean;
		canSort: boolean;
	};
	remote_configuration: Get<RemoteConfiguration>;
	_events: any;
	_podcast_paywalls_client: any;
	_show_service_client: any;

	checkoutBook(e): Promise<any>;
	getAccessInfo(e): any;
	getBookContents(e): Promise<any>;
	getContents(e, t): Promise<any>;
	getEpisodeOrChapter(e): any;
	getEvents(): any;
	getMetadata(e): Promise<any>;
	getPlayerFilter(e): any;
	getPlayerSport(e): any;
}
type Session = {
	accessToken: string;
	accessTokenExpirationTimestampMs: number;
	isAnonymous: boolean;
	locale: string;
	market: string;
	valid: boolean;
};
class SegmentsAPI {
	_client: any;

	getArtists(): Promise<any>;
	getCapabilities(): any;
	getSegments(e, t, n): Promise<any>;
}
class RootlistAPI {
	_builder: any;
	_cache: null;
	_cosmos: any;
	_decorationCache: any;
	_events: any;
	_inFlightCache: any;

	add(e, t): Promise<any>;
	applyModification(e, t = !0): Promise<any>;
	contains(e): Promise<any>;
	containsSync(e): any;
	createFolder(e, t): Promise<any>;
	createPlaylist(e, t, n): Promise<any>;
	getCapabilities(): any;
	getContents(e): Promise<any>;
	getEvents(): any;
	getMetadata(): Promise<any>;
	getPublishedState(e): Promise<any>;
	move(e, t, n): Promise<any>;
	moveFolder(e, t): Promise<any>;
	onUpdateItems(e, t): any;
	remove(e): Promise<any>;
	removeFolder(e): Promise<any>;
	renameFolder(e, t): Promise<any>;
	setPublishedState(e, t): Promise<any>;
}
class ReportAPI {
	_playlistAPI: Get<PlaylistAPI>;
	_productState: any;

	canReportPlaylist(e, t): Promise<any>;
	getReportURL(e, t): Promise<any>;
	isURIReportable(e): Promise<any>;
}
class RemoteConfiguration {
	accessListeners: any;
	values: any;

	getValue(e): any;
	toBuilder(): any;
	toJSON(e = {}): any;
}
type ReduxStore = {
	"@@observable"(): any;
	dispatch(n): any;
	getState(): any;
	replaceReducer(e): any;
	subscribe(e): any;
};
class RecentlyPlayedAPI {
	_cancellable: null;
	_client: any;
	_contexts: null;
	_emitter: any;

	getContexts(): any;
}
class PubSubAPI {
	_connectionId: Promise<string>;
	_events: any;
	_isDeveloperMode: boolean;
	_messages: [];
	_subscribeToConnectionId(e): any;
	_subscribeToMessages(e, t, i): any;
	_subscriptions: any;

	cancelSubscription(e): Promise<any>;
	createSubscription(e, t, n): Promise<any>;
	getConnectionId(): any;
	getEvents(): any;
	getMessages(): any;
	getSubscriptions(): any;
	onConnectionId(e): any;
	refreshSubscription(e, t): Promise<any>;
	subscribe(e): any;
}
class PrivateSessionAPI {
	_scrobble: any;

	getCapabilities(): any;
	setPrivateSession(e): Promise<any>;
	subscribeToPrivateSession(e): any;
}
class PlaylistPermissionsAPI {
	_builder: any;
	_cosmos: any;
	_events: any;

	claimPermissions(e, t): Promise<any>;
	getBasePermission(e): Promise<any>;
	getCapabilities(): any;
	getEvents(): any;
	getMembers(e): Promise<any>;
	getPermissionGrant(e, t): Promise<any>;
	removeMember(e, t): Promise<any>;
	setBasePermission(e, t): Promise<any>;
	setMemberPermission(e, t, n): Promise<any>;
	subscribeToMembers(e, t): any;
}
class PlaylistAPI {
	_builder: any;
	_cosmos: any;
	_events: any;
	_playlistDataClient: any;
	_playlistServiceClient: any;
	_smartShuffleEligibilityAPI: any;

	getContents(e, t): Promise<any>;
	getMetadata(e, t): Promise<any>;
	getPlaylist(e, t, n): Promise<any>;
	getPlaylistQuery(e): any;
	resync(e): Promise<any>;
	sendItemSignal(e, t, n): Promise<any>;
}
class PlayerAPI {
	forcedShuffle: boolean;
	referrer: string;
	_collection: any;
	_contextPlayer: any;
	_contextualShuffle: any;
	_cosmos: any;
	_defaultFeatureVersion: string;
	_events: any;
	_isResyncBeforePlayPlaylistEnabled: boolean;
	_isSmartShuffleEnabled: boolean;
	_playlistServiceClient: any;
	_prefs: any;
	_queue: any;
	_smartShuffleEligibility: any;
	_state: any;

	addToQueue(e): Promise<any>;
	canPlayEncryptedContent(): Promise<any>;
	canSendSignal(e): any;
	clearQueue(): Promise<any>;
	getCapibilities(): any;
	getEvents(): any;
	getForcedShuffle(): any;
	getQueue(): any;
	getReferrer(): any;
	getState(): any;
	insertIntoQueue(e, t): Promise<any>;
	pause(): Promise<any>;
	play(e, t, n = {}): Promise<any>;
	playAsNexInQueue(e): Promise<any>;
	refreshCurrentContext(): Promise<any>;
	removeFromQueue(e): Promise<any>;
	reorderQueue(e, t): Promise<any>;
	resume(): Promise<any>;
	seekBackward(e): Promise<any>;
	seekBy(e): Promise<any>;
	seekForward(e): Promise<any>;
	seekTo(e): Promise<any>;
	sendSignal(e): Promise<any>;
	setDefaultFeatureVersion(e): any;
	setForcedShuffle(e): any;
	setReferrer(e): any;
	setRepeat(e): Promise<any>;
	setShuffle(e): Promise<any>;
	setSpeed(e): Promise<any>;
	skipTo(e): Promise<any>;
	skipToNext(e): Promise<any>;
	skipToPrevious(): Promise<any>;
	updateContext(e, t, n): Promise<any>;
}
class PlaybackAPI {
	_builder: any;
	_connectServiceClient: any;
	_eventSender: any;
	_events: any;
	_filters: any;
	_info: any;
	_isAvailable: boolean;
	_isLocal: boolean;
	_localStorageAPI: Get<LocalStorageAPI>;
	_playbackService: any;
	_playerAPI: Get<PlayerAPI>;
	_storageService: any;
	_transport: any;
	_volume: number;

	emitVolume(): any;
	getCapabilities(): any;
	getCurrentAudioDevice(): any;
	getDevices(): Promise<any>;
	getEvents(): any;
	getFiles(e): Promise<any>;
	getFilterState(): Promise<any>;
	getFiltersEvents(): any;
	getPlaybackInfo(): Promise<any>;
	getSavedDevices(): any;
	getVolume(): Promise<any>;
	getVolumeInternal(): any;
	lowerVolume(): Promise<any>;
	raiseVolume(): Promise<any>;
	removeCurrentDevice(): any;
	setCurrentDevice(e): Promise<any>;
	setVolume(e): Promise<any>;
}
class PlayHistoryAPI {
	_cache: any;
	_events: any;
	_loader(n, i, a, s): Promise<any>;
	_player: any;

	getCapabilities(): any;
	getContents(): Promise<any>;
	getEvents(): any;
}
type PlatformData = {
	app_platform: string;
	client_capabilities: {
		can_autostart: boolean;
		can_restart: boolean;
		can_show_track_notifications: boolean;
		can_show_system_media_controls: boolean;
		can_show_track_notifications: boolean;
	};
	client_name: "desktop";
	// TODO: populate with variants;
	client_variant: "windows_classic" | string;
	client_version_quadruple: string;
	client_version_quintuple: string;
	client_version_triple: string;
	event_sender_context_information: {
		device_id: string;
		client_version_int: number;
		client_version_string: string;
		device_id: string;
		device_manufacturer: string;
		device_model: string;
		installation_id: string;
		os_version: string;
		// TODO: populate with platforms;
		platform_type: "windows" | string;
	};
	is_developer_mode: boolean;
	// TODO: populate with os names;
	os_name: "windows" | string;
	os_settings: {
		scroller_style: string;
		double_click_interval_ms: number;
	};
	os_version: string;
	// todo: perhaps something else too?
	remote_config_client_id: "desktop-ui" | string;
};
class OfflineAPI {
	_cache: any;
	_canDownload(n): any;
	_events: any;
	_offline: any;
	_productState: any;
	_storage: any;
	_username: string;
	_yourLibrary: any;

	addDownload(e, t): Promise<any>;
	getAvailabilitySync(e): any;
	getCapabilities(): any;
	getContextForDevices(e): Promise<any>;
	getDownloads(): Promise<any>;
	getEvents(): any;
	getStatistics(): Promise<any>;
	removeAllDownloads(): Promise<any>;
	removeCache(): Promise<any>;
	removeDownload(e, t): Promise<any>;
}
class LocalStorageAPI {
	auto_cleanup: boolean;
	items: {
		[key: string]: string;
	};
	max_retries: number;
	namespace: string;
	_events: any;

	clearItem(e): any;
	createNamespacedKey(e): any;
	getEvents(): any;
	getItem(e): any;
	listenToStorageEvents(): void;
	parseLocalStorageValue(e, t): any;
	setItem(e, t): any;
	setItemInternal(e, t, n): any;
	toggleItemsTypeAndCleanup(): void;
}
class LocalFilesAPI {
	_client: any;
	_cosmos: any;
	_events: any;
	_localStorageAPI: Get<LocalStorageAPI>;
	_totalLength: number;

	addFolder(e): Promise<any>;
	browserForFolder(): Promise<any>;
	getCapabilities(): any;
	getEvents(): any;
	getIsEnabled(): any;
	getSources(): Promise<any>;
	getTracks(e, t): Promise<any>;
	mutateDefaultSource(e): Promise<any>;
	removeFolder(e): Promise<any>;
	setIsEnabled(e): Promise<any>;
	subscribeIsEnabled(e): any;
	_emitUpdate(): void;
	_subscribeToTracksUpdates(): void;
}
class LibraryAPI {
	_cache: any;
	_collection: any;
	_currentUsername: string;
	_events: any;
	_listen_later: any;
	_your_library: any;

	add({ uris: e, silent: t }): Promise<any>;
	contains(...e): Promise<any>;
	containsSync(e): any;
	getAlbum(e): Promise<any>;
	getAlbums(e): Promise<any>;
	getArtists(e): Promise<any>;
	getCapabilities(): any;
	getContents(e): Promise<any>;
	getContentsPrimaryFilterId(e): any;
	getEpisodes(e): Promise<any>;
	getEvents(): any;
	getFilterLabel(e): any;
	getShows(e): Promise<any>;
	getSortOrderLabel(e): any;
	getStaticallyKnownFilter(e): any;
	getTracks(e): Promise<any>;
	markAsPlayed(e): Promise<any>;
	markAsUnPlayed(e): Promise<any>;
	pin(e, t): Promise<any>;
	remove({ uris: e, silent: t }): Promise<any>;
	unpin(e): Promise<any>;
}
class IndexedDbAPI {
	name: string;
	version: number;
	_channel: any;
	_events: any;

	deleteItem(e, t): Promise<any>;
	getEvents(): any;
	getItem(e, t): Promise<any>;
	openDb(): Promise<any>;
	setItem(e, t, n): Promise<any>;
}
class History {
	action: string;
	block(): any;
	canGo(e): any;
	createHref(e): any;
	entries: HistoryLocation[];
	go(e): any;
	goBack(): any;
	goForward(): any;
	index: number;
	length: number;
	listen(e): any;
	location: HistoryLocation;
	push(e, n): any;
	replace(e, n): any;
}
type HistoryLocation = {
	hash: string;
	key: string;
	pathname: string;
	search: string;
	state: {
		navigationalRoot: string;
	};
};
class FollowAPI {
	_cache: any;
	_events: any;
	_loader(t, n, o = {}): Promise<any>;

	executeOperation(e, t, n): Promise<any>;
	followUsers(e): Promise<any>;
	getEvents(): any;
	isFollowing(e): Promise<any>;
	unfollowUsers(e): Promise<any>;
	_validateUsers(e): void;
}
type FeatureFlags = {
	[feature: string]: any;
};
class FacebookAPI {
	_cosmos: any;
	_emitter: any;
	_numListeners: number;
	// todo: probably string? who knows
	_subscription: null;

	connect(e): any;
	disconnect(): any;
}
class EventSender {
	droppedEventsTracker: any;
	eventsManager: any;
	flush(): any;
	installationid: string;
	instanceContexts: {
		context_application_desktop: {
			version_code: number;
			version_string: string;
		};
		context_client_id: {
			value: string;
		};
		context_device_desktop: {
			device_id: string;
			device_manufacturer: string;
			device_model: string;
			os_version: string;
			platform_type: string;
		};
		context_installation_id: {
			value: string;
		};
	};
	ownerProvider(): any;
	sendESStats(): any;
	sequenceIdProvider: any;
	sequenceNumberProvider: any;
	statsProvider: any;
	storageManager: any;
	transport: any;
	uploaders: {
		authorized: any;
		unauthorized: any;
	};
	uuploadingInProgress: boolean;
	useOptimizedESS2NA: boolean;
	// empty object
	_listeners: any;
	_metaListeners: {
		// empty object
		add: any;
		// empty object
		remove: any;
	};

	buildEvent(e, t): any;
	commitAndUploadESStats(e, t, n, i, o): any;
	destroy(): any;
	finalFlush(): any;
	flush(): any;
	getEvents({ owner: e, size: t = 20, minimumGlobalSequenceNumber: n }): any;
	getSpecificContext(e): any;
	getStorageId(): any;
	getStorageType(): any;
	getVersion(): any;
	hasContext(...e): any;
	initSendingEvents(): any;
	initializeContexts(e): any;
	isUsingESS2NAOptimization(): any;
	lastFlush();
	onBeforeDisconnect(): void;
	onSeccessfullySentESStats(e): void;
	send(e, t = {}): any;
	sendESS2NAWithOptimization(e, t, n, i): any;
	sendESStats(e = !1): any;
	sendEvents(e): any;
	sendToGabito(e, t): any;
	setupInstallationId(): any;
	storeEvent(e, t): any;
	valdiateEventData(e, t, n): any;
}
class EqualizerAPI {
	filters: {
		// todo: i know first three are correct, but the rest are just copilot guesses
		type: "lowshelf" | "peaking" | "highshelf" | "bandpass" | "notch" | "allpass" | string;
		frequency: number;
		key: string;
		gain: number;
	}[];
	localStorageAPI: Get<LocalStorageAPI>;
	prefs: any;

	getFilters(): Promise<any>;
	isSupported(): any;
	setEnabledState(e): any;
	setFilterGain(e, t): Promise<any>;
	subscribeToEnabledState(e): any;
}
class CurationAPI {
	cache: any;
	events: any;
	getDefaultCurationContextUri(e): any;
	_libraryAPI: Get<LibraryAPI>;
	_playlistAPI: Get<PlaylistAPI>;
	_your_library: any;

	curateDefault(e): Promise<any>;
	curateItems(e, t, n): Promise<any>;
	getCurationContexts(e): Promise<any>;
	getEvents(): any;
	isCurated(...e): Promise<any>;
	isCuratedSync(e): any;
}
class ControlMessageAPI {
	_cosmos: any;

	disableMenuItem(e): Promise<any>;
	enableMenuItem(e): Promise<any>;
	getEvents(): any;
	notifyReadyStateReached(): Promise<any>;
	notifyUsableStateReached(e): Promise<any>;
	notifyViewLoaded(e): Promise<any>;
	setTitlebarHeight(e): Promise<any>;
}
class ConnectAPI {
	checkDeviceId(e): any;
	connectServiceClient: any;
	events: any;
	mapIncarnationToLoginType(e): any;
	state: {
		activeDevice: ConnectDevice;
		// todo: probs not null lol;
		connectingDevice: null;
		connectionStatus: "not_connected" | string;
		devices: ConnectDevice[];
	};

	createLoggingParams(e): any;
	discoverDevices(): Promise<any>;
	getCapabilities(): any;
	getEvents(): any;
	getState(): any;
	initiateLocalDiscovery(): Promise<any>;
	logout(e): Promise<any>;
	pullToLocal(e): Promise<any>;
	setPreferredIncarnation(e, t): Promise<any>;
	transferPlayback(e, t): Promise<any>;
	transferToRemote(e, t): Promise<any>;
}
type ConnectDevice = {
	brandDisplayName: "spotify" | string;
	connectStateId: string;
	currentState: "logged_in" | "not_logged_in" | string;
	disabledReason: undefined;
	hifiSupport: {
		fullySupported: boolean;
		deviceSupporter: boolean;
		userEligible: boolean;
	};
	id: "local_device" | string;
	incarnation: {
		preferred: undefined;
		avaialble: string[];
	};
	isActive: boolean;
	isConnecting: boolean;
	isDisabled: boolean;
	isGroup: boolean;
	isLocal: boolean;
	isLocalNetwork: boolean;
	isWebApp: boolean;
	isZeroconf: boolean;
	license: string;
	modelDisplayName: string;
	name: string;
	supportsDJNarration: boolean;
	supportsLogout: false;
	type: "computer" | "tv" | string;
	volume: number;
};
class CollectionPlatformAPI {
	events: any;
	_service: any;

	add(e, t): Promise<any>;
	contains(e, t): Promise<any>;
	getEvents(): any;
	remove(e, t): Promise<any>;
	subscribeContains(e, t, n): any;
}
class ClipboardAPI {
	_cosmos: any;

	copy(e): Promise<any>;
	paste(): Promise<any>;
}
class BuddyFeedAPI {
	buddyFetchApi: any;
	cosmos: any;

	connectToFacebook(): any;
	fetchFacebookFriends(): Promise<any>;
	fetchFriendActivity(e): Promise<any>;
	getCapabilities(): any;
	subscribeToBuddyActivity(e, t): any;
	subscribeToFacebookConnectionState(e): any;
}
class AuthorizationAPI {
	_cosmos: any;
	_events: any;
	_plugin: any;
	_state: {
		isAuthorized: boolean;
		token: {
			accessToken: string;
			accessTokenExpirationTimestampMs: number;
			isAnonymous: string;
		};
		// todo: both of these are null rn;
		retryAttempt: null;
		retryAt: null;
	};
	_tokenProvider({ preferCached: a = !1 }): Promise<any>;

	createTransportPlugin(e): any;
	getCapabilities(): any;
	getEvents(): any;
	getSessionTransferURL(e): Promise<any>;
	getState(): any;
	getTokenProvider(): any;
	onAuthenticationFailed(e, t): void;
	onTokenChanged(e): void;
	tryAuthroize(): any;
}
class AudiobooksPremiumConsumptionCapObserverAPI {
	currentPlayerState: any;
	requestInFlight: boolean;
	_playerAPI: Get<PlayerAPI>;
	_pubSubApi: Get<PubSubAPI>;
	_showApi: Get<ShowAPI>;
}
type AdManagers = {
	adStateReporter: any;
	audio: any;
	billboard: any;
	hpto: any;
	inStreamApi: any;
	leaderboard: any;
	sponsoredPlaylist: any;
	vto: {
		manager: any;
		factories: function[];
	};
};
class ActionStoreAPI {
	cleanActions(): any;
	storeAction(): any;
	triggerActions(): any;
}
class SettingsAPI {
	language: any;
	quality: any;
}
class RequestBuilder {
	pendingRequests: any;
	_RequestImplementation: any;
	_accessToken: string;
	_globalRequestHeaders: string[][];
	_locale: string;
	_market: string;

	build(): any;
	resetPendingRequests(): any;
	accessToken: string;
	globalRequestHeaders: string[][];
	locale: string;
	market: string;
}
