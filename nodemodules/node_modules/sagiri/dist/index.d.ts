/// <reference types="node" />
import { Readable } from "stream";
import { Result } from "./response";
declare type File = string | Buffer | Readable;
/**
 * Creates a function to be used for finding potential sources for a given image.
 */
declare const sagiri: (token: string, defaultOptions?: Options) => (file: File, optionOverrides?: Options) => Promise<SagiriResult[]>;
export default sagiri;
export interface Options {
    results?: number;
    mask?: number[];
    excludeMask?: number[];
    testMode?: boolean;
    db?: number;
}
export interface SagiriResult {
    url: string;
    site: string;
    index: number;
    similarity: number;
    thumbnail: string;
    authorName: string | null;
    authorUrl: string | null;
    raw: Result;
}
