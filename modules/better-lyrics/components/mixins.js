var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { consume } from "https://esm.sh/@lit/context";
import { html } from "https://esm.sh/lit";
import { property, queryAssignedElements } from "https://esm.sh/lit/decorators.js";
import { _ } from "../../std/deps.js";
import { scrollTimeoutCtx, scrollContainerCtx } from "./contexts.js";
export const SyncedMixin = (superClass) => {
    class mixedClass extends superClass {
        constructor() {
            super(...arguments);
            this.content = "";
            this.tsp = 0; // time start percent
            this.tep = 1; // time end percent
        }
        updateProgress(scaledProgress, depthToActiveAncestor) { }
    }
    __decorate([
        property()
    ], mixedClass.prototype, "content", void 0);
    __decorate([
        property({ type: Number })
    ], mixedClass.prototype, "tsp", void 0);
    __decorate([
        property({ type: Number })
    ], mixedClass.prototype, "tep", void 0);
    return mixedClass;
};
export const AnimatedMixin = (superClass) => {
    class mixedClass extends superClass {
        updateProgress(scaledProgress, depthToActiveAncestor) {
            super.updateProgress(scaledProgress, depthToActiveAncestor);
            const clampedScaledProgress = _.clamp(scaledProgress, -0.5, 1.5);
            if (this.shouldAnimate(clampedScaledProgress, depthToActiveAncestor)) {
                this.csp = clampedScaledProgress;
                this.dtaa = depthToActiveAncestor;
                this.animateContent();
            }
        }
        shouldAnimate(clampedScaledProgress, depthToActiveAncestor) {
            return this.csp !== clampedScaledProgress || this.dtaa !== depthToActiveAncestor;
        }
        animateContent() { }
    }
    return mixedClass;
};
export const ScrolledMixin = (superClass) => {
    class mixedClass extends superClass {
        constructor() {
            super(...arguments);
            this.scrollTimeout = 0;
        }
        updateProgress(progress, depthToActiveAncestor) {
            super.updateProgress(progress, depthToActiveAncestor);
            const isActive = depthToActiveAncestor === 0;
            const wasActive = this.dtaa === 0;
            const bypassProximityCheck = this.dtaa === undefined;
            this.dtaa = depthToActiveAncestor;
            if (!isActive || wasActive)
                return;
            if (Date.now() < this.scrollTimeout || !this.scrollContainer)
                return;
            const lineHeight = parseInt(document.defaultView.getComputedStyle(this).lineHeight);
            const scrollTop = this.offsetTop - this.scrollContainer.offsetTop - lineHeight * 2;
            const verticalLinesToActive = Math.abs(scrollTop - this.scrollContainer.scrollTop) / this.scrollContainer.offsetHeight;
            if (!bypassProximityCheck && !_.inRange(verticalLinesToActive, 0.1, 0.75))
                return;
            this.scrollContainer.scrollTo({
                top: scrollTop,
                behavior: document.visibilityState === "visible" ? "smooth" : "auto",
            });
        }
    }
    __decorate([
        consume({ context: scrollTimeoutCtx, subscribe: true })
    ], mixedClass.prototype, "scrollTimeout", void 0);
    __decorate([
        consume({ context: scrollContainerCtx })
    ], mixedClass.prototype, "scrollContainer", void 0);
    return mixedClass;
};
export const SyncedContainerMixin = (superClass) => {
    class mixedClass extends superClass {
        computeChildProgress(rp, child) {
            return rp;
        }
        updateProgress(rp, depthToActiveAncestor) {
            super.updateProgress(rp, depthToActiveAncestor);
            const childs = Array.from(this.childs);
            if (childs.length === 0)
                return;
            childs.forEach((child, i) => {
                const progress = this.computeChildProgress(rp, i);
                const isActive = _.inRange(rp, child.tsp, child.tep);
                child.updateProgress(progress, depthToActiveAncestor + (isActive ? 0 : 1));
            });
        }
        render() {
            return html `<slot></slot><br />`;
        }
    }
    __decorate([
        queryAssignedElements()
    ], mixedClass.prototype, "childs", void 0);
    return mixedClass;
};
