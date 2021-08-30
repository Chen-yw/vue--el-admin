<template>
  <div>
    <div class="d-flex align-items-center ">
      <!-- 左边 -->
      <slot name="left"></slot>
      <!-- 右边 -->
      <div class="ml-auto" v-show="!superSearch" v-if="showSearch">
        <slot name="right">
          <el-input
            v-model="keyWord"
            :placeholder="placeholder"
            size="mini"
            style="width: 200px; "
            class="mr-2"
          ></el-input>
          <el-button type="info" size="mini" @click="$emit('search', keyWord)"
            >搜索</el-button
          >
          <el-button size="mini" @click="upSuperSearch">高级搜索</el-button>
        </slot>
      </div>
    </div>
    <el-card class="box-card bg-light" v-show="superSearch">
      <div slot="header" class="clearfix" style="margin: -10px;">
        <span>高级搜索</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="closeSuperSearch"
          >收起</el-button
        >
      </div>
      <!-- 表单 -->
      <slot name="form"> </slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "buttonSearch",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    showSearch: {
      type: Boolean,
      dafault: true,
    },
  },
  data() {
    return {
      keyWord: "",
      superSearch: false,
    };
  },
  methods: {
    // 打开高级搜索框
    upSuperSearch() {
      this.superSearch = true;
    },
    // 关闭高级搜索框
    closeSuperSearch() {
      this.superSearch = false;
    },
  },
};
</script>
<style scoped></style>
