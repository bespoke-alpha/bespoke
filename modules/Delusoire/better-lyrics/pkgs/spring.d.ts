export declare class Spring {
    private p;
    private dampingRatio;
    private lastUpdateTime;
    private W0;
    private v;
    private inEquilibrium;
    private p_e;
    compute(time?: number): number;
    constructor(p: number, dampingRatio: number, frequency: number, lastUpdateTime?: number);
    private solve;
    setEquilibrium(position: number): number;
    reset(position: number): void;
    isInEquilibrium: () => boolean;
}
