import semver from 'semver';

/**
 * get release verison from proposal
 * @param {String} proposal Release {semver}
 *
 */
export const getReleaseVersion = (proposal: string) => {
  if (proposal.length < 13) {
    return null;
  }

  if (proposal.slice(0, 7) !== 'Release') {
    return null;
  }
  return semver.valid(proposal.slice(8));
};

/**
 * get release label
 * @param {String} curr
 * @param {String} next
 */
export const getReleaseLabel = (curr: string, next: string) => {
  const currSemVer = semver.parse(curr) as ReleaseActions.PlainObject;
  const nextSemVer = semver.parse(next) as ReleaseActions.PlainObject;
  if (!currSemVer || !nextSemVer) {
    return;
  }

  return ['major', 'minor', 'patch'].find((label) => {
    return nextSemVer[label] !== currSemVer[label];
  });
};

/**
 * Satisfies Version
 * @param {String} curr
 * @param {String} next
 */
export const satisfiesVersion = (curr: string, next: string) => {
  if (!next) {
    return;
  }
  return semver.satisfies(next, curr ? `>${curr}` : '*');
};
