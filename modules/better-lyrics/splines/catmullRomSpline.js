import { _ } from "../../std/deps.js";
import { zip_n_uplets } from "../../delulib/fp.js";
import { remapScalar, scalarLerp, vectorDist, vectorLerp } from "../../delulib/math.js";
class CatmullRomCurve {
    constructor(P, T) {
        this.P = P;
        this.T = T;
    }
    static fromPointsAndAlpha(P, alpha) {
        const T = zip_n_uplets(2)(P)
            .map(([Pi, Pj]) => vectorDist(Pi, Pj) ** alpha)
            .map((ki, i, kis) => (i > 0 ? kis[i - 1] : 0) + ki);
        return new CatmullRomCurve(P, T);
    }
    static fromPointsInTime(points) {
        const [T, P] = _.unzip(points);
        return new CatmullRomCurve(P, T);
    }
    at(t) {
        t = _.clamp(t, this.T[1], this.T[2]);
        const vectorLerpWithRemapedScalar = (s, e, x) => vectorLerp(s[1], e[1], remapScalar(s[0], e[0], x));
        const A = [
            vectorLerpWithRemapedScalar([this.T[0], this.P[0]], [this.T[1], this.P[1]], t),
            vectorLerpWithRemapedScalar([this.T[1], this.P[1]], [this.T[2], this.P[2]], t),
            vectorLerpWithRemapedScalar([this.T[2], this.P[2]], [this.T[3], this.P[3]], t),
        ];
        const B = [
            vectorLerpWithRemapedScalar([this.T[0], A[0]], [this.T[2], A[1]], t),
            vectorLerpWithRemapedScalar([this.T[1], A[1]], [this.T[3], A[2]], t),
        ];
        return vectorLerpWithRemapedScalar([this.T[1], B[0]], [this.T[2], B[1]], t);
    }
}
export class AlphaCatmullRomSpline {
    constructor(points, alpha) {
        this.points = points;
        this.catnumRollCurves = zip_n_uplets(4)(points).map(P => CatmullRomCurve.fromPointsAndAlpha(P, alpha));
    }
    at(t) {
        const i = Math.floor(t);
        return this.catnumRollCurves[i].at(t - i);
    }
    static fromPoints(points, alpha = 0.5) {
        if (points.length < 4)
            return null;
        return new AlphaCatmullRomSpline(points, alpha);
    }
    static fromPointsClamped(points, alpha = 0.5) {
        if (points.length < 2)
            return null;
        const [P1, P2] = _.take(points, 2);
        const [P3, P4] = _.takeRight(points, 2);
        const P0 = vectorLerp(P1, P2, -1);
        const P5 = vectorLerp(P3, P4, 2);
        return AlphaCatmullRomSpline.fromPoints([P0, ...points, P5], alpha);
    }
}
export class CatmullRomSpline {
    constructor(points) {
        this.points = _.sortBy(points, p => p[0]);
        this.catnumRollCurves = zip_n_uplets(4)(this.points).map(P => CatmullRomCurve.fromPointsInTime(P));
    }
    at(t) {
        const point = [t, []];
        const i = _.clamp(_.sortedLastIndexBy(this.points, point, p => p[0]) - 2, 0, this.catnumRollCurves.length - 1);
        return this.catnumRollCurves[i].at(t);
    }
    static fromPoints(points) {
        if (points.length < 4)
            return null;
        return new CatmullRomSpline(points);
    }
    static fromPointsClamped(points) {
        if (points.length < 2)
            return null;
        const [P1, P2] = _.take(points, 2);
        const [P3, P4] = _.takeRight(points, 2);
        const P0 = [scalarLerp(P1[0], P2[0], -1), vectorLerp(P1[1], P2[1], -1)];
        const P5 = [scalarLerp(P3[0], P4[0], 2), vectorLerp(P3[1], P4[1], 2)];
        return CatmullRomSpline.fromPoints([P0, ...points, P5]);
    }
}
function deCasteljau(points, position) {
    if (points.length < 2)
        return points[0];
    return deCasteljau(zip_n_uplets(2)(points).map(([Pi, Pj]) => vectorLerp(Pi, Pj, position)), position);
}
