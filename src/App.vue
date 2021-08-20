<template>
  <div id="app">
    <router-view></router-view>

    <image-dialog ref="imageDialog" :max="maxChooseImage"></image-dialog>
    <skus-dialog ref="skusDialog"></skus-dialog>
  </div>
</template>

<script>
import imageDialog from "components/image/imageDialog";
import skusDialog from "components/skus/skusDialog";

export default {
  name: "app",
  data() {
    return {
      maxChooseImage: 9,
    };
  },
  // 依赖注入
  provide() {
    return {
      app: this,
    };
  },
  components: {
    imageDialog,
    skusDialog,
  },
  methods: {
    // 选择图片
    chooseImage(callback, max = 9) {
      this.maxChooseImage = max;
      this.$refs.imageDialog.chooseImage(callback);
    },

    // 选择规格
    chooseSkus(callback) {
      this.$refs.skusDialog.chooseSkus(callback);
    },
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
