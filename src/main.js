import Vue from "vue";
import "./plugins/axios";
// import { createAPP } from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import store from "./store";
import $conf from "common/config/config";
import VueDND from "awe-dnd";
// import axios from "axios";

import { Message } from "element-ui";

let loading = null;
let requesrtCount = 0;
// 显示loading
function showLoading() {
  if (requesrtCount === 0) {
    loading = Message({
      message: "加载中...",
      duration: 0,
    });
  }
  requesrtCount++;
}
// 隐藏loading
function hideLoading() {
  if (requesrtCount > 0) {
    requesrtCount--;
  }
  if (loading && requesrtCount === 0) {
    loading.close();
  }
}

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // console.log(111, config);
    // 添加header头的token
    let token = window.sessionStorage.getItem("token");
    if (config.token === true) {
      config.headers["token"] = token;
    }

    if (config.loading === true) {
      // 显示loading
      showLoading();
    }

    return config;
  },
  (err) => {
    // 隐藏loading
    hideLoading();
    return Promise.reject(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // console.log("响应拦截");
    // 隐藏loading
    hideLoading();
    return response;
  },
  (err) => {
    // 全局错误提示
    if (err.response && err.response.data && err.response.data.errorCode) {
      Message.error(err.response.data.msg);
    }
    // 隐藏loading
    hideLoading();
    return Promise.reject(err);
  }
);

// 引入全局配置文件
Vue.prototype.$conf = $conf;

// 使用拖拽插件
Vue.use(VueDND);

// 自定义添加节点
Vue.directive("auth", {
  inserted(el, binding, vnode) {
    let user = window.sessionStorage.getItem("user");
    user = user ? JSON.parse(user) : {};
    if (!user.super) {
      let rules = user.ruleNames ? user.ruleNames : [];
      let v = rules.find((item) => item === binding.value);
      if (!v) {
        el.parentNode.removeChild(el);
      }
    }
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
