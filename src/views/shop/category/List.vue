<template>
  <div
    class="custom-tree-container bg-white px-3"
    style="margin: -20px; margin-top: -1rem; margin-bottom: 0!important;"
  >
    <div class="py-2 border-bottom d-flex align-items-center">
      <el-button type="primary" size="medium" @click="createTop"
        >创建顶级分类</el-button
      >
    </div>

    <el-tree
      :data="data"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      draggable
      @node-drop="nodeDrop"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node " slot-scope="{ node, data }">
        <div>
          <el-input
            v-if="data.editStatus"
            v-model="data.label"
            size="mini"
          ></el-input>
          <span v-else>{{ node.label }}</span>
        </div>
        <span>
          <el-button
            :type="data.status ? 'primary' : 'danger'"
            size="mini"
            @click.stop="showOrHide(data)"
            >{{ data.status ? "显示" : "隐藏" }}</el-button
          >
          <el-button type="success" size="mini" @click.stop="append(data)"
            >增加</el-button
          >
          <el-button
            :type="data.editStatus ? 'default' : 'warning'"
            size="mini"
            @click.stop="edit(data)"
            >{{ data.editStatus ? "完成" : "修改" }}</el-button
          >
          <el-button type="danger" size="mini" @click.stop="remove(node, data)"
            >删除</el-button
          >
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          status: 1,
          editStatus: false,
          children: [
            {
              id: 2,
              label: "二级 1-1",
              status: 1,
              editStatus: false,
              children: [
                {
                  id: 3,
                  label: "三级 1-1-1",
                  status: 1,
                  editStatus: false,
                  children: [],
                },
              ],
            },
          ],
        },
      ],

      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data);
    },

    // 显示/隐藏
    showOrHide(data) {
      data.status = data.status ? 0 : 1;
    },

    // 编辑/提交
    edit(data) {
      data.editStatus = !data.editStatus;
    },

    // 删除
    remove(node, data) {
      this.$confirm("是否删除该分类？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let parent = node.parent;
          let children = parent.data.children || parent.children;
          let index = children.findIndex((v) => {
            return v.id === data.id;
          });
          children.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },

    // 增加子分类
    append(data) {
      let newObj = {
        id: 2,
        label: "二级 1-1",
        status: 1,
        editStatus: true,
        children: [],
      };
      console.log(data);
      data.children.push(newObj);
    },

    // 拖拽完成后触发事件
    nodeDrop(...options) {},

    // 创建顶级分类
    createTop() {
      this.$prompt("请输入顶级分类名称", "提示", {
        confirmButtonText: "创建",
        cancelButtonText: "取消",
        inputValidator: function(val) {
          if (val === "" || val === null) {
            return "顶级分类名称不能为空！";
          }
          return true;
        },
      })
        .then(({ value }) => {
          console.log(value);
          this.$message({
            type: "success",
            message: "创建成功！",
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  padding-right: 8px;
}

.custom-tree-container >>> .el-tree-node > .el-tree-node__content {
  padding: 20px 0;
}
</style>
