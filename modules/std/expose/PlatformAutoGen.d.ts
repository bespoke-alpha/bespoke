/*
const HU = await import("/hooks/util.js")
const MSI = await import("/modules/std/index.js")
HU.visited.clear()
MSI.S.Platform.getClipboardAPI().copy(HU.type(MSI.S.Platform, "PlatformAutoGen"))
*/

type PlatformAutoGen = {
    container: string
    enableCastConnect: boolean
    getActionStoreAPI: () => {
        cleanActions: () => undefined
        storeAction: () => undefined
        triggerActions: () => undefined
    }
    getAdManagers: () => {
        adStateReporter: {
            focusState: {
                addFocusListener: () => any
                hasFocus: () => boolean
                listeners: Array<ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]>
                removeAllFocusListeners: () => any
                removeFocusListener: () => any
            }
            history: {
                action: string
                block: () => () => undefined
                canGo: () => boolean
                createHref: () => any
                entries: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
                go: () => any
                goBack: () => any
                goForward: () => any
                index: number
                length: number
                listen: () => () => undefined
                location: undefined
                push: (a) => any
                replace: (a) => any
            }
            onFocusChanged: () => any
            setAdStateKey: (a) => any
        }
        audio: {
            audioApi: {
                addNewSlot: (a) => any
                cosmosConnector: {
                    addNewSlot: (a) => any
                    configureSlot: (a, b) => any
                    enableSlot: (a) => any
                    fetchAdForSlot: (a) => any
                    getAdForSlot: (a, b) => any
                    getAdSlotConfig: (a) => any
                    getAdState: () => Promise<any>
                    getEpisodeSponsors: () => Promise<any>
                    getFeatureFlags: (a) => any
                    getShowSponsors: () => Promise<any>
                    getSlotConfiguration: (a) => any
                    getSlotConfigurations: () => Promise<any>
                    getSponsoredUris: () => Promise<any>
                    getSponsorshipAd: () => Promise<any>
                    getState: () => Promise<any>
                    increaseStreamTime: (a) => any
                    loadAdPod: (a) => any
                    logAudioVolume: () => Promise<any>
                    overrideCountry: (a) => any
                    overridePodcastMetadata: () => Promise<any>
                    patchTargeting: (a) => any
                    postEvent: (a, b) => any
                    postToSlot: (a, b) => any
                    removeRequestHeader: (a) => any
                    requestPreviewAd: (a) => any
                    setAdSlotEndpoint: () => undefined
                    setAdState: (a) => any
                    setAdStateKey: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["setAdStateKey"]
                    setAdStatePusherEndpoint: (a) => any
                    setRequestHeader: (a, b) => any
                    setSponsoredUri: () => undefined
                    subToAdState: () => undefined
                    subToState: () => undefined
                    subscribeToAdsProductState: () => { cancel: () => undefined }
                    subscribeToAllFormats: () => undefined
                    subscribeToEvent: (a, b, c) => any
                    subscribeToFormat: (a) => any
                    subscribeToProductState: (a) => any
                    subscribeToSlot: (a) => any
                    subscribeToSlotType: (a) => any
                    triggerSlotClear: (a) => any
                    triggerSlotClearAll: (a) => any
                    triggerSlotFetch: (a) => any
                    triggerSlotPlay: (a) => any
                }
                postEvent: (a, b) => any
                subscribeToSlotType: (a) => any
            }
            disable: () => Promise<any>
            enable: () => Promise<any>
            enabled: boolean
            getContextAdInfo: () => Promise<any>
            getEnabled: () => any
            inStreamApi: {
                adsCoreConnector: {
                    addNewSlot: (a) => any
                    enableSlot: () => Promise<any>
                    fetchAdForSlot: () => Promise<any>
                    getSponsoredUris: () => Promise<any>
                    subscribeToInStreamAds: () => { cancel: () => undefined }
                    subscribeToSlot: (a) => any
                }
                disable: () => any
                enable: () => any
                enabled: boolean
                getInStreamAd: () => any
                inStreamAd: null
                inStreamAdsSubscription: null
                onInStreamAdMessage: () => any
                subscribeToInStreamAds: () => any
            }
            isNewAdsNpvEnabled: boolean
            logClick: (a) => any
            onAdMessage: (a) => any
            resetSubscriptions: () => any
            subscriptions: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
        }
        billboard: {
            activating: boolean
            adClick: () => any
            billboardApi: {
                addNewSlot: (a) => any
                cosmosConnector: ReturnType<PlatformAutoGen["getAdManagers"]>["audio"]["audioApi"]["cosmosConnector"]
                getSlotConfiguration: (a) => any
                patchTargeting: (a) => any
                postEvent: (a, b) => any
                postToSlot: (a) => any
                subscribeToSlotType: (a) => any
                triggerSlotClearAll: () => any
            }
            clearSlot: () => any
            disable: () => Promise<any>
            displayBillboard: () => Promise<any>
            enable: () => Promise<any>
            enabled: boolean
            finish: () => undefined
            focusMinimize: () => undefined
            focusState: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]
            getFocusTimeoutMs: () => Promise<any>
            handleApplicationGainedFocus: () => Promise<any>
            handleApplicationLostFocus: () => Promise<any>
            handleDiscard: () => any
            handlePreview: () => any
            isPreviewServiceAd: () => undefined
            logEvent: (a) => any
            mapBillboardData: () => any
            minimize: () => any
            onActivity: (a) => any
            onAdMessage: (a) => any
            onError: () => any
            onFinish: () => any
            onFocusChanged: () => any
            onRender: () => any
            resetState: () => any
            retryTimoutId: number
            triggerAutoMinimizeIfPossible: () => undefined
            viewedTimestamp: number
        }
        hpto: {
            appStartupId: string
            createTrackingList: () => any
            createTrackingPixelImage: (a) => any
            fetchCreative: () => any
            fetchTemplate: () => any
            focusState: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]
            getNativeData: (a) => any
            handleTrackingUrl: (a) => any
            hptoApi: {
                cosmosConnector: ReturnType<PlatformAutoGen["getAdManagers"]>["audio"]["audioApi"]["cosmosConnector"]
                eventSender: {
                    _dispatchFromStore: (a) => any
                    _listeners: {}
                    _metaListeners: { add: {}; remove: {} }
                    addListener: (a, b) => any
                    addListeners: () => undefined
                    buildEvent: (a) => any
                    commitAndUploadESStats: (a, b, c, d) => any
                    createEvent: (a) => any
                    destroy: () => any
                    droppedEventsTracker: {
                        getDroppedEventCounters: () => any
                        getDroppedEventsCountersPerSequenceId: () => any
                        storageManager: {
                            addItemInDroppedCountersStorage: (a) => any
                            addItemInEventsStorage: (a) => any
                            canMakeDroppedCountersStorageFull: () => any
                            canMakeEventsStorageFull: () => any
                            clear: () => any
                            configureMaxStorageCapacity: () => undefined
                            createStorage: () => any
                            currentTotalSizeForDroppedCounters: number
                            currentTotalSizeForEvents: number
                            flushStrategy: { interval: number; kind: string }
                            getItem: () => any
                            getItemSizeInBytes: (a) => any
                            getKeys: () => any
                            getOrCreateId: (a) => any
                            maxStorageCapacityForDroppedCountersInBytes: number
                            maxStorageCapacityForEventsInBytes: number
                            removeItemInDroppedCountersStorage: () => any
                            removeItemInEventsStorage: () => any
                            setCounterItem: (a, b) => any
                            setItem: (a) => any
                            setTotalDroppedCountersStorageSizeAtStartup: () => undefined
                            setTotalEventStorageSizeAtStartup: () => undefined
                            storage: {
                                adapter: {
                                    clear: () => undefined
                                    getItem: () => null
                                    getKeys: () => ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["adStateReporter"]["focusState"]["listeners"]
                                    removeItem: () => undefined
                                    setItem: (a) => any
                                }
                                flushStrategy: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["hpto"]["hptoApi"]["eventSender"]["droppedEventsTracker"]["storageManager"]["flushStrategy"]
                                maxCapacityForDroppedInPercentage: number
                                maxCapacityInBytes: number
                            }
                            storageAdapter: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["droppedEventsTracker"]["storageManager"]["storage"]["adapter"]
                            storageKeyPrefix: string
                            storageType: string
                            updateItemInDroppedCountersStorage: (a) => any
                            updateItemInEventsStorage: (a) => any
                        }
                        updateDroppedEventCount: (a) => any
                        updateReportedEventCounters: () => any
                    }
                    emit: (a) => any
                    emitAndWait: (a, b) => any
                    emitEvent: () => undefined
                    emitEventAndWait: (a) => any
                    emitEventSync: () => any
                    emitSync: (a) => any
                    essLastSent: {
                        getDate: () => any
                        getDay: () => any
                        getFullYear: () => any
                        getHours: () => any
                        getMilliseconds: () => any
                        getMinutes: () => any
                        getMonth: () => any
                        getSeconds: () => any
                        getTime: () => any
                        getTimezoneOffset: () => any
                        getUTCDate: () => any
                        getUTCDay: () => any
                        getUTCFullYear: () => any
                        getUTCHours: () => any
                        getUTCMilliseconds: () => any
                        getUTCMinutes: () => any
                        getUTCMonth: () => any
                        getUTCSeconds: () => any
                        getYear: () => any
                        setDate: () => any
                        setFullYear: () => any
                        setHours: () => any
                        setMilliseconds: () => any
                        setMinutes: () => any
                        setMonth: () => any
                        setSeconds: () => any
                        setTime: () => any
                        setUTCDate: () => any
                        setUTCFullYear: () => any
                        setUTCHours: () => any
                        setUTCMilliseconds: () => any
                        setUTCMinutes: () => any
                        setUTCMonth: () => any
                        setUTCSeconds: () => any
                        setYear: () => any
                        toDateString: () => any
                        toGMTString: () => any
                        toISOString: () => any
                        toJSON: () => any
                        toLocaleDateString: () => any
                        toLocaleString: () => any
                        toLocaleTimeString: () => any
                        toString: () => any
                        toTimeString: () => any
                        toUTCString: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["essLastSent"]["toGMTString"]
                        valueOf: () => any
                    }
                    eventsManager: {
                        addEvent: (a) => any
                        getEvent: () => any
                        getEventKey: (a) => any
                        getEvents: () => any
                        getEventsKeys: () => any
                        getEventsKeysPerSequenceId: () => any
                        getGlobalSequenceNumberFromEventKey: () => any
                        removeEvents: () => any
                        storageManager: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["droppedEventsTracker"]["storageManager"]
                    }
                    finalFlush: () => any
                    flush: () => Promise<any>
                    fullESS2NALastSent: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["hpto"]["hptoApi"]["eventSender"]["essLastSent"]
                    getEvents: () => any
                    getSpecificContext: () => any
                    getStorageId: () => any
                    getStorageType: () => any
                    getVersion: () => any
                    hasContext: () => boolean
                    initSendingEvents: () => any
                    initializeContexts: () => undefined
                    installationId: string
                    instanceContexts: {
                        context_application_desktop: { version_code: number; version_string: string }
                        context_client_id: { value: string }
                        context_device_desktop: {
                            device_id: string
                            device_manufacturer: string
                            device_model: string
                            os_version: string
                            platform_type: string
                        }
                        context_installation_id: { value: string }
                    }
                    isUsingESS2NAOptimization: () => any
                    lastFlush: () => Promise<any>
                    on: (a, b) => any
                    onAddListener: (a, b) => any
                    onBeforeDisconnect: () => any
                    onRemoveListener: (a, b) => any
                    onSuccessfullySentESStats: () => any
                    once: (a) => any
                    ownerProvider: () => string
                    previousESS2NA: undefined
                    proxyEmit: (a, b) => any
                    proxyEmitAll: (a) => any
                    proxyEmitAllSync: (a) => any
                    proxyEmitSync: (a, b) => any
                    removeAllListeners: () => any
                    removeListener: (a, b) => any
                    removeListeners: () => undefined
                    send: (a) => any
                    sendESS2NAWithOptimization: (a, b, c) => any
                    sendESStats: () => Promise<any>
                    sendEvents: () => Promise<any>
                    sendEventsInterval: number
                    sendToGabito: (a) => any
                    sequenceIdProvider: { getId: (a) => any; getIdHash: () => any; installationId: string }
                    sequenceNumberProvider: {
                        commitSequenceNumber: (a) => any
                        generateNextEventSequenceNumber: (a) => any
                        generateNextGlobalSequenceNumber: () => any
                        generateNextSequenceNumber: () => any
                        getEventsSequenceNumbers: () => any
                        getNextSequenceNumber: () => any
                        getSequenceNumbersPerSequenceId: () => any
                        storageManager: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["droppedEventsTracker"]["storageManager"]
                    }
                    setupInstallationId: () => any
                    statsProvider: {
                        addDroppedEventsCounters: (a, b) => any
                        addDroppedEventsCountersData: (a) => any
                        addEventsToESSData: (a) => any
                        addLossStatsData: () => any
                        getInitialESSData: () => any
                        provideEventSenderStats: (a, b) => any
                    }
                    storageManager: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["hpto"]["hptoApi"]["eventSender"]["droppedEventsTracker"]["storageManager"]
                    storeEvent: (a) => any
                    transport: {
                        _Fetch: { __esModule: boolean; isSupported: () => boolean; request: () => any }
                        _XHR: { __esModule: boolean; request: () => any }
                        _authenticate: () => any
                        _authenticateCalled: boolean
                        _authenticateWithToken: () => Promise<any>
                        _authenticationPromise: null
                        _connect: () => any
                        _connectCalled: boolean
                        _connectToEndpoints: () => Promise<any>
                        _connectionObserver: {
                            _dispatchFromStore: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["_dispatchFromStore"]
                            _listeners: {
                                beforeunload: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                offline: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                online: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                            }
                            _metaListeners: { add: {}; remove: {} }
                            _navigator: {
                                appCodeName: string
                                appName: string
                                appVersion: string
                                bluetooth: {
                                    addEventListener: (a, b) => any
                                    dispatchEvent: () => any
                                    getAvailability: () => Promise<any>
                                    removeEventListener: (a, b) => any
                                    requestDevice: () => Promise<any>
                                }
                                clearAppBadge: () => Promise<any>
                                clipboard: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    read: () => Promise<any>
                                    readText: () => Promise<any>
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                    write: () => Promise<any>
                                    writeText: () => Promise<any>
                                }
                                connection: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    downlink: number
                                    effectiveType: string
                                    onchange: null
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                    rtt: number
                                    saveData: boolean
                                }
                                cookieEnabled: boolean
                                credentials: {
                                    create: () => Promise<any>
                                    get: () => Promise<any>
                                    preventSilentAccess: () => Promise<any>
                                    store: () => Promise<any>
                                }
                                deviceMemory: number
                                doNotTrack: null
                                geolocation: {
                                    clearWatch: () => any
                                    getCurrentPosition: () => any
                                    watchPosition: () => any
                                }
                                getBattery: () => Promise<any>
                                getGamepads: () => any
                                getInstalledRelatedApps: () => Promise<any>
                                getUserMedia: () => any
                                gpu: {
                                    getPreferredCanvasFormat: () => any
                                    requestAdapter: () => Promise<any>
                                    wgslLanguageFeatures: {
                                        entries: () => any
                                        forEach: () => any
                                        has: () => any
                                        keys: () => any
                                        size: number
                                        values: () => any
                                    }
                                }
                                hardwareConcurrency: number
                                hid: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    getDevices: () => Promise<any>
                                    onconnect: null
                                    ondisconnect: null
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                    requestDevice: () => Promise<any>
                                }
                                ink: { requestPresenter: () => Promise<any> }
                                javaEnabled: () => any
                                keyboard: {
                                    getLayoutMap: () => Promise<any>
                                    lock: () => Promise<any>
                                    unlock: () => any
                                }
                                language: string
                                languages: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                locks: { query: () => Promise<any>; request: () => Promise<any> }
                                login: { setStatus: () => Promise<any> }
                                managed: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    getManagedConfiguration: () => Promise<any>
                                    onmanagedconfigurationchange: null
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                }
                                maxTouchPoints: number
                                mediaCapabilities: {
                                    decodingInfo: () => Promise<any>
                                    encodingInfo: () => Promise<any>
                                }
                                mediaDevices: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    enumerateDevices: () => Promise<any>
                                    getDisplayMedia: () => Promise<any>
                                    getSupportedConstraints: () => any
                                    getUserMedia: () => Promise<any>
                                    ondevicechange: null
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                    setCaptureHandleConfig: () => any
                                }
                                mediaSession: {
                                    metadata: null
                                    playbackState: string
                                    setActionHandler: () => any
                                    setCameraActive: () => any
                                    setMicrophoneActive: () => any
                                    setPositionState: () => any
                                }
                                mimeTypes: {
                                    "0": {
                                        description: string
                                        enabledPlugin: {
                                            "0": ReturnType<
                                                PlatformAutoGen["getAdManagers"]
                                            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]
                                            "1": ReturnType<
                                                PlatformAutoGen["getAdManagers"]
                                            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]
                                            "application/pdf": ReturnType<
                                                PlatformAutoGen["getAdManagers"]
                                            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]
                                            description: string
                                            filename: string
                                            item: () => any
                                            length: number
                                            name: string
                                            namedItem: () => any
                                            "text/pdf": ReturnType<
                                                PlatformAutoGen["getAdManagers"]
                                            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]
                                        }
                                        suffixes: string
                                        type: string
                                    }
                                    "1": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]
                                    "application/pdf": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]
                                    item: () => any
                                    length: number
                                    namedItem: () => any
                                    "text/pdf": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]
                                }
                                onLine: boolean
                                pdfViewerEnabled: boolean
                                permissions: { query: () => Promise<any> }
                                platform: string
                                plugins: {
                                    "0": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]["enabledPlugin"]
                                    "1": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]["enabledPlugin"]
                                    "2": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]["enabledPlugin"]
                                    "3": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]["enabledPlugin"]
                                    "4": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]["enabledPlugin"]
                                    "Chrome PDF Viewer": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]["enabledPlugin"]
                                    "Chromium PDF Viewer": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]["enabledPlugin"]
                                    "Microsoft Edge PDF Viewer": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]["enabledPlugin"]
                                    "PDF Viewer": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]["enabledPlugin"]
                                    "WebKit built-in PDF": ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["mimeTypes"]["0"]["enabledPlugin"]
                                    item: () => any
                                    length: number
                                    namedItem: () => any
                                    refresh: () => any
                                }
                                presentation: { defaultRequest: null; receiver: null }
                                product: string
                                productSub: string
                                registerProtocolHandler: () => any
                                requestMIDIAccess: () => Promise<any>
                                requestMediaKeySystemAccess: (a) => any
                                scheduling: { isInputPending: () => any }
                                sendBeacon: () => any
                                serial: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    getPorts: () => Promise<any>
                                    onconnect: null
                                    ondisconnect: null
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                    requestPort: () => Promise<any>
                                }
                                serviceWorker: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    controller: null
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    getRegistration: () => Promise<any>
                                    getRegistrations: () => Promise<any>
                                    oncontrollerchange: null
                                    onmessage: null
                                    onmessageerror: null
                                    ready: Promise<any>
                                    register: () => Promise<any>
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                    startMessages: () => any
                                }
                                setAppBadge: () => Promise<any>
                                storage: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    estimate: () => Promise<any>
                                    getDirectory: () => Promise<any>
                                    persist: () => Promise<any>
                                    persisted: () => Promise<any>
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                }
                                unregisterProtocolHandler: () => any
                                usb: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    getDevices: () => Promise<any>
                                    onconnect: null
                                    ondisconnect: null
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                    requestDevice: () => Promise<any>
                                }
                                userActivation: { hasBeenActive: boolean; isActive: boolean }
                                userAgent: string
                                userAgentData: {
                                    brands: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["adStateReporter"]["focusState"]["listeners"]
                                    getHighEntropyValues: () => Promise<any>
                                    mobile: boolean
                                    platform: string
                                    toJSON: () => any
                                }
                                vendor: string
                                vendorSub: string
                                vibrate: () => any
                                virtualKeyboard: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    boundingRect: {
                                        bottom: number
                                        height: number
                                        left: number
                                        right: number
                                        toJSON: () => any
                                        top: number
                                        width: number
                                        x: number
                                        y: number
                                    }
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    hide: () => any
                                    ongeometrychange: null
                                    overlaysContent: boolean
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                    show: () => any
                                }
                                wakeLock: { request: () => Promise<any> }
                                webdriver: boolean
                                webkitGetUserMedia: () => any
                                webkitPersistentStorage: { queryUsageAndQuota: () => any; requestQuota: () => any }
                                webkitTemporaryStorage: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["webkitPersistentStorage"]
                                windowControlsOverlay: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    getTitlebarAreaRect: () => any
                                    ongeometrychange: null
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                    visible: boolean
                                }
                                xr: {
                                    addEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                    dispatchEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                    isSessionSupported: () => Promise<any>
                                    ondevicechange: null
                                    removeEventListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                    requestSession: () => Promise<any>
                                    supportsSession: () => Promise<any>
                                }
                            }
                            addListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["addListener"]
                            addListeners: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["addListeners"]
                            createEvent: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["createEvent"]
                            emit: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["emit"]
                            emitAndWait: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitAndWait"]
                            emitEvent: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitEvent"]
                            emitEventAndWait: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitEventAndWait"]
                            emitEventSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitEventSync"]
                            emitSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitSync"]
                            isOnline: () => any
                            on: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["on"]
                            onAddListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["onAddListener"]
                            onRemoveListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["onRemoveListener"]
                            once: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["once"]
                            proxyEmit: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmit"]
                            proxyEmitAll: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmitAll"]
                            proxyEmitAllSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmitAllSync"]
                            proxyEmitSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmitSync"]
                            removeAllListeners: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["removeAllListeners"]
                            removeListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["removeListener"]
                            removeListeners: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["removeListeners"]
                        }
                        _counter: {
                            _baseTime: number
                            _ceiling: number
                            _curve: string
                            _jitter: boolean
                            getTime: () => any
                        }
                        _createReconnector: () => () => any
                        _disableAutoLogout: boolean
                        _disconnect: () => any
                        _disconnectBeforeUnload: boolean
                        _dispatchFromStore: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["_dispatchFromStore"]
                        _endpoints: { webapi: string; webgate: string }
                        _endpointsProvider: () => Promise<any>
                        _forcePolyfillTypes: {}
                        _getQuickDisconnectTimeout: () => any
                        _handleRetriedRequestError: () => Promise<any>
                        _init: () => any
                        _initTime: number
                        _isReconnecting: boolean
                        _lastDisconnect: number
                        _lastToken: string
                        _lastTokenExpiry: number
                        _listeners: {
                            access_token: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            authenticated: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            authentication_failed: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            connected: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            disconnected: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            endpoints_resolved: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            logged_out: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            offline: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            online: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            reconnected: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            reconnecting: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                        }
                        _metaListeners: {
                            add: {
                                authenticated: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                connected: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                connection_id: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                            }
                            remove: {
                                authenticated: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                connected: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                connection_id: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                            }
                        }
                        _onAddListener: (a) => any
                        _onAuthenticated: () => any
                        _onAuthenticationFailed: () => any
                        _onConnected: () => Promise<any>
                        _onLogout: () => any
                        _onOffline: () => any
                        _onOnline: () => any
                        _onPluginDisconnected: () => any
                        _onRemoveListener: (a) => any
                        _ownerRef: {}
                        _parseProvidedToken: () => any
                        _performConnect: () => any
                        _performDisconnect: () => any
                        _pluginMediator: {
                            _dispatchFromStore: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["_dispatchFromStore"]
                            _listeners: {
                                plugin_connection_info: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                plugin_disconnected: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                plugin_message: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                transport_authenticate: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                transport_before_process_request: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                transport_before_send_request: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                transport_connect: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                transport_disconnect: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                            }
                            _metaListeners: {
                                add: {
                                    transport_authenticate: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["adStateReporter"]["focusState"]["listeners"]
                                    transport_connect: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["adStateReporter"]["focusState"]["listeners"]
                                }
                                remove: {
                                    transport_authenticate: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["adStateReporter"]["focusState"]["listeners"]
                                    transport_connect: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["adStateReporter"]["focusState"]["listeners"]
                                }
                            }
                            addListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["addListener"]
                            addListeners: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["addListeners"]
                            createEvent: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["createEvent"]
                            emit: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["emit"]
                            emitAndWait: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitAndWait"]
                            emitEvent: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitEvent"]
                            emitEventAndWait: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitEventAndWait"]
                            emitEventSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitEventSync"]
                            emitSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitSync"]
                            on: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["on"]
                            onAddListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["onAddListener"]
                            onRemoveListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["onRemoveListener"]
                            once: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["once"]
                            proxyEmit: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmit"]
                            proxyEmitAll: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmitAll"]
                            proxyEmitAllSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmitAllSync"]
                            proxyEmitSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmitSync"]
                            removeAllListeners: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["removeAllListeners"]
                            removeListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["removeListener"]
                            removeListeners: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["removeListeners"]
                        }
                        _plugins: {
                            dealer: {
                                _dealer: {
                                    _WebSocket: () => any
                                    _connected: boolean
                                    _connectionId: string
                                    _connectionURI: string
                                    _dispatchFromStore: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["_dispatchFromStore"]
                                    _endpoint: string
                                    _handleClose: () => any
                                    _handleError: () => any
                                    _handleMessage: () => any
                                    _handleOpen: () => any
                                    _heartbeatTimeout: number
                                    _heartbeatTimeoutToken: number
                                    _heartbeatToken: number
                                    _lastPingDeferred: null
                                    _listeners: {
                                        connection_id: ReturnType<
                                            PlatformAutoGen["getAdManagers"]
                                        >["adStateReporter"]["focusState"]["listeners"]
                                        disconnected: ReturnType<
                                            PlatformAutoGen["getAdManagers"]
                                        >["adStateReporter"]["focusState"]["listeners"]
                                        error: ReturnType<
                                            PlatformAutoGen["getAdManagers"]
                                        >["adStateReporter"]["focusState"]["listeners"]
                                        message: ReturnType<
                                            PlatformAutoGen["getAdManagers"]
                                        >["adStateReporter"]["focusState"]["listeners"]
                                        request: ReturnType<
                                            PlatformAutoGen["getAdManagers"]
                                        >["adStateReporter"]["focusState"]["listeners"]
                                    }
                                    _metaListeners: { add: {}; remove: {} }
                                    _onHeartbeatError: () => any
                                    _onHeartbeatSuccess: () => any
                                    _parseMessage: () => undefined
                                    _prepareConnectionId: () => any
                                    _reply: (a) => any
                                    _socket: {
                                        CLOSED: number
                                        CLOSING: number
                                        CONNECTING: number
                                        OPEN: number
                                        addEventListener: ReturnType<
                                            PlatformAutoGen["getAdManagers"]
                                        >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["addEventListener"]
                                        binaryType: string
                                        bufferedAmount: number
                                        close: () => any
                                        dispatchEvent: ReturnType<
                                            PlatformAutoGen["getAdManagers"]
                                        >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                                        extensions: string
                                        onclose: () => any
                                        onerror: () => undefined
                                        onmessage: () => any
                                        onopen: () => undefined
                                        protocol: string
                                        readyState: number
                                        removeEventListener: ReturnType<
                                            PlatformAutoGen["getAdManagers"]
                                        >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                                        send: () => any
                                        url: string
                                    }
                                    _startHeartbeat: () => any
                                    _stopHeartbeat: () => any
                                    _waitingForConnectionId: boolean
                                    addListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["addListener"]
                                    addListeners: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["addListeners"]
                                    authenticate: () => any
                                    connect: () => any
                                    createEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["createEvent"]
                                    disconnect: () => any
                                    emit: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["emit"]
                                    emitAndWait: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["emitAndWait"]
                                    emitEvent: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["emitEvent"]
                                    emitEventAndWait: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["emitEventAndWait"]
                                    emitEventSync: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["emitEventSync"]
                                    emitSync: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["emitSync"]
                                    getConnectionId: () => any
                                    getConnectionInfo: () => any
                                    hasConnectionId: () => any
                                    on: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["on"]
                                    onAddListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["onAddListener"]
                                    onRemoveListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["onRemoveListener"]
                                    once: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["once"]
                                    ping: () => any
                                    proxyEmit: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["proxyEmit"]
                                    proxyEmitAll: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["proxyEmitAll"]
                                    proxyEmitAllSync: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["proxyEmitAllSync"]
                                    proxyEmitSync: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["proxyEmitSync"]
                                    removeAllListeners: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["removeAllListeners"]
                                    removeListener: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["removeListener"]
                                    removeListeners: ReturnType<
                                        PlatformAutoGen["getAdManagers"]
                                    >["hpto"]["hptoApi"]["eventSender"]["removeListeners"]
                                }
                                _mediator: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
                                _onDealerConnectionId: () => any
                                _onDealerDisconnected: () => any
                                _onDealerError: () => any
                                _onDealerMessage: () => any
                                _onDealerRequest: () => any
                                _onTransportAuthenticate: () => any
                                _onTransportConnect: () => any
                                _onTransportDisconnect: () => undefined
                                api: { getConnectionInfo: () => Promise<any>; hasConnectionInfo: () => boolean }
                                attach: (a) => any
                                detach: (a) => any
                                name: string
                            }
                            "desktop-lifecycle-plugin": {
                                _authAttempts: number
                                _authCounter: {
                                    _baseTime: number
                                    _ceiling: number
                                    _curve: string
                                    _jitter: boolean
                                    getTime: () => any
                                }
                                _authTimeoutId: null
                                _onAuthenticationFailed: () => undefined
                                _transport: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["hpto"]["hptoApi"]["eventSender"]["transport"]
                                attach: (a) => any
                                detach: (a) => any
                                name: string
                                onAuthenticated: () => undefined
                                onAuthenticationFailed: () => undefined
                                onBeforeProcessRequest: () => any
                                onBeforeSendRequest: () => any
                                onConnected: () => undefined
                                onDisconnected: () => undefined
                                tryAuthenticate: () => any
                            }
                        }
                        _processRequestArgs: (a) => any
                        _quickDisconnectCount: number
                        _reconnectTimeout: number
                        _reconnectionRetries: number
                        _refreshToken: () => any
                        _refreshTokenPromise: null
                        _requestMode: string
                        _runStateAwareQueues: (a) => any
                        _sendFireAndForgetRequest: () => any
                        _sendRequest: (a, b) => any
                        _sendRetriedRequest: (a) => any
                        _setAuthHeader: (a) => any
                        _stateAwareListeners: {
                            authenticated: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            connected: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            connection_id: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            transport_authenticate: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            transport_connect: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                        }
                        _stateAwareOperationMetrics: { authenticated: { end_time: number; start_time: number } }
                        _stateAwareRunners: {
                            authenticated: null
                            connected: null
                            connection_id: null
                            transport_authenticate: null
                            transport_connect: null
                        }
                        _stateMask: number
                        _tokenProvider: () => Promise<any>
                        _tryExpandSpecialURL: () => any
                        _tryToReconnect: () => any
                        addListener: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["addListener"]
                        addListeners: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["addListeners"]
                        addPlugin: (a) => any
                        appendLastTokenQuery: () => any
                        appendTokenQuery: () => any
                        authenticate: () => Promise<any>
                        connect: () => any
                        createEvent: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["createEvent"]
                        disconnect: () => any
                        emit: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["emit"]
                        emitAndWait: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["emitAndWait"]
                        emitEvent: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["emitEvent"]
                        emitEventAndWait: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["emitEventAndWait"]
                        emitEventSync: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["emitEventSync"]
                        emitSync: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["emitSync"]
                        forceDisconnect: () => any
                        forceTokenRefresh: () => any
                        getConnectionId: () => any
                        getEndpoints: () => any
                        getInitTime: () => any
                        getLastToken: () => any
                        getPluginAPI: () => any
                        handlePushRequests: (a, b) => any
                        hasOwnerRef: () => any
                        hasPlugin: () => any
                        isAuthenticated: () => any
                        isConnected: () => any
                        isOnline: () => any
                        isReconnecting: () => any
                        matchMessages: (a, b) => any
                        on: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["on"]
                        onAddListener: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["onAddListener"]
                        onRemoveListener: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["onRemoveListener"]
                        once: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["once"]
                        proxyEmit: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["proxyEmit"]
                        proxyEmitAll: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["proxyEmitAll"]
                        proxyEmitAllSync: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["proxyEmitAllSync"]
                        proxyEmitSync: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["proxyEmitSync"]
                        removeAllListeners: () => undefined
                        removeListener: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["removeListener"]
                        removeListeners: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["removeListeners"]
                        removePlugin: () => any
                        request: (a) => any
                        toPublic: () => any
                        unhandlePushRequests: (a, b) => any
                        unmatchMessages: (a, b) => any
                    }
                    uploaders: {
                        authorized: {
                            _authorize: boolean
                            _backoff: boolean
                            _dispatchFromStore: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["_dispatchFromStore"]
                            _endpoint: string
                            _listeners: {
                                upload_failed: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                upload_request_failed: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                                upload_succeeded: ReturnType<
                                    PlatformAutoGen["getAdManagers"]
                                >["adStateReporter"]["focusState"]["listeners"]
                            }
                            _metaListeners: { add: {}; remove: {} }
                            _parseUploadResponse: (a, b) => any
                            _suppressPersist: boolean
                            _transport: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["transport"]
                            _uploadBatch: (a) => any
                            addListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["addListener"]
                            addListeners: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["addListeners"]
                            createEvent: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["createEvent"]
                            emit: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["emit"]
                            emitAndWait: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitAndWait"]
                            emitEvent: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitEvent"]
                            emitEventAndWait: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitEventAndWait"]
                            emitEventSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitEventSync"]
                            emitSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["emitSync"]
                            lastUpload: () => any
                            on: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["on"]
                            onAddListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["onAddListener"]
                            onRemoveListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["onRemoveListener"]
                            once: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["once"]
                            proxyEmit: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmit"]
                            proxyEmitAll: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmitAll"]
                            proxyEmitAllSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmitAllSync"]
                            proxyEmitSync: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["proxyEmitSync"]
                            removeAllListeners: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["removeAllListeners"]
                            removeListener: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["removeListener"]
                            removeListeners: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["hpto"]["hptoApi"]["eventSender"]["removeListeners"]
                            shouldBackoff: () => any
                            upload: () => any
                        }
                        unauthorized: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["uploaders"]["authorized"]
                    }
                    uploadingInProgress: boolean
                    useOptimizedESS2NA: boolean
                    validateEventData: (a, b) => any
                }
                getAlbum: () => any
                getAlgoPlaylistInfo: () => Promise<any>
                getArtist: () => any
                getEpisode: () => any
                getPlaylist: () => any
                getShow: () => any
                getSlot: () => any
                getTrack: () => any
                logEvent: () => Promise<any>
                previewParser: {
                    createInteractiveIframe: () => HTMLElement
                    getKeyByValue: (a) => any
                    handleNativeEl: () => any
                    isPreviewServiceAd: () => any
                    parsePreview: () => any
                    renameImageBannerField: () => any
                }
                subscribeToPreview: () => Promise<any>
                webApi: {
                    endpoints: {
                        Album: { __esModule: boolean; getAlbum: (a) => any }
                        Artist: { __esModule: boolean; getArtist: (a) => any; getArtistAlbums: (a, b) => any }
                        Playlist: {
                            __esModule: boolean
                            getOnDemandPlaylists: () => any
                            getPlaylist: (a, b) => any
                            getPlaylistPermissionForUser: (a) => any
                        }
                        Show: {
                            __esModule: boolean
                            createCheckoutSession: (a) => any
                            getEpisode: (a, b) => any
                            getShow: (a, b) => any
                        }
                        Track: { __esModule: boolean; getTrack: (a) => any }
                    }
                    getAlbum: () => any
                    getArtist: () => any
                    getEpisode: () => any
                    getPlaylist: () => any
                    getShow: () => any
                    getTrack: () => any
                    imageSelection: (a) => any
                    mapDefaultData: () => any
                    mapEpisode: (a) => any
                    mapTrack: (a) => any
                    spotifyTransport: {
                        _RequestImplementation: (a) => any
                        _accessToken: string
                        _globalRequestHeaders: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["adStateReporter"]["focusState"]["listeners"]
                        _locale: string
                        _market: string
                        accessToken: string
                        build: () => any
                        globalRequestHeaders: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["adStateReporter"]["focusState"]["listeners"]
                        locale: string
                        market: string
                        pendingRequests: Set<any>
                        resetPendingRequests: () => any
                    }
                }
            }
            log: (a) => any
            logAdEventError: (a) => any
            logErrorEvent: () => any
            logEvent: (a) => any
            logViewed: () => any
            mapData: (a) => any
            maybeModifyUrl: (a) => any
            maybeTriggerRefresh: () => any
            offlineObserver: { getOnlineStatus: () => any; isOnline: boolean }
            onFocusChanged: () => any
            onRefresh: () => any
            onVisibilityChanged: (a) => any
            refreshCallback: () => Promise<any>
            subscribeToPreview: () => any
            timeOfLastViewUpdate: number
            trackPixelClicked: () => any
            trackPixelViewed: () => any
            trackingPixelDiv: HTMLElement
            viewDestroyed: () => any
            viewRendered: () => any
            visibilityObserver: {
                callback: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["onVisibilityChanged"]
                currentState: string
                disconnect: () => any
                intersectionObserver: {
                    delay: number
                    disconnect: () => any
                    observe: () => any
                    root: null
                    rootMargin: string
                    scrollMargin: string
                    takeRecords: () => any
                    thresholds: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    trackVisibility: boolean
                    unobserve: () => any
                }
                observe: (a) => any
                onObservation: (a) => any
            }
            visibilityState: string
        }
        inStreamApi: ReturnType<PlatformAutoGen["getAdManagers"]>["audio"]["inStreamApi"]
        leaderboard: {
            adFrameLoaded: (a, b) => any
            appStartupId: string
            currentAd: { creativeId: null; lineitemId: null }
            disableLeaderboard: () => any
            disableLeaderboardMessageHandler: () => any
            enableLeaderboard: () => any
            enableLeaderboardMessageHandler: () => any
            enabled: boolean
            eventSender: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]
            fetchAndDisplayLeaderboard: () => Promise<any>
            fetching: boolean
            focusState: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]
            frameSrc: string
            getFrameSrcOrigin: () => any
            handleBadLeaderboard: () => any
            handleLeaderboardMessage: (a) => any
            history: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["history"]
            isPreviewServiceAd: () => undefined
            leaderboardApi: {
                addSlot: () => Promise<any>
                cosmosConnector: ReturnType<PlatformAutoGen["getAdManagers"]>["audio"]["audioApi"]["cosmosConnector"]
                getConfig: () => Promise<any>
                getSlot: () => Promise<any>
                normalizeConfig: () => { displayTimeIntervalMs: number; timeInViewThresholdMs: number }
                subscribeToSlotType: (a) => any
            }
            leaderboardWrapper: null
            logLeaderboardEvent: () => any
            offlineObserver: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["offlineObserver"]
            onAdMessage: (a) => any
            onFocusChanged: () => any
            onNavigationChanged: () => any
            refreshDecisioner: {
                delegate: ReturnType<PlatformAutoGen["getAdManagers"]>["leaderboard"]
                focusState: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]
                isPastViewThreshold: () => any
                lastOnlineStatus: boolean
                notifyRefreshIfPossible: () => Promise<any>
                onFocusChanged: () => any
                onLeaderboardDisabled: () => any
                onLeaderboardEnabled: () => any
                onNavigationChanged: () => any
                onViewLoaded: () => Promise<any>
                onViewUnloaded: () => any
                onlineStateChanged: () => any
                setRefreshDelegate: () => any
                startRefreshTimer: () => any
                triggerRefresh: () => undefined
                updateViewTimer: () => Promise<any>
                viewTimer: number
            }
            refreshLeaderboard: () => any
            renderLeaderboard: (a, b) => any
            requestConfig: () => Promise<any>
            requestSlot: () => any
            setLeaderboardElement: () => any
            useIframeSrcDoc: boolean
        }
        sponsoredPlaylist: {
            disable: () => any
            enable: () => Promise<any>
            enabled: boolean
            logEvent: () => Promise<any>
            requestSponsoredPlaylistAd: () => Promise<any>
            requestSponsoredPlaylists: () => Promise<any>
            sponsoredPlaylistApi: {
                eventSender: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]
                getSponsoredUris: () => Promise<any>
                getSponsorshipAd: () => Promise<any>
                logEvent: () => Promise<any>
                subscribeToPreview: () => Promise<any>
            }
        }
        vto: {
            factories: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
            manager: {
                active: boolean
                createEventData: () => any
                disable: () => Promise<any>
                enable: () => Promise<any>
                enabled: boolean
                fireImpressionOnStart: boolean
                focusState: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]
                getEnabled: () => any
                getPreferredCompanionAd: () => any
                handleApplicationGainedFocus: () => Promise<any>
                handleApplicationLostFocus: () => Promise<any>
                inStreamApi: ReturnType<PlatformAutoGen["getAdManagers"]>["audio"]["inStreamApi"]
                isNewAdsNpvEnabled: boolean
                isPreferred: (a) => any
                log: (a, b, c, d) => any
                logEvent: (a, b) => any
                onAdMessage: (a) => any
                onCreated: () => any
                onEnded: (a) => any
                onFocusChanged: () => any
                onReady: () => any
                onRender: () => any
                onStarted: () => any
                onStateUpdate: () => any
                parseInfo: (a) => any
                resetState: () => any
                resetSubscriptions: () => any
                subscriptions: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["adStateReporter"]["focusState"]["listeners"]
                videoTakeoverApi: {
                    addNewSlot: (a) => any
                    cosmosConnector: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["audio"]["audioApi"]["cosmosConnector"]
                    patchTargeting: (a) => any
                    postEvent: (a, b) => any
                    subscribeToSlotType: (a) => any
                }
            }
        }
    }
    getAudiobooksPremiumConsumptionCapObserverAPI: () => {
        _playerApi: {
            _collection: {
                add: (a) => any
                addUnplayed: (a) => any
                ban: (a) => any
                contains: (a) => any
                decorate: (a) => any
                getAlbumTrackList: (a) => any
                getAlbumView: (a) => any
                getArtistTrackList: (a) => any
                getArtistView: (a) => any
                getBans: (a) => any
                getBucketSyncStatus: (a) => any
                getEpisodeList: (a) => any
                getResumePoints: (a) => any
                getShowList: (a) => any
                getTrackList: (a) => any
                getTrackListMetadata: (a) => any
                getUnplayedEpisodes: (a) => any
                offlineAlbum: (a) => any
                offlineArtist: (a) => any
                offlineTracks: (a) => any
                options: {}
                playAlbum: (a) => any
                playArtist: (a) => any
                playTracks: (a) => any
                remove: (a) => any
                removeOfflineAlbum: (a) => any
                removeOfflineArtist: (a) => any
                removeOfflineTracks: (a) => any
                removeUnplayed: (a) => any
                streamAlbumTrackList: (a) => any
                streamAlbumView: (a) => any
                streamArtistTrackList: (a) => any
                streamArtistView: (a) => any
                streamBans: (a) => any
                streamChanges: (a) => any
                streamContains: (a) => any
                streamDecorate: (a) => any
                streamEpisodeList: (a) => any
                streamShowList: (a) => any
                streamTagsInfo: (a) => any
                streamTrackList: (a) => any
                streamTrackListMetadata: (a) => any
                streamUnplayedEpisodes: (a) => any
                tracksOfflineStatus: (a) => any
                transport: {
                    call: (a, b, c) => any
                    callSingle: (a) => any
                    callStream: (a) => any
                    cancel: () => any
                    send: () => any
                }
                unban: (a) => any
            }
            _contextPlayer: {
                addToQueue: (a) => any
                deleteSession: (a) => any
                getError: (a) => any
                getPlayHistory: (a) => any
                getPositionState: (a) => any
                getQueue: (a) => any
                getState: (a) => any
                options: {}
                pause: (a) => any
                play: (a) => any
                playAsNextInQueue: (a) => any
                playPrepared: (a) => any
                preparePlay: (a) => any
                resume: (a) => any
                seekTo: (a) => any
                setOptions: (a) => any
                setQueue: (a) => any
                setRepeatingContext: (a) => any
                setRepeatingTrack: (a) => any
                setShufflingContext: (a) => any
                signal: (a) => any
                skipNext: (a) => any
                skipPrev: (a) => any
                stop: (a) => any
                transport: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_collection"]["transport"]
                updateContext: (a) => any
                updateContextPage: (a) => any
                updateContextTrack: (a) => any
                updateViewUri: (a) => any
            }
            _contextualShuffle: {
                _indexedDbAPI: {
                    _channel: {
                        addEventListener: (a, b) => any
                        close: () => any
                        dispatchEvent: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["dispatchEvent"]
                        name: string
                        onmessage: null
                        onmessageerror: null
                        postMessage: () => any
                        removeEventListener: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["transport"]["_connectionObserver"]["_navigator"]["bluetooth"]["removeEventListener"]
                    }
                    _events: {
                        _emitter: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
                        addListener: (a, b) => any
                        emit: (a) => any
                        emitSync: (a) => any
                        onAddListener: (a) => any
                        onRemoveListener: (a) => any
                        removeListener: (a, b) => any
                    }
                    deleteItem: (a) => any
                    getEvents: () => any
                    getItem: (a) => any
                    name: string
                    openDb: () => Promise<any>
                    setItem: (a, b) => any
                    version: number
                }
                getContextualShuffleMode: () => Promise<any>
                getEvents: () => any
                setContextualShuffleMode: (a) => any
            }
            _cosmos: {
                del: (a, b) => any
                get: (a, b) => any
                head: (a) => any
                patch: (a, b) => any
                post: (a, b) => any
                postSub: (a, b, c) => any
                put: (a, b) => any
                request: (a, b, c) => any
                requestFactory: () => any
                resolve: (a, b, c) => any
                resolver: {
                    cancel: ReturnType<
                        PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                    >["_playerApi"]["_collection"]["transport"]["cancel"]
                    onFailure: (a, b, c) => any
                    onSuccess: (a, b, c) => any
                    resolve: (a, b) => any
                    send: ReturnType<
                        PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                    >["_playerApi"]["_collection"]["transport"]["send"]
                }
                sub: (a, b) => any
            }
            _defaultFeatureVersion: string
            _events: {
                _client: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextPlayer"]
                _emitter: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
                addListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
                emit: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
                emitPauseSync: () => any
                emitPlaySync: (a, b) => any
                emitQueueActionComplete: (a) => any
                emitQueueActionSync: () => any
                emitQueueUpdate: () => any
                emitResumeSync: () => any
                emitSkipToNextSync: () => any
                emitSkipToPreviousSync: () => any
                emitSync: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
                onAddListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
                onRemoveListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
                removeListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
            }
            _isResyncBeforePlayPlaylistEnabled: boolean
            _isSmartShuffleEnabled: boolean
            _playlistResyncerAPI: {
                _playlistServiceClient: {
                    clearToken: (a) => any
                    contains: (a) => any
                    getMembers: (a) => any
                    modify: (a) => any
                    options: {}
                    requestLenses: (a) => any
                    resync: (a) => any
                    setBasePermission: (a) => any
                    setMemberPermission: (a) => any
                    setOfflineState: (a) => any
                    setToken: (a) => any
                    signal: (a) => any
                    signalItem: (a) => any
                    subscribeToMembers: (a) => any
                    transport: ReturnType<
                        PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                    >["_playerApi"]["_collection"]["transport"]
                }
                lastSync: Map<any, any>
                maybeResync: () => Promise<any>
                resync: () => Promise<any>
            }
            _playlistServiceClient: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_playlistResyncerAPI"]["_playlistServiceClient"]
            _prefs: {
                create: (a) => any
                get: (a) => any
                getAll: (a) => any
                options: {}
                set: (a) => any
                sub: (a) => any
                subAll: (a) => any
                transport: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_collection"]["transport"]
            }
            _queue: {
                _client: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextPlayer"]
                _events: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_events"]
                _queue: {
                    nextTracks: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    prevTracks: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    queueRevision: string
                    track: {
                        blocked: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["adStateReporter"]["focusState"]["listeners"]
                        contextTrack: {
                            metadata: {
                                "actions.skipping_next_past_track": string
                                "actions.skipping_prev_past_track": string
                                album_artist_name: string
                                album_title: string
                                album_uri: string
                                artist_name: string
                                artist_uri: string
                                "canvas.artist.avatar": string
                                "canvas.artist.name": string
                                "canvas.artist.uri": string
                                "canvas.canvasUri": string
                                "canvas.entityUri": string
                                "canvas.explicit": string
                                "canvas.fileId": string
                                "canvas.id": string
                                "canvas.type": string
                                "canvas.uploadedBy": string
                                "canvas.url": string
                                "collection.can_add": string
                                "collection.can_ban": string
                                "collection.in_collection": string
                                "collection.is_banned": string
                                context_uri: string
                                duration: string
                                entity_uri: string
                                has_lyrics: string
                                image_large_url: string
                                image_small_url: string
                                image_url: string
                                image_xlarge_url: string
                                interaction_id: string
                                is_explicit: string
                                iteration: string
                                marked_for_download: string
                                "media.start_position": string
                                page_instance_id: string
                                title: string
                                track_player: string
                            }
                            uid: string
                            uri: string
                        }
                        provider: string
                        removed: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["adStateReporter"]["focusState"]["listeners"]
                    }
                }
                _queueState: {
                    current: {
                        album: {
                            images: ReturnType<
                                PlatformAutoGen["getAdManagers"]
                            >["adStateReporter"]["focusState"]["listeners"]
                            name: string
                            type: string
                            uri: string
                        }
                        artists: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["adStateReporter"]["focusState"]["listeners"]
                        duration: { milliseconds: number }
                        images: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["adStateReporter"]["focusState"]["listeners"]
                        is19PlusOnly: boolean
                        isExplicit: boolean
                        isLocal: boolean
                        mediaType: string
                        metadata: ReturnType<
                            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                        >["_playerApi"]["_queue"]["_queue"]["track"]["contextTrack"]["metadata"]
                        name: string
                        provider: string
                        type: string
                        uid: string
                        uri: string
                    }
                    nextUp: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
                    queued: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
                }
                addToQueue: () => Promise<any>
                clearQueue: () => Promise<any>
                convertQueueState: (a) => any
                createQueueItem: (a) => any
                getInternalQueue: () => any
                getQueue: () => any
                getRepeatMode: () => number
                insertIntoQueue: (a) => any
                isQueued: () => any
                isSameItem: (a) => any
                markAsQueued: () => any
                removeFromQueue: () => Promise<any>
                reorderQueue: (a) => any
            }
            _smartShuffleEligibility: {
                _metadataServiceClient: {
                    expire: (a) => any
                    fetch: (a) => any
                    observe: (a) => any
                    options: {}
                    purge: (a) => any
                    transport: ReturnType<
                        PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                    >["_playerApi"]["_collection"]["transport"]
                }
                getEligibility: () => Promise<any>
            }
            _state: {
                context: { metadata: { "player.arch": string }; uri: string; url: string }
                duration: number
                hasContext: boolean
                index: { itemIndex: number; pageIndex: number; pageURI: null }
                isBuffering: boolean
                isPaused: boolean
                item: {
                    album: {
                        images: ReturnType<
                            PlatformAutoGen["getAdManagers"]
                        >["adStateReporter"]["focusState"]["listeners"]
                        name: string
                        type: string
                        uri: string
                    }
                    artists: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
                    duration: { milliseconds: number }
                    images: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
                    is19PlusOnly: boolean
                    isExplicit: boolean
                    isLocal: boolean
                    mediaType: string
                    metadata: {
                        "actions.skipping_next_past_track": string
                        "actions.skipping_prev_past_track": string
                        album_artist_name: string
                        album_disc_count: string
                        album_disc_number: string
                        album_title: string
                        album_track_count: string
                        album_track_number: string
                        album_uri: string
                        artist_name: string
                        artist_uri: string
                        "canvas.artist.avatar": string
                        "canvas.artist.name": string
                        "canvas.artist.uri": string
                        "canvas.canvasUri": string
                        "canvas.entityUri": string
                        "canvas.explicit": string
                        "canvas.fileId": string
                        "canvas.id": string
                        "canvas.type": string
                        "canvas.uploadedBy": string
                        "canvas.url": string
                        "collection.can_add": string
                        "collection.can_ban": string
                        "collection.in_collection": string
                        "collection.is_banned": string
                        context_uri: string
                        duration: string
                        entity_uri: string
                        has_lyrics: string
                        image_large_url: string
                        image_small_url: string
                        image_url: string
                        image_xlarge_url: string
                        interaction_id: string
                        is_explicit: string
                        iteration: string
                        marked_for_download: string
                        "media.start_position": string
                        page_instance_id: string
                        popularity: string
                        title: string
                        track_player: string
                    }
                    name: string
                    provider: string
                    type: string
                    uid: string
                    uri: string
                }
                nextItems: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
                playbackId: string
                playbackQuality: {
                    bitrateLevel: number
                    hifiStatus: number
                    strategy: number
                    targetBitrateAvailable: boolean
                    targetBitrateLevel: number
                }
                positionAsOfTimestamp: number
                previousItems: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["adStateReporter"]["focusState"]["listeners"]
                repeat: number
                restrictions: {
                    canPause: boolean
                    canResume: boolean
                    canSeek: boolean
                    canSkipNext: boolean
                    canSkipPrevious: boolean
                    canToggleRepeatContext: boolean
                    canToggleRepeatTrack: boolean
                    canToggleShuffle: boolean
                    disallowPausingReasons: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    disallowResumingReasons: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    disallowSeekingReasons: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    disallowSkippingNextReasons: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    disallowSkippingPreviousReasons: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    disallowTogglingRepeatContextReasons: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    disallowTogglingRepeatTrackReasons: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    disallowTogglingShuffleReasons: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    disallowTransferringPlaybackReasons: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                }
                sessionId: string
                shuffle: boolean
                signals: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
                speed: number
                timestamp: number
            }
            addToQueue: () => Promise<any>
            canPlayEncryptedContent: () => Promise<any>
            canSendSignal: () => any
            clearQueue: () => Promise<any>
            forcedShuffle: boolean
            getCapabilities: () => {
                canChangeSpeed: boolean
                canChangeVolume: boolean
                canPlayMultipleContextPages: boolean
                hasDecoratedQueue: boolean
                maxNextTracks: number
            }
            getEvents: () => any
            getForcedShuffle: () => any
            getQueue: () => any
            getReferrer: () => any
            getState: () => any
            insertIntoQueue: (a) => any
            pause: () => Promise<any>
            play: (a, b) => any
            playAsNextInQueue: () => Promise<any>
            referrer: string
            refreshCurrentContext: () => Promise<any>
            removeFromQueue: () => Promise<any>
            reorderQueue: (a) => any
            resume: () => Promise<any>
            seekBackward: () => Promise<any>
            seekBy: () => Promise<any>
            seekForward: () => Promise<any>
            seekTo: () => Promise<any>
            sendSignal: () => Promise<any>
            setDefaultFeatureVersion: () => any
            setForcedShuffle: () => any
            setReferrer: () => any
            setRepeat: () => Promise<any>
            setShuffle: () => Promise<any>
            setSpeed: () => Promise<any>
            skipTo: () => Promise<any>
            skipToNext: () => Promise<any>
            skipToPrevious: () => Promise<any>
            updateContext: (a, b) => any
        }
        _pubSubApi: {
            _connectionId: Promise<any>
            _events: {
                _emitter: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
                addListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
                emit: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
                emitSync: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
                onAddListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
                onRemoveListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
                removeListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
            }
            _isDeveloperMode: boolean
            _messages: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
            _subscribeToConnectionId: (a) => any
            _subscribeToMessages: (a, b) => any
            _subscriptions: Map<any, any>
            cancelSubscription: () => Promise<any>
            createSubscription: (a, b) => any
            getConnectionId: () => any
            getEvents: () => any
            getMessages: () => any
            getSubscriptions: () => any
            onConnectionId: () => any
            refreshSubscription: (a) => any
            subscribe: () => any
        }
        _showApi: {
            _events: {
                _aggregator: {
                    _additions: Map<any, any>
                    _batch: Map<any, any>
                    _deletions: Map<any, any>
                    _onAdd: (a) => any
                    _onBatch: (a) => any
                    _onRemove: (a) => any
                    _onUpdate: (a, b) => any
                    _timeout: number
                    _timeoutId: null
                    getBatch: () => any
                    onUpdate: () => any
                    scheduleUpdate: () => any
                    subscribe: (a) => any
                    unsubscribe: (a) => any
                }
                _emitter: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
                _show_client: {
                    getDecorate: (a) => any
                    getShow: (a) => any
                    getShowEpisode: (a) => any
                    getUnfinishedEpisodes: (a) => any
                    markShowAsPlayed: (a) => any
                    options: {}
                    playShow: (a) => any
                    subDecorate: (a) => any
                    subShow: (a) => any
                    subShowEpisode: (a) => any
                    subUnfinishedEpisodes: (a) => any
                    transport: ReturnType<
                        PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                    >["_playerApi"]["_collection"]["transport"]
                }
                _subscriptions: Map<any, any>
                addListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
                emit: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
                emitSync: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
                onAddListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
                onRemoveListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
                removeListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
            }
            _podcast_paywalls_client: {
                options: {}
                putShowSubscription: (a) => any
                transport: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_collection"]["transport"]
            }
            _show_service_client: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_showApi"]["_events"]["_show_client"]
            capabilities: {
                canFilter: boolean
                canGetDefaultSort: boolean
                canGetShowPlayedState: boolean
                canSort: boolean
            }
            checkoutBook: () => Promise<any>
            getAccessInfo: () => Promise<any>
            getBookContents: (a) => any
            getContents: (a) => any
            getEpisodeOrChapter: () => Promise<any>
            getEvents: () => any
            getMetadata: () => Promise<any>
            getPlayerFilter: () => string
            getPlayerSort: () => string
            getShowPlayedState: () => Promise<any>
            remote_configuration: {
                accessListeners: Set<any>
                getValue: () => any
                toBuilder: () => any
                toJSON: () => any
                values: Map<any, any>
            }
        }
        currentPlayerState: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_state"]
        requestInFlight: boolean
    }
    getAuthorizationAPI: () => {
        _cosmos: ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_playerApi"]["_cosmos"]
        _events: {
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
        }
        _plugin: ReturnType<
            PlatformAutoGen["getAdManagers"]
        >["hpto"]["hptoApi"]["eventSender"]["transport"]["_plugins"]["desktop-lifecycle-plugin"]
        _state: {
            isAuthorized: boolean
            retryAt: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["essLastSent"]
            retryAttempt: number
            token: null
        }
        _tokenProvider: () => Promise<any>
        createTransportPlugin: () => any
        getCapabilities: () => { canGetSessionTransferURL: boolean }
        getEvents: () => any
        getSessionTransferURL: () => Promise<any>
        getState: () => any
        getTokenProvider: () => any
        onAuthenticationFailed: (a) => any
        onTokenChanged: () => any
        tryAuthorize: () => any
    }
    getBuddyFeedAPI: () => {
        buddyFetchApi: {
            _builder: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["webApi"]["spotifyTransport"]
            _pubsub: ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_pubSubApi"]
            getBuddyActivity: () => any
            getBuddyFeed: () => any
            getFacebookFriends: () => any
            subscribeToBuddyActivity: (a) => any
        }
        connectToFacebook: () => any
        cosmos: ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_playerApi"]["_cosmos"]
        fetchFacebookFriends: () => Promise<any>
        fetchFriendActivity: () => Promise<any>
        getCapabilities: () => { isSupported: boolean }
        subscribeToBuddyActivity: (a) => any
        subscribeToFacebookConnectionState: () => any
    }
    getClipboardAPI: () => {
        _cosmos: ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_playerApi"]["_cosmos"]
        copy: () => Promise<any>
        paste: () => Promise<any>
    }
    getCollectionPlatformAPI: () => {
        _service: {
            add: (a) => any
            contains: (a) => any
            get: (a) => any
            options: {}
            remove: (a) => any
            streamContains: (a) => any
            streamGet: (a) => any
            transport: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_collection"]["transport"]
        }
        add: (a) => any
        contains: (a) => any
        events: {
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
        }
        getEvents: () => any
        remove: (a) => any
        subscribeContains: (a, b) => any
    }
    getConnectAPI: () => {
        checkDeviceId: (a) => any
        connectServiceClient: {
            becomeInactive: (a) => any
            cancelTransfer: (a) => any
            forceDiscover: (a) => any
            getDebugLevel: (a) => any
            getDeviceSettings: (a) => any
            logout: (a) => any
            notifyAudioRouteChanged: (a) => any
            options: {}
            performDiscovery: (a) => any
            pickerOpened: (a) => any
            pull: (a) => any
            refreshCluster: (a) => any
            rename: (a) => any
            sendCommand: (a) => any
            setDebugLevel: (a) => any
            setDeviceStreamQuality: (a) => any
            setPreferredZeroconf: (a) => any
            startDiscovery: (a) => any
            state: (a) => any
            transfer: (a) => any
            transport: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_collection"]["transport"]
            wakeSleepingClusterDevices: (a) => any
        }
        createLoggingParams: () => any
        discoverDevices: () => Promise<any>
        events: {
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            connectServiceClient: ReturnType<PlatformAutoGen["getConnectAPI"]>["connectServiceClient"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
        }
        getCapabilities: () => { supportsLocalDiscovery: boolean }
        getEvents: () => any
        getState: () => any
        initiateLocalDiscovery: () => Promise<any>
        logout: () => Promise<any>
        mapIncarnationToLoginType: (a) => any
        pullToLocal: () => Promise<any>
        setPreferredIncarnation: (a) => any
        state: {
            activeDevice: {
                brandDisplayName: string
                connectStateId: string
                currentState: string
                disabledReason: undefined
                hifiSupport: { deviceSupported: boolean; fullySupported: boolean; userEligible: boolean }
                id: string
                incarnation: {
                    available: ReturnType<
                        PlatformAutoGen["getAdManagers"]
                    >["adStateReporter"]["focusState"]["listeners"]
                    preferred: undefined
                }
                isActive: boolean
                isConnecting: boolean
                isDisabled: boolean
                isGroup: boolean
                isLocal: boolean
                isLocalNetwork: boolean
                isWebApp: boolean
                isZeroconf: boolean
                license: string
                modelDisplayName: string
                name: string
                supportsDJNarration: boolean
                supportsLogout: boolean
                type: string
                volume: number
            }
            connectingDevice: null
            connectionStatus: string
            devices: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
        }
        transferPlayback: (a) => any
        transferToRemote: (a) => any
    }
    getControlMessageAPI: () => {
        _cosmos: ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_playerApi"]["_cosmos"]
        disableMenuItem: () => Promise<any>
        enableMenuItem: () => Promise<any>
        getEvents: () => any
        notifyReadyStateReached: () => Promise<any>
        notifyUsableStateReached: () => Promise<any>
        notifyViewLoaded: () => Promise<any>
        setTitlebarHeight: () => Promise<any>
    }
    getCurationAPI: () => {
        _libraryAPI: {
            _builder: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["webApi"]["spotifyTransport"]
            _cache: Map<any, any>
            _collection: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_collection"]
            _currentUsername: string
            _events: {
                _aggregator: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_showApi"]["_events"]["_aggregator"]
                _cache: Map<any, any>
                _cancellables: {
                    albums: { cancel: () => undefined }
                    artists: { cancel: () => undefined }
                    books: { cancel: () => undefined }
                    episodes: { cancel: () => undefined }
                    shows: { cancel: () => undefined }
                    tracks: { cancel: () => undefined }
                }
                _collection: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_collection"]
                _containsCancellable: { cancel: () => undefined }
                _emitter: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
                _listen_later: {
                    add: (a) => any
                    episodes: (a) => any
                    options: {}
                    play: (a) => any
                    remove: (a) => any
                    streamEpisodes: (a) => any
                    transport: ReturnType<
                        PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                    >["_playerApi"]["_collection"]["transport"]
                }
                _numListeners: number
                _your_library: {
                    all: (a) => any
                    contains: (a) => any
                    decorate: (a) => any
                    getKeys: (a) => any
                    isCurated: (a) => any
                    movePin: (a) => any
                    options: {}
                    pin: (a) => any
                    streamAll: (a) => any
                    streamContains: (a) => any
                    streamDecorate: (a) => any
                    streamIsCurated: (a) => any
                    transport: ReturnType<
                        PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                    >["_playerApi"]["_collection"]["transport"]
                    unPin: (a) => any
                }
                addListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
                emit: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
                emitOperationComplete: (a, b, c) => any
                emitOperationSync: (a, b) => any
                emitSync: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
                emitUpdateItems: (a) => any
                emitUpdatePin: (a) => any
                emitUpdatePinErrorTooManyPins: (a) => any
                onAddListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
                onBatchChanged: () => Promise<any>
                onRemoveListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
                removeListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
                subscribeToUpdates: () => any
                unsubscribeFromUpdates: () => any
            }
            _isTagsInfoSynced: () => Promise<any>
            _listen_later: ReturnType<PlatformAutoGen["getCurationAPI"]>["_libraryAPI"]["_events"]["_listen_later"]
            _your_library: ReturnType<PlatformAutoGen["getCurationAPI"]>["_libraryAPI"]["_events"]["_your_library"]
            add: () => Promise<any>
            contains: () => Promise<any>
            containsSync: () => any
            getAlbum: () => Promise<any>
            getAlbums: () => Promise<any>
            getArtists: () => Promise<any>
            getBooks: () => Promise<any>
            getCapabilities: () => {
                canFetchAllItems: boolean
                canFilter: boolean
                canFilterTracksAndEpisodes: boolean
                canGetTracksByArtistOrAlbum: boolean
                canMarkEpisodesAsDone: boolean
                canModifyOffline: boolean
                canPin: boolean
                canSort: boolean
                canSortTracksAndEpisodes: boolean
                canTextFilterContentsInRealtime: boolean
            }
            getContents: () => Promise<any>
            getContentsPrimaryFilterId: () => null
            getEpisodes: () => Promise<any>
            getEvents: () => any
            getFilterLabel: () => undefined
            getShows: () => Promise<any>
            getSortOrderLabel: () => undefined
            getStaticallyKnownFilters: () => { playlist: { filterId: string; sortOrderIds: { customSort: string } } }
            getTracks: () => Promise<any>
            getTracksFilterTags: () => Promise<any>
            markAsPlayed: () => Promise<any>
            markAsUnPlayed: () => Promise<any>
            pin: (a) => any
            remove: () => Promise<any>
            unpin: () => Promise<any>
        }
        _playlistAPI: {
            _builder: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["webApi"]["spotifyTransport"]
            _events: {
                _aggregator: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_showApi"]["_events"]["_aggregator"]
                _dataClient: {
                    find: (a) => any
                    get: (a) => any
                    options: {}
                    subscribe: (a) => any
                    transport: ReturnType<
                        PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                    >["_playerApi"]["_collection"]["transport"]
                }
                _emitter: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
                _subscriptions: Map<any, any>
                addListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
                emit: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
                emitAddComplete: (a, b, c) => any
                emitAddSync: (a, b) => any
                emitMoveComplete: (a, b) => any
                emitMoveSync: (a) => any
                emitRemoveComplete: (a, b, c) => any
                emitRemoveSync: (a, b) => any
                emitSendSignalComplete: (a, b, c) => any
                emitSendSignalSync: (a, b) => any
                emitSync: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
                emitUpdateComplete: (a, b) => any
                emitUpdateSync: (a) => any
                onAddListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
                onBatchChanged: () => any
                onRemoveListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
                removeListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
            }
            _isAudiobookCurationEnabled: boolean
            _playlistDataClient: ReturnType<PlatformAutoGen["getCurationAPI"]>["_playlistAPI"]["_events"]["_dataClient"]
            _playlistServiceClient: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_playlistResyncerAPI"]["_playlistServiceClient"]
            _resyncAPI: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_playlistResyncerAPI"]
            _smartShuffleEligibilityAPI: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_smartShuffleEligibility"]
            add: (a, b, c) => any
            clearAttributes: (a) => any
            getCapabilities: () => any
            getContents: (a) => any
            getEvents: () => any
            getMetadata: (a) => any
            getPlaylist: (a, b) => any
            getPlaylistQuery: () => {
                alwaysShowWindowed: boolean
                attributeFilter: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["adStateReporter"]["focusState"]["listeners"]
                boolPredicates: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["adStateReporter"]["focusState"]["listeners"]
                descriptorFilter: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["adStateReporter"]["focusState"]["listeners"]
                group: boolean
                includeAllPlaceholders: boolean
                itemIdFilter: string
                loadRecommendations: boolean
                range: undefined
                showUnavailable: boolean
                sortBy: number
                sourceRestriction: number
                supportedPlaceholderTypes: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["adStateReporter"]["focusState"]["listeners"]
                textFilter: string
                updateThrottlingMs: number
            }
            getRecommendedBookUris: (a, b) => any
            getRecommendedTracks: (a, b) => any
            move: (a, b) => any
            remove: (a) => any
            resolvePlaylistFormatURI: () => Promise<any>
            resync: () => Promise<any>
            sendItemSignal: (a, b) => any
            setAttributes: (a) => any
            updateDetails: (a) => any
            uploadImage: () => Promise<any>
        }
        _your_library: ReturnType<PlatformAutoGen["getCurationAPI"]>["_libraryAPI"]["_events"]["_your_library"]
        cache: Map<any, any>
        curateDefault: () => Promise<any>
        curateItems: (a, b) => any
        events: {
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            _your_library: ReturnType<PlatformAutoGen["getCurationAPI"]>["_libraryAPI"]["_events"]["_your_library"]
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            aggregator: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_showApi"]["_events"]["_aggregator"]
            cache: Map<any, any>
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitOperationComplete: (a, b, c, d) => any
            emitOperationSync: (a, b, c) => any
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            emitUpdateCuratedItems: (a) => any
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onCuratedBatchChanged: () => Promise<any>
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
            streamIsCuratedCancellable: { cancel: () => undefined }
        }
        getCurationContexts: () => Promise<any>
        getDefaultCurationContextUri: () => string
        getEvents: () => any
        isCurated: () => Promise<any>
        isCuratedSync: () => any
    }
    getEqualizerAPI: () => {
        filters: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
        getFilters: () => Promise<any>
        getPreset: () => any
        isSupported: () => boolean
        localStorageAPI: {
            _events: {
                _emitter: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
                addListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
                emit: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
                emitSync: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
                onAddListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
                onRemoveListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
                removeListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
            }
            auto_cleanup: boolean
            clearItem: () => any
            createNamespacedKey: () => any
            getEvents: () => any
            getItem: () => any
            items: {
                "yblp9ylse3i4cdx2klsq1xnlx:connect-nudge-triggered-at": string
                "yblp9ylse3i4cdx2klsq1xnlx:home-shortcuts-override": ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["adStateReporter"]["focusState"]["listeners"]
                "yblp9ylse3i4cdx2klsq1xnlx:isPlaybackBarRemainingTimeToggled": boolean
                "yblp9ylse3i4cdx2klsq1xnlx:items-view": number
                "yblp9ylse3i4cdx2klsq1xnlx:library-row-mode": number
                "yblp9ylse3i4cdx2klsq1xnlx:lintHtmlWithCss": boolean
                "yblp9ylse3i4cdx2klsq1xnlx:npv-onboarding-dismissed": boolean
                "yblp9ylse3i4cdx2klsq1xnlx:npv-onboarding-dismissed-time": number
                "yblp9ylse3i4cdx2klsq1xnlx:npv-onboarding-never-show-again": boolean
                "yblp9ylse3i4cdx2klsq1xnlx:onboarding-dismissed-amount:ylx-playlist-ordering": number
                "yblp9ylse3i4cdx2klsq1xnlx:onboarding-dismissed:ylx-playlist-ordering": boolean
                "yblp9ylse3i4cdx2klsq1xnlx:opened-folder-uri": string
                "yblp9ylse3i4cdx2klsq1xnlx:panel-width": number
                "yblp9ylse3i4cdx2klsq1xnlx:playback-handle-type": string
                "yblp9ylse3i4cdx2klsq1xnlx:remote-config-overrides": {}
                "yblp9ylse3i4cdx2klsq1xnlx:smart-shuffle-menu": number
                "yblp9ylse3i4cdx2klsq1xnlx:smart-shuffle-seen": boolean
                "yblp9ylse3i4cdx2klsq1xnlx:sort-view-picker-onboarding-seen": boolean
                "yblp9ylse3i4cdx2klsq1xnlx:toggleNowPlayingView": boolean
                "yblp9ylse3i4cdx2klsq1xnlx:ui.right_sidebar_content": string
                "yblp9ylse3i4cdx2klsq1xnlx:ylx-active-filter-ids": {
                    "": ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
                }
                "yblp9ylse3i4cdx2klsq1xnlx:ylx-active-sort-order-by-filter-id": {}
                "yblp9ylse3i4cdx2klsq1xnlx:ylx-default-state-nav-bar-width": number
                "yblp9ylse3i4cdx2klsq1xnlx:ylx-expanded-folders": ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["adStateReporter"]["focusState"]["listeners"]
                "yblp9ylse3i4cdx2klsq1xnlx:ylx-expanded-state-nav-bar-width": number
                "yblp9ylse3i4cdx2klsq1xnlx:ylx-sidebar-state": number
            }
            listenToStorageEvents: () => undefined
            max_retries: number
            namespace: string
            parseLocalStorageValue: (a) => any
            setItem: (a) => any
            setItemInternal: (a, b) => any
            toggleItemsTypeAndCleanup: () => any
        }
        prefs: ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_playerApi"]["_prefs"]
        setEnabledState: () => any
        setFilterGain: (a) => any
        setPreset: () => any
        subscribeToEnabledState: () => any
        subscribeToPresetChange: () => any
    }
    getEventSender: () => ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]
    getFacebookAPI: () => {
        _cosmos: ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_playerApi"]["_cosmos"]
        _emitter: ReturnType<
            PlatformAutoGen["getAdManagers"]
        >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
        _numListeners: number
        _subscription: null
        addListener: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
        connect: () => any
        disconnect: () => any
        emit: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
        emitSync: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
        onAddListener: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
        onRemoveListener: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
        removeListener: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
    }
    getFeatureFlags: () => { enableShows: boolean }
    getFollowAPI: () => {
        _cache: {
            _cache: Map<any, any>
            _ttl: null
            cleanup: () => any
            clear: () => any
            create: (a) => any
            delete: () => any
            entries: () => any
            get: () => any
            getExpiry: () => any
            has: () => any
            isExpired: () => any
            set: (a) => any
        }
        _events: {
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitOperationComplete: (a, b) => any
            emitOperationSync: (a) => any
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
        }
        _loader: (a, b) => any
        _validateURIs: () => any
        executeOperation: (a, b) => any
        followUsers: () => Promise<any>
        getEvents: () => any
        isFollowing: () => Promise<any>
        unfollowUsers: () => Promise<any>
    }
    getGraphQLLoader: () => ReturnType<PlatformAutoGen["getFollowAPI"]>["_loader"]
    getHistory: () => ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["history"]
    getIndexedDbAPI: () => ReturnType<
        PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
    >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]
    getLibraryAPI: () => ReturnType<PlatformAutoGen["getCurationAPI"]>["_libraryAPI"]
    getLocalFilesAPI: () => {
        _client: {
            addFolder: (a) => any
            getScannerStatus: (a) => any
            getSources: (a) => any
            getTracks: (a) => any
            mutateDefaultSource: (a) => any
            mutateDefaultSources: (a) => any
            notifyDefaultSources: (a) => any
            options: {}
            removeFolder: (a) => any
            subscribeScannerStatus: (a) => any
            subscribeSources: (a) => any
            subscribeTracks: (a) => any
            transport: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_collection"]["transport"]
        }
        _cosmos: ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_playerApi"]["_cosmos"]
        _emitUpdate: () => any
        _events: {
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
        }
        _localStorageAPI: ReturnType<PlatformAutoGen["getEqualizerAPI"]>["localStorageAPI"]
        _subscribeToTracksUpdates: () => any
        _totalLength: number
        addFolder: () => Promise<any>
        browseForFolder: () => Promise<any>
        getCapabilities: () => { canFetchAllTracks: boolean; canFilter: boolean; canSort: boolean }
        getEvents: () => any
        getIsEnabled: () => any
        getSources: () => Promise<any>
        getTracks: (a) => any
        mutateDefaultSource: () => Promise<any>
        removeFolder: () => Promise<any>
        setIsEnabled: () => any
        subscribeIsEnabled: () => any
    }
    getLocalStorageAPI: () => ReturnType<PlatformAutoGen["getEqualizerAPI"]>["localStorageAPI"]
    getOfflineAPI: () => {
        _cache: Map<any, any>
        _canDownload: (a) => any
        _events: {
            _cache: Map<any, any>
            _cosmos: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_cosmos"]
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            _offline: {
                addDownload: (a) => any
                getContextForDevices: (a) => any
                getContexts: (a) => any
                getContextsProgress: (a) => any
                getDevices: (a) => any
                getItems: (a) => any
                getLocalDevice: (a) => any
                getOfflineLicenseInfo: (a) => any
                getOfflinePlaybackStatus: (a) => any
                getTotalProgress: (a) => any
                options: {}
                removeAllDownloads: (a) => any
                removeDownload: (a) => any
                setOfflinePlaybackAllowed: (a) => any
                subscribeContextForDevices: (a) => any
                subscribeContexts: (a) => any
                subscribeContextsProgress: (a) => any
                subscribeError: (a) => any
                subscribeItems: (a) => any
                subscribeOfflinePlaybackStatus: (a) => any
                subscribeTotalProgress: (a) => any
                transport: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_collection"]["transport"]
            }
            _productState: {
                delOverridesValues: (a) => any
                getValues: (a) => any
                options: {}
                putOverridesValues: (a) => any
                putValues: (a) => any
                subValues: (a) => any
                transport: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_collection"]["transport"]
            }
            _username: string
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
            setupCapabilitiesEvents: () => any
            setupConnectivityEvents: () => any
            setupContextAndItemAvailabilityEvents: () => any
            setupContextProgressEvents: () => any
            setupErrorEvents: () => any
            setupTotalProgressEvents: () => any
        }
        _offline: ReturnType<PlatformAutoGen["getOfflineAPI"]>["_events"]["_offline"]
        _productState: ReturnType<PlatformAutoGen["getOfflineAPI"]>["_events"]["_productState"]
        _storage: {
            deleteExpiredItems: (a) => any
            deleteUnlockedItems: (a) => any
            getCacheSizeLimit: (a) => any
            getFileRanges: (a) => any
            getStats: (a) => any
            options: {}
            setCacheSizeLimit: (a) => any
            transport: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_collection"]["transport"]
        }
        _username: string
        _yourLibrary: ReturnType<PlatformAutoGen["getCurationAPI"]>["_libraryAPI"]["_events"]["_your_library"]
        addDownload: (a) => any
        getAvailabilitySync: () => any
        getCapabilities: () => { canDownload: (a) => any; canRemoteDownload: boolean }
        getContextForDevices: () => Promise<any>
        getDownloads: () => Promise<any>
        getEvents: () => any
        getStatistics: () => Promise<any>
        removeAllDownloads: () => Promise<any>
        removeCache: () => Promise<any>
        removeDownload: (a) => any
    }
    getPlatformData: () => {
        app_platform: string
        client_capabilities: {
            can_autostart: boolean
            can_minimize_or_exit_on_close: boolean
            can_restart: boolean
            can_show_system_media_controls: boolean
            can_show_track_notifications: boolean
        }
        client_name: string
        client_variant: string
        client_version_quadruple: string
        client_version_quintuple: string
        client_version_triple: string
        event_sender_context_information: {
            client_id: string
            client_version_int: number
            client_version_string: string
            device_id: string
            device_manufacturer: string
            device_model: string
            installation_id: string
            os_version: string
            platform_type: string
        }
        is_developer_mode: boolean
        os_name: string
        os_settings: { double_click_interval_ms: number; scroller_style: string }
        os_version: string
        remote_config_client_id: string
    }
    getPlayHistoryAPI: () => {
        _cache: {
            _cache: Map<any, any>
            _ttl: number
            cleanup: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]["cleanup"]
            clear: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]["clear"]
            create: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]["create"]
            delete: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]["delete"]
            entries: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]["entries"]
            get: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]["get"]
            getExpiry: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]["getExpiry"]
            has: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]["has"]
            isExpired: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]["isExpired"]
            set: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]["set"]
        }
        _events: {
            _cache: ReturnType<PlatformAutoGen["getPlayHistoryAPI"]>["_cache"]
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            _loader: (a, b, c) => any
            _numListeners: number
            _player: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextPlayer"]
            _subscriptions: { update: null }
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onListenerAdded: () => any
            onListenerRemoved: () => any
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
            startListening: () => any
            stopListening: () => any
        }
        _loader: ReturnType<PlatformAutoGen["getPlayHistoryAPI"]>["_events"]["_loader"]
        _player: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextPlayer"]
        getCapabilities: () => { isSupported: boolean }
        getContents: () => Promise<any>
        getEvents: () => any
    }
    getPlaybackAPI: () => {
        _builder: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["webApi"]["spotifyTransport"]
        _connectServiceClient: ReturnType<PlatformAutoGen["getConnectAPI"]>["connectServiceClient"]
        _eventSender: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]
        _events: {
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
        }
        _filters: {
            getCurrentAudioDevice: () => null
            getDevices: () => Promise<any>
            getFilterState: () => Promise<any>
            getFiltersEvents: () => null
            getSavedDevices: () => ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["adStateReporter"]["focusState"]["listeners"]
            removeCurrentDevice: () => undefined
            restorePreviouslyActiveDevice: () => Promise<any>
            setCurrentDevice: () => Promise<any>
        }
        _info: {
            advisedBitrate: number
            audioId: string
            buffering: boolean
            codecName: string
            error: number
            fileBitrate: number
            fileId: string
            fileType: string
            gainAdjustment: number
            hasLoudness: boolean
            lengthMs: bigint
            loudness: number
            playbackSpeed: number
            playing: boolean
            positionMs: bigint
            resolvedContentUrl: string
            status: number
            strategy: string
            targetBitrate: number
            targetFileAvailable: boolean
        }
        _isAvailable: boolean
        _isLocal: boolean
        _localStorageAPI: ReturnType<PlatformAutoGen["getEqualizerAPI"]>["localStorageAPI"]
        _playbackService: {
            duck: (a) => any
            getFiles: (a) => any
            getFormats: (a) => any
            getPlaybackInfo: (a) => any
            getRawVolume: (a) => any
            getVolume: (a) => any
            lowerVolume: (a) => any
            options: {}
            raiseVolume: (a) => any
            setRawVolume: (a) => any
            setVolume: (a) => any
            subBufferUnderrun: (a) => any
            subPlaybackInfo: (a) => any
            subPosition: (a) => any
            subRawVolume: (a) => any
            subVolume: (a) => any
            transport: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_collection"]["transport"]
        }
        _playerAPI: ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_playerApi"]
        _storageService: ReturnType<PlatformAutoGen["getOfflineAPI"]>["_storage"]
        _transport: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_collection"]["transport"]
        _volume: number
        emitVolume: () => any
        getCapabilities: () => {
            canChangeVolume: boolean
            canGetFiles: boolean
            canGetPlaybackInfo: boolean
            puffinEnabled: boolean
        }
        getCurrentAudioDevice: () => any
        getDevices: () => Promise<any>
        getEvents: () => any
        getFiles: () => Promise<any>
        getFilterState: () => Promise<any>
        getFiltersEvents: () => any
        getPlaybackInfo: () => Promise<any>
        getSavedDevices: () => any
        getVolume: () => Promise<any>
        getVolumeInternal: () => any
        lowerVolume: () => Promise<any>
        raiseVolume: () => Promise<any>
        removeCurrentDevice: () => any
        setCurrentDevice: () => Promise<any>
        setVolume: () => Promise<any>
    }
    getPlayerAPI: () => ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_playerApi"]
    getPlaylistAPI: () => ReturnType<PlatformAutoGen["getCurationAPI"]>["_playlistAPI"]
    getPlaylistPermissionsAPI: () => {
        _builder: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["webApi"]["spotifyTransport"]
        _client: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_playlistResyncerAPI"]["_playlistServiceClient"]
        _events: {
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitOperationComplete: (a) => any
            emitOperationSync: () => any
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
        }
        claimPermissions: (a) => any
        getCapabilities: () => {}
        getEvents: () => any
        getMembers: () => Promise<any>
        getPermissionGrant: (a) => any
        removeMember: (a) => any
        setBasePermission: (a) => any
        setMemberPermission: (a, b) => any
        subscribeToMembers: (a) => any
    }
    getPrivateSessionAPI: () => {
        _scrobble: {
            getIncognitoMode: (a) => any
            options: {}
            putIncognitoMode: (a) => any
            subIncognitoMode: (a) => any
            transport: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_collection"]["transport"]
        }
        getCapabilities: () => { isSupported: boolean }
        setPrivateSession: () => Promise<any>
        subscribeToPrivateSession: () => any
    }
    getPubSubAPI: () => ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_pubSubApi"]
    getRecentlyPlayedAPI: () => {
        _cancellable: { cancel: () => undefined }
        _client: {
            get: (a) => any
            hide: (a) => any
            hideTracks: (a) => any
            options: {}
            stream: (a) => any
            streamTracks: (a) => any
            tracks: (a) => any
            transport: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_collection"]["transport"]
        }
        _contexts: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
        _emitter: ReturnType<
            PlatformAutoGen["getAdManagers"]
        >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
        addListener: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
        emit: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
        emitSync: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
        getContexts: () => any
        onAddListener: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
        onRemoveListener: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
        removeListener: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
    }
    getRemoteConfiguration: () => ReturnType<
        PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
    >["_showApi"]["remote_configuration"]
    getReportAPI: () => {
        _playlistAPI: ReturnType<PlatformAutoGen["getCurationAPI"]>["_playlistAPI"]
        _productState: ReturnType<PlatformAutoGen["getOfflineAPI"]>["_events"]["_productState"]
        canReportPlaylist: (a) => any
        getReportURL: (a) => any
        isURIReportable: () => boolean
    }
    getRequestBuilder: () => ReturnType<
        PlatformAutoGen["getAdManagers"]
    >["hpto"]["hptoApi"]["webApi"]["spotifyTransport"]
    getRootlistAPI: () => {
        _builder: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["webApi"]["spotifyTransport"]
        _cache: Set<any>
        _decorationCache: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]
        _events: {
            _aggregator: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_showApi"]["_events"]["_aggregator"]
            _contains: () => Promise<any>
            _dataClient: {
                contains: (a) => any
                get: (a) => any
                getOfflinePlaylistsContainingItem: (a) => any
                options: {}
                subscribe: (a) => any
                transport: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_collection"]["transport"]
            }
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            _numListeners: number
            _subscription: null
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitAddComplete: (a, b, c) => any
            emitAddSync: (a, b) => any
            emitCreatePlaylistComplete: (a, b, c, d) => any
            emitCreatePlaylistSync: (a, b) => any
            emitMoveComplete: (a, b, c) => any
            emitMoveSync: (a, b) => any
            emitRemoveComplete: (a) => any
            emitRemoveSync: () => any
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            emitUpdateItems: (a) => any
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onContainsItems: () => Promise<any>
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            onUpdate: () => Promise<any>
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
            subscribeToUpdates: () => any
            unsubscribeFromUpdates: () => any
        }
        _playlistDataClient: ReturnType<PlatformAutoGen["getCurationAPI"]>["_playlistAPI"]["_events"]["_dataClient"]
        _rootlistDataClient: ReturnType<PlatformAutoGen["getRootlistAPI"]>["_events"]["_dataClient"]
        _rootlistModificationClient: {
            modify: (a) => any
            options: {}
            transport: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_collection"]["transport"]
        }
        add: (a) => any
        applyModification: () => Promise<any>
        contains: () => Promise<any>
        containsSync: () => any
        createFolder: (a) => any
        createPlaylist: (a, b) => any
        getCapabilities: () => { canFilter: boolean; canModifyOffline: boolean; canSort: boolean }
        getContents: () => Promise<any>
        getEvents: () => any
        getMetadata: () => Promise<any>
        getPublishedState: () => Promise<any>
        move: (a, b) => any
        moveFolder: (a) => any
        onUpdateItems: (a) => any
        remove: () => Promise<any>
        removeFolder: () => Promise<any>
        renameFolder: (a) => any
        setPublishedState: (a) => any
    }
    getSEOExperiments: () => {}
    getSegmentsAPI: () => {
        _client: {
            getDisplaySegments: (a) => any
            options: {}
            transport: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_collection"]["transport"]
        }
        getArtists: () => Promise<any>
        getCapabilities: () => { isSupported: boolean }
        getSegments: (a, b) => any
    }
    getServiceWorkerMessenger: () => Promise<any>
    getSession: () => {
        accessToken: string
        accessTokenExpirationTimestampMs: number
        isAnonymous: boolean
        locale: string
        market: string
        valid: boolean
    }
    getSettingsAPI: () => {
        language: {
            deserializeValue: (a) => any
            getValue: () => Promise<any>
            identifier: string
            key: string
            prefsApi: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_prefs"]
            serializeValue: (a) => any
            setValue: () => Promise<any>
            subValue: () => () => undefined
            subs: Set<any>
            subscription: null
            value: undefined
        }
        quality: {
            autoAdjustQuality: {
                deserializeValue: (a) => any
                getValue: () => Promise<any>
                identifier: string
                key: string
                prefsApi: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_prefs"]
                serializeValue: (a) => any
                setValue: () => Promise<any>
                subValue: () => () => undefined
                subs: Set<any>
                subscription: null
                value: undefined
            }
            downloadAudioQuality: {
                deserializeValue: (a) => any
                getValue: () => Promise<any>
                identifier: string
                key: string
                maxSupportedQuality: {
                    clampAudioQuality: () => Promise<any>
                    getValue: () => Promise<any>
                    key: string
                    productStateApi: ReturnType<PlatformAutoGen["getOfflineAPI"]>["_events"]["_productState"]
                    setValue: () => Promise<any>
                    subValue: () => () => undefined
                    subs: Set<any>
                    subscription: null
                    value: undefined
                }
                prefsApi: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_prefs"]
                serializeValue: (a) => any
                setValue: () => Promise<any>
                subValue: () => () => undefined
                subs: Set<any>
                subscription: null
                value: number
            }
            getFormats: () => Promise<any>
            maxSupportedQuality: ReturnType<
                PlatformAutoGen["getSettingsAPI"]
            >["quality"]["downloadAudioQuality"]["maxSupportedQuality"]
            normalizeVolume: {
                deserializeValue: (a) => any
                getValue: () => Promise<any>
                identifier: string
                key: string
                prefsApi: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_prefs"]
                serializeValue: (a) => any
                setValue: () => Promise<any>
                subValue: () => () => undefined
                subs: Set<any>
                subscription: null
                value: undefined
            }
            playbackService: ReturnType<PlatformAutoGen["getPlaybackAPI"]>["_playbackService"]
            streamingQuality: {
                deserializeValue: (a) => any
                getValue: () => Promise<any>
                identifier: string
                key: string
                maxSupportedQuality: ReturnType<
                    PlatformAutoGen["getSettingsAPI"]
                >["quality"]["downloadAudioQuality"]["maxSupportedQuality"]
                prefsApi: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_prefs"]
                serializeValue: (a) => any
                setValue: () => Promise<any>
                subValue: () => () => undefined
                subs: Set<any>
                subscription: null
                value: number
            }
            volumeLevel: {
                deserializeValue: (a) => any
                getValue: () => Promise<any>
                identifier: string
                key: string
                prefsApi: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_prefs"]
                serializeValue: (a) => any
                setValue: () => Promise<any>
                subValue: () => () => undefined
                subs: Set<any>
                subscription: null
                value: undefined
            }
        }
    }
    getShowAPI: () => ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_showApi"]
    getShuffleAPI: () => {
        _contextualShuffle: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_contextualShuffle"]
        _events: {
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            emitUpdateShuffleModeCompleteSync: (a) => any
            emitUpdateShuffleModeErrorSync: (a) => any
            emitUpdateShuffleModeSync: (a) => any
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
        }
        _history: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["history"]
        _isDsaEnabled: boolean
        _player: ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_playerApi"]
        _playlistDataServiceClient: ReturnType<
            PlatformAutoGen["getCurationAPI"]
        >["_playlistAPI"]["_events"]["_dataClient"]
        _playlistServiceClient: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_playlistResyncerAPI"]["_playlistServiceClient"]
        _smartShuffleEligibility: ReturnType<
            PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
        >["_playerApi"]["_smartShuffleEligibility"]
        _syncShuffle: (a) => any
        _userApi: {
            _cosmos: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_cosmos"]
            _events: {
                _emitter: ReturnType<
                    PlatformAutoGen["getAdManagers"]
                >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
                addListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
                emit: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
                emitProductStateUpdate: () => any
                emitSync: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
                onAddListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
                onRemoveListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
                removeListener: ReturnType<
                    PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
                >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
            }
            _product_state_service: ReturnType<PlatformAutoGen["getOfflineAPI"]>["_events"]["_productState"]
            getEvents: () => any
            getProductState: () => Promise<any>
            getUser: () => Promise<any>
        }
        getAvailableShuffleModes: () => Promise<any>
        getEvents: () => any
        getShuffle: () => Promise<any>
        isSmartShuffleEnabled: boolean
        setShuffle: (a) => any
    }
    getSingAlongAPI: () => {
        getCapabilities: () => { isSupported: boolean }
        getStatus: () => Promise<any>
        karaokeServiceClient: {
            getStatus: (a) => any
            options: {}
            postStatus: (a) => any
            postVocalVolume: (a) => any
            subscribeToEvents: (a) => any
            transport: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_collection"]["transport"]
        }
        setStatus: () => Promise<any>
        setVocalVolume: () => Promise<any>
    }
    getSocialConnectAPI: () => {
        createSession: () => Promise<any>
        currentSession: null
        deleteSession: () => Promise<any>
        events: {
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
        }
        fetchCurrentSession: () => Promise<any>
        getCurrentSession: () => any
        getEnabled: () => any
        getEvents: () => any
        getSessionInfo: () => Promise<any>
        getShortInviteLink: () => Promise<any>
        handleSessionResponse: () => any
        handleSessionUpdate: () => any
        isSessionNewer: () => any
        joinSession: (a, b) => any
        leaveSession: () => Promise<any>
        removeSessionMember: () => Promise<any>
        serviceEvents: {
            _emitter: ReturnType<
                PlatformAutoGen["getAdManagers"]
            >["hpto"]["hptoApi"]["eventSender"]["transport"]["_pluginMediator"]
            addListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["addListener"]
            emit: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emit"]
            emitSync: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["emitSync"]
            numListeners: number
            onAddListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onAddListener"]
            onRemoveListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["onRemoveListener"]
            removeListener: ReturnType<
                PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]
            >["_playerApi"]["_contextualShuffle"]["_indexedDbAPI"]["_events"]["removeListener"]
            subscribeToUpdates: () => undefined
            unsubscribeToUpdates: () => undefined
        }
        setCurrentSession: (a) => any
        setParticipantVolumeControl: () => Promise<any>
        setQueueOnlyMode: () => Promise<any>
        shortLinkCache: ReturnType<PlatformAutoGen["getFollowAPI"]>["_cache"]
        socialConnectServiceClient: {
            createSession: () => Promise<any>
            deleteSession: () => Promise<any>
            fetchCurrentSession: () => Promise<any>
            getSessionInfo: () => Promise<any>
            joinSession: (a, b) => any
            leaveSession: () => Promise<any>
            onConnected: () => undefined
            removeSessionMember: () => Promise<any>
            setParticipantVolumeControl: () => Promise<any>
            setQueueOnlyMode: () => Promise<any>
        }
        socialConnectStatus: string
        urlDispenserServiceClient: { getShortUrl: () => Promise<any> }
    }
    getTranslations: () => {
        "a11y.externalLink": string
        "about.copyright": string
        "about.title_label": string
        "about.upgrade.downloaded": string
        "about.upgrade.downloading": string
        "about.upgrade.pending": string
        "about.upgrade.pending_link": string
        "about.upgrade.restart_link": string
        "acq.artist.about.attribution": string
        "action-trigger.available-in-app-only": string
        "action-trigger.button.get-app": string
        "action-trigger.button.not-now": string
        "action-trigger.create-playlist": string
        "action-trigger.listen-mixed-media-episode": string
        "action-trigger.log-in-follow-profile": string
        "action-trigger.log-in-like-action": string
        "action-trigger.log-in-or-sign-up": string
        "action-trigger.logged-out": string
        "action-trigger.logged-out-continue": string
        "action-trigger.logged-out-full-track": string
        "action-trigger.logged-out-queue": string
        "action-trigger.logged-out-radio": string
        "action-trigger.logged-out-synced": string
        "action-trigger.login-playlist": string
        "action-trigger.save-album": string
        "action-trigger.save-library": string
        "ad-formats.ad-feedback.dislike": string
        "ad-formats.ad-feedback.dislike.do-not-like": string
        "ad-formats.ad-feedback.dislike.not-relevant": string
        "ad-formats.ad-feedback.dislike.offensive-content": string
        "ad-formats.ad-feedback.dislike.too-often": string
        "ad-formats.ad-feedback.dislike.unpleasant-content": string
        "ad-formats.ad-feedback.like": string
        "ad-formats.ad-feedback.like.discovered-new": string
        "ad-formats.ad-feedback.like.enjoyable-content": string
        "ad-formats.ad-feedback.like.interested-in-brand": string
        "ad-formats.ad-feedback.like.interested-in-product": string
        "ad-formats.ad-feedback.like.relevant": string
        "ad-formats.advertisement": string
        "ad-formats.dismissAd": string
        "ad-formats.dsa.aboutThisAd": string
        "ad-formats.dsa.modal.aboutTailoredAds": string
        "ad-formats.dsa.modal.adBasedInfoExplanation": string
        "ad-formats.dsa.modal.adRelevancyAction": string
        "ad-formats.dsa.modal.editProfile": string
        "ad-formats.dsa.modal.otherInfo": string
        "ad-formats.dsa.modal.privacySetting": string
        "ad-formats.dsa.modal.profileInfo": string
        "ad-formats.dsa.modal.tailoredAds": string
        "ad-formats.dsa.modal.targeting.age": string
        "ad-formats.dsa.modal.targeting.gender": string
        "ad-formats.dsa.modal.targeting.interests": string
        "ad-formats.dsa.modal.targeting.location": string
        "ad-formats.dsa.modal.targeting.unknown": string
        "ad-formats.exclusive": string
        "ad-formats.hideAnnouncements": string
        "ad-formats.learnMore": string
        "ad-formats.npv.header.music-context": string
        "ad-formats.npv.header.podcast-context": string
        "ad-formats.playTrack": string
        "ad-formats.presentedBy": string
        "ad-formats.remove": string
        "ad-formats.save": string
        "ad-formats.skippable_ads.skip_countdown": string
        "ad-formats.sponsored": string
        "ad-formats.video-ad-overlay.cta-button": string
        "addToPlaylist-icon.label": string
        "age.restriction.confirmAge": string
        "age.restriction.continue": string
        "age.restriction.explicitContent": string
        "age.restriction.nineeteen-badge": string
        album: string
        "album-page.more-by-artist": string
        "album-page.more-releases": { one: string; other: string }
        "album.page-title": string
        already_have_account: string
        artist: string
        "artist-page-discography.all": string
        "artist-page.appearson.seo.title": string
        "artist-page.artist-playlists": string
        "artist-page.artist-playlists.seo.title": string
        "artist-page.artists-pick": string
        "artist-page.discography": string
        "artist-page.discography.seo.title": string
        "artist-page.discovered-on": string
        "artist-page.fansalsolike": string
        "artist-page.fansalsolike.seo.title": string
        "artist-page.featuring": string
        "artist-page.featuring.seo.title": string
        "artist-page.how-many-listeners": { one: string; other: string }
        "artist-page.liked-songs-by-artist-title": string
        "artist-page.merch": string
        "artist-page.popular": string
        "artist-page.saved-by-artist": string
        "artist-page.saved-header": string
        "artist-page.saved-tracks-amount": { one: string; other: string }
        "artist-page.show-discography": string
        "artist-page.tracks.seemore": string
        "artist-page.tracks.showless": string
        "artist-page.where-people-listen-from": string
        "artist-page.world_rank": string
        "artist.about": string
        "artist.albums": string
        "artist.appears-on": string
        "artist.compilations": string
        "artist.concerts.artist_tour_dates": string
        "artist.concerts.error.not_found": string
        "artist.latest-release": string
        "artist.monthly-listeners-count": { one: string; other: string }
        "artist.popular-tracks": string
        "artist.singles": string
        "artist.verified": string
        "audiobook.freePriceDescription": string
        "audiobook.freePriceExplanation": string
        "audiobook.page.sample": string
        "authorization-status.badge": string
        "authorization-status.dismiss": string
        "authorization-status.reconnecting": string
        "authorization-status.retry": string
        "authorization-status.retrying": string
        "authorization-status.title": string
        "blend.invite.body-with-name": string
        "blend.invite.body-without-name": string
        "blend.invite.button-title": string
        "blend.invite.page-title": string
        "blend.join.title": string
        "blend.link-invalid.subtitle": string
        "blend.link-invialid.header": string
        "block-user.dialog.block": string
        "block-user.dialog.cancel": string
        "block-user.dialog.description": string
        "block-user.dialog.title": string
        browse: string
        browser_upgrade_notice: string
        "buddy-feed.add-friends": string
        "buddy-feed.button.add-friend": string
        "buddy-feed.button.back": string
        "buddy-feed.button.remove-friend": string
        "buddy-feed.enable-share-listening-activity": string
        "buddy-feed.facebook.button": string
        "buddy-feed.facebook.connect-with-friends-default": string
        "buddy-feed.facebook.disclaimer": string
        "buddy-feed.find-in-playlists": string
        "buddy-feed.friend-activity": string
        "buddy-feed.let-followers-see-your-listening": string
        "buddy-feed.number-of-friends": { one: string; other: string }
        "buddy-feed.see-what-your-friends-are-playing": string
        "capping.upsell-title": string
        "card.a11y.explicit": string
        "card.tag.album": string
        "card.tag.artist": string
        "card.tag.audiobook": string
        "card.tag.episode": string
        "card.tag.genre": string
        "card.tag.playlist": string
        "card.tag.profile": string
        "card.tag.show": string
        "card.tag.track": string
        "card.tag.video": string
        "carousel.left": string
        "carousel.right": string
        "character-counter": string
        "chart.new-entries": { one: string; other: string }
        choose_photo: string
        close: string
        close_button_action: string
        "collection.empty-page.episodes-subtitle": string
        "collection.empty-page.episodes-title": string
        "collection.empty-page.shows-cta": string
        "collection.empty-page.songs-cta": string
        "collection.empty-page.songs-subtitle": string
        "collection.empty-page.songs-title": string
        "collection.sort.alphabetical": string
        "collection.sort.creator": string
        "collection.sort.custom-order": string
        "collection.sort.most-relevant": string
        "collection.sort.recently-added": string
        "collection.sort.recently-played": string
        compilation: string
        "concert.door_time": string
        "concert.entity_metadata.title": string
        "concert.error.concert_not_found_title": string
        "concert.error.general_error_title": string
        "concert.error.no_locations_found_subtitle": string
        "concert.header.available_tickets_from": string
        "concert.header.entity_title_1": string
        "concert.header.entity_title_2": string
        "concert.header.entity_title_3": string
        "concert.header.entity_title_4": string
        "concert.header.entity_title_more": string
        "concert.header.upcoming_concert_title_1": string
        "concert.header.upcoming_concert_title_2": string
        "concert.header.upcoming_concert_title_3": string
        "concert.header.upcoming_concert_title_4": string
        "concert.header.upcoming_concert_title_more": string
        "concert.label.headliner": string
        "concert.show_time": string
        concert_buy_tickets: string
        concert_event_ended: string
        concert_find_tickets: string
        concert_lineup: string
        concert_past_message: string
        concerts: string
        "concerts.browse_all_events": string
        "concerts.count": { one: string; other: string }
        "concerts.count_near_location": string
        "concerts.default_location": string
        "concerts.error.no_concerts_found_message": string
        "concerts.error.no_concerts_found_title": string
        "concerts.feed_grid_layout": string
        "concerts.feed_list_layout": string
        "concerts.find_more": string
        "concerts.find_nearby": string
        "concerts.header.other": string
        "concerts.input.search_placeholder": string
        "concerts.load_more": string
        "concerts.near_location": string
        "concerts.no_events_description": string
        "concerts.no_upcoming_events": string
        "concerts.on_sale": string
        "concerts.popular_concerts_near": string
        "concerts.presale": string
        "concerts.remind_me": string
        "concerts.soldout": string
        "concerts.ticket_date_time": string
        "concerts.ticket_price": string
        "concerts.tickets_on_sale_soon": string
        "concerts_added-to-your-saved-events": string
        concerts_browse_more: string
        concerts_browse_more_events: string
        concerts_interested: string
        concerts_interested_in_live_events: string
        concerts_interested_tooltip: string
        concerts_more_events: string
        "concerts_near_you.date": { one: string; other: string }
        "concerts_near_you.multiple_locations": string
        "concerts_near_you.playlist_disclaimer": string
        concerts_no_events_description: string
        concerts_on_tour: string
        concerts_recommended_for_you: string
        "concerts_removed-from-your-saved-events": string
        concerts_see_all_events: string
        concerts_share_with_friends: string
        concerts_shows_in: string
        concerts_upcoming: string
        concerts_upcoming_virtual_events: string
        concerts_view_all: string
        "context-menu.about-recommendations": string
        "context-menu.ban-artist": string
        "context-menu.copy-album-link": string
        "context-menu.copy-book-link": string
        "context-menu.copy-concert-link": string
        "context-menu.copy-episode-link": string
        "context-menu.copy-generic-link": string
        "context-menu.copy-show-link": string
        "context-menu.copy-spotify-uri": string
        "context-menu.copy-track-link": string
        "context-menu.episode-page-link": string
        "context-menu.unban-artist": string
        "contextmenu.add-playlist-to-folder": string
        "contextmenu.add-playlist-to-other-playlist": string
        "contextmenu.add-recommendation-to-this-playlist": string
        "contextmenu.add-to-another-playlist": string
        "contextmenu.add-to-library": string
        "contextmenu.add-to-playlist": string
        "contextmenu.add-to-queue": string
        "contextmenu.block": string
        "contextmenu.create-folder": string
        "contextmenu.create-playlist": string
        "contextmenu.delete": string
        "contextmenu.download": string
        "contextmenu.edit-details": string
        "contextmenu.edit-profile": string
        "contextmenu.exclude-from-recommendations": string
        "contextmenu.find-folder": string
        "contextmenu.find-playlist": string
        "contextmenu.follow": string
        "contextmenu.go-to-album": string
        "contextmenu.go-to-artist": string
        "contextmenu.go-to-artist-radio": string
        "contextmenu.go-to-audiobook": string
        "contextmenu.go-to-playlist": string
        "contextmenu.go-to-radio-dsa": string
        "contextmenu.go-to-song-radio": string
        "contextmenu.include-in-recommendations": string
        "contextmenu.invite-collaborators": string
        "contextmenu.leave-playlist": string
        "contextmenu.make-collaborator": string
        "contextmenu.make-listener": string
        "contextmenu.make-playlist-private": string
        "contextmenu.make-playlist-public": string
        "contextmenu.make-public": string
        "contextmenu.make-secret": string
        "contextmenu.mark-as-played": string
        "contextmenu.mark-as-unplayed": string
        "contextmenu.move-playlist-to-folder": string
        "contextmenu.open_desktop_app": string
        "contextmenu.pin-album": string
        "contextmenu.pin-artist": string
        "contextmenu.pin-audiobook": string
        "contextmenu.pin-dj": string
        "contextmenu.pin-folder": string
        "contextmenu.pin-playlist": string
        "contextmenu.pin-show": string
        "contextmenu.remove-from-folders": string
        "contextmenu.remove-from-library": string
        "contextmenu.remove-from-playlist": string
        "contextmenu.remove-from-queue": string
        "contextmenu.remove-from-your-episodes": string
        "contextmenu.remove-recommendation": string
        "contextmenu.remove-user-from-playlist": string
        "contextmenu.rename": string
        "contextmenu.report": string
        "contextmenu.save-to-your-episodes": string
        "contextmenu.share": string
        "contextmenu.share.copy-artist-link": string
        "contextmenu.share.copy-playlist-link": string
        "contextmenu.share.copy-profile-link": string
        "contextmenu.show-credits": string
        "contextmenu.unblock": string
        "contextmenu.unfollow": string
        "contextmenu.unpin-album": string
        "contextmenu.unpin-artist": string
        "contextmenu.unpin-audiobook": string
        "contextmenu.unpin-dj": string
        "contextmenu.unpin-folder": string
        "contextmenu.unpin-playlist": string
        "contextmenu.unpin-show": string
        cookies: string
        "desktop-about.copy-version-info-tooltip": string
        "desktop-about.platform": string
        "desktop-about.platform-linux": string
        "desktop-about.platform-mac-arm-64": string
        "desktop-about.platform-mac-x86": string
        "desktop-about.platform-unknown": string
        "desktop-about.platform-win-arm-64": string
        "desktop-about.platform-win-x86": string
        "desktop-about.platform-win-x86-64": string
        "desktop.login.Back": string
        "desktop.settings.automatic-downgrade.info": string
        "desktop.settings.automatic-downgrade.title": string
        "desktop.settings.automixInfo": string
        "desktop.settings.autoplay": string
        "desktop.settings.autoplayInfo": string
        "desktop.settings.autostart": string
        "desktop.settings.autostartMinimized": string
        "desktop.settings.autostartNormal": string
        "desktop.settings.autostartOff": string
        "desktop.settings.closeShouldMinimize": string
        "desktop.settings.compatibility": string
        "desktop.settings.crossfadeTracks": string
        "desktop.settings.downloadQuality.info": string
        "desktop.settings.downloadQuality.title": string
        "desktop.settings.dynamicNormalizer": string
        "desktop.settings.enableDeveloperMode": string
        "desktop.settings.enableHardwareAcceleration": string
        "desktop.settings.explicitContentFilter": string
        "desktop.settings.explicitContentFilterSetting": string
        "desktop.settings.explicitContentFilterSettingLocked": string
        "desktop.settings.facebook": string
        "desktop.settings.facebook.connect": string
        "desktop.settings.facebook.disconnect": string
        "desktop.settings.language": string
        "desktop.settings.language-override": string
        "desktop.settings.loudnessEnvironment_with_limiter_details": string
        "desktop.settings.loudnessLoud": string
        "desktop.settings.loudnessNormal": string
        "desktop.settings.loudnessQuiet": string
        "desktop.settings.monoDownmixer": string
        "desktop.settings.musicQuality": string
        "desktop.settings.newPlaylistsPublic": string
        "desktop.settings.normalize": string
        "desktop.settings.offlineStorageChangeLocation": string
        "desktop.settings.offlineStorageLocation": string
        "desktop.settings.playback": string
        "desktop.settings.privateSession": string
        "desktop.settings.privateSession.tooltip": string
        "desktop.settings.proxy.autodetect": string
        "desktop.settings.proxy.host": string
        "desktop.settings.proxy.http": string
        "desktop.settings.proxy.noproxy": string
        "desktop.settings.proxy.pass": string
        "desktop.settings.proxy.port": string
        "desktop.settings.proxy.socks4": string
        "desktop.settings.proxy.socks5": string
        "desktop.settings.proxy.title": string
        "desktop.settings.proxy.type": string
        "desktop.settings.proxy.user": string
        "desktop.settings.publishActivity": string
        "desktop.settings.publishTopArtists": string
        "desktop.settings.sec": string
        "desktop.settings.selectLanguage": string
        "desktop.settings.settings": string
        "desktop.settings.showChromeToolbar": string
        "desktop.settings.showFollows": string
        "desktop.settings.showSystemMediaControls": string
        "desktop.settings.silenceTrimmer": string
        "desktop.settings.social": string
        "desktop.settings.startupAndWindowBehavior": string
        "desktop.settings.storage": string
        "desktop.settings.storage.cache.button": string
        "desktop.settings.storage.cache.dialog.error": string
        "desktop.settings.storage.cache.dialog.heading": string
        "desktop.settings.storage.cache.dialog.text": string
        "desktop.settings.storage.cache.heading": string
        "desktop.settings.storage.cache.success": string
        "desktop.settings.storage.cache.text": string
        "desktop.settings.storage.cancel": string
        "desktop.settings.storage.close": string
        "desktop.settings.storage.downloads.button": string
        "desktop.settings.storage.downloads.dialog.error": string
        "desktop.settings.storage.downloads.dialog.heading": string
        "desktop.settings.storage.downloads.dialog.text": string
        "desktop.settings.storage.downloads.heading": string
        "desktop.settings.storage.downloads.remove": string
        "desktop.settings.storage.downloads.success": string
        "desktop.settings.storage.downloads.text": string
        "desktop.settings.storage.help": string
        "desktop.settings.streamingQuality": string
        "desktop.settings.streamingQualityAutomatic": string
        "desktop.settings.streamingQualityHiFi": string
        "desktop.settings.streamingQualityHigh": string
        "desktop.settings.streamingQualityLow": string
        "desktop.settings.streamingQualityNormal": string
        "desktop.settings.streamingQualityVeryHigh": string
        "download.available-offline": string
        "download.cancel": string
        "download.complete": string
        "download.download": string
        "download.downloading": string
        "download.progress-global": string
        "download.remove": string
        "download.upsell": string
        "drop_down.filter_by": string
        "drop_down.sort_by": string
        "duplicate.tracks.addAll": string
        "duplicate.tracks.addAnyway": string
        "duplicate.tracks.addNewOnes": string
        "duplicate.tracks.allAlreadyAdded": string
        "duplicate.tracks.alreadyAdded": string
        "duplicate.tracks.dontAdd": string
        "duplicate.tracks.oneAlreadyAdded": string
        "duplicate.tracks.someAlreadyAdded": string
        "duplicate.tracks.someAlreadyAddedDescription": string
        edit_photo: string
        ep: string
        "episode.description-title": string
        "episode.length": string
        "episode.played": string
        "episode.see_all_episodes": string
        "equalizer.equalizer": string
        "equalizer.filterA11yValueText": string
        "equalizer.filterLabel": string
        "equalizer.preset.acoustic": string
        "equalizer.preset.bassBooster": string
        "equalizer.preset.bassReducer": string
        "equalizer.preset.classical": string
        "equalizer.preset.dance": string
        "equalizer.preset.deep": string
        "equalizer.preset.electronic": string
        "equalizer.preset.flat": string
        "equalizer.preset.hiphop": string
        "equalizer.preset.jazz": string
        "equalizer.preset.latin": string
        "equalizer.preset.loudness": string
        "equalizer.preset.lounge": string
        "equalizer.preset.manual": string
        "equalizer.preset.piano": string
        "equalizer.preset.pop": string
        "equalizer.preset.rnb": string
        "equalizer.preset.rock": string
        "equalizer.preset.smallSpeakers": string
        "equalizer.preset.spokenWord": string
        "equalizer.preset.trebleBooster": string
        "equalizer.preset.trebleReducer": string
        "equalizer.preset.vocalBooster": string
        "equalizer.presets": string
        "equalizer.reset": string
        "error-dialog.generic.body": string
        "error-dialog.generic.header": string
        "error-page.cta.cdmerror": string
        "error-page.header.cdmerror": string
        "error-page.header.max_subscriptions_reached": string
        "error-page.not-available-in-region.title": string
        "error-page.subtext.cdmerror": string
        "error-page.subtext.max_subscriptions_reached": string
        "error.generic": string
        "error.not_found.body": string
        "error.not_found.title.album": string
        "error.not_found.title.page": string
        "error.not_found.title.playlist": string
        "error.not_found.title.podcast": string
        "error.reload": string
        "error.request-artist-appears-on": string
        "error.request-artist-discography": string
        "error.request-artist-failure": string
        "error.request-artist-featuring": string
        "error.request-artist-playlists": string
        "error.request-artist-related-videos": string
        "error.request-collection-tracks-failure": string
        "error.request-playlist-failure": string
        "error.request-related-artists": string
        "events_page.disclaimer": string
        "ewg.color": string
        "ewg.copied": string
        "ewg.copy": string
        "ewg.help": string
        "ewg.help-text": string
        "ewg.showcode": string
        "ewg.size": string
        "ewg.size.compact": string
        "ewg.size.normal": string
        "ewg.start-at": string
        "ewg.terms": string
        "ewg.title": string
        "ewg.title.album": string
        "ewg.title.artist": string
        "ewg.title.audiobook": string
        "ewg.title.episode": string
        "ewg.title.playlist": string
        "ewg.title.show": string
        "ewg.title.track": string
        "fatal-error.button-label": string
        "fatal-error.header": string
        "feedback.added-to-playlist-generic": string
        "feedback.added-to-playlist-specific": string
        "feedback.artist-banned-by-user": string
        "feedback.ban-artist": string
        "feedback.block-user": string
        "feedback.cant-offline-sync-playlist-in-offline-mode": string
        "feedback.cant-play-during-ads": string
        "feedback.cant-play-track": string
        "feedback.cant-skip-ads": string
        "feedback.exclude-playlist-from-recommendations": string
        "feedback.explicit-content-filtered": string
        "feedback.hide-song": string
        "feedback.include-playlist-in-recommendations": string
        "feedback.left-playlist": string
        "feedback.link-copied": string
        "feedback.member-made-contributor": string
        "feedback.member-made-listener": string
        "feedback.play-after-ad": string
        "feedback.playlist-made-private": string
        "feedback.playlist-made-public": string
        "feedback.playlist-publish": string
        "feedback.playlist-unpublish": string
        "feedback.removed-member": string
        "feedback.skip-ads-after-delay": string
        "feedback.skip-ads-to-hear-song": string
        "feedback.track-banned-by-user": string
        "feedback.track-exclusive-premium": string
        "feedback.track-not-available": string
        "feedback.track-not-available-forced-offline": string
        "feedback.track-not-available-in-region": string
        "feedback.unable-to-play": string
        "feedback.unblock-user": string
        "feedback.video-catalogue-restricted": string
        "feedback.video-country-restricted": string
        "feedback.video-georestricted": string
        "feedback.video-playback-error": string
        "feedback.video-playback-network-error": string
        "feedback.video-unavailable": string
        "feedback.video-unsupported-client-version": string
        "feedback.video-unsupported-key-system": string
        "feedback.video-unsupported-platform-version": string
        filter: string
        "folder.delete-header": string
        follow: string
        followers: string
        following: string
        "forbidden-page.description": string
        "forbidden-page.title": string
        "fta.bottom-bar.subtitle": string
        "fta.bottom-bar.subtitle-two": string
        "fta.sign-up-free": string
        "fta.wall.start-listening": string
        "fta.wall.start-watching": string
        "gallery.next": string
        "gallery.prev": string
        "history.empty-description": string
        "history.empty-title": string
        "home.afternoon": string
        "home.evening": string
        "home.filters": string
        "home.morning": string
        "i18n.language-selection.subtitle": string
        "i18n.language-selection.title": string
        "i18n.meta.album.title": string
        "i18n.meta.home.title": string
        "i18n.meta.track-lyrics.title": string
        "image-upload.legal-disclaimer": string
        "internal-link-recommender.based-on-this-album": string
        "internal-link-recommender.based-on-this-song": string
        "keyboard.shortcuts.description.charts": string
        "keyboard.shortcuts.description.createNewFolder": string
        "keyboard.shortcuts.description.currentlyPlaying": string
        "keyboard.shortcuts.description.goBackwards": string
        "keyboard.shortcuts.description.goForwards": string
        "keyboard.shortcuts.description.goToPreferences": string
        "keyboard.shortcuts.description.home": string
        "keyboard.shortcuts.description.likeDislikeSong": string
        "keyboard.shortcuts.description.likedSongs": string
        "keyboard.shortcuts.description.lowerVolume": string
        "keyboard.shortcuts.description.madeForYour": string
        "keyboard.shortcuts.description.openContextMenu": string
        "keyboard.shortcuts.description.openSearchModal": string
        "keyboard.shortcuts.description.raiseVolume": string
        "keyboard.shortcuts.description.repeat": string
        "keyboard.shortcuts.description.search": string
        "keyboard.shortcuts.description.seekBackward": string
        "keyboard.shortcuts.description.seekForward": string
        "keyboard.shortcuts.description.selectAll": string
        "keyboard.shortcuts.description.shuffle": string
        "keyboard.shortcuts.description.skipNext": string
        "keyboard.shortcuts.description.skipPrev": string
        "keyboard.shortcuts.description.togglePlay": string
        "keyboard.shortcuts.description.yourAlbums": string
        "keyboard.shortcuts.description.yourArtists": string
        "keyboard.shortcuts.description.yourAudiobooks": string
        "keyboard.shortcuts.description.yourPlaylists": string
        "keyboard.shortcuts.description.yourPodcasts": string
        "keyboard.shortcuts.help.heading": string
        "keyboard.shortcuts.help.subheading.press": string
        "keyboard.shortcuts.help.subheading.toToggle": string
        "keyboard.shortcuts.layout.navigationBarDecreaseWidth": string
        "keyboard.shortcuts.layout.navigationBarIncreaseWidth": string
        "keyboard.shortcuts.layout.rightSidebarDecreaseWidth": string
        "keyboard.shortcuts.layout.rightSidebarIncreaseWidth": string
        "keyboard.shortcuts.layout.toggleLeftSidebar": string
        "keyboard.shortcuts.layout.toggleRightSidebar": string
        "keyboard.shortcuts.or": string
        "keyboard.shortcuts.section.basic": string
        "keyboard.shortcuts.section.layout": string
        "keyboard.shortcuts.section.navigation": string
        "keyboard.shortcuts.section.playback": string
        "leave-playlist.dialog.cancel": string
        "leave-playlist.dialog.leave": string
        "leave-playlist.dialog.private-description": string
        "leave-playlist.dialog.public-contributor-description": string
        "leave-playlist.dialog.public-listener-description": string
        "leave-playlist.dialog.title": string
        "licenses.title": string
        likes: { one: string; other: string }
        "live_events.all_events_tab": string
        "live_events.city_info_find_tickets": string
        "live_events.city_info_view_details": string
        "live_events.date_picker_button_text": string
        "live_events.date_picker_dialog_clear": string
        "live_events.date_picker_dialog_done": string
        "live_events.date_picker_dialog_title": string
        "live_events.disclaimer": string
        "live_events.for_you_anonymous_heading": string
        "live_events.for_you_anonymous_subheading": string
        "live_events.for_you_tab": string
        "live_events.label": string
        "live_events.location_concert_tickets": string
        "live_events.next_weekend_preset": string
        "live_events.sign_up_free": string
        "live_events.this_weekend_preset": string
        "local-files": string
        "local-files.description": string
        "local-files.empty-button": string
        "local-files.empty-description": string
        "local-files.empty-header": string
        "local-files.source.downloads": string
        "local-files.source.itunes": string
        "local-files.source.my_music": string
        "local-files.source.windows_music_library": string
        "locale.af": string
        "locale.am": string
        "locale.ar": string
        "locale.ar-EG": string
        "locale.ar-MA": string
        "locale.ar-SA": string
        "locale.az": string
        "locale.bg": string
        "locale.bho": string
        "locale.bn": string
        "locale.bs": string
        "locale.ca": string
        "locale.cs": string
        "locale.da": string
        "locale.de": string
        "locale.el": string
        "locale.en": string
        "locale.en-GB": string
        "locale.es": string
        "locale.es-419": string
        "locale.es-AR": string
        "locale.es-MX": string
        "locale.et": string
        "locale.eu": string
        "locale.fa": string
        "locale.fi": string
        "locale.fil": string
        "locale.fr": string
        "locale.fr-CA": string
        "locale.gl": string
        "locale.gu": string
        "locale.he": string
        "locale.hi": string
        "locale.hr": string
        "locale.hu": string
        "locale.id": string
        "locale.is": string
        "locale.it": string
        "locale.ja": string
        "locale.kn": string
        "locale.ko": string
        "locale.lt": string
        "locale.lv": string
        "locale.mk": string
        "locale.ml": string
        "locale.mr": string
        "locale.ms": string
        "locale.nb": string
        "locale.ne": string
        "locale.nl": string
        "locale.or": string
        "locale.pa-IN": string
        "locale.pa-PK": string
        "locale.pl": string
        "locale.pt-BR": string
        "locale.pt-PT": string
        "locale.ro": string
        "locale.ru": string
        "locale.sk": string
        "locale.sl": string
        "locale.sr": string
        "locale.sv": string
        "locale.sw": string
        "locale.ta": string
        "locale.te": string
        "locale.th": string
        "locale.tr": string
        "locale.uk": string
        "locale.ur": string
        "locale.vi": string
        "locale.zh-CN": string
        "locale.zh-HK": string
        "locale.zh-TW": string
        "locale.zu": string
        login: string
        "midyear.cta": string
        "midyear.intro": string
        "midyear.terms": string
        "midyear.title": string
        "miniplayer.close": string
        "miniplayer.open": string
        "miniplayer.open-in": string
        monthly_listeners: string
        more: string
        "more.label.context": string
        "more.label.track": string
        "music_and_talk.album_or_show": string
        "music_and_talk.in_this_episode": string
        music_downloads: string
        music_videos: string
        "mwp.cta.download.app": string
        "mwp.cta.sign.up.free": string
        "mwp.d2p.modal.cta": string
        "mwp.d2p.modal.description": string
        "mwp.d2p.modal.dismiss": string
        "mwp.d2p.modal.title": string
        "mwp.header.content.unavailable": string
        "mwp.list.item.share": string
        "mwp.podcast.all.episodes": string
        "mwp.search.artists.all": string
        "navbar.go-back": string
        "navbar.go-forward": string
        "navbar.install-app": string
        "navbar.premium": string
        "navbar.search": string
        "navbar.search.callout-description": string
        "navbar.search.callout-title": string
        new_releases: string
        "npb.collapseCoverArt": string
        "npb.expandCoverArt": string
        "npv.exit-full-screen": string
        "npv.full-screen": string
        "npv.related-videos.next": string
        "npv.related-videos.prev": string
        "npv.related-videos.title": string
        "npv.song-videos.switch-to-audio": string
        "npv.song-videos.switch-to-video": string
        "offline-error.device-limit-reached.header": string
        "offline-error.device-limit-reached.message": string
        "offline.badge": string
        "offline.callout-disconnected": string
        "offline.feedback-text": string
        only_visible_to_you: string
        "page.generic-title": string
        "page.loading": string
        paid: string
        pause: string
        "paywalls.modal-body-p1": string
        "paywalls.modal-body-p2": string
        "paywalls.modal-body-p3": string
        "paywalls.modal-heading": string
        "permissions.collaborator": string
        "permissions.creator": string
        "permissions.current-user-name": string
        "permissions.invite-collaborators": string
        "permissions.listener": string
        "permissions.modal-label": string
        "permissions.private-playlist": string
        "permissions.public-playlist": string
        "permissions.shared-with": string
        "permissions.songs-added": { one: string; other: string }
        "pick-and-shuffle.upsell.dismiss": string
        "pick-and-shuffle.upsell.explore-premium": string
        "pick-and-shuffle.upsell.message": string
        "pick-and-shuffle.upsell.title.queue": string
        "pick-and-shuffle.upsell.title.shuffle-button": string
        play: string
        "play-button.label": string
        "playback-control.a11y.landmark-label": string
        "playback-control.a11y.lightsaber-hilt-button": string
        "playback-control.a11y.seek-slider-button": string
        "playback-control.a11y.volume-high": string
        "playback-control.a11y.volume-low": string
        "playback-control.a11y.volume-medium": string
        "playback-control.a11y.volume-off": string
        "playback-control.a11y.volume-slider-button": string
        "playback-control.ban": string
        "playback-control.change-playback-speed": string
        "playback-control.connect-picker": string
        "playback-control.disable-repeat": string
        "playback-control.disable-shuffle": string
        "playback-control.enable-repeat": string
        "playback-control.enable-repeat-one": string
        "playback-control.enable-shuffle": string
        "playback-control.mute": string
        "playback-control.now-playing-label": string
        "playback-control.pause": string
        "playback-control.play": string
        "playback-control.playback-speed": string
        "playback-control.playback-speed-button-a11y": string
        "playback-control.queue": string
        "playback-control.skip-back": string
        "playback-control.skip-backward-15": string
        "playback-control.skip-forward": string
        "playback-control.skip-forward-15": string
        "playback-control.unmute": string
        playlist: string
        "playlist.a11y.pause": string
        "playlist.a11y.play": string
        "playlist.curation.albums": string
        "playlist.curation.find_more": string
        "playlist.curation.popular_songs": string
        "playlist.curation.search_placeholder": string
        "playlist.curation.search_placeholder-booklists": string
        "playlist.curation.see_all_album": string
        "playlist.curation.see_all_artists": string
        "playlist.curation.see_all_songs": string
        "playlist.curation.title": string
        "playlist.default_folder_name": string
        "playlist.default_playlist_name": string
        "playlist.delete": string
        "playlist.delete-cancel": string
        "playlist.delete-description": string
        "playlist.delete-title": string
        "playlist.edit-details.button": string
        "playlist.edit-details.change-photo": string
        "playlist.edit-details.description-label": string
        "playlist.edit-details.description-placeholder": string
        "playlist.edit-details.error.description-breaks": string
        "playlist.edit-details.error.failed-to-save": string
        "playlist.edit-details.error.file-size-exceeded": string
        "playlist.edit-details.error.file-upload-failed": string
        "playlist.edit-details.error.invalid-html": string
        "playlist.edit-details.error.missing-name": string
        "playlist.edit-details.error.no-internet": string
        "playlist.edit-details.error.too-small": string
        "playlist.edit-details.error.unsaved-changes": string
        "playlist.edit-details.name-label": string
        "playlist.edit-details.name-placeholder": string
        "playlist.edit-details.remove-photo": string
        "playlist.edit-details.title": string
        "playlist.extender.button.add": string
        "playlist.extender.recommended.header": string
        "playlist.extender.recommended.title": string
        "playlist.extender.refresh": string
        "playlist.extender.songs.in.playlist": string
        "playlist.extender.title.in.playlist": string
        "playlist.header.creator-and-co-creator": string
        "playlist.header.creator-and-others": string
        "playlist.header.made-for": string
        "playlist.new-default-name": string
        "playlist.new-header": string
        "playlist.page-title": string
        "playlist.presented_by": string
        "playlist.remove_from_playlist": string
        "playlist.remove_multiple_description": string
        "playlist.search_in_playlist": string
        "playlist.similar-playlist": string
        "podcast-ads.recent_ads": string
        "podcast-ads.recent_ads_from": string
        "podcast-ads.recent_ads_just_two": string
        "podcast-ads.recent_ads_more_than_two": string
        "podcast-ads.show_more_indicator": string
        "podcasts.next-episode.continue-listening": string
        "podcasts.next-episode.first-published": string
        "podcasts.next-episode.latest-published": string
        "podcasts.next-episode.trailer": string
        "podcasts.next-episode.up-next": string
        "podcasts.subscriber-indicator.otp": string
        "podcasts.subscriber-indicator.subscription": string
        "premium.dialog.description": { one: string; other: string }
        "premium.dialog.disclaimer": string
        "premium.dialog.disclaimer.noprice": string
        "premium.dialog.subscribe": string
        "premium.dialog.title": string
        "private-session.badge": string
        private_playlist: string
        "pta.bottom-bar.title": string
        public_playlist: string
        public_playlists: string
        "pwa.confirm": string
        "pwa.download-app": string
        "queue.added-to-queue": string
        "queue.cancel-button": string
        "queue.clear-queue": string
        "queue.confirm-button": string
        "queue.confirm-message": string
        "queue.confirm-title": { one: string; other: string }
        "queue.empty-description": string
        "queue.empty-title": string
        "queue.fine-something": string
        "queue.next-from": string
        "queue.next-in-queue": string
        "queue.next-up": string
        "queue.now-playing": string
        "queue.page-title": string
        recently_played_artists: string
        "release-notifier.update-available": string
        "release-notifier.update-processing": string
        "release-notifier.update-ready": string
        remove: string
        remove_from_your_library: string
        remove_from_your_liked_songs: string
        "resize.sidebar": string
        "rich-page.fans-also-like": string
        "rich-page.popular-albums-by-artist": string
        "rich-page.popular-releases-by-artist": string
        "rich-page.popular-singles-and-eps-by-artist": string
        "rich-page.popular-tracks": string
        "s2l.dismiss": string
        "s2l.download": string
        "s2l.download_spotify": string
        "s2l.play_millions": string
        "s2l.play_millions_podcasts": string
        save: string
        save_to_your_library: string
        save_to_your_liked_songs: string
        "search.a11y.clear-input": string
        "search.a11y.songs-search-results": string
        "search.clear-recent-searches": string
        "search.empty-results-text": string
        "search.empty-results-title": string
        "search.empty-results-title-for-chip": string
        "search.lyrics-match": string
        "search.page-title": string
        "search.playlist-by": string
        "search.row.subtitle": string
        "search.row.top-results": string
        "search.search-for-label": string
        "search.see-all": string
        "search.showing-category-query-songs": string
        "search.title.albums": string
        "search.title.all": string
        "search.title.artists": string
        "search.title.audiobooks": string
        "search.title.episodes": string
        "search.title.genres-and-moods": string
        "search.title.playlists": string
        "search.title.podcast-and-shows": string
        "search.title.profiles": string
        "search.title.recent-searches": string
        "search.title.shows": string
        "search.title.top-result": string
        "search.title.top-results": string
        "search.title.tracks": string
        "settings.addASource": string
        "settings.display": string
        "settings.employee": string
        "settings.library": string
        "settings.library.compactMode": string
        "settings.localFiles": string
        "settings.localFilesFolderAdded": string
        "settings.npv": string
        "settings.restartApp": string
        "settings.showLocalFiles": string
        "settings.showMusicAnnouncements": string
        "settings.showSongsFrom": string
        "settings.showTrackNotifications": string
        "shared.library.entity-row.liked-songs.title": string
        "shared.library.entity-row.local-files.title": string
        "shared.library.entity-row.your-episodes.title": string
        "shared.library.filter.album": string
        "shared.library.filter.artist": string
        "shared.library.filter.book": string
        "shared.library.filter.by-spotify": string
        "shared.library.filter.by-you": string
        "shared.library.filter.downloaded": string
        "shared.library.filter.in-progress": string
        "shared.library.filter.playlist": string
        "shared.library.filter.show": string
        "shared.library.filter.unplayed": string
        "shared.library.sort-by.author": string
        "shared.library.sort-by.creator": string
        "shared.library.sort-by.custom": string
        "shared.library.sort-by.name": string
        "shared.library.sort-by.recently-added": string
        "shared.library.sort-by.recently-played-or-added": string
        "shared.library.sort-by.recently-updated": string
        "shared.library.sort-by.relevance": string
        "shared.wrapped-banner.body": string
        "shared.wrapped-banner.body-loggedout": string
        "shared.wrapped-banner.button": string
        "shared.wrapped-banner.title": string
        "shared.wrapped-banner.title-loggedout": string
        "shelf.see-all": string
        show_less: string
        show_more: string
        "shows.filter.in-progress": string
        "shows.filter.unplayed": string
        "shows.sort.newest-to-oldest": string
        "shows.sort.oldest-to-newest": string
        "sidebar.a11y.landmark-label": string
        "sidebar.liked_songs": string
        "sidebar.your_episodes": string
        sign_up: string
        "singalong.button": string
        "singalong.less-vocal": string
        "singalong.more-vocal": string
        "singalong.off": string
        "singalong.title": string
        single: string
        song: string
        "sort.added-by": string
        "sort.album": string
        "sort.album-or-podcast": string
        "sort.artist": string
        "sort.custom-order": string
        "sort.date-added": string
        "sort.duration": string
        "sort.title": string
        "subtitles-picker.autogenerated": string
        "subtitles-picker.heading": string
        "subtitles-picker.option_cs": string
        "subtitles-picker.option_de": string
        "subtitles-picker.option_el": string
        "subtitles-picker.option_en": string
        "subtitles-picker.option_es": string
        "subtitles-picker.option_fi": string
        "subtitles-picker.option_fr": string
        "subtitles-picker.option_hu": string
        "subtitles-picker.option_id": string
        "subtitles-picker.option_it": string
        "subtitles-picker.option_ja": string
        "subtitles-picker.option_ms": string
        "subtitles-picker.option_nl": string
        "subtitles-picker.option_off": string
        "subtitles-picker.option_pl": string
        "subtitles-picker.option_pt": string
        "subtitles-picker.option_sv": string
        "subtitles-picker.option_tr": string
        "subtitles-picker.option_vi": string
        "subtitles-picker.option_zh": string
        "time.days.short": { one: string; other: string }
        "time.estimated": string
        "time.hours.short": { one: string; other: string }
        "time.left": string
        "time.minutes.short": { one: string; other: string }
        "time.now": string
        "time.over": string
        "time.seconds.short": { one: string; other: string }
        "time.weeks.short": { one: string; other: string }
        "topBar.dsa-cta": string
        "topBar.dsa-indicator": string
        "topBar.label": string
        top_artists_this_month: string
        top_tracks_this_month: string
        "track-credits.accordion": string
        "track-credits.acoustic-guitar": string
        "track-credits.additional-credits": string
        "track-credits.additional-engineer": string
        "track-credits.additional-keyboards": string
        "track-credits.additional-mixer": string
        "track-credits.additional-percussion": string
        "track-credits.additional-producer": string
        "track-credits.additional-production": string
        "track-credits.additional-programmer": string
        "track-credits.additional-recording": string
        "track-credits.additional-vocals": string
        "track-credits.all-instruments": string
        "track-credits.ambient-sounds": string
        "track-credits.arranger": string
        "track-credits.artist": string
        "track-credits.assistant-engineer": string
        "track-credits.assistant-mix-engineer": string
        "track-credits.assistant-mixer": string
        "track-credits.assistant-mixing-engineer": string
        "track-credits.assistant-producer": string
        "track-credits.assistant-recording-engineer": string
        "track-credits.assistant-remix-engineer": string
        "track-credits.associated-performer": string
        "track-credits.audio-additional-mix-engineer": string
        "track-credits.audio-recording-engineer": string
        "track-credits.background-vocal": string
        "track-credits.background-vocalist": string
        "track-credits.background-vocals": string
        "track-credits.backing-vocals": string
        "track-credits.bass": string
        "track-credits.bass-guitar": string
        "track-credits.bells": string
        "track-credits.brass-band": string
        "track-credits.cajon": string
        "track-credits.cello": string
        "track-credits.chamber-ensemble": string
        "track-credits.clapping": string
        "track-credits.co-mixer": string
        "track-credits.co-producer": string
        "track-credits.co-writer": string
        "track-credits.composer": string
        "track-credits.composer-and-lyricist": string
        "track-credits.conga": string
        "track-credits.cymbals": string
        "track-credits.designer": string
        "track-credits.digital-editor": string
        "track-credits.dobro": string
        "track-credits.double-bass": string
        "track-credits.drum-programmer": string
        "track-credits.drum-programming": string
        "track-credits.drums": string
        "track-credits.editor": string
        "track-credits.electric-bass": string
        "track-credits.electric-guitar": string
        "track-credits.engineer": string
        "track-credits.engineer-and-mixer": string
        "track-credits.executive-producer": string
        "track-credits.featured-artist": string
        "track-credits.featuring": string
        "track-credits.fiddle": string
        "track-credits.flugelhorn": string
        "track-credits.flute": string
        "track-credits.guitar": string
        "track-credits.harp": string
        "track-credits.horn": string
        "track-credits.horn-arranger": string
        "track-credits.income-participant": string
        "track-credits.instruments": string
        "track-credits.keyboards": string
        "track-credits.keyboards-arrangements": string
        "track-credits.label": string
        "track-credits.lyricist": string
        "track-credits.main-artist": string
        "track-credits.mandolin": string
        "track-credits.masterer": string
        "track-credits.mastering-engineer": string
        "track-credits.mellotron": string
        "track-credits.miscellaneous-production": string
        "track-credits.mix-engineer": string
        "track-credits.mixer": string
        "track-credits.mixing-engineer": string
        "track-credits.mixing-engineers": string
        "track-credits.music-production": string
        "track-credits.music-publisher": string
        "track-credits.orchestra": string
        "track-credits.organ": string
        "track-credits.pedal-steel": string
        "track-credits.percussion": string
        "track-credits.performers": string
        "track-credits.piano": string
        "track-credits.pro-tools": string
        "track-credits.pro-tools-editing": string
        "track-credits.producer": string
        "track-credits.producers": string
        "track-credits.production": string
        "track-credits.programmed-and-arranged-by": string
        "track-credits.programmer": string
        "track-credits.programming": string
        "track-credits.programming-and-keyboards": string
        "track-credits.re-mixer": string
        "track-credits.recorded-by": string
        "track-credits.recorder": string
        "track-credits.recording": string
        "track-credits.recording-and-mixing": string
        "track-credits.recording-arranger": string
        "track-credits.recording-engineer": string
        "track-credits.recording-producer": string
        "track-credits.rhythm-guitar": string
        "track-credits.samples": string
        "track-credits.saxophone": string
        "track-credits.second-engineer": string
        "track-credits.sitar": string
        "track-credits.songwriter": string
        "track-credits.sound-effects": string
        "track-credits.sound-engineer": string
        "track-credits.source": string
        "track-credits.steel-guitar": string
        "track-credits.strings": string
        "track-credits.studio-musician": string
        "track-credits.synthesizer": string
        "track-credits.tape-realization": string
        "track-credits.trumpet": string
        "track-credits.upright-bass": string
        "track-credits.vibraphone": string
        "track-credits.viola": string
        "track-credits.violin": string
        "track-credits.vocal": string
        "track-credits.vocal-arranger": string
        "track-credits.vocal-engineer": string
        "track-credits.vocal-ensemble": string
        "track-credits.vocal-producer": string
        "track-credits.vocals": string
        "track-credits.voice-performer": string
        "track-credits.work-arranger": string
        "track-credits.writer": string
        "track-credits.writers": string
        "track-page.error": string
        "track-page.from-the-album": string
        "track-page.from-the-compilation": string
        "track-page.from-the-ep": string
        "track-page.from-the-single": string
        "track-page.sign-in-to-view-lyrics": string
        "track-trailer": string
        "tracklist-header.audiobooks-counter": { one: string; other: string }
        "tracklist-header.episodes-counter": { one: string; other: string }
        "tracklist-header.items-counter": { one: string; other: string }
        "tracklist-header.songs-counter": { one: string; other: string }
        "tracklist.a11y.pause": string
        "tracklist.a11y.play": string
        "tracklist.disc-sperator.title": string
        "tracklist.drag.multiple.label": { one: string; other: string }
        "tracklist.header.actions": string
        "tracklist.header.added-by": string
        "tracklist.header.album": string
        "tracklist.header.album-or-podcast": string
        "tracklist.header.date": string
        "tracklist.header.date-added": string
        "tracklist.header.duration": string
        "tracklist.header.event": string
        "tracklist.header.plays": string
        "tracklist.header.release-date": string
        "tracklist.header.title": string
        "tracklist.header.venue": string
        "tracklist.livestream": string
        "tracklist.popular-tracks": string
        "type.newEpisode": string
        "type.newPodcastEpisode": string
        "type.podcast": string
        "type.podcastEpisode": string
        "type.show": string
        "type.showEpisode": string
        unfollow: string
        "upgrade.button": string
        "upgrade.tooltip.title": string
        "user-fraud-verification.confirm-dialog.cancel": string
        "user-fraud-verification.confirm-dialog.confirm": string
        "user-fraud-verification.confirm-dialog.description": string
        "user-fraud-verification.confirm-dialog.label": string
        "user-fraud-verification.confirm-dialog.title": string
        "user-fraud-verification.dialog-alert.describe": string
        "user-fraud-verification.dialog-alert.ok": string
        "user-fraud-verification.dialog-alert.title": string
        "user-fraud-verification.snackbar.message": string
        "user.account": string
        "user.edit-details.choose-photo": string
        "user.edit-details.error.failed-to-save": string
        "user.edit-details.error.file-size-exceeded": string
        "user.edit-details.error.file-upload-failed": string
        "user.edit-details.error.missing-name": string
        "user.edit-details.error.too-small": string
        "user.edit-details.name-label": string
        "user.edit-details.name-placeholder": string
        "user.edit-details.remove-photo": string
        "user.edit-details.title": string
        "user.followers": { one: string; other: string }
        "user.following": { one: string; other: string }
        "user.log-out": string
        "user.private-playlists": { one: string; other: string }
        "user.private-session": string
        "user.public-playlists": { one: string; other: string }
        "user.settings": string
        "user.setup-duo": string
        "user.setup-family": string
        "user.support": string
        "user.they_follow_us": string
        "user.unable-to-update": string
        "user.update-available": string
        "user.update-client": string
        "video-player.cinema-mode": string
        "video-player.default-view": string
        "view.recently-played": string
        "view.see-all": string
        "view.web-player-home": string
        "web-player.album-prerelease.anonymous_presave": string
        "web-player.album-prerelease.countdown_label": string
        "web-player.album-prerelease.days": { one: string; other: string }
        "web-player.album-prerelease.feedback_presaved": string
        "web-player.album-prerelease.hours": { one: string; other: string }
        "web-player.album-prerelease.listen_now": string
        "web-player.album-prerelease.minutes": { one: string; other: string }
        "web-player.album-prerelease.presave": string
        "web-player.album-prerelease.presaved": string
        "web-player.album-prerelease.releases_on": string
        "web-player.album-prerelease.seconds": { one: string; other: string }
        "web-player.album-prerelease.tracklist_preview": string
        "web-player.album.anniversary": { one: string; other: string }
        "web-player.album.open_coverart_modal": string
        "web-player.album.release": string
        "web-player.aligned-curation.add-to-playlist-menu": string
        "web-player.aligned-curation.button.cancel": string
        "web-player.aligned-curation.button.done": string
        "web-player.aligned-curation.button.new-playlist": string
        "web-player.aligned-curation.contextmenu.new-playlist": string
        "web-player.aligned-curation.feedback.added": string
        "web-player.aligned-curation.feedback.added-to-library": string
        "web-player.aligned-curation.feedback.change-button": string
        "web-player.aligned-curation.feedback.changes-saved": string
        "web-player.aligned-curation.feedback.removed": string
        "web-player.aligned-curation.feedback.removed-from-library": string
        "web-player.aligned-curation.search-placeholder": string
        "web-player.aligned-curation.title": string
        "web-player.aligned-curation.tooltips.add-to-liked-songs": string
        "web-player.aligned-curation.tooltips.add-to-playlist": string
        "web-player.aligned-curation.tooltips.add-to-your-episodes": string
        "web-player.aligned-curation.tooltips.add-to-your-library": string
        "web-player.artist.upcoming-release": string
        "web-player.artist.upcoming-release.album": string
        "web-player.artist.upcoming-release.ep": string
        "web-player.artist.upcoming-release.single": string
        "web-player.audiobooks.audiobook": string
        "web-player.audiobooks.buy": string
        "web-player.audiobooks.buyFree": string
        "web-player.audiobooks.narratedByX": string
        "web-player.audiobooks.noRating": string
        "web-player.audiobooks.rating.closeModal": string
        "web-player.audiobooks.rating.goToApp": string
        "web-player.audiobooks.rating.ok": string
        "web-player.audiobooks.rating.rateAudiobook": string
        "web-player.audiobooks.rating.wantToRate": string
        "web-player.audiobooks.retailPrice": string
        "web-player.blend.duo-invite.description": string
        "web-player.blend.group-invite.header": string
        "web-player.blend.group-invite.warning": string
        "web-player.blend.invite.button-title": string
        "web-player.blend.invite.page-title": string
        "web-player.buddy-feed.connect-button": string
        "web-player.buddy-feed.connect-with-facebook-description": string
        "web-player.buddy-feed.connect-with-facebook-title": string
        "web-player.connect.bar.connected-state": string
        "web-player.connect.bar.connecting-state": string
        "web-player.connect.context-menu.forget-device": string
        "web-player.connect.context-menu.incarnation-cast": string
        "web-player.connect.context-menu.incarnation-connect": string
        "web-player.connect.context-menu.incarnation-title": string
        "web-player.connect.device-picker.ad-playing": string
        "web-player.connect.device-picker.check-wifi": string
        "web-player.connect.device-picker.check-wifi-subtitle": string
        "web-player.connect.device-picker.connect-hub-external-link": string
        "web-player.connect.device-picker.current-device": string
        "web-player.connect.device-picker.device-unavailable": string
        "web-player.connect.device-picker.get-premium": string
        "web-player.connect.device-picker.google-cast": string
        "web-player.connect.device-picker.google-cast-devices": string
        "web-player.connect.device-picker.help-external-link": string
        "web-player.connect.device-picker.install-spotify": string
        "web-player.connect.device-picker.no-devices-found": string
        "web-player.connect.device-picker.no-devices-local-network": string
        "web-player.connect.device-picker.on-other-networks": string
        "web-player.connect.device-picker.on-this-network": string
        "web-player.connect.device-picker.play-from-another": string
        "web-player.connect.device-picker.play-from-another-subtitle": string
        "web-player.connect.device-picker.playstation-unauthorized": string
        "web-player.connect.device-picker.restart-device": string
        "web-player.connect.device-picker.restart-speaker": string
        "web-player.connect.device-picker.restart-speaker-subtitle": string
        "web-player.connect.device-picker.select-another-device": string
        "web-player.connect.device-picker.switch-to-app": string
        "web-player.connect.device-picker.switch-to-app-subtitle": string
        "web-player.connect.device-picker.this-computer": string
        "web-player.connect.device-picker.this-web-browser": string
        "web-player.connect.device-picker.tts-playing": string
        "web-player.connect.device-picker.unsupported-uri": string
        "web-player.connect.device-picker.update-device": string
        "web-player.connect.device-picker.wakeup-timeout": string
        "web-player.connect.device-picker.wakingup-device": string
        "web-player.connect.nudge.dj-voice-unavailable": string
        "web-player.connect.nudge.listen-to-speaker": string
        "web-player.cover-art-modal.close": string
        "web-player.cultural-moments.unsupported.appleAppStoreAlt": string
        "web-player.cultural-moments.unsupported.googlePlayStoreAlt": string
        "web-player.cultural-moments.unsupportedDescription": string
        "web-player.cultural-moments.unsupportedHeading": string
        "web-player.download.remove-download-confirmation-dialog.cancel-button-text": string
        "web-player.download.remove-download-confirmation-dialog.confirm-button-label": string
        "web-player.download.remove-download-confirmation-dialog.confirm-button-text": string
        "web-player.download.remove-download-confirmation-dialog.message": string
        "web-player.download.remove-download-confirmation-dialog.message-remote": string
        "web-player.download.remove-download-confirmation-dialog.title": string
        "web-player.episode.description": string
        "web-player.episode.transcript": string
        "web-player.episode.transcript.disclaimer": string
        "web-player.feature-activation-shelf.ai-dj.cta": string
        "web-player.feature-activation-shelf.ai-dj.description": string
        "web-player.feature-activation-shelf.ai-dj.title": string
        "web-player.feature-activation-shelf.audio-quality.cta": string
        "web-player.feature-activation-shelf.audio-quality.cta_alt": string
        "web-player.feature-activation-shelf.audio-quality.description": string
        "web-player.feature-activation-shelf.audio-quality.title": string
        "web-player.feature-activation-shelf.audio_quality_toast_message": string
        "web-player.feature-activation-shelf.blend.description": string
        "web-player.feature-activation-shelf.blend.title": string
        "web-player.feature-activation-shelf.collaborative-playlists.description": string
        "web-player.feature-activation-shelf.collaborative-playlists.title": string
        "web-player.feature-activation-shelf.generic-title": string
        "web-player.feature-activation-shelf.group-sessions.cta": string
        "web-player.feature-activation-shelf.group-sessions.description-general": string
        "web-player.feature-activation-shelf.group-sessions.title": string
        "web-player.feature-activation-shelf.invite.cta": string
        "web-player.feature-activation-shelf.live-events.cta": string
        "web-player.feature-activation-shelf.live-events.description": string
        "web-player.feature-activation-shelf.live-events.title": string
        "web-player.feature-activation-shelf.see_more": string
        "web-player.feature-activation-shelf.smart-shuffle.cta": string
        "web-player.feature-activation-shelf.smart-shuffle.description": string
        "web-player.feature-activation-shelf.smart-shuffle.title": string
        "web-player.liked-songs.liked-songs-filter-tags": string
        "web-player.lyrics.ad": string
        "web-player.lyrics.error": string
        "web-player.lyrics.noLyrics0": string
        "web-player.lyrics.noLyrics1": string
        "web-player.lyrics.noLyrics2": string
        "web-player.lyrics.noLyrics3": string
        "web-player.lyrics.providedBy": string
        "web-player.lyrics.title": string
        "web-player.lyrics.translate": string
        "web-player.lyrics.translating.to": string
        "web-player.lyrics.translation.none": string
        "web-player.lyrics.translation.not_available": string
        "web-player.lyrics.unsynced": string
        "web-player.lyrics.upsell.button": string
        "web-player.lyrics.upsell.title": string
        "web-player.merch.seeAllUri": string
        "web-player.merch.title": string
        "web-player.notification-center.button-label": string
        "web-player.notification-center.empty-state": string
        "web-player.now-playing-view.artist-about.title": string
        "web-player.now-playing-view.chapters": string
        "web-player.now-playing-view.close.lyrics": string
        "web-player.now-playing-view.credits": string
        "web-player.now-playing-view.discover-more": string
        "web-player.now-playing-view.dubbed-episodes.description-multiple": string
        "web-player.now-playing-view.dubbed-episodes.description-single": string
        "web-player.now-playing-view.dubbed-episodes.title-multiple": string
        "web-player.now-playing-view.dubbed-episodes.title-single": string
        "web-player.now-playing-view.dubbed-episodes.title-single-with-language": string
        "web-player.now-playing-view.empty-queue": string
        "web-player.now-playing-view.empty-queue-cta": string
        "web-player.now-playing-view.label": string
        "web-player.now-playing-view.lyrics.cinema-mode": string
        "web-player.now-playing-view.minimize.lyrics": string
        "web-player.now-playing-view.npv-merch": string
        "web-player.now-playing-view.on-tour": string
        "web-player.now-playing-view.onboarding.description": string
        "web-player.now-playing-view.onboarding.dismiss": string
        "web-player.now-playing-view.onboarding.do-not-show-again": string
        "web-player.now-playing-view.onboarding.title": string
        "web-player.now-playing-view.open-queue": string
        "web-player.now-playing-view.original-episode.description": string
        "web-player.now-playing-view.original-episode.description-with-language": string
        "web-player.now-playing-view.original-episode.title": string
        "web-player.now-playing-view.original-episode.title-with-language": string
        "web-player.now-playing-view.podcast-about.title": string
        "web-player.now-playing-view.show-all": string
        "web-player.now-playing-view.show.lyrics": string
        "web-player.now-playing-view.transcript": string
        "web-player.now-playing-view.video.playing-in-pip": string
        "web-player.now-playing-view.video.return-playback": string
        "web-player.offline.empty-state.subtitle": string
        "web-player.offline.empty-state.title": string
        "web-player.pip-mini-player.snackbar.link-opened-in-main-window": string
        "web-player.pip-mini-player.upsell.cta-button": string
        "web-player.pip-mini-player.upsell.subtitle": string
        "web-player.pip-mini-player.upsell.title": string
        "web-player.pip-mini-player.window-title": string
        "web-player.playlist.booklist-not-supported-title": string
        "web-player.playlist.booklist-not-supported.message": string
        "web-player.playlist.daylist.next-update": string
        "web-player.playlist.invite-collaborators.message": string
        "web-player.playlist.recommender-dsa-message": string
        "web-player.queue-history.item-type.chapter": string
        "web-player.queue-history.item-type.episode": string
        "web-player.queue-history.item-type.track": string
        "web-player.read-along-transcript.now-playing-view.read-along": string
        "web-player.read-along-transcript.sync.button": string
        "web-player.remote-downloads.context-menu.this-computer": string
        "web-player.remote-downloads.feedback.downloading-to-remote-device": string
        "web-player.search-modal.a11y.contentbyartist": string
        "web-player.search-modal.a11y.label": string
        "web-player.search-modal.instructions.navigate": string
        "web-player.search-modal.instructions.open": string
        "web-player.search-modal.instructions.play": string
        "web-player.search-modal.lyrics-match": string
        "web-player.search-modal.offline": string
        "web-player.search-modal.placeholder": string
        "web-player.search-modal.result.album": string
        "web-player.search-modal.result.artist": string
        "web-player.search-modal.result.audiobook": string
        "web-player.search-modal.result.episode": string
        "web-player.search-modal.result.genre": string
        "web-player.search-modal.result.playlist": string
        "web-player.search-modal.result.podcast": string
        "web-player.search-modal.result.track": string
        "web-player.search-modal.result.user": string
        "web-player.search-modal.title": string
        "web-player.settings.autoplay-dsa-enabled": string
        "web-player.settings.content-preferences": string
        "web-player.settings.personalized-recommendations": string
        "web-player.settings.personalized-recommendations-body-text": string
        "web-player.settings.personalized-recommendations.error-modal-button": string
        "web-player.settings.personalized-recommendations.error-modal-message": string
        "web-player.settings.personalized-recommendations.modal-body-missing-features-1": string
        "web-player.settings.personalized-recommendations.modal-body-missing-features-2": string
        "web-player.settings.personalized-recommendations.modal-body-missing-features-3": string
        "web-player.settings.personalized-recommendations.modal-body-missing-features-intro": string
        "web-player.settings.personalized-recommendations.modal-body-persistent-features-1": string
        "web-player.settings.personalized-recommendations.modal-body-persistent-features-intro": string
        "web-player.settings.personalized-recommendations.modal-cancel": string
        "web-player.settings.personalized-recommendations.modal-confirm": string
        "web-player.settings.personalized-recommendations.modal-header": string
        "web-player.show.rating.header": string
        "web-player.show.rating.want-to-rate": string
        "web-player.smart-shuffle.activation-message": string
        "web-player.smart-shuffle.activation-text": string
        "web-player.smart-shuffle.add-to-playlist-button": string
        "web-player.smart-shuffle.add-to-playlist-button-fallback": string
        "web-player.smart-shuffle.add-to-playlist-feedback": string
        "web-player.smart-shuffle.add-to-playlist-feedback-fallback": string
        "web-player.smart-shuffle.button-disable-shuffle-generic": string
        "web-player.smart-shuffle.button-disable-shuffle-specific": string
        "web-player.smart-shuffle.button-disable-smart-shuffle-generic": string
        "web-player.smart-shuffle.button-disable-smart-shuffle-specific": string
        "web-player.smart-shuffle.button-enable-shuffle-generic": string
        "web-player.smart-shuffle.button-enable-shuffle-specific": string
        "web-player.smart-shuffle.button-enable-smart-shuffle-generic": string
        "web-player.smart-shuffle.button-enable-smart-shuffle-specific": string
        "web-player.smart-shuffle.disabled-smart-shuffle": string
        "web-player.smart-shuffle.dsa-message": string
        "web-player.smart-shuffle.enabled-smart-shuffle": string
        "web-player.smart-shuffle.enabled-smart-shuffle-not-active-playlist": string
        "web-player.smart-shuffle.icon-hover-label": string
        "web-player.smart-shuffle.introduction-modal-description": string
        "web-player.smart-shuffle.introduction-modal-ok-button": string
        "web-player.smart-shuffle.introduction-modal-title": string
        "web-player.smart-shuffle.menu-button": string
        "web-player.smart-shuffle.menu-text": string
        "web-player.smart-shuffle.offline-add-recommendation-feedback": string
        "web-player.smart-shuffle.offline-remove-recommendation-feedback": string
        "web-player.smart-shuffle.removed-from-recommendations-button": string
        "web-player.smart-shuffle.removed-from-recommendations-feedback": string
        "web-player.smart-shuffle.removed-from-recommendations-feedback-undo": string
        "web-player.smart-shuffle.removed-from-recommendations-feedback-undone": string
        "web-player.smart-shuffle.shuffle": string
        "web-player.smart-shuffle.smart-shuffle": string
        "web-player.social-connect.controls.participant-volume-control": string
        "web-player.social-connect.controls.queue-only-mode": string
        "web-player.social-connect.end-session.cancel": string
        "web-player.social-connect.end-session.confirm": string
        "web-player.social-connect.end-session.end-session-button": string
        "web-player.social-connect.end-session.sub-title": string
        "web-player.social-connect.end-session.title": string
        "web-player.social-connect.facepile.and-others": { one: string; other: string }
        "web-player.social-connect.generic-error.confirmation-button": string
        "web-player.social-connect.generic-error.sub-title": string
        "web-player.social-connect.generic-error.title": string
        "web-player.social-connect.group-session-logo-alt": string
        "web-player.social-connect.invitation-modal.button-primary": string
        "web-player.social-connect.invitation-modal.button-tertiary": string
        "web-player.social-connect.invitation-modal.subtitle": string
        "web-player.social-connect.invitation-modal.success-toast-message": string
        "web-player.social-connect.invitation-modal.title": string
        "web-player.social-connect.invite-button": string
        "web-player.social-connect.join-modal.button-primary": string
        "web-player.social-connect.join-modal.button-tertiary": string
        "web-player.social-connect.join-modal.continue-on-this-device": string
        "web-player.social-connect.join-modal.continue-on-this-device-subtitle": string
        "web-player.social-connect.join-modal.device-name.this-browser": string
        "web-player.social-connect.join-modal.device-name.this-computer": string
        "web-player.social-connect.join-modal.play-from-host-speaker": string
        "web-player.social-connect.join-modal.play-from-host-speaker-subtitle": string
        "web-player.social-connect.join-modal.privacy-notice": string
        "web-player.social-connect.join-modal.success.subtitle": string
        "web-player.social-connect.join-modal.success.title": string
        "web-player.social-connect.join-modal.title": string
        "web-player.social-connect.leave-session.cancel": string
        "web-player.social-connect.leave-session.leave-session-button": string
        "web-player.social-connect.leave-session.sub-title": string
        "web-player.social-connect.leave-session.title": string
        "web-player.social-connect.menu-action.title": string
        "web-player.social-connect.mobile-only.confirmation-button": string
        "web-player.social-connect.mobile-only.description": string
        "web-player.social-connect.mobile-only.title": string
        "web-player.social-connect.participant-list.remove-guest": string
        "web-player.social-connect.participant-list.remove-guest-accessible-label": string
        "web-player.social-connect.participant-list.remove-guest-cancel": string
        "web-player.social-connect.participant-list.remove-guest-dialog": string
        "web-player.social-connect.participant-list.subtitle": string
        "web-player.social-connect.participant-list.title": string
        "web-player.social-connect.premium-upsell.confirmation-button": string
        "web-player.social-connect.redirect-modal.cancel-button": string
        "web-player.social-connect.redirect-modal.confirmation-button": string
        "web-player.social-connect.redirect-modal.sub-title": string
        "web-player.social-connect.redirect-modal.title": string
        "web-player.social-connect.session-ended.confirmation-button": string
        "web-player.social-connect.session-ended.sub-title": string
        "web-player.social-connect.session-ended.title": string
        "web-player.social-connect.session-info.title": string
        "web-player.social-connect.share.title": string
        "web-player.social-connect.toast.ended": string
        "web-player.social-connect.toast.multiple-people-joined": string
        "web-player.social-connect.toast.multiple-people-left": string
        "web-player.social-connect.toast.one-person-joined": string
        "web-player.social-connect.toast.one-person-left": string
        "web-player.social-connect.toast.participant-volume-control.enabled": string
        "web-player.social-connect.toast.participant-volume-control.guest.disabled": string
        "web-player.social-connect.toast.participant-volume-control.host.disabled": string
        "web-player.social-connect.toast.queue-only-mode.guest.disabled": string
        "web-player.social-connect.toast.queue-only-mode.guest.enabled": string
        "web-player.social-connect.toast.queue-only-mode.host.disabled": string
        "web-player.social-connect.toast.queue-only-mode.host.enabled": string
        "web-player.social-connect.toast.two-people-joined": string
        "web-player.social-connect.toast.two-people-left": string
        "web-player.whats-new-feed.button-label": string
        "web-player.whats-new-feed.earlier-section-title": string
        "web-player.whats-new-feed.filters.episodes": string
        "web-player.whats-new-feed.filters.music": string
        "web-player.whats-new-feed.filters.notifications": string
        "web-player.whats-new-feed.filters.options": string
        "web-player.whats-new-feed.new-section-title": string
        "web-player.whats-new-feed.panel.empty-results-all.message": string
        "web-player.whats-new-feed.panel.empty-results-all.title": string
        "web-player.whats-new-feed.panel.empty-results-music.message": string
        "web-player.whats-new-feed.panel.empty-results-music.title": string
        "web-player.whats-new-feed.panel.empty-results-podcast.message": string
        "web-player.whats-new-feed.panel.empty-results-podcast.title": string
        "web-player.whats-new-feed.panel.error": string
        "web-player.whats-new-feed.panel.error.button": string
        "web-player.whats-new-feed.panel.subtitle": string
        "web-player.whats-new-feed.panel.title": string
        "web-player.your-dj.jumpbutton.tooltip.desc": string
        "web-player.your-dj.jumpbutton.tooltip.hover": string
        "web-player.your-dj.jumpbutton.tooltip.title": string
        "web-player.your-dj.npv.queue.description": string
        "web-player.your-dj.npv.queue.title": string
        "web-player.your-dj.upsell.notavailable.description": string
        "web-player.your-dj.upsell.notavailable.gotolink": string
        "web-player.your-dj.upsell.notavailable.notnow": string
        "web-player.your-dj.upsell.notavailable.title": string
        "web-player.your-dj.upsell.notavailableonweb.ack": string
        "web-player.your-dj.upsell.notavailableonweb.description": string
        "web-player.your-dj.upsell.notavailableonweb.title": string
        "web-player.your-dj.upsell.premium.description": string
        "web-player.your-dj.upsell.premium.no": string
        "web-player.your-dj.upsell.premium.title": string
        "web-player.your-dj.upsell.premium.yes": string
        "web-player.your-dj.ylx.tooltip.description": string
        "web-player.your-library-x.clear_filters": string
        "web-player.your-library-x.collapse-folder": string
        "web-player.your-library-x.collapse-your-library": string
        "web-player.your-library-x.create.button-label": string
        "web-player.your-library-x.create.create-a-new-playlist": string
        "web-player.your-library-x.create.create-a-playlist-folder": string
        "web-player.your-library-x.custom-ordering-onboarding-text": string
        "web-player.your-library-x.default_folder_name": string
        "web-player.your-library-x.download-progress-count-out-of-total": string
        "web-player.your-library-x.download-progress-title": string
        "web-player.your-library-x.dsa-message": string
        "web-player.your-library-x.dsa-message-link": string
        "web-player.your-library-x.empty-results-text-short": string
        "web-player.your-library-x.empty-results-title-short": string
        "web-player.your-library-x.empty-state-folder-subtitle": string
        "web-player.your-library-x.empty-state-folder-title": string
        "web-player.your-library-x.empty-state-playlists-cta": string
        "web-player.your-library-x.empty-state-playlists-subtitle": string
        "web-player.your-library-x.empty-state-playlists-title": string
        "web-player.your-library-x.empty-state-podcasts-browse": string
        "web-player.your-library-x.empty-state-podcasts-keep-you-updated": string
        "web-player.your-library-x.empty-state-podcasts-to-follow": string
        "web-player.your-library-x.enlarge-your-library": string
        "web-player.your-library-x.error-body": string
        "web-player.your-library-x.error-button": string
        "web-player.your-library-x.error-title": string
        "web-player.your-library-x.expand-folder": string
        "web-player.your-library-x.expand-your-library": string
        "web-player.your-library-x.expanded-list-header.date-added": string
        "web-player.your-library-x.expanded-list-header.played-at": string
        "web-player.your-library-x.expanded-list-header.title": string
        "web-player.your-library-x.feedback-remove-from-library-dialog-cancel-button": string
        "web-player.your-library-x.feedback-remove-from-library-dialog-confirm-button": string
        "web-player.your-library-x.feedback-remove-from-library-dialog-description": string
        "web-player.your-library-x.feedback-remove-from-library-dialog-description-album": string
        "web-player.your-library-x.feedback-remove-from-library-dialog-description-artist": string
        "web-player.your-library-x.feedback-remove-from-library-dialog-description-audiobook": string
        "web-player.your-library-x.feedback-remove-from-library-dialog-description-playlist": string
        "web-player.your-library-x.feedback-remove-from-library-dialog-description-show": string
        "web-player.your-library-x.feedback-remove-from-library-dialog-title": string
        "web-player.your-library-x.filter_options": string
        "web-player.your-library-x.grid-view": string
        "web-player.your-library-x.list-view": string
        "web-player.your-library-x.navigate-back-folder": string
        "web-player.your-library-x.pin-error.message": string
        "web-player.your-library-x.pin-error.no-pin-in-folder.message": string
        "web-player.your-library-x.pin-error.no-pin-in-folder.title": string
        "web-player.your-library-x.pin-error.ok": string
        "web-player.your-library-x.pin-error.title": string
        "web-player.your-library-x.pinned": string
        "web-player.your-library-x.reduce-your-library": string
        "web-player.your-library-x.rename-folder": string
        "web-player.your-library-x.rows.folder.number-of-folders": { one: string; other: string }
        "web-player.your-library-x.rows.folder.number-of-playlists": { one: string; other: string }
        "web-player.your-library-x.rows.liked-songs.subtitle": { one: string; other: string }
        "web-player.your-library-x.rows.local-files.subtitle": { one: string; other: string }
        "web-player.your-library-x.show-less": string
        "web-player.your-library-x.show-more": string
        "web-player.your-library-x.sort-and-view-picker.button-aria-label": string
        "web-player.your-library-x.sort-and-view-picker.compact": string
        "web-player.your-library-x.sort-and-view-picker.grid": string
        "web-player.your-library-x.sort-and-view-picker.grid-density-label": string
        "web-player.your-library-x.sort-and-view-picker.list": string
        "web-player.your-library-x.sort-and-view-picker.view-as": string
        "web-player.your-library-x.sort-and-view-picker.view-onboarding": string
        "web-player.your-library-x.sort_by": string
        "web-player.your-library-x.subtitle-your-episodes": string
        "web-player.your-library-x.text-filter.albums-placeholder": string
        "web-player.your-library-x.text-filter.artists-placeholder": string
        "web-player.your-library-x.text-filter.audiobooks-placeholder": string
        "web-player.your-library-x.text-filter.downloaded-placeholder": string
        "web-player.your-library-x.text-filter.generic-placeholder": string
        "web-player.your-library-x.text-filter.playlists-placeholder": string
        "web-player.your-library-x.text-filter.shows-placeholder": string
        "web-player.your-library-x.type-album": string
        "web-player.your-library-x.type-artist": string
        "web-player.your-library-x.type-audiobook": string
        "web-player.your-library-x.type-folder": string
        "web-player.your-library-x.type-playlist": string
        "web-player.your-library-x.type-show": string
        "web-player.your-library-x.unpin-confirmation-dialog.cancel-button-text": string
        "web-player.your-library-x.unpin-confirmation-dialog.confirm-button-label-folder": string
        "web-player.your-library-x.unpin-confirmation-dialog.confirm-button-label-playlist": string
        "web-player.your-library-x.unpin-confirmation-dialog.confirm-button-text": string
        "web-player.your-library-x.unpin-confirmation-dialog.message-folder": string
        "web-player.your-library-x.unpin-confirmation-dialog.message-playlist": string
        "web-player.your-library-x.unpin-confirmation-dialog.title-folder": string
        "web-player.your-library-x.unpin-confirmation-dialog.title-playlist": string
        "web-player.your-library-x.your-library": string
        "windowed.product-album-description": string
        "windowed.product-album-header": string
        "wrapped.ineligible.description.2022": string
        "wrapped.logged_in_and_eligible.description.2022": string
        "wrapped.logged_out_or_eligible.description.2022": string
        "wrapped.title.2022": string
        "ylx.clicktoplay": string
    }
    getTransport: () => ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]["transport"]
    getUBILogger: () => {
        formatUiNavigateEvent: (a) => any
        getInteractionId: () => any
        interaction: undefined
        logImpression: () => any
        logInteraction: () => any
        logNavigation: () => any
        ubiLogger: {
            authenticationProvider: { isAuthenticated: () => boolean }
            contextualProviders: {
                playContextUriProvider: { getPlayContextUri: () => string }
                playbackIdProvider: { getPlaybackId: () => string }
            }
            disableAutoBackgroundMonitoring: boolean
            eventSender: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]
            getPageInstanceId: () => any
            logClientGainedFocus: () => any
            logClientLostFocus: () => any
            logImpression: () => any
            logInteraction: () => any
            logNavigation: (a) => any
            logNavigationEnd: () => any
            logNavigationStart: () => any
            pageInstanceIdProvider: {
                getPageInstanceId: () => any
                setPageInstanceId: () => any
                storageManager: {
                    clear: () => any
                    getItem: () => any
                    getStorageType: () => any
                    removeItem: () => any
                    setItem: (a) => any
                    storageAdapter: {
                        clear: () => any
                        getItem: () => any
                        items: Map<any, any>
                        removeItem: () => any
                        setItem: (a) => any
                    }
                }
            }
            pageUriProvider: {
                getPageUri: () => any
                setPageUri: () => any
                storageManager: ReturnType<
                    PlatformAutoGen["getUBILogger"]
                >["ubiLogger"]["pageInstanceIdProvider"]["storageManager"]
            }
            pageViewLogger: {
                addEventListeners: () => any
                authenticationProvider: ReturnType<
                    PlatformAutoGen["getUBILogger"]
                >["ubiLogger"]["authenticationProvider"]
                completeNavigation: () => any
                disableAutoBackgroundMonitoring: boolean
                eventSender: ReturnType<PlatformAutoGen["getAdManagers"]>["hpto"]["hptoApi"]["eventSender"]
                flowIdProvider: undefined
                generatePageInstanceId: () => string
                getCurrentEntityUri: () => any
                getCurrentNavigationalRoot: () => any
                getCurrentPageId: () => any
                getCurrentPageInstanceId: () => any
                getNavigationStatus: () => any
                getPendingInteractionId: () => any
                getPendingNavigationReason: () => any
                getPendingNavigationalRoot: () => any
                handleBackgroundStates: () => undefined
                logClientGainedFocus: () => any
                logClientLostFocus: () => any
                pageInstanceIdProvider: ReturnType<
                    PlatformAutoGen["getUBILogger"]
                >["ubiLogger"]["pageInstanceIdProvider"]
                pageUriProvider: ReturnType<PlatformAutoGen["getUBILogger"]>["ubiLogger"]["pageUriProvider"]
                populateNavigationReason: () => any
                removeEventListeners: () => any
                resetNavStartInfo: () => any
                setCurrent: (a, b, c) => any
                setCurrentEntityUri: () => any
                setCurrentNavigationalRoot: () => any
                setCurrentPageId: () => any
                setCurrentPageInstanceId: () => any
                setNavigationStatus: () => any
                setPendingInteractionId: () => any
                setPendingNavigationReason: () => any
                setPendingNavigationalRoot: () => any
                startNavigation: () => any
                storageManager: ReturnType<
                    PlatformAutoGen["getUBILogger"]
                >["ubiLogger"]["pageInstanceIdProvider"]["storageManager"]
            }
            registerEventListeners: () => any
            storageManager: ReturnType<
                PlatformAutoGen["getUBILogger"]
            >["ubiLogger"]["pageInstanceIdProvider"]["storageManager"]
            unregisterEventListeners: () => any
        }
    }
    getUpdateAPI: () => {
        _cosmos: ReturnType<PlatformAutoGen["getAudiobooksPremiumConsumptionCapObserverAPI"]>["_playerApi"]["_cosmos"]
        applyUpdate: () => Promise<any>
        getVersionInfo: () => Promise<any>
        prepareUpdate: () => Promise<any>
        subscribe: () => any
    }
    getUserAPI: () => ReturnType<PlatformAutoGen["getShuffleAPI"]>["_userApi"]
    getVideoAPI: () => any
    initialProductState: {
        "ab-ad-player-targeting": string
        "ab-ad-requester": string
        "ab-android-push-notifications": string
        "ab-browse-music-tuesday": string
        "ab-collection-bookmark-model": string
        "ab-collection-followed-artists-only": string
        "ab-collection-hide-unavailable-albums": string
        "ab-collection-offline-mode": string
        "ab-collection-union": string
        "ab-desktop-hide-follow": string
        "ab-desktop-playlist-annotation-edit": string
        "ab-mobile-discover": string
        "ab-mobile-running-onlymanualmode": string
        "ab-mobile-running-tempo-detection": string
        "ab-mobile-social-feed": string
        "ab-mobile-startpage": string
        "ab-moments-experience": string
        "ab-new-share-flow": string
        "ab-play-history": string
        "ab-playlist-extender": string
        "ab-sugarpills-sanity-check": string
        "ab-test-group": string
        "ab-watch-now": string
        ab_recently_played_feature_time_filter_threshold: string
        "active-session-days": string
        "ad-formats-preroll-video": string
        "ad-formats-video-takeover": string
        "ad-persist-reward-time": string
        "ad-session-persistence": string
        "addon-hifi": string
        ads: string
        "allow-override-internal-prefs": string
        "ap-resolve-pods": string
        "app-developer": string
        "apply-child-content-restrictions": string
        "audio-preview-url-template": string
        "audio-quality": string
        "audiobook-onboarding-completed": string
        "audiobook-onboarding-dismissed": string
        autoplay: string
        "backend-advised-bitrate": string
        "browse-overview-enabled": string
        "buffering-strategy": string
        "buffering-strategy-parameters": string
        "capper-profile": string
        "capping-bar-threshold": string
        catalogue: string
        collection: string
        "com.spotify.madprops.delivered.by.ucs": string
        "com.spotify.madprops.use.ucs.product.state": string
        country: string
        created_by_partner: string
        "dsa-mode-available": string
        "dsa-mode-enabled": string
        "employee-free-opt-in": string
        "enable-annotations": string
        "enable-annotations-read": string
        "enable-autostart": string
        "enable-crossfade": string
        "enable-gapless": string
        expiry: string
        "explicit-content": string
        "fb-grant-permission-local-render": string
        "fb-info-confirmation": string
        "filter-explicit-content": string
        "financial-product": string
        "has-audiobooks-subscription": string
        "head-file-caching": string
        "head-files-url": string
        "hifi-eligible": string
        "hifi-optin-intent": string
        "high-bitrate": string
        "image-url": string
        incognito_mode_timeout: string
        "india-experience": string
        "instant-search": string
        "instant-search-expand-sidebar": string
        "is-pigeon": string
        "is-puffin": string
        "is-standalone-audiobooks": string
        is_email_verified: string
        "key-caching-auto-offline": string
        "key-caching-max-count": string
        "key-caching-max-offline-seconds": string
        "key-memory-cache-mode": string
        "last-premium-activation-date": string
        "lastfm-session": string
        libspotify: string
        "license-acceptance-grace-days": string
        "license-agreements": string
        "local-files-import": string
        "loudness-levels": string
        "metadata-link-lookup-modes": string
        mobile: string
        "mobile-browse": string
        "mobile-login": string
        "mobile-payment": string
        name: string
        "network-operator-premium-activation": string
        "nft-disabled": string
        "obfuscate-restricted-tracks": string
        offline: string
        "on-demand": string
        "on-demand-trial": string
        "pause-after": string
        "payments-initial-campaign": string
        "payments-locked-state": string
        "player-license": string
        "playlist-annotations-markup": string
        "playlist-folders": string
        "preferred-locale": string
        "prefetch-keys": string
        "prefetch-strategy": string
        "prefetch-window-max": string
        product: string
        "product-expiry": string
        "profile-image-upload": string
        "public-toplist": string
        "publish-activity": string
        "publish-playlist": string
        radio: string
        "remote-control": string
        "restrict-playlist-collaboration": string
        "send-email": string
        "shows-collection": string
        "shows-collection-jam": string
        shuffle: string
        "shuffle-algorithm": string
        "sidebar-navigation-enabled": string
        "social-session": string
        "social-session-free-tier": string
        "storage-size-config": string
        streaming: string
        "streaming-only-premium": string
        "streaming-rules": string
        "track-cap": string
        "ugc-abuse-report": string
        "ugc-abuse-report-url": string
        unrestricted: string
        "use-fb-publish-backend": string
        "use-pl3": string
        "use-playlist-app": string
        "use-playlist-uris": string
        "user-profile-show-invitation-codes": string
        "video-cdn-sampling": string
        "video-device-blacklisted": string
        "video-initial-bitrate": string
        "video-keyframe-url": string
        "video-manifest-url": string
        "video-wifi-initial-bitrate": string
        "wanted-licenses": string
        "widevine-license-url": string
        "yl-kids-restricted-content": string
    }
    initialUser: {
        avatarBackgroundColor: number
        displayName: string
        images: ReturnType<PlatformAutoGen["getAdManagers"]>["adStateReporter"]["focusState"]["listeners"]
        type: string
        uri: string
        username: string
    }
    isDeveloperMode: boolean
    isVideoSupported: boolean
    operatingSystem: string
    username: string
    version: string
}
