"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_toolkit_1 = require("actions-toolkit");
const Checker_1 = __importDefault(require("./lib/Checker"));
const options = {
    event: 'pull_request',
};
const task = async (tools) => {
    const args = tools.arguments;
    tools.log('@@arguments', args);
    if (args === 'release') {
        const checker = new Checker_1.default(tools);
        await checker.run();
    }
    // TODO
};
actions_toolkit_1.Toolkit.run(task, options);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxREFBMEM7QUFDMUMsNERBQW9DO0FBRXBDLE1BQU0sT0FBTyxHQUFHO0lBQ2QsS0FBSyxFQUFFLGNBQWM7Q0FDdEIsQ0FBQztBQUVGLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUMzQixNQUFNLElBQUksR0FBUSxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQ2xDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRS9CLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUN0QixNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsTUFBTSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDckI7SUFFRCxPQUFPO0FBQ1QsQ0FBQyxDQUFDO0FBRUYseUJBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDIn0=