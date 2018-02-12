/**
 * mini-xhr Promise wrap
 * @param url
 * @param method
 * @param mode Default: xhr (xhr | jsonp | script)
 * @param dataType Default: '' ('json' | '')
 * @param data
 * @param timeout
 * @param timeoutCB
 * @returns {Promise}
 */
export default (url, {
  method = 'GET',
  mode = 'xhr',
  dataType = '',
  data = {},
  timeout = 0,
  ontimeoutCB: timeoutCB = null,
}) => {

  return new Promise((resolve, reject) => {

    // set data string
    let sData = '';

    for (let key in data) {
      let prefix = '';

      if (sData) {
        // not first key
        prefix = '&';
      }
      sData += prefix + key + '=' + data[key];
    }

    if (mode === 'xhr') {
      // mode: xhr
      let
        xhr = new XMLHttpRequest()
      ;

      xhr.open(method, url, true);
      xhr.onreadystatechange = handler;
      xhr.timeout = timeout;                          // 0：unlimit

      if (timeoutCB) {
        xhr.ontimeout = timeoutCB;
      }

      // set request header
      if (dataType === 'json') {
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
      } else {
        xhr.setRequestHeader("Accept", "*/*");
      }

      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

      xhr.send(sData);

      function handler() {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status >= 200 && this.status < 400) {
          console.log(this.response);
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      }
    } else {
      // mode: 'script' | 'jsonp'

      let
        oHead = document.querySelector('head')
        , oScript = document.createElement('script')
      ;

      oScript.src = url;

      //set oScript.type
      oScript.type = 'text/javascript';

      if (mode === 'script') {
        // set oScript.src
        if(sData) {
          oScript.src += '?' + sData;
        }

        let
          // callback resolve
          scriptCallback = e => {
            // clean oScript
            oHead.removeChild(oScript);
            clearTimeout(oScript.timer);

            resolve(e);
          };

        // callback
        oScript.addEventListener('load', scriptCallback, false);

        // timeout handle
        if (timeout) {
          oScript.timer = setTimeout(() => {
            // clean oScript
            oScript.removeEventListener('load', scriptCallback, false);
            oHead.removeChild(oScript);

            // reject err
            reject(new Error('timeout'));
          }, timeout);
        }

      }
      else if (mode === 'jsonp') {
        let
          callbackName = ('jsonp_' + Math.random()).replace(".", "")
        ;

        // jsonp callback function
        window[callbackName] = (json) => {
          console.log(json);

          // clean oScript
          oHead.removeChild(oScript);
          clearTimeout(oScript.timer);
          window[callbackName] = null;

          // resolve
          resolve(json);
        };

        // set oScript.src
        if(sData) {
          oScript.src += '?' + sData + '&callback=' + callbackName;
        } else {
          oScript.src += '?callback=' + callbackName;
        }

        // timeout handle
        if (timeout) {
          oScript.timer = setTimeout(() => {
            // clean oScript
            oHead.removeChild(oScript);
            window[callbackName] = null;

            // reject err
            reject(new Error('timeout'));
          }, timeout);
        }
      }

      // send
      oHead.appendChild(oScript);
    }
  });
};