import Debug from 'debug';
import { checkReleaseProposal } from '../util';

export default class Base {
  public tools: any;
  public options: any;
  public debug: Debug.Debugger;

  public nextVersion: any = '';
  public currVersion: any = '';

  constructor(tools: any) {
    this.tools = tools;
    this.debug = Debug('Github-Actions-Release');
  }

  public async updateLabel(label: string) {
    const {
      repo,
      payload: { issue_number },
    } = this.tools.context;

    await this.tools.github.issues.update({
      ...repo,
      issue_number,
      labels: [`semver:${label}`],
    });
  }

  public init() {
    const tools = this.tools;
    const pkg = tools.getPackageJSON() || {};
    const { event, payload, repo } = tools.context;

    tools.log('@@@pkg', JSON.stringify(pkg, null, 2));
    tools.log('@@@repo', JSON.stringify(repo, null, 2));
    tools.log('@@@event', JSON.stringify(event, null, 2));
    tools.log('@@@payload', JSON.stringify(payload, null, 2));

    this.currVersion = pkg.version || '*';
    this.nextVersion = checkReleaseProposal(payload.pull_request.title);
  }
}
