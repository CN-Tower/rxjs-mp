# rxjs-mp

> Rxjs for miniprogram. 在小程序中使用RxJs。

### 1. 安装: 
`npm install rxjs-mp`;<br>

### 2. 使用:
```js
const Rx = require('rxjs-mp');

// 使用Rxjs封装请求
function request(url, data = {}, method = "GET") {
  return new Rx.Observable(ob => {
    const requestTask = wx.request({
      url, data, method,
      header: {
        'Token': wx.getStorageSync('token')
      },
      success: res => {
        if (res.statusCode == 200) {
          ob.next(res);
          ob.complete();
        } else {
          ob.error(res.msg);
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

// 发起请求
const sub = request('htts://some-api-url').pipe(
  Rx.operators.map(res => res && res.data || {})
).subscribe(res => {
  console.log(res);
}, err => {
  console.error(err);
});

// 超时取消请求
setTimeout(() => {
  sub.unsubscribe();
}, 1000);
```