export declare const searchTracksDefinition: {
    kind: string;
    definitions: ({
        kind: string;
        name: {
            kind: string;
            value: string;
        };
        typeCondition: {
            kind: string;
            name: {
                kind: string;
                value: string;
            };
        };
        selectionSet: {
            kind: string;
            selections: {
                kind: string;
                name: {
                    kind: string;
                    value: string;
                };
            }[];
        };
    } | {
        kind: string;
        operation: string;
        name: {
            kind: string;
            value: string;
        };
        variableDefinitions: ({
            kind: string;
            variable: {
                kind: string;
                name: {
                    kind: string;
                    value: string;
                };
            };
            type: {
                kind: string;
                type: {
                    kind: string;
                    name: {
                        kind: string;
                        value: string;
                    };
                };
                name?: undefined;
            };
        } | {
            kind: string;
            variable: {
                kind: string;
                name: {
                    kind: string;
                    value: string;
                };
            };
            type: {
                kind: string;
                name: {
                    kind: string;
                    value: string;
                };
                type?: undefined;
            };
        })[];
        selectionSet: {
            kind: string;
            selections: {
                kind: string;
                name: {
                    kind: string;
                    value: string;
                };
                arguments: {
                    kind: string;
                    name: {
                        kind: string;
                        value: string;
                    };
                    value: {
                        kind: string;
                        name: {
                            kind: string;
                            value: string;
                        };
                    };
                }[];
                selectionSet: {
                    kind: string;
                    selections: ({
                        kind: string;
                        name: {
                            kind: string;
                            value: string;
                        };
                        selectionSet?: undefined;
                    } | {
                        kind: string;
                        name: {
                            kind: string;
                            value: string;
                        };
                        selectionSet: {
                            kind: string;
                            selections: ({
                                kind: string;
                                name: {
                                    kind: string;
                                    value: string;
                                };
                                selectionSet?: undefined;
                            } | {
                                kind: string;
                                name: {
                                    kind: string;
                                    value: string;
                                };
                                selectionSet: {
                                    kind: string;
                                    selections: ({
                                        kind: string;
                                        name: {
                                            kind: string;
                                            value: string;
                                        };
                                        selectionSet?: undefined;
                                    } | {
                                        kind: string;
                                        name: {
                                            kind: string;
                                            value: string;
                                        };
                                        selectionSet: {
                                            kind: string;
                                            selections: {
                                                kind: string;
                                                name: {
                                                    kind: string;
                                                    value: string;
                                                };
                                            }[];
                                        };
                                    })[];
                                };
                            })[];
                        };
                    })[];
                };
            }[];
        };
    })[];
};
