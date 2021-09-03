module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
      },
    },
  },
  devServer: {
    host: "localhost",
    port: 8080, //端口号
    https: false, //
    open: false, // 配置自动启动浏览器
    // 解决跨域的问题 前端和后端服务不是运行在同一台主机上
    proxy: {
      "/admin": {
        //代理api
        target: "http://ceshi5.dishait.cn/admin", // 服务器api地址
        ws: true, // proxy websockets
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          // 重写路径
          "^/admin": "",
        },
      },
    },
  },
};
