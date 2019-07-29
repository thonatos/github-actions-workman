import {
  checkChangelog,
  checkPackageVersion,
  checkReleaseLabel,
  checkReleaseProposal,
  checkReleaseVersion
} from '../lib/checks';

describe('lib/checks/index.ts', () => {

  test('checkChangelog', () => {
    expect(checkChangelog({
      changelog: [{
        version: '1.0.0',
      }], releaseVersion: '1.0.0',
    })).toBe(true);

    expect(checkChangelog({
      changelog: [{
        version: '1.0.1',
      }, {
        version: '1.0.0',
      }], releaseVersion: '1.0.0',
    })).toBe(false);
  });

  test('checkPackageVersion', () => {
    expect(checkPackageVersion({ packageVersion: '1.0.0', releaseVersion: '1.0.0' })).toBe(true);
    expect(checkPackageVersion({ packageVersion: '1.0.0', releaseVersion: '1.0.1' })).toBe(false);
  });

  test('checkReleaseLabel', () => {
    expect(checkReleaseLabel({ label: null })).toBe(false);
    expect(checkReleaseLabel({ label: 'major' })).toBe(true);
  });

  test('checkReleaseProposal', () => {
    expect(checkReleaseProposal({ proposal: null })).toBe(false);
    expect(checkReleaseProposal({ proposal: 'Release 1.0.0' })).toBe(true);
  });

  test('checkReleaseVersion', () => {
    expect(checkReleaseVersion({ latestVersion: '1.0.0', releaseVersion: '1.0.1' })).toBe(true);
    expect(checkReleaseVersion({ latestVersion: '1.0.0', releaseVersion: '1.0.0' })).toBe(false);
  });

  test('all checks', () => {
    const ctx = {
      changelog: [{
        version: '1.0.1',
      }],
      label: 'major',
      latestVersion: '1.0.0',
      packageVersion: '1.0.1',
      proposal: 'Release 1.0.1',
      releaseVersion: '1.0.1',
    };

    const checkResult = [
      checkChangelog,
      checkPackageVersion,
      checkReleaseLabel,
      checkReleaseProposal,
      checkReleaseVersion,
    ].map((fn) => fn(ctx));

    expect(checkResult).toStrictEqual([
      true,
      true,
      true,
      true,
      true,
    ]);
  });
});
