const minimist = require('minimist')

const HELP = `
Usage: html-table

  -o, --open   write to a temp file and open in browser
  -h, --help   view help
`.trim()

const parseArgv = (argv) =>
  minimist(argv, {
    alias: {
      o: 'open',
      h: 'help'
    },
    boolean: ['open']
  })

module.exports = { parseArgv, HELP }
