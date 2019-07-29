
export default ({ changelog, releaseVersion }) => {
  if (!changelog) {
    return;
  }
  const { version: changelogVersion = '' } = changelog[0] || {};

  return changelogVersion === releaseVersion;
};
