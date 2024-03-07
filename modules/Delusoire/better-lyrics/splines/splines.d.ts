import { TwoUplet, Triplet } from "/modules/Delusoire/delulib/fp.js";
import { matrix, vector } from "/modules/Delusoire/delulib/math.js";
declare enum EndCondition {
    NATURAL = 0,
    CLOSED = 1
}
type EndConditionSideable = EndCondition.NATURAL | vector;
type EndConditions = TwoUplet<EndConditionSideable> | EndCondition.CLOSED;
declare class Monomial {
    private segments;
    private grid;
    constructor(segments: matrix[], grid?: any);
    at(t: number, n?: number): unknown;
}
declare class CubicHermite extends Monomial {
    static matrix: number[][];
    constructor(vertices: vector[], tangents: vector[], grid?: any);
}
export declare class KochanekBartels extends CubicHermite {
    static _calculate_tangents(points: vector[], times: Triplet<number>, tcb: Triplet<number>): number[][];
    static fromAlpha(vertices: vector[], tcb: Triplet<number>, alpha?: number, endconditions?: EndConditions): KochanekBartels;
    static fromGrid(vertices: vector[], tcb: Triplet<number>, grid: number[], endconditions?: EndConditions): KochanekBartels;
    private constructor();
}
export {};
