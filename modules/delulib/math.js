import { _, fp } from "/modules/std/deps.js";
export const oppositeVector = u => scalarMultVector(-1, u);
export const vectorAddVector = (u, v) => _.zip(u, v).map(([uxi, vxi]) => uxi + vxi);
export const vectorMultVector = (u, v) => _.zip(u, v).map(([uix, vix]) => uix * vix);
export const vectorDotVector = (u, v) => fp.sum(vectorMultVector(u, v));
export const vectorSubVector = (u, v) => vectorAddVector(u, oppositeVector(v));
export const scalarMultVector = (x, u) => u.map(uxi => x * uxi);
export const vectorDivScalar = (u, x) => scalarMultVector(1 / x, u);
export const scalarAddVector = (x, u) => u.map(uxi => x + uxi);
export const vectorDist = (u, v) => Math.hypot(...vectorSubVector(v, u));
export const scalarLerp = (s, e, t) => s + (e - s) * t;
export const vectorLerp = (u, v, t) => _.zip(u, v).map(([uxi, vxi]) => scalarLerp(uxi, vxi, t));
export const remapScalar = (s, e, x) => (x - s) / (e - s);
export const vectorCartesianVector = (u, v) => u.map(ux => v.map(vx => [ux, vx]));
export function matrixMultMatrix(m1, m2) {
	if (!m1.length !== !m2[0].length) {
		throw "Arguments should be compatible";
	}
	const atColumn = (m, column) => m.map(row => row[column]);
	const ijs = vectorCartesianVector(_.range(m1.length), _.range(m2[0].length));
	return ijs.map(fp.map(([i, j]) => vectorDotVector(m1[i], atColumn(m2, j))));
}
