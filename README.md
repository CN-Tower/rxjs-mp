# rxjs-mp

> Rxjs for miniprogram. 在小程序中使用RxJs。

### 1. 安装: 
`npm install --save rxjs-mp`<br>
`npm install --save-dev rxjs`<br>
安装完成后使用小程序开发者工具构建npm。

### 2. 使用:
```js
const Rx = require('rxjs-mp');

// ====================================================================
// 使用Rxjs封装请求(urils/http.js)
// ====================================================================
/**
 * Request method
 * @param {string} url 
 * @param {any} data 
 * @param {'GET'|'POST'|'PUT'|'DELETE'} method
 * @param {{header?: object}} options 
 */
function request(url, data = {}, method = "GET", { header }={}) {
  return new Rx.Observable(ob => {
    const requestTask = wx.request({
      url, data, method,
      header: {
        ...(header || {})
        'Token': wx.getStorageSync('token')
      },
      success: res => {
        if (res.statusCode == 200) {
          ob.next(res);
          ob.complete();
        } else {
          ob.error(res);
        }
      },
      fail: err => {
        console.error(err);
        ob.error(err);
      }
    });
    return () => requestTask.abort();
  });
}

/**
 * GET method
 * @param {string} url 
 * @param {{header?: object}} options 
 */
function get(url, options) {
  return request(url, null, 'GET', options);
}

/**
 * POST method
 * @param {string} url 
 * @param {any} data 
 * @param {{header?: object}} options 
 */
function post(url, data, options) {
  return request(url, data, 'POST', options);
}

/**
 * PUT method
 * @param {string} url 
 * @param {any} data 
 * @param {{header?: object}} options 
 */
function put(url, data, options) {
  return request(url, data, 'PUT', options);
}

/**
 * GET method
 * @param {string} url 
 * @param {{header?: object}} options 
 */
function delete_(url, options) {
  return request(url, null, 'DELETE', options);
}

module.exports = {
  http: { get, post, put, delete: delete_, request }
}

// ====================================================================
// 调用请求(some-page.js)
// ====================================================================
const http = require('../uitls/http.js');

const sub = http.get('htts://some-api-url').pipe(
  Rx.operators.map(res => res && res.data || {})
).subscribe(res => {
  console.log(res);
}, err => {
  console.error(err);
});

// ====================================================================
// 取消请求(some-page.js)
// ====================================================================
setTimeout(() => {
  sub.unsubscribe();
}, 1000);
```