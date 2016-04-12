var fs = require('fs')
var PNG = require('png-coder').PNG
var lsb = require('lsb')
var tempfile = require('tempfile')
var compression = require('compressjs').Bzip2

// Encode image data - ignoring the alpha channel
// as it would interfere with the RGB channels
function rgb (n) {
  return n + (n / 3) | 0
}

function pdf_to_base64 (pdf_file) {
  var bits = compression.compressFile(fs.readFileSync(pdf_file))
  return new Buffer(bits).toString('base64')
}

function base64_to_pdf (string, pdf_out) {
  var buf = new Buffer(string, 'base64')
  fs.writeFileSync(pdf_out, new Buffer(compression.decompressFile(buf)))
}

function encode (pdf_in, png_out, cb) {
  var temp_png = tempfile('.png')

  require('pdf-to-png')({
    input: pdf_in,
    output: temp_png,
    scale: 4.5
  }, stash)

  function stash () {
    var stegotext = pdf_to_base64(pdf_in)

    var png = new PNG()
    var src = fs.createReadStream(temp_png)
    var dst = fs.createWriteStream(png_out)

    dst.on('finish', cb)

    png.on('parsed', function (data) {
      lsb.encode(data, stegotext, rgb)
      png.pack().pipe(dst)
    })

    src.pipe(png)
  }
}

function decode (png_in, pdf_out, cb) {
  var png = new PNG()
  var src = fs.createReadStream(png_in)

  png.on('parsed', function (data) {
    var stegotext = lsb.decode(data, rgb)
    base64_to_pdf(stegotext, pdf_out)
    cb()
  })

  src.pipe(png)
}

module.exports = {
  encode: encode,
  decode: decode
}
