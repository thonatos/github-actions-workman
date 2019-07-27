# workflow
workflow "Push" {
  on = "push"
  resolves = ["auto release"]
}

workflow "Pull Request" {
  on = "pull_request"
  resolves = ["workman check"]
}

# actions
action "npm install" {
  uses = "docker://thonatos/github-actions-nodejs"
  args = "npm install -g npminstall && npminstall"
}

action "npm ci" {
  uses = "docker://thonatos/github-actions-nodejs"
  needs = ["npm install"]
  args = "npm run ci"
}

# target
action "auto release" {
  uses = "docker://thonatos/github-actions-nodejs"
  needs = ["filter master", "npm ci"]
  args = "npm run semantic-release"
  secrets = ["GITHUB_TOKEN", "NPM_TOKEN"]
}

action "workman check" {
  uses = "thonatos/github-actions-workman@1.4.0-Marketplace"
  needs = ["npm ci"]
  args = "workman check"
  secrets = [
    "GITHUB_TOKEN",
    "NPM_TOKEN"
  ]
}

# filter
action "filter master" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  secrets = ["GITHUB_TOKEN"]
  args = "branch master"
}
