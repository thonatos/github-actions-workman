/**
 * Release Proposal Checker
 * @param {String} proposal Release {semver}
 *
 */
export declare const checkReleaseProposal: (proposal: string) => string | null;
/**
 * Release Label Searcher
 * @param {String} currVersion
 * @param {String} nextVersion
 */
export declare const searchReleaseLabel: (currVersion: string, nextVersion: string) => string | undefined;
/**
 * Check Release Version
 * @param {String} currVersion
 * @param {String} nextVersion
 */
export declare const checkReleaseVersion: (currVersion: string, nextVersion: string) => boolean;
//# sourceMappingURL=index.d.ts.map