"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SagiriServerError = exports.SagiriClientError = exports.SagiriError = void 0;
class SagiriError extends Error {
    constructor(code, message) {
        super(`${message} (${code})`);
        this.name = "SagiriError";
    }
}
exports.SagiriError = SagiriError;
class SagiriClientError extends SagiriError {
    constructor(code, message) {
        super(code, message);
        this.name = "SagiriClientError";
    }
}
exports.SagiriClientError = SagiriClientError;
class SagiriServerError extends SagiriError {
    constructor(code, message) {
        super(code, message);
        this.name = "SagiriServerError";
    }
}
exports.SagiriServerError = SagiriServerError;
//# sourceMappingURL=errors.js.map