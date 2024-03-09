import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
import Dropdown from "./Dropdown.js";
// * Who doesn't love some Fixed Point (Functional) Programming?
const Bluebird = (a) => (b) => (c) => a(b(c));
const createStorage = (provider) => ({
    getItem(key, def) {
        const v = provider.getItem(key);
        return JSON.parse(v) ?? def();
    },
    setItem(key, value) {
        const v = JSON.stringify(value);
        provider.setItem(key, v);
    },
});
const usePersistedState = ({ getItem, setItem }) => (key) => (initialState) => {
    const [state, setState] = React.useState(() => getItem(key, initialState));
    const persistentSetState = React.useCallback((reducer) => {
        const nextState = reducer(state);
        setItem(key, nextState);
        setState(nextState);
    }, [state, setItem, key]);
    return [state, persistentSetState];
};
const createPersistedState = Bluebird(usePersistedState)(createStorage);
export const useDropdown = ({ options, storage, storageVariable }) => {
    // We do this because we don't want the variable to change
    const [initialStorageVariable] = React.useState(storageVariable);
    const getDefaultOption = () => Object.keys(options)[0];
    let activeOption;
    let setActiveOption;
    if (storage && initialStorageVariable) {
        [activeOption, setActiveOption] = createPersistedState(storage)(`drop-down:${initialStorageVariable}`)(getDefaultOption);
    }
    else {
        [activeOption, setActiveOption] = React.useState(getDefaultOption);
    }
    const dropdown = S.React.createElement(Dropdown, { options: options, activeOption: activeOption, onSwitch: o => setActiveOption(() => o) });
    return [dropdown, activeOption, setActiveOption];
};
