<template>
  <div>
    <el-container class="h-container">
      <el-header>
        <a href="" class="header-icon">
          {{ $conf.logo }}
        </a>
        <el-menu
          :default-active="navBar.active"
          class="el-menu-demo"
          mode="horizontal"
          @select="headerSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index | numToString"
            v-for="(item, index) in navBar.list"
            :key="index"
            >{{ item.name }}</el-menu-item
          >
          <el-submenu index="100">
            <template slot="title">
              <el-avatar size="small" :src="circleUrl"></el-avatar>
              summer
            </template>
            <el-menu-item index="100-1">退出</el-menu-item>
            <el-menu-item index="100-2">修改</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>

      <el-container class="b-container">
        <!-- 侧边布局 -->
        <el-aside width="200px">
          <el-menu
            :default-active="slideMenusActive"
            @select="asideSelect"
            class="el-menu"
          >
            <el-menu-item
              :index="index | numToString"
              v-for="(item, index) in slideMenus"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主体布局 -->
        <el-main>
          <!-- 面包屑导航 -->
          <div class="breadcrumb" v-if="bran.length > 0">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item, index) in bran"
                :key="index"
                :to="{ path: 'item.path' }"
                >{{ item.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>

          <!-- 主内容 -->
          <router-view></router-view>
          <!-- <div style="height: 2000px;"></div> -->
          <el-backtop target=".el-main" :bottom="50" :visibility-height="50">
            <div class="back-top">
              UP
            </div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { toStringFilter } from "common/mixin.js";

export default {
  name: "layout",
  mixins: [toStringFilter],
  data() {
    return {
      navBar: {},
      bran: [],
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  created() {
    // 初始化全局文件中的数据,给navBar赋值
    this.navBar = this.$conf.navBar;
    // 获取面包屑导航
    this.getRouterBran();
    // 刷新页面的时候初始化选中菜单
    this.__initNavBar();
  },
  watch: {
    $route(to, from) {
      // 刷新的时候会直接回到首页，不希望如此，可以进行本地存储
      localStorage.setItem(
        "navActive",
        JSON.stringify({
          top: this.navBar.active,
          left: this.slideMenusActive,
        })
      );

      // 获取用来面包屑导航的数据
      this.getRouterBran();
    },
  },
  computed: {
    slideMenusActive: {
      get() {
        return this.navBar.list[this.navBar.active].submenuActive || "0";
      },
      set(val) {
        this.navBar.list[this.navBar.active].submenuActive = val;
      },
    },
    slideMenus() {
      return this.navBar.list[this.navBar.active].submenu || [];
    },
  },
  methods: {
    headerSelect(key, keyPath) {
      console.log(key, keyPath);
      this.navBar.active = key;
      // 默认跳转到对应 asideSelect 的第一个
      this.slideMenusActive = "0";
      this.$router
        .push({ name: this.slideMenus["0"].pathname })
        .catch((err) => {
          err;
        });
    },
    asideSelect(key, keyPath) {
      console.log(key, keyPath);
      this.slideMenusActive = key;
      // 跳转到指定页面
      this.$router
        .push({ name: this.slideMenus[key].pathname })
        .catch((err) => {
          err;
        });
    },

    // 获取面包屑导航
    getRouterBran() {
      // console.log(this.$route.matched);
      let b = this.$route.matched.filter((v) => v.name);
      let arr = [];
      b.forEach((v, k) => {
        // 过滤layout和index
        if (v.name === "index" || v.name === "layout") {
          return;
        } else {
          arr.push({
            name: v.name,
            path: v.path,
            title: v.meta.title,
          });
        }
      });
      if (arr.length > 0) {
        arr.unshift({ name: "index", path: "/index", title: "后台首页" });
      }
      this.bran = arr;
      // console.log(arr);
    },

    __initNavBar() {
      let r = localStorage.getItem("navActive");
      if (r) {
        r = JSON.parse(r); // 转化为 JSON字符串
        this.navBar.active = r.top;
        this.slideMenusActive = r.left;
      }
    },
  },
};
</script>
<style scoped>
.h-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.b-container {
  height: 100%;
}

.el-header {
  background-color: #545c64;
  color: #333;
  display: flex;
}

.header-icon {
  color: #fff;
  padding: 0 5px;
  margin-right: auto;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  width: 200px;
}

.el-menu {
  height: 100%;
}

.el-main {
  background-color: #f2f3f5;
  color: #333;
  height: 100%;
  padding-bottom: 60px;
  position: relative;
}

.breadcrumb {
  border-bottom: 1px solid #d9e2e9;
  background-color: rgb(252, 252, 252);
  padding: 20px;
  margin: -20px;
  margin-bottom: 10px;
}

.back-top {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
</style>
