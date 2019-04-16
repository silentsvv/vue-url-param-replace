// import Vue from 'vue';
export default {
  install: function (Vue, options) {
    // 3. 注入组件
    let self  = null;
  Vue.mixin({
    created: function () {
      // 逻辑...
      self = this;
    }
  })
  Vue.prototype.$setUrlParam = function (data, options = {}) {
    let param = '';
    let listen = [];

    if (options.listen) {
      for (let i in options.listen) {
        listen.push(options.listen[i]);
      }
    }

    if (location.search) {
      data = Object.assign(Vue.prototype.$getUrlParam(location.search), data)
    }

    if (typeof data === 'object') {
      for (let i in data) {
        if (data.hasOwnProperty(i)) {
          let value = typeof data[i] == 'undefined'? '' : data[i];
          if (param) {
            param += `&${i}=${JSON.stringify(value)}`
          } else {
            param += `${i}=${JSON.stringify(value)}`
          }
        }
      }
    } else if(typeof data === 'string') {
      param = data
    }

    for (let i in listen) {
      let key = listen[i];
      let value = self.$data[key];
      if (value) {
        if (param) {
          param += `&${key}=${JSON.stringify(value)}`
        } else {
          param += `${key}=${JSON.stringify(value)}`
        }
      }
    }

    if (options.encode) {
      param = encodeURIComponent(param);
    }

    window.history.replaceState('', '', '?' + param);
  }

  Vue.prototype.$getUrlParam = function () {
    if (location.search) {
      let params = getUrlVars(location.search);
      let data = {};
      for (let i in params) {
        data[i] = JSON.parse(params[i])
      }
      return data;
    } else {
      return {}
    }
  }
}
}

function getUrlVars() {
  var vars = {};
  decodeURIComponent(window.location.href).replace(/[?&]+([^=&]+)=([^&]*)/gi,    
  function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}