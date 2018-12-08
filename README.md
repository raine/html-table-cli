# html-table-cli

Create interactive tables from JSON on the command-line. Generates a standalone
HTML file. Uses [`react-table`](https://react-table.js.org/).

## options

```
Usage: html-table [options]

  Render JSON as an interactive table to be viewed in a web browser.
  By default, reads JSON from stdin and renders HTML to stdout.

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
