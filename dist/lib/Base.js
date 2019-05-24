"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const util_1 = require("../util");
class Base {
    constructor(tools) {
        this.nextVersion = '';
        this.currVersion = '';
        this.tools = tools;
        this.debug = debug_1.default('Github-Actions-Release');
    }
    async updateLabel(label) {
        const { repo, payload: { issue_number }, } = this.tools.context;
        await this.tools.github.issues.update({
            ...repo,
            issue_number,
            labels: [`semver:${label}`],
        });
    }
    init() {
        const tools = this.tools;
        const pkg = tools.getPackageJSON() || {};
        const { event, payload, repo } = tools.context;
        tools.log('@@@pkg', JSON.stringify(pkg, null, 2));
        tools.log('@@@repo', JSON.stringify(repo, null, 2));
        tools.log('@@@event', JSON.stringify(event, null, 2));
        tools.log('@@@payload', JSON.stringify(payload, null, 2));
        this.currVersion = pkg.version || '*';
        this.nextVersion = util_1.checkReleaseProposal(payload.pull_request.title);
    }
}
exports.default = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQixrQ0FBK0M7QUFFL0MsTUFBcUIsSUFBSTtJQVF2QixZQUFZLEtBQVU7UUFIZixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUczQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLGVBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWE7UUFDcEMsTUFBTSxFQUNKLElBQUksRUFDSixPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsR0FDMUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUV2QixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDcEMsR0FBRyxJQUFJO1lBQ1AsWUFBWTtZQUNaLE1BQU0sRUFBRSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUM7U0FDNUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLElBQUk7UUFDVCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDekMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUUvQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxRCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsMkJBQW9CLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0Y7QUF2Q0QsdUJBdUNDIn0=