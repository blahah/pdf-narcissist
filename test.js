var fs = require('fs')
var md5 = require('md5')
var test = require('tape')
var narcissist = require('.')

test('compression-decompression', function (t) {
  var pdf_in = './assets/stega.pdf'
  var png = './assets/stega.png'
  var pdf_out = './assets/stega_dc.pdf'

  narcissist.encode(pdf_in, png, function () {
    narcissist.decode(png, pdf_out, function () {
      var buf_in = fs.readFileSync(pdf_in)
      var buf_out = fs.readFileSync(pdf_out)

      t.ok(md5(buf_in) === md5(buf_out), 'decoded file matches original')
      fs.unlinkSync(png)
      fs.unlinkSync(pdf_out)

      t.end()
    })
  })
})
