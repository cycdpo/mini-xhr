# mini-xhr

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![npm download][download-image]][download-url]
[![jsdelivr][jsdelivr-image]][jsdelivr-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/mini-xhr.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mini-xhr
[travis-image]: https://img.shields.io/travis/cycdpo/mini-xhr.svg?style=flat-square
[travis-url]: https://travis-ci.org/cycdpo/mini-xhr
[david-image]: https://img.shields.io/david/cycdpo/mini-xhr.svg?style=flat-square
[david-url]: https://david-dm.org/cycdpo/mini-xhr
[david-dev-image]: https://david-dm.org/cycdpo/mini-xhr/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycdpo/mini-xhr?type=dev
[download-image]: https://img.shields.io/npm/dm/mini-xhr.svg?style=flat-square
[download-url]: https://npmjs.org/package/mini-xhr
[jsdelivr-image]: https://data.jsdelivr.com/v1/package/npm/mini-xhr/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/mini-xhr
[license-image]: https://img.shields.io/npm/l/mini-xhr.svg?style=flat-square

## Install
```shell
# via npm
$ npm install mini-xhr --save

# or via yarn
$ yarn add mini-xhr
```

## Usage
```javascript
import miniXhr from 'mini-xhr';

# OR
const miniXhr = require('mini-xhr');

miniXhr.get(url [, settings])
  .then((data) => {
    // handle data
  });
```

### miniXhr supports the following methods:
#### `miniXhr.get(url, [, settings])`
* `url`: [String] A string containing the URL to which the request is sent.
* settings:
  * `data`: [Object] The key-value pair that needs to be transmitted. Default `{}`.
  * `dataType`: [String] Request data type. Default `'json'`.
  * `contentType`: [String] Setting content type. Default `'application/x-www-form-urlencoded; charset=UTF-8'`.
  * `timeout`: [Number] Set a timeout for the request. A value of 0 means there will be no timeout. Default `0`.
  * `timeoutCB`: [Function] Set the time-out callback function. Default `null`.
  
#### `miniXhr.post(url, [, settings])`
* `url`: [String] A string containing the URL to which the request is sent.
* settings:
  * `data`: [Object] The key-value pair that needs to be transmitted. Default `{}`.
  * `dataType`: [String] Request data type. Default `'json'`.
  * `contentType`: [String] Setting content type. Default `'application/x-www-form-urlencoded; charset=UTF-8'`.
  * `timeout`: [Number] Set a timeout for the request. A value of 0 means there will be no timeout. Default `0`.
  * `timeoutCB`: [Function] Set the time-out callback function. Default `null`.

#### `miniXhr.script(url, [, settings])`
* `url`: [String] A string containing the URL to which the request is sent.
* settings:
  * `data`: [Object] The key-value pair that needs to be transmitted. Default `{}`.
  * `timeout`: [Number] Set a timeout for the request. A value of 0 means there will be no timeout. Default `0`.

#### `miniXhr.jsonp(url, [, settings])`
* `url`: [String] A string containing the URL to which the request is sent.
* settings:
  * `data`: [Object] The key-value pair that needs to be transmitted. Default `{}`.
  * `timeout`: [Number] Set a timeout for the request. A value of 0 means there will be no timeout. Default `0`.

### Use in browser: E.g.
```html
<script src="mini-xhr.min.js"></script>
<script>
  miniXhr.jsonp('/getData' , {
    data: {
      key1: 'value1',
      key2: 'value2',
    }
  })
    .then(function(data) {
      // data handle
    });
</script>
```

## CDN
To use via a CDN include this in your html:
```text
<script src="https://cdn.jsdelivr.net/npm/mini-xhr@1/build/mini-xhr.min.js"></script>
```

