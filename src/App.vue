<template>
  <div id="app">
    <router-view></router-view>

    <el-dialog title="提示" :visible.sync="imageModel" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      imageModel: false,
      callback: false,
    };
  },
  // 依赖注入
  provide() {
    return {
      app: this,
    };
  },
  components: {},
  methods: {
    // 打开弹出层
    chooseImage(callback) {
      this.callback = callback;
      this.imageModel = true;
    },
    // 确定
    confirm() {
      // 选中图片的url
      if (typeof this.callback === "function") {
        this.callback("选中图片的url");
      }
      // 隐藏
      this.hide();
    },
    // 隐藏弹出层
    hide() {
      this.imageModel = false;
    },
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
