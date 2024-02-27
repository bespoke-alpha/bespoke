import { MonotoneCubicHermitInterpolation } from "https://esm.sh/v135/@adaskothebeast/splines/es2022/splines.mjs";
import { _ } from "/modules/std/deps.js";
export class MonotoneNormalSpline extends MonotoneCubicHermitInterpolation {
	at(t) {
		const t0 = this.xs[0];
		const tf = this.xs.at(-1);
		const ct = _.clamp(t, t0, tf);
		return super.interpolate(ct);
	}
}
