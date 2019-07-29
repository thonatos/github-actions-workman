import Base from './Base';
import * as checks from './checks';
import { getReleaseLabel, getReleaseVersion, } from './utils';

export default class Checker extends Base {
  public label: string = '';
  public proposal: string = '';

  public async run(tools: any) {
    await this.prepare(tools);

    if (this.event !== 'pull_request') {
      tools.exit.neutral('[Checker] should be triggered with event:pull_request!');
      return;
    }

    const failures: string[] = [];

    Object.keys(checks).map((name) => {
      const fn = checks[name];
      const passed = fn(this);
      if (!passed) {
        failures.push(name);
      }
      tools.log(`[Checker] checks.${name}`, passed ? 'passed' : 'failed');
    });

    if (failures.length > 0) {
      tools.exit.neutral(`[Checker] fix the failure if you are releasing the package, or ignore it.`);
      return;
    }

    tools.log('[Checker] add labels', this.label);
    await this.updateLabel(this.label);

    tools.exit.success('[Checker] done!');
  }

  private async updateLabel(label: string) {
    const {
      repo,
      payload: { number: issueNumber },
    } = this.tools.context;

    await this.tools.github.issues.update({
      ...repo,
      issue_number: issueNumber,
      labels: [`semver: ${label}`, `type: release`],
    });
  }

  private async prepare(tools: any) {
    await super.init(tools);

    const { payload, latestVersion } = this;
    const releaseVersion = getReleaseVersion(payload.pull_request.title) || '';
    const label = getReleaseLabel(latestVersion, releaseVersion) || '';

    // pull_request info
    this.label = label;
    this.proposal = payload.pull_request.title;

    this.releaseVersion = releaseVersion;
  }
}
