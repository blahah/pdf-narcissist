var program = require('commander')
var pdf_narcissist = require('.')
var exists = require('path-exists').sync

function checkFile (file, name) {
  if (!file) {
    console.log('ERROR: you must provide an', name)
    process.exit(1)
  } else if (/^input/.test(name) && !exists(file)) {
    console.log('ERROR:', name, "file doesn't exist at path", file)
    process.exit(1)
  }
}

program
  .version(require('./package.json').version)

program
  .command('encode <pdf> <png>')
  .description('encode a PDF into a PNG thumbnail of itself')
  .action(function (pdf, png) {
    checkFile(pdf, 'input pdf')
    checkFile(png, 'output png')
    pdf_narcissist.encode(pdf, png)
  })

program
  .command('decode <png> <pdf>')
  .description('extract a PDF from a PNG')
  .action(function (png, pdf) {
    checkFile(png, 'input png')
    checkFile(pdf, 'output pdf')
    pdf_narcissist.decode(png, pdf)
  })

program
  .parse(process.argv)
