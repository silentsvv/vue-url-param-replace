// import Vue from 'vue';
export default function (Vue, options) {
  Vue.prototype.$setUrlParam = function (data, options = {}) {
    let param = '';

    if (location.search) {
      data = Object.assign(Vue.prototype.$getUrlParam(location.search), data)
    }

    if (typeof data === 'object') {
      for (let i in data) {
        if (data.hasOwnProperty(i)) {
          if (param) {
            param += `&${i}=${JSON.stringify(data[i])}`
          } else {
            param += `${i}=${JSON.stringify(data[i])}`
          }
        }
      }
    } else if(typeof data === 'string') {
      param = data
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

function getUrlVars() {
  var vars = {};
  decodeURIComponent(window.location.href).replace(/[?&]+([^=&]+)=([^&]*)/gi,    
  function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}