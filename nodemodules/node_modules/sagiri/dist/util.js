"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveResult = exports.generateMask = void 0;
const sites_1 = __importDefault(require("./sites"));
exports.generateMask = (masks) => 
// eslint-disable-next-line prefer-template
masks.reduce((prev, curr) => prev ^ parseInt("1" + "0".repeat(curr), 2), 0);
function resolveResult(result) {
    var _a;
    /* eslint-disable @typescript-eslint/no-unnecessary-condition */
    const { data, header } = result;
    const id = header.index_id;
    if (!sites_1.default[id])
        throw new Error(`Cannot resolve data for unknown index ${id}`);
    const { name, urlMatcher, backupUrl, authorData } = sites_1.default[id];
    let url;
    // Try to find matching url from ones provided by SauceNAO
    if (data.ext_urls && data.ext_urls.length > 1)
        [url] = data.ext_urls.filter((url) => urlMatcher.test(url));
    else if (data.ext_urls)
        [url] = data.ext_urls;
    // If we can't find out, generate one ourselves
    if (!url)
        url = backupUrl(result);
    return Object.assign({ id,
        url,
        name }, ((_a = authorData === null || authorData === void 0 ? void 0 : authorData(result.data)) !== null && _a !== void 0 ? _a : { authorName: null, authorUrl: null }));
    /* eslint-enable */
}
exports.resolveResult = resolveResult;
//# sourceMappingURL=util.js.map