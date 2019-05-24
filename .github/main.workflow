## actions
action "npm install" {
  uses = "docker://node:lts-slim"
  args = "npm i"
}

action "npm test" {
  uses = "docker://node:lts-slim"
  needs = ["npm install"]
  args = "npm run test"
}

action "npm ci" {
  uses = "docker://node:lts-slim"
  needs = ["npm install"]
  args = "npm run ci"
}

action "npm release" {
  uses = "./"
  needs = ["npm ci"]
  args = "check --test=abcd"
  secrets = ["GITHUB_TOKEN"]
}

## workflow
workflow "Push" {
  on = "push"
  resolves = ["npm install", "npm test", "npm ci"]
}

workflow "Pull Request" {
  on = "pull_request"
  resolves = ["npm install", "npm test", "npm ci", "npm release"]
}