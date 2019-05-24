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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQixrQ0FBK0M7QUFFL0MsTUFBcUIsSUFBSTtJQVF2QixZQUFZLEtBQVU7UUFIdEIsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFhO1FBQzdCLE1BQU0sRUFDSixJQUFJLEVBQ0osT0FBTyxFQUFFLEVBQUUsWUFBWSxFQUFFLEdBQzFCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFdkIsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3BDLEdBQUcsSUFBSTtZQUNQLFlBQVk7WUFDWixNQUFNLEVBQUUsQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDO1NBQzVCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJO1FBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3pDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFL0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLDJCQUFvQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNGO0FBdkNELHVCQXVDQyJ9