import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
import Dropdown from "./dropdown.js";
import { storage } from "../../../index.js";

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

const useDropdown = <O extends readonly string[]>(options: O, storageVariable: string) => {
	const [activeOption, setActiveOption] = createPersistedState(storage)(`drop-down:${storageVariable}`)<O[number]>(() => options[0]);

	const dropdown = <Dropdown options={options} activeOption={activeOption} switchCallback={setActiveOption} />;

	return [dropdown, activeOption, setActiveOption] as const;
};

export default useDropdown;
