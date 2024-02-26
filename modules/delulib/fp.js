import { _ } from "../std/deps.js";
import { S } from "../std/index.js";
const { Snackbar } = S;
export const pMchain = (f) => async (fa) => f(await fa);
export const chunkify50 = (fn) => async (args) => {
    const a = await Promise.all(_.chunk(args, 50).map(fn));
    return a.flat();
};
export const progressify = (f, n) => {
    let i = n;
    let lastProgress = 0;
    return async (..._) => {
        const res = (await f(...arguments));
        const progress = Math.round((1 - --i / n) * 100);
        if (progress > lastProgress) {
            Snackbar.updater.enqueueSetState(Snackbar, () => ({
                snacks: [],
                queue: [],
            }));
            Snackbar.enqueueSnackbar(`Loading: ${progress}%`, {
                variant: "default",
                autoHideDuration: 200,
                transitionDuration: {
                    enter: 0,
                    exit: 0,
                },
            });
        }
        lastProgress = progress;
        return res;
    };
};
export const zip_n_uplets = (n) => (a) => a.map((_, i, a) => a.slice(i, i + n)).slice(0, 1 - n);
