<template>
  <li
    class="list-group-item list-group-item-action d-flex align-items-center"
    @click.stop="albumChange(index)"
    :class="{ 'active sum-active': active }"
    style="cursor: pointer;"
  >
    {{ item.name }}
    <el-dropdown class="ml-auto">
      <span class="btn btn-light btn-sm border">
        {{ item.num }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.stop.native="openAlbumModel({ item, index })"
          >修改</el-dropdown-item
        >
        <el-dropdown-item @click.stop.native="albumDel(index)"
          >删除</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </li>
</template>

<script>
export default {
  name: "albumItem",
  props: {
    item: Object,
    index: Number,
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 切换相册
    albumChange(index) {
      this.$emit("albumChange", index);
    },

    // 打开修改或者创建相册的模态框
    openAlbumModel({ item, index }) {
      this.$emit("openAlbumModel", { item, index });
    },

    // 删除相册并弹出提示弹框
    albumDel(index) {
      this.$emit("albumDel", index);
    },
  },
};
</script>
<style scoped>
.sum-active {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
</style>
