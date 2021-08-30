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
