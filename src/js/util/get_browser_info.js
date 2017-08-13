let userAgent = navigator.userAgent,
    rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
    rFirefox = /(firefox)\/([\w.]+)/,
    rOpera = /(opera).+version\/([\w.]+)/,
    rChrome = /(chrome)\/([\w.]+)/,
    rSafari = /version\/([\w.]+).*(safari)/;

let ua = userAgent.toLowerCase();

function uaMatch(ua){
    let match;

    match = rMsie.exec(ua);
    console.log(match);
    if(match != null){
        return { browser : "IE", version : match[2] || "0" };
    }
    match = rFirefox.exec(ua);
    if (match != null) {
        return { browser : match[1] || "", version : match[2] || "0" };
    }
    match = rOpera.exec(ua);
    if (match != null) {
        return { browser : match[1] || "", version : match[2] || "0" };
    }
    match = rChrome.exec(ua);
    if (match != null) {
        return { browser : match[1] || "", version : match[2] || "0" };
    }
    match = rSafari.exec(ua);
    if (match != null) {
        return { browser : match[2] || "", version : match[1] || "0" };
    }
    if (match != null) {
        return { browser : "", version : "0" };
    }
}

let browserInfo = uaMatch(ua);

export default browserInfo.browser + browserInfo.version;