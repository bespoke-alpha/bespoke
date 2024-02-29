import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
import Dropdown from "./dropdown.js";
import { storage } from "../../index.js";
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
const useDropdown = (options, storageVariable) => {
    const [activeOption, setActiveOption] = createPersistedState(storage)(`drop-down:${storageVariable}`)(() => options[0]);
    const dropdown = S.React.createElement(Dropdown, { options: options, activeOption: activeOption, switchCallback: setActiveOption });
    return [dropdown, activeOption, setActiveOption];
};
export default useDropdown;
