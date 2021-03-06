const JSONStream = require('JSONStream')
const fs = require('fs')
const cheerio = require('cheerio')
const util = require('util')
const path = require('path')
const tempy = require('tempy')
const opn = require('opn')
const { parseArgv, HELP } = require('./argv')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const readStdinJSON = () =>
  new Promise((res, rej) => {
    let stdinData
    process.stdin
      .pipe(JSONStream.parse())
      .on('data', (data) => {
        stdinData = data
      })
      .on('end', () => {
        res(stdinData)
      })
      .on('error', (err) => {
        console.error(err)
        console.error('The input was not valid JSON')
        process.exitCode = 1
        rej(err)
      })
  })

const generateHTML = (opts) =>
  Promise.all([
    readFile(path.join(__dirname, 'app-dist', 'index.html'), 'utf8'),
    readStdinJSON()
  ]).then(([html, data]) => {
    const doc = cheerio.load(html)
    doc('head').append(`
    <script type="text/javascript" charset="utf-8">
      window.HTML_TABLE_DATA = ${JSON.stringify(data).replace(/</g, '\\x3c')};
      window.HTML_TABLE_OPTS = ${JSON.stringify(opts).replace(/</g, '\\x3c')};
    </script>`)
    return doc.html()
  })

const main = async () => {
  const argv = parseArgv(process.argv.slice(2))

  if (argv.help) {
    console.error(HELP)
    process.exitCode = 1
    return
  }

  const html = await generateHTML({ ...argv, timestamp: new Date() })
  if (argv.open) {
    const tmpFile = tempy.file({ extension: 'html' })
    await writeFile(tmpFile, html, 'utf8')
    opn(tmpFile, { wait: false })
  } else {
    process.stdout.write(html)
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
