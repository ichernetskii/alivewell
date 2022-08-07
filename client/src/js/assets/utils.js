import cn from "classnames";

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
export function throttle(func, wait, options) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    if (!options) options = {};
    let later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        let now = Date.now();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

// Возвращает функцию, которая, пока она продолжает вызываться,
// не будет запускаться.
// Она будет вызвана один раз через N миллисекунд после последнего вызова.
// Если передано аргумент `immediate` (true), то она запустится сразу же при
// первом запуске функции.
export function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

export const capitalize = str => typeof str === "string" && !!str.length && `${str[0].toUpperCase()}${str.slice(1)}`;

export const getPageWidth = () => Math.max(
    document.body.scrollWidth, document.documentElement.scrollWidth,
    document.body.offsetWidth, document.documentElement.offsetWidth,
    document.body.clientWidth, document.documentElement.clientWidth
);

export const getPageHeight = () => Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

export function script(url) {
    if (Array.isArray(url)) {
        let promises = url.map(u => script(u));
        return Promise.all(promises);
    }

    return new Promise((resolve, reject) => {
        let r = false;
        let t = document.getElementsByTagName("script")[0];
        let s = document.createElement("script");

        s.type = "text/javascript";
        s.src = url;
        s.async = true;
        s.onload = s.onreadystatechange = function () {
            if (!r && (!this.readyState || this.readyState === "complete")) {
                r = true;
                resolve(this);
            }
        };
        s.onerror = s.onabort = reject;
        t.parentNode.insertBefore(s, t);
    });
}

export async function request(url, method = "GET", body = null, headers = {}) {
    if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json;charset=utf-8";
    }

    const response = await fetch(url, {method, headers, body});
    const data = await response.json();

    if (!response.ok) {
        const e = new Error();
        e.message = data.message || "Ошибка сервера. Попробуйте позже.";
        if (Array.isArray(data.errors) && data.errors.length !== 0) e.errors = data.errors;
        throw e;
    }

    return data;
}
