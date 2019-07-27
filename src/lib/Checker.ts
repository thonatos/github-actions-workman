import {
  checkChangelogVersion,
  checkReleaseProposal,
  checkReleaseVersion,
  searchReleaseLabel
} from '../util';
import Base from './Base';

export default class Checker extends Base {
  public async run(tools: any) {
    await super.init(tools);

    const { packageVersion, latestVersion, changelog, event, payload } = this;

    if (event !== 'pull_request') {
      tools.exit.neutral('Checker: should be triggered with event:pull_request!');
      return;
    }

    const releaseVersion = checkReleaseProposal(payload.pull_request.title);

    // Check Release Proposal
    tools.log('Checker: check Release Proposal');
    if (!releaseVersion) {
      tools.exit.neutral('Checker: release proposal');
      return;
    }

    // Check Release Changelog
    tools.log('Checker: check Release Changelog');
    if (!checkChangelogVersion(changelog, releaseVersion)) {
      tools.exit.failure(
        'Checker: changelog version error',
        changelog && changelog.version || changelog, releaseVersion
      );
      return;
    }

    // Check Package Version
    tools.log('Checker: check Package Version');
    if (packageVersion !== releaseVersion) {
      tools.exit.failure('Checker: package version error', packageVersion, releaseVersion);
      return;
    }

    // Check Release Version
    tools.log('Checker: check Release Version');
    if (!checkReleaseVersion(latestVersion, releaseVersion)) {
      tools.exit.failure('Checker: release version error', latestVersion, releaseVersion);
      return;
    }

    const label = searchReleaseLabel(latestVersion, releaseVersion);

    if (!label) {
      tools.exit.failure('Checker: no Release Label');
      return;
    }

    tools.log('Checker: update Label', label);
    await this.updateLabel(label);

    tools.exit.success('Checker: done!');
  }

  public async updateLabel(label: string) {
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
}
