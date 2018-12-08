#!/usr/bin/env bash

curl -s https://github-trending-api.now.sh/repositories?since=weekly |\
  npx html-table -o --generated-at \
    --cols project,description,languageColor,language,stars,forks \
    --col.project.cell '<a href="${url}">${author}/${name}</a>' \
    --col.project.width 250  \
    --col.languageColor.width 20  \
    --col.languageColor.cell \
      '<div style="background-color: ${languageColor}; border-radius: 500px; width: 10px; height: 10px; display: inline-block;" />' \
    --col.languageColor.header '' \
    --col.language.width 120  \
    --col.stars.width 100 \
    --col.forks.width 100
