/// <reference types="react" />
interface InlineGridProps {
    special?: boolean;
    children: React.ReactElement | React.ReactElement[];
}
declare function InlineGrid(props: InlineGridProps): React.ReactElement<HTMLTableSectionElement>;
declare const _default: import("react").MemoExoticComponent<typeof InlineGrid>;
export default _default;
