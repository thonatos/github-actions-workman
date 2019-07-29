import { satisfiesVersion } from '../utils';

export default  ({ latestVersion, releaseVersion }) => {
  return satisfiesVersion(latestVersion, releaseVersion);
};
