<template>
  <li
    class="list-group-item list-group-item-action d-flex align-items-center"
    v-for="(item, index) in albums"
    :key="index"
    @click.stop="albumChange(index)"
    :class="'active sum-active': albumIndex === index"
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
    albums: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  methods: {
    // albumChange(index) {
    //   this.$emit("albumChange", index);
    // },
    // 切换相册
    albumChange(index) {
      this.albumIndex = index;
    },
    openAlbumModel(obj) {
      this.$emit("openAlbumModel", obj);
    },

    // 删除相册并弹出提示弹框
    albumDel(index) {
      this.$confirm("是否永久删除该相册?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 删除相册
          this.albums.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
