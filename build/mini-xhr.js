/*!
 * mini-xhr v1.0.0
 * Homepage: https://github.com/cycdpo/mini-xhr#readme
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["miniXhr"] = factory();
	else
		root["miniXhr"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {var MiniXhr =
/*#__PURE__*/
function () {
  function MiniXhr() {}

  var _proto = MiniXhr.prototype;

  /**
   * get
   * @param url
   * @param dataType
   * @param data
   * @param contentType
   * @param timeout
   * @param ontimeoutCB
   * @returns {Promise<any | never>}
   */
  _proto.get = function get(url, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$dataType = _ref.dataType,
        dataType = _ref$dataType === void 0 ? 'json' : _ref$dataType,
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data,
        contentType = _ref.contentType,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? 0 : _ref$timeout,
        _ref$ontimeoutCB = _ref.ontimeoutCB,
        ontimeoutCB = _ref$ontimeoutCB === void 0 ? null : _ref$ontimeoutCB;

    return Promise.resolve().then(function () {
      return new Promise(function (resolve, reject) {
        _XMLHttpRequest({
          method: 'GET',
          url: url,
          dataType: dataType,
          contentType: contentType,
          data: _dataStringMakeUp(data),
          timeout: timeout,
          ontimeoutCB: ontimeoutCB,
          success: function success(res) {
            return resolve(res);
          },
          fail: function fail(err) {
            return reject(err);
          }
        });
      });
    });
  };

  /**
   * post
   * @param url
   * @param dataType
   * @param data
   * @param contentType
   * @param timeout
   * @param ontimeoutCB
   * @returns {Promise<any | never>}
   */
  _proto.post = function post(url, _temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$dataType = _ref2.dataType,
        dataType = _ref2$dataType === void 0 ? 'json' : _ref2$dataType,
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? {} : _ref2$data,
        contentType = _ref2.contentType,
        _ref2$timeout = _ref2.timeout,
        timeout = _ref2$timeout === void 0 ? 0 : _ref2$timeout,
        _ref2$ontimeoutCB = _ref2.ontimeoutCB,
        ontimeoutCB = _ref2$ontimeoutCB === void 0 ? null : _ref2$ontimeoutCB;

    return Promise.resolve().then(function () {
      return new Promise(function (resolve, reject) {
        _XMLHttpRequest({
          method: 'POST',
          url: url,
          dataType: dataType,
          data: _dataStringMakeUp(data),
          contentType: contentType,
          timeout: timeout,
          ontimeoutCB: ontimeoutCB,
          success: function success(res) {
            return resolve(res);
          },
          fail: function fail(err) {
            return reject(err);
          }
        });
      });
    });
  };

  /**
   * script
   * @param url
   * @param data
   * @param timeout
   * @returns {Promise<any | never>}
   */
  _proto.script = function script(url, _temp3) {
    var _ref3 = _temp3 === void 0 ? {} : _temp3,
        _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? {} : _ref3$data,
        _ref3$timeout = _ref3.timeout,
        timeout = _ref3$timeout === void 0 ? 0 : _ref3$timeout;

    return Promise.resolve().then(function () {
      return new Promise(function (resolve, reject) {
        var oHead = document.querySelector('head');
        var oScript = document.createElement('script');

        var sData = _dataStringMakeUp(data);

        oScript.src = url;
        oScript.type = 'text/javascript';

        if (sData) {
          oScript.src += '?' + sData;
        }

        var scriptCallback = function scriptCallback(e) {
          // clean oScript
          oHead.removeChild(oScript);
          clearTimeout(oScript.timer);
          resolve(e);
        };

        oScript.addEventListener('load', scriptCallback, false); // timeout handle

        if (timeout) {
          oScript.timer = setTimeout(function () {
            oScript.removeEventListener('load', scriptCallback, false);
            oHead.removeChild(oScript);
            reject(new Error('timeout'));
          }, timeout);
        } // send


        oHead.appendChild(oScript);
      });
    });
  };

  /**
   * jsonp
   * @param url
   * @param data
   * @param timeout
   * @returns {Promise<any | never>}
   */
  _proto.jsonp = function jsonp(url, _temp4) {
    var _ref4 = _temp4 === void 0 ? {} : _temp4,
        _ref4$data = _ref4.data,
        data = _ref4$data === void 0 ? {} : _ref4$data,
        _ref4$timeout = _ref4.timeout,
        timeout = _ref4$timeout === void 0 ? 0 : _ref4$timeout;

    var _jsonpNameSpace = _getGlobal();

    return Promise.resolve().then(function () {
      return new Promise(function (resolve, reject) {
        var oHead = document.querySelector('head');
        var oScript = document.createElement('script');

        var sData = _dataStringMakeUp(data);

        oScript.src = url;
        oScript.type = 'text/javascript';
        var callbackName = ('jsonp_' + Math.random()).replace('.', ""); // jsonp callback function

        _jsonpNameSpace[callbackName] = function (json) {
          // clean oScript
          oHead.removeChild(oScript);
          clearTimeout(oScript.timer);
          _jsonpNameSpace[callbackName] = null; // resolve

          resolve(json);
        }; // set oScript.src


        if (sData) {
          oScript.src += '?' + sData + '&callback=' + callbackName;
        } else {
          oScript.src += '?callback=' + callbackName;
        } // timeout handle


        if (timeout) {
          oScript.timer = setTimeout(function () {
            // clean oScript
            oHead.removeChild(oScript);
            _jsonpNameSpace[callbackName] = null; // reject err

            reject(new Error('timeout'));
          }, timeout);
        } // send


        oHead.appendChild(oScript);
      });
    });
  };

  return MiniXhr;
}();
/**
 * XMLHttpRequest
 * @param method  default 'GET'
 * @param url
 * @param timeout
 * @param ontimeoutCB
 * @param dataType  default 'json'
 * @param data
 * @param contentType default 'application/x-www-form-urlencoded; charset=UTF-8'
 * @param success
 * @param fail
 * @returns {XMLHttpRequest}
 * @private
 */


var _XMLHttpRequest = function _XMLHttpRequest(_ref5) {
  var _ref5$method = _ref5.method,
      method = _ref5$method === void 0 ? 'GET' : _ref5$method,
      url = _ref5.url,
      _ref5$timeout = _ref5.timeout,
      timeout = _ref5$timeout === void 0 ? 0 : _ref5$timeout,
      _ref5$ontimeoutCB = _ref5.ontimeoutCB,
      ontimeoutCB = _ref5$ontimeoutCB === void 0 ? null : _ref5$ontimeoutCB,
      _ref5$dataType = _ref5.dataType,
      dataType = _ref5$dataType === void 0 ? 'json' : _ref5$dataType,
      data = _ref5.data,
      _ref5$contentType = _ref5.contentType,
      contentType = _ref5$contentType === void 0 ? 'application/x-www-form-urlencoded; charset=UTF-8' : _ref5$contentType,
      _ref5$success = _ref5.success,
      success = _ref5$success === void 0 ? function (res) {} : _ref5$success,
      _ref5$fail = _ref5.fail,
      fail = _ref5$fail === void 0 ? function (err) {} : _ref5$fail;
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) {
      return;
    }

    if (xhr.status >= 200 && xhr.status < 400) {
      success(xhr.response);
    } else {
      fail(new Error(xhr.statusText));
    }
  };

  xhr.timeout = timeout;

  if (ontimeoutCB) {
    xhr.ontimeout = ontimeoutCB;
  }

  switch (dataType) {
    case 'json':
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      break;

    default:
      xhr.setRequestHeader('Accept', '*/*');
  }

  xhr.setRequestHeader('Content-Type', contentType);
  xhr.send(data);
  return xhr;
};
/**
 * Data String Make Up
 * @param data
 * @returns {string}
 * @private
 */


var _dataStringMakeUp = function _dataStringMakeUp(data) {
  if (data === void 0) {
    data = {};
  }

  // set data string
  var sData = '';

  for (var key in data) {
    var prefix = '';

    if (sData) {
      // not first key
      prefix = '&';
    }

    if (data.hasOwnProperty(key)) {
      sData += prefix + key + '=' + data[key];
    }
  }

  return sData;
};
/**
 * get Global
 * @returns {any}
 * @private
 */


var _getGlobal = function _getGlobal() {
  return typeof window === 'undefined' ? global : window;
};

/* harmony default export */ __webpack_exports__["default"] = (new MiniXhr());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ])["default"];
});