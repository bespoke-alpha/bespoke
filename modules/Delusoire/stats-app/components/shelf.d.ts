/// <reference types="react" />
interface ShelfProps {
    title: string;
    children: React.ReactElement | React.ReactElement[];
}
declare function Shelf(props: ShelfProps): React.ReactElement;
declare const _default: import("react").MemoExoticComponent<typeof Shelf>;
export default _default;
