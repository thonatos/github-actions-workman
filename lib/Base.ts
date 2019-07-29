import Debug from 'debug';
import parse from 'git-changelog-parser';
import latestNpmVersion from 'latest-version';
export default class Base {
  public tools: any;
  public options: any;
  public debug: Debug.Debugger;

  public pkg: any = {};
  public event: string = '';
  public action: string = '';
  public payload: any = {};

  public changelog: any = '';
  public packageVersion: any = '';
  public releaseVersion: any = '';
  public latestVersion: any = '';

  constructor() {
    this.debug = Debug('Github-Actions-Workman');
  }

  public async init(tools: any) {
    const { event, payload, repo } = tools.context;
    const { action } = payload;

    tools.log('@@event', event);
    tools.log('@@action', action);
    tools.log('@@repo', JSON.stringify(repo, null, 2));
    tools.log('@@payload', JSON.stringify(payload, null, 2));

    // base
    this.tools = tools;
    this.event = event;
    this.action = action;
    this.payload = payload;

    // npm package
    const pkg = tools.getPackageJSON() || {};
    tools.log('@@@pkg', JSON.stringify(pkg, null, 2));

    this.pkg = pkg;
    this.packageVersion = pkg.version || '*';
    this.latestVersion = await latestNpmVersion(pkg.name || '');

    // changelog
    try {
      const content = tools.getFile('History.md');
      this.changelog = parse(content);
    } catch (error) {
      this.changelog = undefined;
    }
  }
}
