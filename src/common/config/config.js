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
            icon: "",
            name: "商品列表1",
            pathname: "shop_goods_list",
          },
          {
            icon: "",
            name: "商品列表2",
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
