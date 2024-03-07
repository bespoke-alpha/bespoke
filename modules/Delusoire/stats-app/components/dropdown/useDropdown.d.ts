/// <reference types="react" />
declare const useDropdown: <O extends readonly string[]>(options: O, storageVariable: string) => readonly [JSX.Element, O[number], (reducer: (state: O[number]) => O[number]) => void];
export default useDropdown;
