#!/usr/bin/env bash

curl -s https://restcountries.eu/rest/v2/all | \
  npx html-table-cli -o \
    --cols flag,code,name,population,area,capital,tld,languages \
    --col.flag.cell '<div style="text-align: center"><img src="${flag}" height="20" /></div>' \
    --col.flag.header '' \
    --col.flag.width 50 \
    --col.code.width 40 \
    --col.code.cell '${alpha2Code}' \
    --col.code.header '' \
    --col.name.cell '<span>${name} (${nativeName})</span>' \
    --col.name.filterable \
    --col.tld.cell '<code>${topLevelDomain[0]}</code>' \
    --col.tld.header 'TLD' \
    --col.tld.width 50 \
    --col.languages.cell '<span>${languages.map(x => x.name).join(", ")}</span>' \
    --col.languages.header 'Languages' \
    --col.population.cell '${population.toLocaleString()}' \
    --col.area.cell '${area.toLocaleString()}'
