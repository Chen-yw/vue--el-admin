<template>
  <div
    class="bg-white pl-2"
    style="margin: -20px; margin-top: -10px; margin-bottom: 0!important; "
  >
    <button-search
      class="pt-3"
      placeholder="手机号/邮箱/会员名称"
      :showSearch="true"
      @search="searchEvent"
    >
      <template #left>
        <!-- 左边 -->
        <el-button type="success" size="mini" @click="openModel(false)"
          >添加会员</el-button
        >
      </template>
      <template #form>
        <el-form ref="form" :model="search" :inline="true" label-width="80px">
          <el-form-item label="搜索内容" prop="keyword" class="mb-0">
            <el-input
              v-model="search.keyword"
              size="mini"
              style="width: 180px;"
              placeholder="手机号/邮箱/会员名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员等级" class="mb-0">
            <el-select
              v-model="search.user_level_id"
              size="mini"
              placeholder="请选择会员等级"
            >
              <el-option
                v-for="(item, index) in user_level"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="下单时间" class="mb-0">
            <el-date-picker
              v-model="search.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item> -->
          <el-form-item class="mb-0">
            <el-button type="info" size="mini" @click="searchEvent"
              >搜索</el-button
            >
            <el-button size="mini" @click="clearSearch">
              清空筛选条件</el-button
            >
          </el-form-item>
        </el-form>
      </template>
    </button-search>

    <!-- 商品数据列表 -->
    <div class="content">
      <el-table
        border
        :data="tableData"
        class=" mt-2"
        style="width: 100%; margin-bottom: 60px;"
      >
        <el-table-column label="会员" width="250">
          <template slot-scope="scope">
            <div class="media">
              <img
                class="mr-3 rounded-circle "
                style="width: 40px; height: 40px;"
                :src="scope.row.avatar"
              />
              <div class="media-body">
                <h6 class="mt-0 d-flex">
                  {{ scope.row.username }}
                  <el-button class="ml-auto" type="text" size="mini"
                    >详情</el-button
                  >
                </h6>
                用户ID：{{ scope.row.id }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="会员等级" align="center">
          <template slot-scope="scope">
            {{ scope.row.user_level.name }}
          </template>
        </el-table-column>
        <el-table-column label="登录/注册" width="250" align="center">
          <template slot-scope="scope">
            <div>注册时间：{{ scope.row.create_time }}</div>
            <div>最后登录：{{ scope.row.last_login_time }}</div>
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
            <el-button type="text" size="mini" @click="openModel(scope)"
              >修改</el-button
            >
            <!-- <el-button type="text" size="mini" @click="openModel(scope)"
              >重置密码</el-button
            > -->
            <el-button type="text" size="mini" @click="delectItem(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-footer
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

    <!-- 新增/修改 规格模态框 -->
    <el-dialog title="添加会员" :visible.sync="createModel" top="5vh">
      <!-- 表单内容 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            size="mini"
            style="width: 25%;"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            size="mini"
            style="width: 25%;"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="form.nickname"
            size="mini"
            style="width: 25%;"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <!-- <template slot-scope="scope"> -->
          <div>
            <span
              class="btn btn-light border"
              size="medium"
              @click="chooseImage"
              v-if="!form.avatar"
            >
              <i class="el-icon-plus"></i>
            </span>
            <img
              v-else
              :src="form.avatar"
              class="rounded"
              style="width: 45px; height: 45px; cursor: pointer;"
              @click="chooseImage"
              alt="图片加载错误"
            />
          </div>
          <!-- </template> -->
        </el-form-item>
        <el-form-item label="等级">
          <el-select
            v-model="form.user_level_id"
            size="mini"
            placeholder="请选择会员等级"
          >
            <el-option
              v-for="(item, index) in user_level"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="form.phone"
            size="mini"
            style="width: 25%;"
            placeholder="手机号"
          ></el-input> </el-form-item
        ><el-form-item label="邮箱" prop="email">
          <el-input
            v-model="form.email"
            size="mini"
            style="width: 25%;"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别">
          <el-radio-group v-model="form.sex" size="mini">
            <el-radio-button :label="0" border>保密</el-radio-button>
            <el-radio-button :label="1" border>男性</el-radio-button>
            <el-radio-button :label="2" border>女性</el-radio-button>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="状态">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio-button :label="1" border>启用</el-radio-button>
            <el-radio-button :label="0" border>禁用</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createModel = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import buttonSearch from "components/common/buttonSearch";
import { table_page_Mixin } from "common/mixin.js";
export default {
  name: "List",
  inject: ["app", "layout"],
  mixins: [table_page_Mixin],
  data() {
    return {
      preUrl: "user",
      tabIndex: 0,
      tableData: [
        // {
        // id: 10,
        // username: "用户名",
        // avatar:
        //   "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg",
        // level_id: 1,
        // level: {
        //   id: 1,
        //   name: "普通会员",
        // },
        // create_time: "2019-07-24 15:52:56",
        // update_time: "2019-07-24 15:52:56",
        // status: 1, // 启用
        // },
      ],
      user_level: [],
      // currentPage: 1,
      createModel: false,
      editIndex: -1,
      search: {
        keyWord: "",
        user_level_id: "",
        // time: "", //发布时间
      },
      form: {
        username: "",
        password: "",
        nickname: "",
        avatar: "",
        user_level_id: "",
        phone: "",
        email: "",
        // sex: 0,
        status: 1,
      },
    };
  },
  components: {
    buttonSearch,
  },
  created() {},
  methods: {
    // 获取请求列表分页的url
    getListUrl() {
      return `/admin/${this.preUrl}/${this.page.current}?limit=${this.page.size}&keyword=${this.search.keyWord}&user_level_id=${this.search.user_level_id}`;
    },

    // 处理请求结果
    getListResult(data) {
      this.tableData = data.list;
      this.user_level = data.user_level;
    },

    // 搜索
    searchEvent(keyWord = false) {
      // 简单搜索
      if (typeof keyWord === "string") {
        this.search.keyWord = keyWord;
        this.getList();
        return;
      }
      // 高级搜索
      this.getList();
    },
    // 清空高级搜索条件
    clearSearch() {
      this.search = {
        keyword: "",
        user_level_id: "",
        // time: "",
      };
      // this.$refs.buttonSearch[this.tabIndex].closeSuperSearch();
    },

    // 修改状态
    // changeStatus(item) {
    //
    //   item.status = !item.status;
    //   this.$message({
    //     message: !item.status ? "启用成功！" : "禁用成功！",
    //     type: "success",
    //   });
    // },

    // 打开模态框
    openModel(e = false) {
      if (!e) {
        // 添加
        // 初始化表单
        this.form = {
          username: "",
          password: "",
          nickname: "",
          avatar: "",
          user_level_id: 3,
          phone: "",
          email: "",
          // sex: 0,
          status: 1,
        };
        this.editIndex = -1;
      } else {
        // 修改
        this.form = {
          username: e.row.username,
          password: "",
          nickname: e.row.nickname,
          avatar: e.row.avatar,
          user_level_id: e.row.user_level_id,
          phone: e.row.phone,
          email: e.row.email,
          // sex: e.row.sex,
          status: e.row.status,
        };
        this.editIndex = e.$index;
      }
      this.createModel = true;
    },

    // 提交
    submit() {
      let id = 0;
      if (this.editIndex !== -1) {
        id = this.tableData[this.editIndex].id;
      }
      this.addOrEdit(this.form, id);
      // 关闭模态框
      this.createModel = false;

      // if (this.editIndex === -1) {
      //   (this.form.level = {
      //     id: 1,
      //     name: "普通会员",
      //   }),
      //     this.tableData.unshift(this.form);
      // } else {
      //   let item = this.tableData[this.editIndex];
      //   item.username = this.form.username;
      //   item.password = this.form.password;
      //   item.nickname = this.form.nickname;
      //   item.avatar = this.form.avatar;
      //   item.user_level_id = this.form.user_level_id;
      //   item.phone = this.form.phone;
      //   item.email = this.form.email;
      //   // item.sex = this.form.sex;
      //   item.status = this.form.status;
      // }
      // // 关闭模态框
      // this.createModel = false;
      // this.$message({
      //   type: "success",
      //   message: this.editIndex === -1 ? "添加成功！" : "修改成功！",
      // });
    },

    // // 删除单个
    // delectItem(scope) {
    //   this.$confirm("是否要删除该会员？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "waring",
    //   }).then(() => {
    //     this.tableData.splice(scope.$index, 1);
    //     this.$message({
    //       type: "success",
    //       message: "删除成功！",
    //     });
    //   });
    // },

    // 选择头像
    chooseImage() {
      // this.app.show();
      // 传递一个函数
      this.app.chooseImage((res) => {
        this.form.avatar = res[0].url;
      }, 1);
    },
  },
};
</script>
<style scoped></style>
