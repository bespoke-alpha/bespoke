/// <reference types="react" />
export type QueryStatus = "error" | "success" | "pending";
interface StatusProps {
    status: QueryStatus;
    error: Error;
    logger: Console;
}
export declare const useStatus: ({ status, error, logger }: StatusProps) => JSX.Element;
export {};
