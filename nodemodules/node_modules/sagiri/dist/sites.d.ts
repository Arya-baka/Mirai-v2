import { Result, ResultData } from "./response";
interface AuthorData {
    authorName: string | null;
    authorUrl: string | null;
}
declare const sites: {
    [key: string]: SiteData | undefined;
};
export interface SiteData {
    name: string;
    index: number;
    urlMatcher: RegExp;
    backupUrl(result: Result): string;
    authorData?(data: ResultData): AuthorData;
}
export default sites;
