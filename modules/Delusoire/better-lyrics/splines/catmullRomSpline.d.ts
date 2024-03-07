import { vector } from "/modules/Delusoire/delulib/math.js";
export type vectorWithTime = readonly [number, vector];
type Quadruplet<A> = readonly [A, A, A, A];
export type PointInTimeQuadruplet = Quadruplet<vectorWithTime>;
export declare class AlphaCatmullRomSpline {
    private points;
    private catnumRollCurves;
    private constructor();
    at(t: number): any;
    static fromPoints(points: Array<vector>, alpha?: number): AlphaCatmullRomSpline;
    static fromPointsClamped(points: Array<vector>, alpha?: number): AlphaCatmullRomSpline;
}
export declare class CatmullRomSpline {
    private points;
    private catnumRollCurves;
    private constructor();
    at(t: number): any;
    static fromPoints(points: Array<vectorWithTime>): CatmullRomSpline;
    static fromPointsClamped(points: Array<vectorWithTime>): CatmullRomSpline;
}
export {};
