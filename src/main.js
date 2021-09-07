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

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    console.log(config);
    // 添加header头的token
    let token = window.sessionStorage.getItem("token");
    if (config.token === true) {
      config.headers["token"] = token;
    }
    // 在发送请求之前做些什么
    return config;
  },
  (err) => {
    // 对请求错误做些什么
    return Promise.reject(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    console.log("响应拦截器 成功");
    // 对响应数据做点什么
    return response;
  },
  (err) => {
    // 全局错误提示
    if (err.response && err.response.data && err.response.data.errorCode) {
      Message.error(err.response.data.msg);
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 引入全局配置文件
Vue.prototype.$conf = $conf;

// 使用拖拽插件
Vue.use(VueDND);

Vue.config.productionTip = false;

// createAPP(App)
//   .use(router)
//   .use(store)
//   .mount("#app");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
