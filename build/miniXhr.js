/*!
 * mini-xhr v0.1.3
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
/**
 * mini-xhr Promise wrap
 * @param url
 * @param method
 * @param mode Default: xhr (xhr | jsonp | script)
 * @param dataType Default: '' ('json' | '')
 * @param data
 * @param timeout
 * @param ontimeoutCB
 * @returns {Promise}
 */
/* harmony default export */ __webpack_exports__["default"] = (function (url, _ref) {
  var _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'xhr' : _ref$mode,
      _ref$dataType = _ref.dataType,
      dataType = _ref$dataType === void 0 ? '' : _ref$dataType,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 0 : _ref$timeout,
      _ref$ontimeoutCB = _ref.ontimeoutCB,
      ontimeoutCB = _ref$ontimeoutCB === void 0 ? null : _ref$ontimeoutCB;
  return new Promise(function (resolve, reject) {
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

    if (mode === 'xhr') {
      var handler = function handler() {
        if (this.readyState !== 4) {
          return;
        }

        if (this.status >= 200 && this.status < 400) {
          console.log(this.response);
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };

      // mode: xhr
      var xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onreadystatechange = handler;
      xhr.timeout = timeout; // 0：unlimit

      if (ontimeoutCB) {
        xhr.ontimeout = ontimeoutCB;
      } // set request header


      if (dataType === 'json') {
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
      } else {
        xhr.setRequestHeader("Accept", "*/*");
      }

      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
      xhr.send(sData);
    } else {
      // mode: 'script' | 'jsonp'
      var oHead = document.querySelector('head'),
          oScript = document.createElement('script');
      oScript.src = url; //set oScript.type

      oScript.type = 'text/javascript';

      if (mode === 'script') {
        // set oScript.src
        if (sData) {
          oScript.src += '?' + sData;
        }

        var // callback resolve
        scriptCallback = function scriptCallback(e) {
          // clean oScript
          oHead.removeChild(oScript);
          clearTimeout(oScript.timer);
          resolve(e);
        }; // callback


        oScript.addEventListener('load', scriptCallback, false); // timeout handle

        if (timeout) {
          oScript.timer = setTimeout(function () {
            // clean oScript
            oScript.removeEventListener('load', scriptCallback, false);
            oHead.removeChild(oScript); // reject err

            reject(new Error('timeout'));
          }, timeout);
        }
      } else if (mode === 'jsonp') {
        var callbackName = ('jsonp_' + Math.random()).replace(".", ""); // jsonp callback function

        window[callbackName] = function (json) {
          console.log(json); // clean oScript

          oHead.removeChild(oScript);
          clearTimeout(oScript.timer);
          window[callbackName] = null; // resolve

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
            window[callbackName] = null; // reject err

            reject(new Error('timeout'));
          }, timeout);
        }
      } // send


      oHead.appendChild(oScript);
    }
  });
});

/***/ })
/******/ ])["default"];
});