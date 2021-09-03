// 把路由中的配置路径的属性写到这里。
/* 
  规则：
* 一，例如: index/index, shop/index 以index结尾的，path和name默认去除index
* 二，例如：shop/list, 默认生成name为shop_list（如果结尾为index，例如shop/index则默认生成name为shop）
* 三，手动配置后不会自动生成
*/
const Layout = () => import("@/views/Layout.vue");

const routes = [
  // 重定向路由
  {
    path: "*",
    redirect: { name: "index" },
  },
  {
    path: "/",
    name: "layout",
    redirect: { name: "index" },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "index",
        meta: { title: "后台首页" },
        component: () => import("views/index/Index.vue"),
        // component: "home/home",
      },
      {
        path: "shop/goods/list",
        name: "shop_goods_list",
        meta: { title: "商品列表" },
        component: () => import("views/shop/goods/List.vue"),
      },
      {
        path: "shop/goods/create",
        name: "shop_goods_create",
        meta: { title: "创建商品" },
        component: () => import("views/shop/goods/Create.vue"),
      },
      {
        path: "image/index",
        name: "image",
        meta: { title: "相册管理" },
        component: () => import("views/image/index.vue"),
      },
      {
        path: "shop/category/list",
        name: "shop_category_list",
        meta: { title: "分类管理" },
        component: () => import("views/shop/category/List.vue"),
      },
      {
        path: "shop/sku/list",
        name: "shop_sku_list",
        meta: { title: "商品规格管理" },
        component: () => import("views/shop/sku/List.vue"),
      },
      {
        path: "shop/type/list",
        name: "shop_type_list",
        meta: { title: "商品类型管理" },
        component: () => import("views/shop/type/List.vue"),
      },
      {
        path: "shop/comment/list",
        name: "shop_comment_list",
        meta: { title: "商品评论管理" },
        component: () => import("views/shop/comment/List.vue"),
      },
      {
        path: "order/invoice/list",
        name: "order_invoice_list",
        meta: { title: "发票管理" },
        component: () => import("views/order/invoice/List.vue"),
      },
      {
        path: "order/afterSale/list",
        name: "order_afterSale_list",
        meta: { title: "售后服务" },
        component: () => import("views/order/afterSale/List.vue"),
      },
      {
        path: "order/order/list",
        name: "order_order_list",
        meta: { title: "售后服务" },
        component: () => import("views/order/order/List.vue"),
      },
      {
        path: "user/userList/list",
        name: "user_userList_list",
        meta: { title: "会员管理" },
        component: () => import("views/user/userList/List.vue"),
      },
      {
        path: "user/userLevel/list",
        name: "user_userLevel_list",
        meta: { title: "会员等级" },
        component: () => import("views/user/userLevel/List.vue"),
      },
      {
        path: "set/base/index",
        name: "set_base",
        meta: { title: "基础设置" },
        component: () => import("views/set/base/Index.vue"),
      },
      {
        path: "set/express/index",
        name: "set_express",
        meta: { title: "物流设置" },
        component: () => import("views/set/express/Index.vue"),
      },
      {
        path: "set/manager/index",
        name: "set_manager",
        meta: { title: "管理员管理" },
        component: () => import("views/set/manager/Index.vue"),
      },
      {
        path: "set/payment/index",
        name: "set_payment",
        meta: { title: "交易设置" },
        component: () => import("views/set/payment/Index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "登录页" },
    component: () => import("@/views/login/Login.vue"),
  },
];

// 获取路由信息的方法,
/* let getRoutes = function() {
  createRoute(routes);
  return routes;
};

// 自动生成路由
function createRoute(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return;
    // 去除index
    let val = getValue(arr[i].component);
    // 生成path
    arr[i].path = arr[i].path || `/${val}`;
    // 生成name
    arr[i].name = arr[i].name || val.replace(/\//g, "_");
    // 自动生成component
    let componentFun = import(`../../views/${arr[i].component}.vue`);
    arr[i].component = () => componentFun;
    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children);
    }
  }
}

// 去除index的方法
function getValue(str) {
  // 获取最后一个 / 的索引
  let index = str.lastIndexOf("/");
  // 获取最后一个 / 后面的值
  let val = str.substring(index + 1, str.length);
  // 判断是不是index结尾
  if (val === "index") {
    return str.substring(index, -1);
  }
  return str;
}

export default getRoutes; */
export default routes;
