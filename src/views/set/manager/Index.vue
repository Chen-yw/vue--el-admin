<template>
  <div
    class="bg-white pl-2"
    style="margin: -20px; margin-top: -10px; margin-bottom: 0!important; "
  >
    <el-tabs v-model="preUrl" @tab-click="getList">
      <el-tab-pane label="管理员列表" name="manager">
        <div class="d-flex align-items-center">
          <el-button
            class="mb-2 "
            type="primary"
            size="mini"
            @click="openDialog('manager')"
            >添加管理员</el-button
          >
          <div class="ml-auto">
            <el-input
              v-model="keyword"
              size="mini"
              style="width: 200px;"
            ></el-input>
            <el-button
              class="mx-2"
              type="info"
              size="mini"
              placeholder="请输入管理员名称"
              @click="getList"
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
              <!-- :src="scope.row.avatar" -->
              <el-avatar
                size="large"
                src="http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/614237afca403.jpg"
              ></el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="用户名" prop="username" align="center">
          </el-table-column>
          <!-- <el-table-column label="手机号" prop="phone" align="center">
          </el-table-column>
          <el-table-column label="邮箱" prop="email" align="center">
          </el-table-column> -->
          <el-table-column label="所属管理员" align="center">
            <template slot-scope="scope">
              {{ scope.row.role.name }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <!-- <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              ></el-switch> -->
              <el-button
                :plain="true"
                :type="scope.row.status ? 'success' : 'danger'"
                size="mini"
                @click="changeStatus(scope.row)"
                >{{ scope.row.status ? "启用" : "禁用" }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150px">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="openDialog('manager', scope.row)"
                >修改</el-button
              >
              <el-button type="text" size="mini" @click="delectItem(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="角色列表" name="role">
        <div class="d-flex align-items-center">
          <el-button
            class="mb-2 "
            type="primary"
            size="mini"
            v-auth="'添加角色'"
            @click="openDialog('role')"
            >添加角色</el-button
          >
        </div>
        <el-table
          border
          :data="roleList"
          class=" mt-2"
          style="width: 100%; margin-bottom: 60px;"
        >
          <el-table-column label="角色名称" prop="name" align="center">
          </el-table-column>
          <el-table-column label="角色描述" prop="desc" align="center">
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <!-- <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              ></el-switch> -->
              <el-button
                :plain="true"
                :type="scope.row.status ? 'success' : 'danger'"
                size="mini"
                @click="changeStatus(scope.row)"
                >{{ scope.row.status ? "启用" : "禁用" }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="openDialog('role', scope.row)"
                >修改</el-button
              >
              <el-button type="text" size="mini" @click="openDrawer(scope.row)"
                >配置权限</el-button
              >
              <el-button type="text" size="mini" @click="delectItem(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="权限列表" name="rule">
        <div class="d-flex align-items-center">
          <el-button
            class="mb-2 "
            type="primary"
            size="mini"
            @click.stop="openDialog('rule')"
            v-auth="'添加规则'"
            >添加规则</el-button
          >
        </div>

        <div class="custom-tree-container">
          <el-tree
            :data="ruleList"
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node " slot-scope="{ node, data }">
              <div>
                <span
                  v-if="data.menu"
                  class="mr-2 text-muted"
                  :class="data.icon ? data.icon : 'el-icon-star-off'"
                ></span>
                <small v-else class="mr-2 text-muted">{{ data.method }}</small>
                <span>{{ data.name }}</span>
                <span v-if="data.menu" class="badge ml-2">{{
                  data.frontpath
                }}</span>
                <span v-else class="badge badge-secondary ml-2">{{
                  data.condition
                }}</span>
              </div>
              <span>
                <el-button
                  :type="data.status ? 'primary' : 'danger'"
                  size="mini"
                  @click.stop="changeStatus(data)"
                  plain
                  >{{ data.status ? "显示" : "隐藏" }}</el-button
                >
                <el-button
                  type="text"
                  size="mini"
                  @click.stop="openDialog('rule', data.id)"
                  >增加</el-button
                >
                <el-button
                  type="text"
                  size="mini"
                  @click.stop="openDialog('rule', data)"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  size="mini"
                  @click.stop="delectItem(data)"
                  >删除</el-button
                >
              </span>
            </span>
          </el-tree>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页 -->
    <el-footer
      v-if="preUrl !== 'rule'"
      class="border-top d-flex align-items-center px-0 position-fixed bg-white"
      style="bottom: 0; left: 200px; right: 0; z-index: 9;"
    >
      <div style="flex: 1" class="px-2">
        <el-pagination
          :current-page="page.current"
          :page-sizes="page.sizes"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-footer>

    <!-- 添加/修改管理员列表 -->
    <el-dialog
      v-if="preUrl === 'manager'"
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <el-form ref="form" :model="form.manager" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.manager.username"
            size="mini"
            style="width: 25%;"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.manager.password"
            size="mini"
            style="width: 25%;"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <template slot-scope="scope">
            <div>
              <span
                class="btn btn-light border"
                size="medium"
                @click="chooseImage"
                v-if="!form.manager.avatar"
              >
                <i class="el-icon-plus"></i>
              </span>
              <img
                v-else
                :src="form.manager.avatar"
                class="rounded"
                style="width: 45px; height: 45px; cursor: pointer;"
                @click="chooseImage"
                alt="图片加载错误"
              />
            </div>
          </template>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select
            v-model="form.manager.role_id"
            size="mini"
            placeholder="请选择所属角色"
          >
            <el-option
              v-for="(item, index) in roleOptions"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.manager.status" size="mini">
            <el-radio-button :label="1" border>启用</el-radio-button>
            <el-radio-button :label="0" border>禁用</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加/修改角色列表 -->
    <el-dialog
      v-if="preUrl === 'role'"
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <el-form ref="form" :model="form.role" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="form.role.name"
            size="mini"
            style="width: 75%;"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input
            type="textarea"
            v-model="form.role.desc"
            size="mini"
            style="width: 75%;"
            placeholder="请输入描述信息"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.role.status" size="mini">
            <el-radio-button :label="1" border>启用</el-radio-button>
            <el-radio-button :label="0" border>禁用</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加规则 -->
    <el-dialog
      v-if="preUrl === 'rule'"
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <el-form ref="form" :model="form.rule" label-width="100px">
        <el-form-item label="上级规则">
          <el-select
            v-model="form.rule.rule_id"
            size="mini"
            placeholder="请选择上级规则"
          >
            <el-option label="顶级规则" :value="0"></el-option>
            <el-option
              v-for="(item, index) in ruleOptions"
              :key="index"
              :label="item | tree"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单/规则">
          <el-radio-group v-model="form.rule.menu" size="mini">
            <el-radio :label="1" border>菜单</el-radio>
            <el-radio :label="0" border>规则</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
            v-model="form.rule.name"
            size="mini"
            style="width: 70%;"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标" v-if="form.rule.menu">
          <el-input
            v-model="form.rule.icon"
            size="mini"
            style="width: 70%;"
            placeholder="图标"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="前端路由路径"
          v-if="form.rule.menu && form.rule.rule_id > 0"
        >
          <el-input
            v-model="form.rule.frontpath"
            size="mini"
            style="width: 70%;"
            placeholder="前端路由路径"
          ></el-input>
        </el-form-item>
        <el-form-item label="前台路由别名" v-if="form.rule.menu">
          <el-input
            v-model="form.rule.desc"
            size="mini"
            style="width: 70%;"
            placeholder="前台路由别名"
          ></el-input>
        </el-form-item>
        <el-form-item label="后端规则" v-if="!form.rule.menu">
          <el-input
            v-model="form.rule.condition"
            size="mini"
            style="width: 70%;"
            placeholder="请输入后端规则"
          ></el-input>
        </el-form-item>
        <el-form-item label="请求方式" v-if="!form.rule.menu">
          <el-select
            v-model="form.rule.method"
            size="mini"
            placeholder="请选择请求方式"
          >
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
            <el-option label="PUT" value="PUT"></el-option>
            <el-option label="DELETE" value="DELETE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.rule.status" size="mini">
            <el-radio-button :label="1" border>启用</el-radio-button>
            <el-radio-button :label="0" border>禁用</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 配置权限 -->
    <el-drawer
      title="配置权限"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
      size="35%"
    >
      <div
        style="position: absolute; top: 52px; left: 0; right: 0; bottom: 0;"
        v-loading="drawerLoading"
      >
        <div
          style="position: absolute; top: 0;left: 0;right: 0; bottom: 80px; overflow-y: auto;"
        >
          <!-- <div class="bg-danger" style="height: 100%;"> -->
          <el-tree
            :data="drawerList"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="checkedKeys"
            :check-strictly="true"
            @check="check"
          >
          </el-tree>
          <!-- </div> -->
        </div>
        <div
          style="height: 80px; position: absolute; bottom: 0; right: 0; left: 0;"
          class="border d-flex align-items-center bg-white"
        >
          <el-button class="ml-3" @click="drawer = false">取消</el-button>
          <el-button class="ml-3" type="primary" @click="submitRules"
            >确定</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { table_page_Mixin } from "common/mixin.js";
export default {
  name: "index",
  inject: ["app", "layout"],
  mixins: [table_page_Mixin],
  data() {
    return {
      preUrl: "manager",
      keyword: "",
      managerList: [
        // {
        //   id: 10,
        //   username: "用户名",
        //   avatar:
        //     "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
        //   phone: "15648897641",
        //   email: "15648897641@163.com",
        //   group_id: 1,
        //   group: {
        //     id: 1,
        //     name: "管理员",
        //   },
        //   status: 1, // 启用
        // },
      ],
      roleList: [
        {
          id: 10,
          name: "超级管理员",
          status: 1, // 启用
        },
      ],
      // el-tree
      ruleList: [
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
      dialogVisible: false,
      dialogType: "manager", // 模态框类型
      roleOptions: [], // 所属角色
      ruleOptions: [], // 所属上级规则
      dialogId: 0,
      form: {
        manager: {
          username: "",
          password: "",
          avatar: "",
          role_id: "",
          status: 1,
        },
        role: {
          name: "",
          desc: "",
          status: 1,
        },
        rule: {
          menu: 0, // 是否是菜单，0否1是
          rule_id: "", // 上级权限id
          name: "", // 权限名称
          status: 1, // 是否启用
          frontpath: "", // 对应前端路由路径（menu为1且rule_id>0时必填）
          desc: "", // 端路由路径别名（menu为1时必填）
          condition: "", // 后端规则 （menu为0时必填）
          icon: "",
          method: "GET", // 请求方式 （menu为0时必填）
          order: 50, // 排序
        },
      },
      drawer: false,
      // direction: "rtl",
      checkedKeys: [],
      drawerLoading: false,
      drawerList: [], // 抽屉数据
      drawerId: 0,
    };
  },
  filters: {
    tree(item) {
      if (item.level == 0) {
        return item.name;
      }
      let str = "";
      for (let i = 0; i < item.level; i++) {
        str += i == 0 ? "|--" : "--";
      }
      return str + " " + item.name;
    },
  },
  methods: {
    // 获取请求列表分页的url
    getListUrl() {
      if (this.preUrl === "manager") {
        return `/admin/${this.preUrl}/${this.page.current}?limit=${this.page.size}&keyword=${this.keyword}`;
      }
      return `/admin/${this.preUrl}/${this.page.current}?limit=${this.page.size}`;
    },

    // 处理请求结果
    getListResult(data) {
      console.log(data);
      switch (this.preUrl) {
        case "manager":
          this.managerList = data.list;
          this.roleOptions = data.role;
          break;
        case "role":
          this.roleList = data.list;
          break;
        case "rule":
          this.ruleList = data.list;
          this.ruleOptions = data.rules;
          break;
      }
    },

    handleNodeClick(data) {
      // console.log(data);
    },

    // 打开模态框
    openDialog(type, item = false) {
      // 确认类型
      this.dialogType = type;
      // 初始化表单
      switch (type) {
        case "manager":
          if (!item) {
            this.form.manager = {
              username: "",
              password: "",
              avatar: "",
              role_id: "",
              status: 1,
            };
            this.dialogId = 0;
          } else {
            this.form.manager = {
              username: item.username,
              password: item.password,
              avatar: item.avatar,
              role_id: item.role_id,
              status: item.status,
            };
            this.dialogId = item.id;
          }
          break;
        case "role":
          if (!item) {
            this.form.role = {
              name: "",
              desc: "",
              status: 1,
            };
            this.dialogId = 0;
          } else {
            this.form.role = {
              name: item.name,
              desc: item.desc,
              status: item.status,
            };
            this.dialogId = item.id;
          }
          break;
        case "rule":
          if (!item || typeof item === "number") {
            this.form.rule = {
              menu: 0, // 是否是菜单，0否1是
              rule_id: "", // 上级权限id
              name: "", // 权限名称
              status: 1, // 是否启用
              frontpath: "", // 对应前端路由路径（menu为1且rule_id>0时必填）
              desc: "", // 端路由路径别名（menu为1时必填）
              condition: "", // 后端规则 （menu为0时必填）
              icon: "",
              method: "GET", // 请求方式 （menu为0时必填）
              order: 50, // 排序
            };
            this.form.rule.rule_id = item;
            this.dialogId = 0;
          } else {
            this.form.rule = {
              menu: item.menu, // 是否是菜单，0否1是
              rule_id: item.rule_id, // 上级权限id
              name: item.name, // 权限名称
              status: item.status, // 是否启用
              frontpath: item.frontpath, // 对应前端路由路径（menu为1且rule_id>0时必填）
              desc: item.desc, // 端路由路径别名（menu为1时必填）
              condition: item.condition, // 后端规则 （menu为0时必填）
              icon: item.icon,
              method: item.method, // 请求方式 （menu为0时必填）
              order: 50, // 排序
            };

            this.dialogId = item.id;
          }

          break;
      }
      this.dialogVisible = true;
    },

    // 选择头像
    chooseImage() {
      this.app.chooseImage((res) => {
        this.form.manager.avatar = res[0].url;
      }, 1);
    },

    // 提交
    submit() {
      this.addOrEdit(this.form[this.preUrl], this.dialogId);
      this.dialogVisible = false;
    },

    // 关闭提示
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    // // 显示/隐藏
    // showOrHide(data) {
    //   data.status = data.status ? 0 : 1;
    // },

    // 编辑/提交
    edit(data) {
      // data.editStatus = !data.editStatus;
    },

    // 删除
    // remove(node, data) {
    //   this.$confirm("是否删除该分类？", "提示", {
    //     confirmButtonText: "删除",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       let parent = node.parent;
    //       let children = parent.data.children || parent.children;
    //       let index = children.findIndex((v) => {
    //         return v.id === data.id;
    //       });
    //       children.splice(index, 1);
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!",
    //       });
    //     })
    //     .catch(() => {});
    // },

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

    // 打开抽屉
    openDrawer(item) {
      this.drawer = true;
      this.drawerLoading = true;
      this.axios
        .get("/admin/rule/1", { token: true })
        .then((res) => {
          this.drawerList = res.data.data.list;
          this.checkedKeys = item.rules.map((item) => item.id);
          this.drawerId = item.id;
          this.drawerLoading = false;
        })
        .catch((err) => {
          this.drawerLoading = false;
        });
    },

    // tree 复选框被点击的时候触发
    check(...e) {
      this.checkedKeys = e[1].checkedKeys;
    },

    submitRules() {
      this.axios
        .post(
          "/admin/role/set_rules",
          {
            id: this.drawerId,
            rule_ids: this.checkedKeys,
          },
          { token: true }
        )
        .then((res) => {
          this.drawer = false;
          this.getList();
          this.$message({
            type: "success",
            message: "配置成功",
          });
        })
        .catch((err) => {});
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
