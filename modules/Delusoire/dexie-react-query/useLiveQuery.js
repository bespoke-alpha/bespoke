import { liveQuery } from "https://esm.sh/dexie";
import { useObservable } from "./useObservable.js";
export function useLiveQuery(querier, deps, defaultResult) {
    return useObservable(() => liveQuery(querier), deps || [], defaultResult);
}
