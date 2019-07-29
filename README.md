# Github Actions Workman &middot; [![GitHub license][license-square]][license-url]

[![Egg.js][egg-square]][egg-url]
[![NPM Version][npm-square]][npm-url]
[![Semantic Release][semantic-release-square]][semantic-release-url]

[license-square]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/thonatos/github-actions-workman/blob/HEAD/LICENSE
[egg-square]: https://img.shields.io/badge/Awesome-Egg.js-ff69b4.svg?style=flat-square
[egg-url]: https://eggjs.org/
[npm-square]: https://img.shields.io/npm/v/github-actions-workman.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/github-actions-workman
[semantic-release-square]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release

> Github actions for the package release.

## Features

😀🤓😎🤗😉😇

### Pull Request Checker

#### Check Release Proposal

> Example: 'Release {Semver Version}'

#### Check Release Version

```bash
1.0.0 -> 1.0.1 ✅
1.0.0 -> 1.0.1 ✅
2.0.0 -> 1.0.0 ❎
```

#### Search Release Label

Add the label to the Release Pull Request

```bash
1.0.0 -> 1.0.1 👉 semver:patch
1.0.0 -> 1.1.1 👉 semver:minor
1.0.0 -> 2.2.1 👉 semver:major
```

### Auto Release

#### Release to Github

> commit message: Release {Semver Version}

- Create tag
- Create release

#### Release NPM Package

- Publish to NPM

## Usage

### Prepare

Enable Github Actions

> https://github.com/features/actions

Add NPM Token to Secrets.

> Project - Settings - Secrets

- `NPM_TOKEN`

### Checker

> .github/main.workflow

```bash
## workflow
workflow "Pull Request" {
  on = "pull_request"
  resolves = ["npm check"]
}

## actions
action "npm install" {
  uses = "docker://thonatos/github-actions-nodejs"
  args = "npm install"
}

action "npm ci" {
  uses = "docker://thonatos/github-actions-nodejs"
  needs = ["npm install"]
  args = "npm run ci"
}

action "workman check" {
  uses = "thonatos/github-actions-workman@master"
  needs = ["npm ci"]
  args = "workman check"
  secrets = [
    "GITHUB_TOKEN",
    "NPM_TOKEN"
  ]
}
```

### Release

> .github/main.workflow

```bash
## workflow
workflow "Push" {
  on = "push"
  resolves = ["workman release"]
}

## actions
action "npm install" {
  uses = "docker://thonatos/github-actions-nodejs"
  args = "npm install"
}

action "npm ci" {
  uses = "docker://thonatos/github-actions-nodejs"
  needs = ["npm install"]
  args = "npm run ci"
}

action "workman release" {
  uses = "thonatos/github-actions-workman@master"
  needs = ["npm ci"]
  args = "workman release --releaseBranch master"
  secrets = [
    "GITHUB_TOKEN",
    "NPM_TOKEN"
  ]
}
```

### Workflow

Handle Pull Request

- Create the PR(title: `Release {Semver Version}`)
  1. check the release proposal
  2. check the release version
  3. check the release history
  4. add a label like: `semver:patch`

- Merge PR without deleting branch
  1. create a tag with the release version
  2. create a release with release history
  3. release the package with run `npm publish --access public`

## Contributing

### Suggestions

Please open an issue [here](https://github.com/thonatos/github-actions-workman/issues).

### License

Github Actions Release is [MIT licensed](./LICENSE).
