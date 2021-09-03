<template>
  <div
    class="bg-white pl-2"
    style="margin: -20px; margin-top: -10px; margin-bottom: 0!important; "
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="管理员列表" name="first">
        <div class="d-flex align-items-center">
          <el-button class="mb-2 " type="primary" size="mini"
            >添加管理员</el-button
          >
          <div class="ml-auto">
            <el-input
              n-model="keyword"
              size="mini"
              style="width: 200px;"
            ></el-input>
            <el-button
              class="mx-2"
              type="info"
              size="mini"
              placeholder="请输入管理员名称"
              >搜索</el-button
            >
          </div>
        </div>
        <el-table
          border
          :data="managerList"
          class=" mt-2"
          style="width: 100%; margin-bottom: 60px;"
        >
          <el-table-column label="用户头像" align="center">
            <template slot-scope="scope">
              <el-avatar size="large" :src="scope.row.avatar"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="用户名" prop="username" align="center">
          </el-table-column>
          <el-table-column label="手机号" prop="phone" align="center">
          </el-table-column>
          <el-table-column label="邮箱" prop="email" align="center">
          </el-table-column>
          <el-table-column label="所属管理员" align="center">
            <template slot-scope="scope">
              {{ scope.row.group.name }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150px">
            <template slot-scope="scope">
              <el-button type="text" size="mini">修改</el-button>
              <el-button type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="角色列表" name="second">
        <div class="d-flex align-items-center">
          <el-button class="mb-2 " type="primary" size="mini"
            >添加管理员</el-button
          >
        </div>
        <el-table
          border
          :data="groupList"
          class=" mt-2"
          style="width: 100%; margin-bottom: 60px;"
        >
          <el-table-column label="角色名称" prop="name" align="center">
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini">修改</el-button>
              <el-button type="text" size="mini">配置权限</el-button>
              <el-button type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="权限列表" name="third">
        <div class="custom-tree-container">
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
                <el-button
                  type="danger"
                  size="mini"
                  @click.stop="remove(node, data)"
                  >删除</el-button
                >
              </span>
            </span>
          </el-tree>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activeName: "first",
      managerList: [
        {
          id: 10,
          username: "用户名",
          avatar:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
          phone: "15648897641",
          email: "15648897641@163.com",
          group_id: 1,
          group: {
            id: 1,
            name: "管理员",
          },
          status: 1, // 启用
        },
      ],
      groupList: [
        {
          id: 10,
          name: "超级管理员",
          status: 1, // 启用
        },
      ],
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
.el-form-item {
  margin-bottom: 10px;
}

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
