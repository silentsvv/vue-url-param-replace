# Vue不刷新改变路由参数

## Install
```shell
npm install vue-url-param-replace -S
```


## Quick Start
``` javascript
import Vue from 'vue'
import Element from 'vue-url-param-replace'

Vue.use(urlParam)
```

## Usage

``` javascript
    // 设置路由参数
    // 可以传对象 {a:1, c: [1,2]}和字符串 '?a=1 & c=2'
    // this.$setUrlParam(data, options) => options: { encode: false } // encode: 是否对参数encodeURIComponent加密
    this.$setUrlParam({a: 1, b:2, c: [1,2,3], d: {a:12}})


    // 读取路由参数
    let result = this.$getUrlParam();
    console.log('result: ', result); // result: {a: 1, b:2, c: [1,2,3], d: {a:12}}
```