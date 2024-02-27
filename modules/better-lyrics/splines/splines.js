import { _ } from "/modules/std/deps.js";
import { zip_n_uplets } from "/modules/delulib/fp.js";
import {
	matrixMultMatrix,
	remapScalar,
	scalarAddVector,
	scalarMultVector,
	vectorAddVector,
	vectorDist,
	vectorDivScalar,
	vectorMultVector,
	vectorSubVector,
} from "/modules/delulib/math.js";
var EndCondition;
(function (EndCondition) {
	EndCondition[(EndCondition["NATURAL"] = 0)] = "NATURAL";
	EndCondition[(EndCondition["CLOSED"] = 1)] = "CLOSED";
})(EndCondition || (EndCondition = {}));
class Monomial {
	constructor(segments, grid = _.range(segments.length + 1)) {
		this.segments = segments;
		this.grid = grid;
	}
	at(t, n = 0) {
		t = _.clamp(t, this.grid[0], this.grid.at(-1) - 1e-7);
		const i = _.sortedLastIndex(this.grid, t) - 1;
		const [t0, t1] = this.grid.slice(i, i + 2);
		t = remapScalar(t0, t1, t);
		const coefficients = this.segments[i].slice(0, -n || undefined);
		const powers = _.range(coefficients.length).reverse();
		const weights = vectorDivScalar(
			_.range(n)
				.map(i => scalarAddVector(i + 1, powers))
				.reduce((u, v) => u.map((_, i) => u[i] * v[i]), new Array(powers.length).fill(1)),
			(t1 - t0) ** n,
		);
		const tps = powers.map(power => t ** power);
		return matrixMultMatrix([vectorMultVector(tps, weights)], coefficients)[0];
	}
}
class CubicHermite extends Monomial {
	static {
		this.matrix = [
			[2, -2, 1, 1],
			[-3, 3, -2, -1],
			[0, 0, 1, 0],
			[1, 0, 0, 0],
		];
	}
	constructor(vertices, tangents, grid = _.range(vertices.length)) {
		if (vertices.length < 2) throw "At least 2 vertices are needed";
		if (tangents.length !== 2 * (vertices.length - 1)) throw "Exactly 2 tangents per segment needed";
		if (vertices.length !== grid.length) throw "As many grid items as vertices are needed";
		const zip_vertices = zip_n_uplets(2)(vertices);
		const zip_grid = zip_n_uplets(2)(grid);
		const segments = _.zip(zip_vertices, zip_grid).map(([[x0, x1], [t0, t1]], i) => {
			const [v0, v1] = tangents.slice(i * 2, i * 2 + 2);
			const control_values = [x0, x1, scalarMultVector(t1 - t0, v0), scalarMultVector(t1 - t0, v1)];
			return matrixMultMatrix(CubicHermite.matrix, control_values);
		});
		super(segments, grid);
	}
}
export class KochanekBartels extends CubicHermite {
	static _calculate_tangents(points, times, tcb) {
		const [x_1, x0, x1] = points;
		const [t_1, t0, t1] = times;
		const [T, C, B] = tcb;
		const a = (1 - T) * (1 + C) * (1 + B);
		const b = (1 - T) * (1 - C) * (1 - B);
		const c = (1 - T) * (1 - C) * (1 + B);
		const d = (1 - T) * (1 + C) * (1 - B);
		const delta_1 = t0 - t_1;
		const delta0 = t1 - t0;
		const v_1 = vectorDivScalar(vectorSubVector(x0, x_1), delta_1);
		const v0 = vectorDivScalar(vectorSubVector(x1, x0), delta0);
		const incoming = vectorDivScalar(vectorAddVector(scalarMultVector(c * delta0, v_1), scalarMultVector(d * delta_1, v0)), delta_1 + delta0);
		const outgoing = vectorDivScalar(vectorAddVector(scalarMultVector(a * delta0, v_1), scalarMultVector(b * delta_1, v0)), delta_1 + delta0);
		return [incoming, outgoing];
	}
	static fromAlpha(vertices, tcb, alpha = 0, endconditions = [EndCondition.NATURAL, EndCondition.NATURAL]) {
		const deltas = zip_n_uplets(2)(vertices).map(([x0, x1]) => vectorDist(x0, x1) ** alpha);
		const grid = deltas.reduce((partialSums, delta) => [...partialSums, partialSums.at(-1) + delta], [0]);
		return KochanekBartels.fromGrid(vertices, tcb, grid, endconditions);
	}
	static fromGrid(vertices, tcb, grid, endconditions = [EndCondition.NATURAL, EndCondition.NATURAL]) {
		const closed = endconditions === EndCondition.CLOSED;
		const tcb_slots = vertices.length - (closed ? 0 : 2);
		return new KochanekBartels(vertices, new Array(tcb_slots).fill(tcb), grid, endconditions);
	}
	constructor(vertices, tcb, grid, endconditions) {
		if (vertices.length < 2) throw "At least two vertices are required";
		if (vertices.length !== grid.length) throw "Number of grid values must be same as vertices";
		const closed = endconditions === EndCondition.CLOSED;
		if (closed) {
			vertices.push(vertices[0], vertices[1]);
			tcb = [...tcb.slice(1), tcb[0]];
			const first_interval = grid[1] - grid[0];
			grid.push(grid.at(-1) + first_interval);
		}
		const zip_vertices = zip_n_uplets(3)(vertices);
		const zip_grid = zip_n_uplets(3)(grid);
		let tangents = _.zip(zip_vertices, zip_grid, tcb).flatMap(([points, times, tcb]) => KochanekBartels._calculate_tangents(points, times, tcb));
		if (closed) {
			tangents = [tangents.at(-1), ...tangents.slice(0, -1)];
		} else if (!tangents.length) {
			// simple line between two points
			const tangent = scalarMultVector(grid[1] - grid[0], vectorSubVector(vertices[1], vertices[0]));
			tangents = [tangent, tangent];
		} else {
			const [start, end] = endconditions;
			tangents = [
				_end_tangent(start, vertices.slice(0, 2), grid.slice(0, 2), tangents[0]),
				...tangents,
				_end_tangent(end, vertices.slice(-2), grid.slice(-2), tangents.at(-1)),
			];
		}
		super(vertices, tangents, grid);
	}
}
function _end_tangent(condition, vertices, times, other_tangent) {
	return condition === EndCondition.NATURAL ? _natural_tangent(vertices, times, other_tangent) : condition;
}
function _natural_tangent(vertices, times, tangent) {
	const [x0, x1] = vertices;
	const [t0, t1] = times;
	const delta = t1 - t0;
	return vectorSubVector(scalarMultVector(3 / (2 * delta), vectorSubVector(x1, x0)), vectorDivScalar(tangent, 2));
}
