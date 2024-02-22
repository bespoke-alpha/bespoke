export class Registry {
    constructor() {
        this._A = undefined;
        this._B = undefined;
        this.registered = new Map();
    }
    getItems(input, reverse = false) {
        const items = Array.from(this.registered.entries())
            .map(([i, p]) => p(input) && i)
            .filter(Boolean);
        reverse && items.reverse();
        return items;
    }
    register(item, predicate) {
        this.registered.set(item, predicate);
        return item;
    }
    unregister(item) {
        this.registered.delete(item);
        return item;
    }
}
