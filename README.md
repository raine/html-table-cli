# html-table-cli

<a href="https://raine.github.io/html-table-cli/github-trending.html">
  <img align="right" width="240" src="https://raine.github.io/html-table-cli/github-trending_thumb.png"/>
</a>

Create interactive tables from JSON on the command-line.

## key features

- takes JSON via stdin, writes a standalone HTML file to stdout
- alternatively, view instantly in browser with `--open`
- customize column-specific rendering through arguments
- uses [`react-table`](https://react-table.js.org/)

## install

```sh
npm install -g html-table-cli
```

## usage

```sh
cat data.json | html-table
```

## options

```
Usage: html-table [options]

  Render JSON as an interactive table to be viewed in a web browser.
  By default, reads JSON from stdin and renders HTML to stdout.

  Expected structure of input is [ object, object, ... ], where each object is
  of the same shape.

  -o, --open             write to a temp file and open in browser
  -h, --help             view help

  Customization:

  --col.$key.width       set width of a column
  --col.$key.header      set how header for a column is rendered
  --col.$key.cell        set how cell for a column is rendered
  --col.$key.parse       function to apply to values of specific column
  --col.$key.filterable  make column filterable
  --cols                 comma-separated list of keys to be shown as columns
  --generated-at         show a timestamp of page generation at bottom
  --[no-]pagination      enable & disable pagination

  Where $key is name of a key that appears in the provided list of objects.
```

## examples

The examples below use `npx` that comes with npm to install `html-table-cli` on
demand, hence no installation is necessary to run them.

### trending repositories on github

```sh
curl -s https://github-trending-api.now.sh/repositories\?since=weekly |\
  npx html-table-cli -o --generated-at \
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
```
https://raine.github.io/html-table-cli/github-trending.html

<img src="https://raine.github.io/html-table-cli/github-trending.png"/>

### countries

```sh
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
```

https://raine.github.io/html-table-cli/countries.html

<img src="https://raine.github.io/html-table-cli/countries.png"/>

## other notes

Goes well with [`ramda-cli`](https://github.com/raine/ramda-cli). Manipulate the
JSON before passing to `html-table-cli` or use to convert a csv file to json.

e.g. `cat mydata.csv | ramda -i csv identity | html-table`
