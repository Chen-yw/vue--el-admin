<template>
  <div
    class="bg-white pl-2"
    style="margin: -20px; margin-top: -10px; margin-bottom: 0!important; "
  >
    <button-search class="pt-3" :showSearch="true">
      <template #left>
        <!-- 左边 -->
        <el-button type="success" size="mini" @click="openModel(false)"
          >添加登记</el-button
        >
      </template>
      <template #right>
        <div class="mr-3">
          <small class="mr-2">选择升级标准：</small>
          <el-radio-group v-model="level" size="mini">
            <el-radio-button :label="0">累计消费</el-radio-button>
            <el-radio-button :label="1">累计次数</el-radio-button>
          </el-radio-group>
        </div>
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
        <el-table-column label="等级名称" prop="name" align="center">
        </el-table-column>
        <el-table-column label="升级条件" align="center">
          <template slot-scope="scope">
            {{ getLevel.name + "：" + scope.row[getLevel.value] }}
          </template>
        </el-table-column>
        <el-table-column prop="level" label="等级序号" align="center">
        </el-table-column>
        <el-table-column prop="discount" label="折扣率(%)" align="center">
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
    <el-dialog title="添加等级" :visible.sync="createModel" top="5vh">
      <!-- 表单内容 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="等级名称" prop="name">
          <el-input
            v-model="form.name"
            size="mini"
            style="width: 30%;"
            placeholder="请输入等级名称"
          ></el-input>
          <small class="text-secondary d-block">
            设置会员等级名称
          </small>
        </el-form-item>
        <el-form-item label="等级权重" prop="level">
          <el-input
            type="number"
            v-model="form.level"
            size="mini"
            :min="0"
            style="width: 30%;"
            placeholder="请输入等级权重"
          ></el-input>
          <small class="text-secondary d-block">
            设置会员等级排序(此参数决定等级的高低，排序越大等级越高，请谨慎选择)
          </small>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="1" border>启用</el-radio>
            <el-radio :label="0" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="升级条件">
          <div>
            <small class="mr-2">累计消费满</small>
            <el-input
              class="mt-2"
              type="number"
              v-model="form.max_price"
              size="mini"
              :min="0"
              style="width: 30%;"
              placeholder="累计消费满"
            >
              <template slot="append">元</template>
            </el-input>
            <small class="text-secondary  ml-2">
              设置会员等级所需要的的累计消费必须大于等于0
            </small>
          </div>
          <div>
            <small class="mr-2">累计次数满</small>
            <el-input
              class="mt-2"
              type="number"
              v-model="form.max_times"
              size="mini"
              :min="0"
              style="width: 30%;"
              placeholder="累计次数满"
            >
              <template slot="append">次</template>
            </el-input>
            <small class="text-secondary  ml-2">
              设置会员等级所需要的购买次数必须大于等于0
            </small>
          </div>
        </el-form-item>
        <el-form-item label="折扣率(%)" prop="discount">
          <el-input
            type="number"
            v-model="form.discount"
            size="mini"
            :min="0"
            style="width: 30%;"
            placeholder="请输入折扣率"
          >
            <template slot="append">%</template>
          </el-input>
          <small class="text-secondary d-block">
            折扣百单位为百分比，如果输入90，表示该会员等级的用户可以以商品原价的90%购买
          </small>
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
      preUrl: "user_level",
      level: 0,
      tabIndex: 0,
      tableData: [
        // {
        //   id: 10,
        //   name: "普通会员",
        //   max_price: 100,
        //   max_times: 10,
        //   discount: 10,
        //   level: 1,
        //   status: 1, // 启用
        //   create_time: "",
        // },
      ],
      currentPage: 1,
      createModel: false,
      editIndex: -1,
      form: {
        name: "",
        max_price: 0,
        max_times: 0,
        discount: 0,
        level: 0,
        status: 1, // 启用
      },
    };
  },
  components: {
    buttonSearch,
  },
  created() {},
  computed: {
    getLevel() {
      let arr = [
        {
          name: "累计消费",
          value: "max_price",
        },
        {
          name: "累计次数",
          value: "max_times",
        },
      ];
      return arr[this.level];
    },
  },
  methods: {
    // 处理请求结果
    getListResult(data) {
      console.log(data);
      this.tableData = data.list;
      // this.user_level = data.user_level;
    },

    // 搜索
    searchEvent(keyWord = false) {
      // 简单搜索
      if (typeof keyWord === "string") {
        return console.log("简单搜索。", keyWord);
      }
      // 高级搜索
      console.log("高级搜索。");
    },

    // 清空高级搜索条件
    clearSearch() {
      this.search = {
        keyword: "",
        group_id: "",
        time: "",
      };
      this.$refs.buttonSearch[this.tabIndex].closeSuperSearch();
    },

    // 打开模态框
    openModel(e = false) {
      if (!e) {
        // 添加
        // 初始化表单
        this.form = {
          name: "",
          max_price: 0,
          max_times: 0,
          discount: 0,
          level: 0,
          status: 1, // 启用
        };
        this.editIndex = -1;
      } else {
        // 修改
        this.form = {
          name: e.row.name,
          max_price: e.row.max_price,
          max_times: e.row.max_times,
          discount: e.row.discount,
          level: e.row.level,
          status: e.row.status, // 启用
        };
        this.editIndex = e.$index;
      }
      this.createModel = true;
    },

    // 修改状态
    // changeStatus(item) {
    //   item.status = !item.status;
    //   this.$message({
    //     message: !item.status ? "启用成功！" : "禁用成功！",
    //     type: "success",
    //   });
    // },

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
      //   item.name = this.form.name;
      //   item.max_price = this.form.max_price;
      //   item.max_times = this.form.max_times;
      //   item.discount = this.form.discount;
      //   item.level = this.form.level;
      //   item.status = this.form.status; // 启用
      // }
      // // 关闭模态框
      // this.createModel = false;
      // this.$message({
      //   type: "success",
      //   message: this.editIndex === -1 ? "添加成功！" : "修改成功！",
      // });
    },

    // 删除单个
    // delectItem(scope) {
    //   this.$confirm("是否要删除该等级？", "提示", {
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
        console.log(res);
        this.form.avatar = res[0].url;
      }, 1);
    },
  },
};
</script>
<style scoped></style>
