/// <reference types="react" />
interface DropdownMenuProps<O extends string[]> {
    options: O;
    activeOption: O[number];
    switchCallback: (option: O[number]) => void;
}
declare const Dropdown: <O extends readonly string[]>(props: DropdownMenuProps<O>) => JSX.Element;
export default Dropdown;
