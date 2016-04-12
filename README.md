## pdf-narcissist

Hide a PDF inside a thumbnail of its own first page.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### How it works

`pdf-narcissist` creates a high definition image of the first page of a PDF using [pdf-to-png](https://github.com/freeman-lab/pdf-to-png). Then it compressess the original PDF with bzip2 (using [compressjs](https://github.com/cscott/compressjs)), and stores the base64 representation of the compressed PDF in the least significant bits of the image using [lsb](https://github.com/hughsk/lsb).

### Usage

#### Command-line

```
$ pdf-narcissist --help

Usage: pdf-narcissist [options] [command]


Commands:

  encode <pdf> <png>  encode a PDF into a PNG thumbnail of itself
  decode <png> <pdf>  extract a PDF from a PNG

Options:

  -h, --help     output usage information
  -V, --version  output the version number

```

```bash
pdf-narcissist encode in.pdf encoded.png
```

```bash
pdf-narcissist decode encoded.png out.pdf
```

#### Library

```js
var narcissist = require('pdf-narcissist')

narcissist.encode('in.pdf', 'encoded.png', function(err) {
  // done
})

narcissist.decode('encoded.png', 'out.pdf', function(err) {
  // done
})
```

### Installation

For CLI use

```bash
npm install --global pdf-narcissist
```

For library use

```bash
npm install --save pdf-narcissist
```
