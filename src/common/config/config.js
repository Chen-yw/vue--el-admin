export default {
  logo: "UNI-ADMIN",
  navBar: {
    active: "0",
    list: [
      {
        name: "首页",
        submenuActive: "0",
        submenu: [
          {
            icon: "el-icon-s-home",
            name: "后台首页",
            pathname: "index",
          },
          {
            icon: "el-icon-picture",
            name: "相册管理",
            pathname: "image",
          },
          {
            icon: "el-icon-menu",
            name: "商品列表",
            pathname: "shop_goods_list",
          },
        ],
      },
      {
        name: "商品",
        submenuActive: "0",
        submenu: [
          {
            icon: "el-icon-circle-plus-outline",
            name: "创建商品",
            pathname: "shop_goods_create",
          },
          {
            icon: "el-icon-s-order",
            name: "分类管理",
            pathname: "shop_category_list",
          },
          {
            icon: "el-icon-help",
            name: "商品规格",
          },
          {
            icon: "el-icon-s-help",
            name: "商品类型",
          },
          {
            icon: "el-icon-s-comment",
            name: "商品评论",
          },
        ],
      },
      {
        name: "订单",
        submenuActive: "0",
        submenu: [
          {
            icon: "",
            name: "订单1",
          },
          {
            icon: "",
            name: "订单2",
          },
        ],
      },
      {
        name: "会员",
        submenuActive: "0",
        submenu: [
          {
            icon: "",
            name: "会员1",
          },
          {
            icon: "",
            name: "会员2",
          },
        ],
      },
      {
        name: "设置",
        submenuActive: "0",
        submenu: [
          {
            icon: "",
            name: "设置1",
          },
          {
            icon: "",
            name: "设置2",
          },
        ],
      },
    ],
  },
};
