<template>
  <div>
    <el-container
      style="position: absolute; top: 0; bottom: 0;left: 0;right: 0;"
    >
      <el-header>Header</el-header>

      <el-container>
        <el-aside width="200px">Aside</el-aside>

        <el-main>Main</el-main>
      </el-container>

      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
