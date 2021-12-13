"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/naming-convention */
const bent_1 = __importDefault(require("bent"));
const debug_1 = __importDefault(require("debug"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = require("fs");
const errors_1 = require("./errors");
const sites_1 = __importDefault(require("./sites"));
const util_1 = require("./util");
const log = debug_1.default("sagiri");
/**
 * Creates a function to be used for finding potential sources for a given image.
 */
const sagiri = (token, defaultOptions = { results: 5 }) => {
    log("Created Sagiri function with default options:", defaultOptions);
    const request = bent_1.default("https://saucenao.com", "json", "POST", 200);
    return (file, optionOverrides = {}) => __awaiter(void 0, void 0, void 0, function* () {
        if (!file)
            throw new Error("Missing file to find source for");
        log(`Requesting possible sources for ${typeof file === "string" ? file : "a stream or buffer"}`);
        const { results: numResults, testMode, mask, excludeMask } = Object.assign(Object.assign({}, defaultOptions), optionOverrides);
        const form = new form_data_1.default();
        log(`Requesting ${numResults} results from SauceNAO`);
        form.append("api_key", token);
        form.append("output_type", 2);
        form.append("numres", numResults);
        if (testMode) {
            log("Enabling test mode");
            form.append("testmode", 1);
        }
        if (mask && excludeMask)
            throw new Error("It's redundant to set both mask and excludeMask. Choose one or the other.");
        else if (mask) {
            log(`Adding inclusive db mask with a value of ${util_1.generateMask(mask)} (from [${mask.join(", ")}])`);
            form.append("dbmask", util_1.generateMask(mask));
        }
        else if (excludeMask) {
            log(`Adding exclusive db mask with value of ${util_1.generateMask(excludeMask)} (from [${excludeMask.join(", ")}])`);
            form.append("dbmaski", util_1.generateMask(excludeMask));
        }
        if (typeof file === "string" && /^https?:/.test(file)) {
            log("Adding given file as a URL");
            form.append("url", file);
        }
        else if (typeof file === "string") {
            log("Adding given file from an fs.createReadStream");
            form.append("file", fs_1.createReadStream(file));
        }
        else {
            log("Adding file as stream or buffer");
            form.append("file", file);
        }
        log("Sending request to SauceNAO");
        const response = (yield request("/search.php", form, form.getHeaders()));
        const { header: { status, message, results_returned: resultsReturned }, } = response;
        log(`Received response, status ${status}`);
        // Server side error
        if (status > 0)
            throw new errors_1.SagiriServerError(status, message);
        // Client side error
        else if (status < 0)
            throw new errors_1.SagiriClientError(status, message);
        const results = response.results
            .filter(({ header: { index_id: id } }) => !!sites_1.default[id])
            .sort((a, b) => b.header.similarity - a.header.similarity);
        log(`Expected ${numResults} results. ` +
            `SauceNAO says it sent ${resultsReturned}, actually sent ${response.results.length}. ` +
            `Found ${results.length} acceptable results.`);
        return results.map((result) => {
            const { url, name, id, authorName, authorUrl } = util_1.resolveResult(result);
            const { header: { similarity, thumbnail }, } = result;
            return {
                url,
                site: name,
                index: id,
                similarity: Number(similarity),
                thumbnail,
                authorName,
                authorUrl,
                raw: result,
            };
        });
    });
};
module.exports = sagiri;
exports.default = sagiri;
//# sourceMappingURL=index.js.map