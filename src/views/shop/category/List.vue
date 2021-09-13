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
      :highlight-current="true"
      draggable
      @node-drop="nodeDrop"
      @node-drag-end="nodeDragEnd"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node " slot-scope="{ node, data }">
        <div>
          <el-input
            v-if="data.editStatus"
            v-model="data.name"
            size="mini"
          ></el-input>
          <span v-else>{{ node.label }}</span>
        </div>
        <span>
          <el-button
            :type="data.status ? 'primary' : 'danger'"
            size="mini"
            @click.stop="showOrHide(data)"
            >{{ data.status ? "展开" : "隐藏" }}</el-button
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
  inject: ["layout"],
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
        children: "child",
        label: "name",
      },
    };
  },
  computed: {
    // 排序后的数据
    sortData() {
      // 多维数组转为一维数组
      let data = [];
      let sort = function(arr) {
        arr.forEach((item) => {
          data.push(item);
          if (item.child.length) {
            sort(item.child);
          }
        });
      };
      sort(this.data);

      // 排序
      data = data.map((item, index) => {
        return {
          id: item.id,
          order: index,
          category_id: item.category_id,
        };
      });

      return data;
    },
  },
  created() {
    this.__init();
  },
  methods: {
    // 初始化数据
    __init() {
      this.axios
        .get("/admin/category", { token: true })
        .then((res) => {
          let data = res.data.data;

          let addEditStatus = function(arr) {
            arr.forEach((item) => {
              item.editStatus = false;
              if (item.child.length) {
                addEditStatus(item.child);
              }
            });
          };
          addEditStatus(data);
          this.data = data;
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });
    },

    handleNodeClick(data) {
      // console.log(data);
    },

    // 显示/隐藏
    showOrHide(data) {
      console.log("1展开状态，0隐藏状态", data.status);
      this.layout.showLoading();
      // data.status = data.status ? 0 : 1;
      let status = data.status ? 0 : 1;
      console.log(status);
      this.axios
        .post(
          "/admin/category/" + data.id + "/update_status",
          { status },
          { token: true }
        )
        .then((res) => {
          data.status = status;
          this.$message({
            type: "success",
            message: status ? "隐藏成功" : "展开成功！",
          });
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });
    },

    // 编辑/提交
    edit(data) {
      // data.editStatus = !data.editStatus;
      if (!data.editStatus) {
        return (data.editStatus = true);
      }
      if (data.name == "") {
        return this.$message({
          type: "error",
          message: "分类名称不能为空",
        });
      }
      this.layout.showLoading();
      this.axios
        .post(
          "/admin/category/" + data.id,
          {
            status: data.status,
            name: data.name,
            category_id: data.category_id,
          },
          {
            token: true,
          }
        )
        .then((res) => {
          this.$message({
            type: "success",
            message: "修改成功！",
          });
          data.editStatus = false;
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });
    },

    // 删除
    remove(node, data) {
      this.$confirm("是否删除该分类？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // let parent = node.parent;
          // let children = parent.data.children || parent.children;
          // let index = children.findIndex((v) => {
          //   return v.id === data.id;
          // });
          // children.splice(index, 1);
          this.layout.showLoading();
          this.axios
            .delete("/admin/category/" + data.id, { token: true })
            .then((res) => {
              this.__init();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.layout.hideLoading();
            })
            .catch((err) => {
              this.layout.hideLoading();
            });
        })
        .catch(() => {});
    },

    // 增加子分类
    append(data) {
      // let newObj = {
      //   id: 2,
      //   name: "二级 1-1",
      //   status: 1,
      //   editStatus: true,
      //   child: [],
      // };
      // data.child.push(newObj);
      this.layout.showLoading();
      this.axios
        .post(
          "/admin/category",
          {
            status: 0,
            name: "新分类",
            category_id: data.id,
          },
          { token: true }
        )
        .then((res) => {
          let obj = res.data.data;
          obj.editStatus = true;
          obj.child = [];
          data.child.push(obj);
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });
    },

    // 拖拽结束
    nodeDragEnd(...options) {
      // 被拖拽节点对应的数据
      let item = options[0].data;
      // 结束拖拽是最后进入的节点数据
      let obj = options[1].data;
      if (obj) {
        if (options[2] === "before" || options[2] === "after") {
          item.category_id = obj.category_id;
        } else {
          item.category_id = obj.id;
        }
      }
    },

    // 拖拽完成后触发事件
    nodeDrop(...options) {
      this.layout.showLoading();
      this.axios
        .post(
          "/admin/category/sort",
          {
            sortdata: JSON.stringify(this.sortData),
          },
          { token: true }
        )
        .then((res) => {
          this.__init();
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });
    },

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
          this.layout.showLoading();
          this.axios
            .post(
              "/admin/category",
              {
                status: 0,
                name: value,
                category_id: 0,
              },
              { token: true }
            )
            .then((res) => {
              this.__init();
              this.$message({
                type: "success",
                message: "创建成功！",
              });
              this.layout.hideLoading();
            })
            .catch((err) => {
              this.layout.hideLoading();
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
