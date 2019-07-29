import Base from './Base';

export default class Checker extends Base {

  public async run(tools: any) {
    await super.init(tools);

    const { releaseBranch } = tools.arguments;
    const { event, packageVersion } = this;

    if (event !== 'push') {
      tools.exit.neutral(`[Releaser] should be triggered by event:push`);
      return;
    }

    if (releaseBranch) {
      const currentBranch = await this.getCurrentBranch();
      if (currentBranch !== releaseBranch) {
        tools.exit.neutral(`[Releaser] should be triggered by branch:${releaseBranch}`);
        return;
      }
    }

    tools.log(' Check Commit Message');
    const commitMessage = await this.getCommitMessage();
    if (commitMessage !== `Release ${packageVersion}`) {
      tools.exit.neutral('[Releaser] commit message should include release proposal');
      return;
    }

    tools.log(`[Releaser] release npm package ${packageVersion}`);
    await this.publishNodePackage();
    tools.exit.success('[Releaser] done!');
  }
  private async publishNodePackage() {
    const { pkg, tools } = this;
    tools.log('@@publishNodePackage', pkg);
    // await tools.runInWorkspace('git', ['checkout', 'master']);
    await tools.runInWorkspace('npm', ['publish', '--access', 'public']);
  }

  private async getCurrentBranch() {
    const { stdout } = await this.tools.runInWorkspace('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
    return stdout.toString().replace(/\n*$/, '');
  }

  private async getCommitMessage() {
    const { stdout } = await this.tools.runInWorkspace('git', ['log', '--format=%B', '-n', '1']);
    return stdout.toString().replace(/\n*$/, '');
  }
}
