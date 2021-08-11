import Vue from "vue";
import Router from "vue-router";
import routes from "@/common/config/routes";
// import getRoutes from "../common/config/routes";

// const Layout = () => import("@/views/Layout.vue");
// const Login = () => import("@/views/login/Login.vue");

Vue.use(Router);

// const routes = getRoutes();
const router = new Router({
  routes,
  mode: "history",
});

export default router;
