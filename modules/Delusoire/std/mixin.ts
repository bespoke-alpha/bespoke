import type { RegisterTransformFN } from "/hooks/transforms/transform.js";

export let registerTransform: RegisterTransformFN;
export default function (rt: RegisterTransformFN) {
	registerTransform = rt;
	(async () => {
		await import("./expose/index.js");
		await import("./registers/registers.js");
	})();
}
