class MiniXhr {
  constructor() {
  };

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
  get(url, {
    dataType = 'json',
    data = {},
    contentType,
    timeout = 0,
    ontimeoutCB = null,
  } = {}) {
    return Promise.resolve()
      .then(() => new Promise((resolve, reject) => {
        _XMLHttpRequest({
          method: 'GET',
          url,
          dataType,
          contentType,
          data: _dataStringMakeUp(data),
          timeout,
          ontimeoutCB,
          success: (res) => resolve(res),
          fail: (err) => reject(err),
        });
      }));
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
  post(url, {
    dataType = 'json',
    data = {},
    contentType,
    timeout = 0,
    ontimeoutCB = null,
  } = {}) {
    return Promise.resolve()
      .then(() => new Promise((resolve, reject) => {
        _XMLHttpRequest({
          method: 'POST',
          url,
          dataType,
          data: _dataStringMakeUp(data),
          contentType,
          timeout,
          ontimeoutCB,
          success: (res) => resolve(res),
          fail: (err) => reject(err),
        });
      }));
  };

  /**
   * script
   * @param url
   * @param data
   * @param timeout
   * @returns {Promise<any | never>}
   */
  script(url, {
    data = {},
    timeout = 0,
  } = {}) {
    return Promise.resolve()
      .then(() => new Promise((resolve, reject) => {
        const oHead = document.querySelector('head');
        const oScript = document.createElement('script');
        const sData = _dataStringMakeUp(data);

        oScript.src = url;
        oScript.type = 'text/javascript';

        if (sData) {
          oScript.src += '?' + sData;
        }

        const scriptCallback = e => {
          // clean oScript
          oHead.removeChild(oScript);
          clearTimeout(oScript.timer);
          resolve(e);
        };

        oScript.addEventListener('load', scriptCallback, false);

        // timeout handle
        if (timeout) {
          oScript.timer = setTimeout(() => {
            oScript.removeEventListener('load', scriptCallback, false);
            oHead.removeChild(oScript);

            reject(new Error('timeout'));
          }, timeout);
        }

        // send
        oHead.appendChild(oScript);
      }));
  };

  /**
   * jsonp
   * @param url
   * @param data
   * @param timeout
   * @returns {Promise<any | never>}
   */
  jsonp(url, {
    data = {},
    timeout = 0,
  } = {}) {
    const _jsonpNameSpace = _getGlobal();
    return Promise.resolve()
      .then(() => new Promise((resolve, reject) => {
        const oHead = document.querySelector('head');
        const oScript = document.createElement('script');
        const sData = _dataStringMakeUp(data);

        oScript.src = url;
        oScript.type = 'text/javascript';

        const callbackName = ('jsonp_' + Math.random()).replace('.', "");

        // jsonp callback function
        _jsonpNameSpace[callbackName] = (json) => {
          // clean oScript
          oHead.removeChild(oScript);
          clearTimeout(oScript.timer);
          _jsonpNameSpace[callbackName] = null;

          // resolve
          resolve(json);
        };

        // set oScript.src
        if (sData) {
          oScript.src += '?' + sData + '&callback=' + callbackName;
        } else {
          oScript.src += '?callback=' + callbackName;
        }

        // timeout handle
        if (timeout) {
          oScript.timer = setTimeout(() => {
            // clean oScript
            oHead.removeChild(oScript);
            _jsonpNameSpace[callbackName] = null;

            // reject err
            reject(new Error('timeout'));
          }, timeout);
        }

        // send
        oHead.appendChild(oScript);
      }));
  };
}

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
const _XMLHttpRequest = ({
                           method = 'GET',
                           url,
                           timeout = 0,
                           ontimeoutCB = null,
                           dataType = 'json',
                           data,
                           contentType = 'application/x-www-form-urlencoded; charset=UTF-8',
                           success = (res) => {
                           },
                           fail = (err) => {
                           },
                         }) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.onreadystatechange = () => {
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
const _dataStringMakeUp = (data = {}) => {
  // set data string
  let sData = '';

  for (let key in data) {
    let prefix = '';

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
const _getGlobal = () => typeof window === 'undefined'
  ? global
  : window;

export default new MiniXhr();

