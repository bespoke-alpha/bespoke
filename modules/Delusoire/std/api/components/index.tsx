import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
import Dropdown, { type DropdownOptions } from "./Dropdown.js";

// * Who doesn't love some Fixed Point (Functional) Programming?
const Bluebird =
	<A, B>(a: (b: B) => A) =>
	<C,>(b: (c: C) => B) =>
	(c: C) =>
		a(b(c));

const createStorage = (provider: Pick<Storage, "getItem" | "setItem">) => ({
	getItem(key: string, def: () => any) {
		const v = provider.getItem(key);
		return JSON.parse(v) ?? def();
	},
	setItem(key: string, value) {
		const v = JSON.stringify(value);
		provider.setItem(key, v);
	},
});

type Thunk<A> = () => A;

const usePersistedState =
	({ getItem, setItem }: ReturnType<typeof createStorage>) =>
	<K extends string>(key: K) =>
	<A,>(initialState: Thunk<A>) => {
		const [state, setState] = React.useState<A>(() => getItem(key, initialState));

		const persistentSetState = React.useCallback(
			(reducer: (state: A) => A) => {
				const nextState = reducer(state);

				setItem(key, nextState);
				setState(nextState);
			},
			[state, setItem, key],
		);

		return [state, persistentSetState] as const;
	};

const createPersistedState = Bluebird(usePersistedState)(createStorage);

interface UseDropdownOpts<O extends DropdownOptions> {
	options: O;
	storage?: Storage;
	storageVariable?: string;
}

export const useDropdown = <O extends DropdownOptions>({ options, storage, storageVariable }: UseDropdownOpts<O>) => {
	// We do this because we don't want the variable to change
	const [initialStorageVariable] = React.useState(storageVariable);
	const getDefaultOption = () => Object.keys(options)[0];
	let activeOption: keyof typeof options;
	let setActiveOption: (reducer: (state: keyof typeof options) => keyof typeof options) => void;
	if (storage && initialStorageVariable) {
		[activeOption, setActiveOption] = createPersistedState(storage)(`drop-down:${initialStorageVariable}`)<keyof typeof options>(getDefaultOption);
	} else {
		[activeOption, setActiveOption] = React.useState(getDefaultOption);
	}

	const dropdown = <Dropdown options={options} activeOption={activeOption} onSwitch={o => setActiveOption(() => o)} />;

	return [dropdown, activeOption, setActiveOption] as const;
};
