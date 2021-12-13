export declare class SagiriError extends Error {
    constructor(code: number, message: string);
}
export declare class SagiriClientError extends SagiriError {
    constructor(code: number, message: string);
}
export declare class SagiriServerError extends SagiriError {
    constructor(code: number, message: string);
}
