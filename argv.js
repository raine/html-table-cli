const minimist = require('minimist')

const HELP = `
Usage: html-table [options]

  Render JSON as an interactive table to be viewed in a web browser.
  By default, reads JSON from stdin and renders HTML to stdout.

  -o, --open           write to a temp file and open in browser
  -h, --help           view help

  Customization:

  --col.$key.width    set width of a column
  --col.$key.header   set how header for a column is rendered
  --col.$key.title    set how cell for a column is rendered
  --col.$key.parse    function to apply to values of specific column
  --cols              comma-separated list of keys to be shown as columns
  --generated         render a generated-at timestamp at the bottom

  Where $key is name of a key that appears in the provided list of objects.

  Examples:

  curl -sL https://bit.do/people-json | html-table -o
  cat data.json | html-table > my-data.html

`.trim()

const parseArgv = (argv) => {
  const parsed = minimist(argv, {
    alias: {
      o: 'open',
      h: 'help'
    },
    string: ['cols'],
    boolean: ['open', 'generated'],
    default: { generated: false }
  })

  if (parsed.cols) parsed.cols = parsed.cols.split(',')
  parsed.col = parsed.col || {}
  return parsed
}

module.exports = { parseArgv, HELP }
