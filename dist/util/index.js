"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = __importDefault(require("semver"));
/**
 * Release Proposal Checker
 * @param {String} proposal Release {semver}
 *
 */
exports.checkReleaseProposal = (proposal) => {
    if (proposal.length < 13) {
        return null;
    }
    if (proposal.slice(0, 7) !== 'Release') {
        return null;
    }
    return semver_1.default.valid(proposal.slice(8));
};
/**
 * Release Label Searcher
 * @param {String} currVersion
 * @param {String} nextVersion
 */
exports.searchReleaseLabel = (currVersion, nextVersion) => {
    const currSemVer = semver_1.default.parse(currVersion);
    const nextSemVer = semver_1.default.parse(nextVersion);
    if (!currSemVer || !nextSemVer) {
        return;
    }
    return ['major', 'minor', 'patch'].find(label => {
        return nextSemVer[label] !== currSemVer[label];
    });
};
/**
 * Check Release Version
 * @param {String} currVersion
 * @param {String} nextVersion
 */
exports.checkReleaseVersion = (currVersion, nextVersion) => {
    // console.log(currVersion, nextVersion, currVersion ? `>${currVersion}` : '*', semver.satisfies(nextVersion, currVersion ? `>${currVersion}` : '*'));
    if (!nextVersion) {
        return false;
    }
    return semver_1.default.satisfies(nextVersion, currVersion ? `>${currVersion}` : '*');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUE0QjtBQUU1Qjs7OztHQUlHO0FBQ1UsUUFBQSxvQkFBb0IsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUN2RCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN0QyxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNVLFFBQUEsa0JBQWtCLEdBQUcsQ0FDaEMsV0FBbUIsRUFDbkIsV0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sVUFBVSxHQUErQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RSxNQUFNLFVBQVUsR0FBK0IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekUsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUM5QixPQUFPO0tBQ1I7SUFFRCxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDOUMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNVLFFBQUEsbUJBQW1CLEdBQUcsQ0FDakMsV0FBbUIsRUFDbkIsV0FBbUIsRUFDbkIsRUFBRTtJQUNGLHNKQUFzSjtJQUN0SixJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2hCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFDRCxPQUFPLGdCQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlFLENBQUMsQ0FBQyJ9