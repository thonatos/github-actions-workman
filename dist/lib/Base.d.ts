import Debug from 'debug';
export default class Base {
    tools: any;
    options: any;
    debug: Debug.Debugger;
    nextVersion: any;
    currVersion: any;
    constructor(tools: any);
    updateLabel(label: string): Promise<void>;
    init(): void;
}
//# sourceMappingURL=Base.d.ts.map