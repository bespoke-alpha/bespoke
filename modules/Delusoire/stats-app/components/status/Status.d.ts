/// <reference types="react" />
type StatusProps = {
    icon: "error" | "library";
    heading: string;
    subheading: string;
};
export declare const Status: (props: StatusProps) => JSX.Element;
export default Status;
