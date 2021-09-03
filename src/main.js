import Vue from "vue";
import './plugins/axios'
// import { createAPP } from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import store from "./store";
import $conf from "common/config/config";
import VueDND from "awe-dnd";

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
