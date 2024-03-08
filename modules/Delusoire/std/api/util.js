export const waitForElement = (selector, timeout = 5000, location = document.body, notEl) => new Promise((resolve, reject) => {
    const onMutation = () => {
        const el = document.querySelector(selector);
        if (el) {
            if (notEl && el === notEl) {
            }
            else {
                observer.disconnect();
                return resolve(el);
            }
        }
    };
    const observer = new MutationObserver(onMutation);
    onMutation();
    observer.observe(location, {
        childList: true,
        subtree: true,
    });
    if (timeout)
        setTimeout(() => {
            observer.disconnect();
            console.debug();
            reject(`waitForElement: timed out waiting for ${selector}`);
        }, timeout);
});
export const mainElement = document.querySelector("main");
export const [REACT_FIBER, REACT_PROPS] = Object.keys(mainElement);
