# Github Actions Release

> Github actions for the package release.

## Features

> [WIP] 😀🤓😎🤗😉😇

**Check Release Proposal**

> Example: 'Release {Semver Version}'

**Check Release Version**

```
1.0.0 -> 1.0.1 ✅
1.0.0 -> 1.0.1 ✅
2.0.0 -> 1.0.0 ❎
```

**Search Release Label**

Add the label to the Release Pull Request

```
1.0.0 -> 1.0.1 👉 semver:patch
1.0.0 -> 1.1.1 👉 semver:minor
1.0.0 -> 2.2.1 👉 semver:major
```
