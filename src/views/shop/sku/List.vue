<template>
  <div
    class="bg-white pl-2"
    style="margin: -20px; margin-top: -10px; margin-bottom: 0!important; "
  >
    <button-search
      class="pt-3"
      placeholder="要搜索的商品名称"
      :showSearch="false"
    >
      <template #left>
        <!-- 左边 -->
        <el-button type="success" size="mini" @click="openModel(false)"
          >添加规格</el-button
        >
        <el-button type="danger" size="mini" @click="deleteAll()"
          >批量删除</el-button
        >
      </template>
    </button-search>

    <!-- 商品数据列表 -->
    <div class="content">
      <el-table
        border
        :data="tableData"
        class=" mt-2"
        style="width: 100%; margin-bottom: 60px;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="45"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="规格名称"> </el-table-column>
        <el-table-column
          prop="default"
          label="规格值"
          width="380px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="order"
          label="排序"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
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
            <el-button-group>
              <el-button
                type="primary"
                size="mini"
                :plain="true"
                @click="openModel(scope)"
                >修改</el-button
              >
              <el-button
                type="danger"
                size="mini"
                :plain="true"
                @click="delectItem(scope.row)"
                >删除</el-button
              >
            </el-button-group>
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
    <el-dialog
      :title="editIndex > -1 ? '修改规格' : '添加规格'"
      :visible.sync="createModel"
      top="5vh"
    >
      <!-- 表单内容 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="规格名称" prop="name">
          <el-input
            v-model="form.name"
            size="mini"
            style="width: 180px;"
            placeholder="规格名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="form.order"
            :min="0"
            placeholder=""
          ></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="1" border>启用</el-radio>
            <el-radio :label="0" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type" size="mini">
            <el-radio :label="0" border>文字</el-radio>
            <el-radio :label="1" border>颜色</el-radio>
            <el-radio :label="2" border>图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格值" prop="default">
          <el-input
            type="textarea"
            v-model="form.default"
            :raw="2"
            placeholder="一行一个规格项，多个规格项用换行输入"
          ></el-input>
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
import { shopTableMixin } from "common/mixin.js";
export default {
  name: "List",
  inject: ["layout"],
  mixins: [shopTableMixin],
  data() {
    return {
      preUrl: "skus",
      tabIndex: 0,
      tableData: [
        /* {
          id: 1,
          name: "颜色1",
          default: "棕色，蓝色",
          order: 50,
          type: 0,
          status: 1,
        },
        {
          id: 2,
          name: "颜色2",
          default: "棕色，蓝色",
          order: 50,
          type: 0,
          status: 1,
        }, */
      ],
      /* page: {
        current: 1, //当前页码
        size: 10, //每页默认显示数量
        sizes: [10, 20, 50, 100], // 每页显示条数的可选项
        total: 10, // 总条数
      },
      multipleSelection: [], */
      createModel: false,
      editIndex: -1,
      form: {
        name: "",
        order: 50,
        status: 1,
        type: 0,
        default: "",
      },
      rules: {
        name: [
          { required: true, message: "规格名称不能为空", trigger: "blur" },
        ],
        default: [
          { required: true, message: "规格值不能为空", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    buttonSearch,
  },
  computed: {
    // 表格选中行id组成的数组
    ids() {
      return this.multipleSelection.map((item) => {
        return item.id;
      });
    },
  },
  created() {
    // this.getList();
  },
  methods: {
    // 请求数据
    /* getList() {
      this.layout.showLoading();
      let url = `/admin/skus/${this.page.current}?limit=${this.page.size}`;
      this.axios
        .get(url, { token: true })
        .then((res) => {
          let data = res.data.data;
          this.tableData = data.list;
          this.page.total = data.totalCount;
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });
    }, */

    // 打开模态框
    openModel(e = false) {
      if (!e) {
        // 添加
        // 初始化表单
        this.form = {
          name: "",
          order: 50,
          status: 1,
          type: 0,
          default: "",
        };
        this.editIndex = -1;
      } else {
        // 修改
        this.form = {
          name: e.row.name,
          order: e.row.order,
          status: e.row.status,
          type: e.row.type,
          default: e.row.default.replace(/，/g, "\n"),
        };
        this.editIndex = e.$index;
      }
      this.createModel = true;
    },

    // 提交
    submit() {
      this.$refs.form.validate((res) => {
        if (res) {
          if (this.editIndex === -1) {
            // 添加规格
            this.layout.showLoading();
            this.axios
              .post("/admin/skus", this.form, { token: true })
              .then((res) => {
                this.$message({
                  type: "success",
                  message: "添加成功！",
                });
                this.getList();
                this.layout.hideLoading();
              })
              .catch((err) => {
                this.layout.hideLoading();
              });
            // this.form.default = this.form.default.replace(/\n/g, "，");
            // this.tableData.unshift(this.form);
          } else {
            // 修改规格
            let item = this.tableData[this.editIndex];
            this.layout.showLoading();
            this.axios
              .post("/admin/skus/" + item.id, this.form, { token: true })
              .then((res) => {
                this.$message({
                  type: "success",
                  message: "修改成功！",
                });
                this.getList();
                this.layout.hideLoading();
              })
              .catch((err) => {
                this.layout.hideLoading();
              });
            // item.name = this.form.name;
            // item.order = this.form.order;
            // item.status = this.form.status;
            // item.type = this.form.type;
            // item.default = this.form.default.replace(/\n/g, "，");
          }
          // 关闭模态框
          this.createModel = false;
          // this.$message({
          //   type: "success",
          //   message: this.editIndex === -1 ? "添加成功！" : "修改成功！",
          // });
        }
      });
    },

    // 修改规格状态 启用/禁用
    changeStatus(item) {
      let status = item.status === 1 ? 0 : 1;
      this.layout.showLoading();
      this.axios
        .post(
          "/admin/skus/" + item.id + "/update_status",
          {
            status: status,
          },
          { token: true }
        )
        .then((res) => {
          item.status = status;
          this.$message({
            message: item.status !== 1 ? "启用成功！" : "禁用成功！",
            type: "success",
          });
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });
    },

    // 删除单个
    delectItem(scope) {
      this.$confirm("是否要删除该规格？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring",
      }).then(() => {
        // this.tableData.splice(scope.$index, 1);
        this.layout.showLoading();
        this.axios
          .post("/admin/skus/" + scope.id + "/delete", {}, { token: true })
          .then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功！",
            });
            this.getList();
            this.layout.hideLoading();
          })
          .catch((err) => {
            console.log(err);
            this.layout.hideLoading();
          });
        // this.$message({
        //   type: "success",
        //   message: "删除成功！",
        // });
      });
    },

    // 批量删除
    deleteAll() {
      if (this.ids.length === 0) {
        return this.$message({
          type: "warning",
          message: "请先选择需要删除的数据！",
        });
      }
      this.$confirm("是否要删除该规格？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring",
      }).then(() => {
        /*  this.multipleSelection.forEach((item) => {
        let index = this.tableData.findIndex((v) => v.id === item.id);
        if (index !== -1) {
          this.tableData.splice(index, 1);
        }
      });
      this.multipleSelection = []; */
        this.layout.showLoading();
        this.axios
          .post(
            "/admin/skus/delete_all",
            {
              ids: this.ids,
            },
            { token: true }
          )
          .then((res) => {
            this.multipleSelection = [];
            this.$message({
              type: "success",
              message: "删除成功！",
            });
            this.getList();
            this.layout.hideLoading();
          })
          .catch((err) => {
            console.log(err);
            this.layout.hideLoading();
          });
      });
    },

    // // 监听表格项的选择
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },

    /* // 分页 每页条数变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.size = val;
      this.getList();
    },

    // 分页 当前页码改变
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page.current = val;
      this.getList();
    }, */
  },
};
</script>
<style scoped></style>
