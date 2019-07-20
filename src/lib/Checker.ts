import { checkChangelogVersion, checkReleaseVersion, searchReleaseLabel } from '../util';
import Base from './Base';

export default class Checker extends Base {
  public async run(tools: any) {
    await super.init(tools);

    const { packageVersion, releaseVersion, latestVersion, changelog, action, event } = this;

    // Check Release Proposal
    tools.log('Checker: check Release Proposal');
    if (!releaseVersion) {
      tools.log('Check Release Proposal: Failed, skip!');
      return;
    }

    // Check Release Changelog
    tools.log('Checker: check Release Changelog');
    if (!checkChangelogVersion(changelog, releaseVersion)) {
      tools.log('Check Changelog: Failed, skip!', changelog, releaseVersion);
      return;
    }

    // Check Package Version
    tools.log('Checker: check Package Version');
    if (packageVersion !== releaseVersion) {
      tools.log('Check Package Version: Failed, skip!', packageVersion, releaseVersion);
      return;
    }

    // Check Release Version
    tools.log('Checker: check Release Version');
    if (!checkReleaseVersion(latestVersion, releaseVersion)) {
      tools.log('Check Release Version: Failed, skip!', latestVersion, releaseVersion);
      return;
    }

    const label = searchReleaseLabel(latestVersion, releaseVersion);

    if (!label) {
      tools.log('Checker: search Release Label: Failed, skip!', label);
      return;
    }

    tools.log('Checker: update Label', label);
    await this.updateLabel(label);

    if (event !== 'pull_request' || action !== 'closed') {
      tools.log('Checker: check event Failed, skip!', event, action);
      return;
    }
  }

  public async updateLabel(label: string) {
    const {
      repo,
      payload: { number: issueNumber },
    } = this.tools.context;

    await this.tools.github.issues.update({
      ...repo,
      issue_number: issueNumber,
      labels: [`semver:${label}`, `type: release`],
    });
  }
}
