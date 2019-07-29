import {
  getReleaseLabel,
  getReleaseVersion,
  satisfiesVersion,
} from '../lib/utils';

describe('lib/utils/index.ts', () => {

  test('getReleaseVersion', () => {
    const proposals = [
      'Re',
      'Release',
      'Release pre.1',
      'Release 1.0.0',
      'Release v1.0.0',
      'Release 1.0.0-pre',
      'Release 1.0.0-pre.1',
    ];

    const results = [
      null,
      null,
      null,
      '1.0.0',
      '1.0.0',
      '1.0.0-pre',
      '1.0.0-pre.1',
    ];

    for (let index = 0; index < proposals.length; index++) {
      const proposal = proposals[index];
      const result = results[index];
      expect(getReleaseVersion(proposal)).toBe(result);
    }
  });

  test('satisfiesVersion', () => {
    const releases = [
      ['1.0.0', '1.0.1'],
      ['1.0.0', '1.1.0'],
      ['1.0.1', '1.0.0'],
      ['1.1.0', '1.0.1'],
    ];

    const results = [true, true, false, false];

    for (let index = 0; index < releases.length; index++) {
      const [currVersion, nextVersion] = releases[index];
      const satisfied = results[index];
      expect(satisfiesVersion(currVersion, nextVersion)).toBe(satisfied);
    }
  });

  test('getReleaseLabel', () => {
    const releases = [
      ['1.0.0', '1.0.1', 'patch'],
      ['1.0.0', '1.1.0', 'minor'],
      ['1.0.0', '1.1.1', 'minor'],
      ['1.0.0', '2.0.0', 'major'],
      ['1.0.0', '2.1.0', 'major'],
      ['1.0.0', '2.1.1', 'major'],
    ];

    for (const release of releases) {
      const [currVersion, nextVersion, label] = release;
      expect(getReleaseLabel(currVersion, nextVersion)).toBe(label);
    }
  });
});
