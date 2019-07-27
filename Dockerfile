FROM thonatos/github-actions-nodejs:latest

LABEL "com.github.actions.name"="github-actions-workman"
LABEL "com.github.actions.description"="Workman For Egg.js"
LABEL "com.github.actions.icon"="settings"
LABEL "com.github.actions.color"="white"

LABEL "repository"="https://github.com/thonatos/github-actions-workman"
LABEL "homepage"="https://github.com/thonatos/github-actions-workman"
LABEL "maintainer"="Suyi <thonatos.yang@gmail.com>"

RUN npm i -g github-actions-workman

COPY . .

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
