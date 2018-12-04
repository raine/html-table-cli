const minimist = require('minimist')

const HELP = `
Usage: html-table

  -o, --open           write to a temp file and open in browser
  -h, --help           view help

  --col.<key>.header   set how header for a column is rendered
  --col.<key>.title    set how cell for a column is rendered
  --cols               comma-separated list of keys to be shown as columns

  Where <key> is name of a key that appears in the provided list of objects
`.trim()

const parseArgv = (argv) => {
  const parsed = minimist(argv, {
    alias: {
      o: 'open',
      h: 'help'
    },
    string: ['cols'],
    boolean: ['open']
  })

  if (parsed.cols) parsed.cols = parsed.cols.split(',')
  return parsed
}

module.exports = { parseArgv, HELP }
