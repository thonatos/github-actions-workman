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
    return ['major', 'minor', 'patch'].find((label) => {
        return nextSemVer[label] !== currSemVer[label];
    });
};
/**
 * Check Release Version
 * @param {String} currVersion
 * @param {String} nextVersion
 */
exports.checkReleaseVersion = (currVersion, nextVersion) => {
    if (!nextVersion) {
        return false;
    }
    return semver_1.default.satisfies(nextVersion, currVersion ? `>${currVersion}` : '*');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUE0QjtBQUU1Qjs7OztHQUlHO0FBQ1UsUUFBQSxvQkFBb0IsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtJQUN2RCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUN0QyxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNVLFFBQUEsa0JBQWtCLEdBQUcsQ0FDaEMsV0FBbUIsRUFDbkIsV0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0sVUFBVSxHQUFHLGdCQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBK0IsQ0FBQztJQUMzRSxNQUFNLFVBQVUsR0FBRyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQStCLENBQUM7SUFDM0UsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUM5QixPQUFPO0tBQ1I7SUFFRCxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNoRCxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ1UsUUFBQSxtQkFBbUIsR0FBRyxDQUNqQyxXQUFtQixFQUNuQixXQUFtQixFQUNuQixFQUFFO0lBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsT0FBTyxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM5RSxDQUFDLENBQUMifQ==