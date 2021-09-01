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
          >添加类型</el-button
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
        <el-table-column prop="name" label="类型名称"> </el-table-column>

        <el-table-column label="属性标签" width="380px" align="center">
          <template slot-scope="scope">
            {{ scope.row.value_list | formatValue }}
          </template>
        </el-table-column>

        <el-table-column
          label="属性排序"
          prop="order"
          align="center"
        ></el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-button
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
                @click="delectItem(scope)"
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
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </el-footer>

    <!-- 新增/修改 规格模态框 -->
    <el-dialog
      title="添加类型"
      width="60%"
      :visible.sync="createModel"
      top="5vh"
    >
      <!-- 表单内容 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类型名称" prop="name">
          <el-input
            v-model="form.name"
            size="mini"
            style="width: 180px;"
            placeholder="类型名称"
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
        <el-form-item label="关联规格">
          <div class="d-flex">
            <span
              class="sku-list-item px-3 py-2 border rounded"
              style="line-height: initial;"
            >
              <font>颜色</font>
              <i class="el-icon-delete"></i>
            </span>
            <el-button size="mini" class="el-icon-plus ml-2"></el-button>
          </div>
        </el-form-item>
        <el-form-item label="属性列表" prop="value">
          <el-table-column :data="form.value_list" style="width: 100%">
            <el-table-column prop="order" label="排序" width="180">
            </el-table-column>
            <el-table-column prop="name" label="属性名称">
            </el-table-column>
            <el-table-column prop="type" label="所属类型"> </el-table-column>
          </el-table-column>
            <el-table-column prop="status" label="是否显示">
            </el-table-column>
            <el-table-column prop="value" label="属性值" >
            </el-table-column>
            <el-table-column label="操作"> </el-table-column>
          </el-table-column>
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
export default {
  name: "List",
  data() {
    return {
      tabIndex: 0,
      tableData: [
        {
          name: "鞋子",
          order: 50,
          status: 1,
          sku_list: [
            { id: 1, name: "颜色" },
            { id: 2, name: "尺寸" },
          ],
          value_list: [
            {
              order: 50,
              name: "特性",
              type: "input",
              value: "",
            },
          ],
        },
      ],
      currentPage: 1,
      multipleSelection: [],
      createModel: false,
      editIndex: -1,
      form: {
        name: "",
        order: 50,
        status: 1,
        sku_list: [],
        value_list: [
          {
            id: 0,
            order: 50,
            name: '属性名称',
            type: 'input',
            value: '属性值'
          }
        ],
      },
      rules: {
        name: [
          { required: true, message: "规格名称不能为空", trigger: "blur" },
        ],
        value: [{ required: true, message: "规格值不能为空", trigger: "blur" }],
      },
    };
  },
  components: {
    buttonSearch,
  },
  created() {},
  filters: {
    formatValue(value) {
      let arr = value.map((v) => v.name);
      return arr.join("，");
    },
  },
  methods: {
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
          value: "",
        };
        this.editIndex = -1;
      } else {
        // 修改
        this.form = {
          name: e.row.name,
          order: e.row.order,
          status: e.row.status,
          type: e.row.type,
          value: e.row.value.replace(/，/g, "\n"),
        };
        this.editIndex = e.$index;
      }
      this.createModel = true;
    },

    // 禁启用状态
    changeStatus(item) {
      // 请求服务端数据修改状态
      item.status = !item.status;
      this.$message({
        message: !item.status ? "启用成功！" : "禁用成功！",
        type: "success",
      });
    },

    // 提交
    submit() {
      this.$refs.form.validate((res) => {
        if (res) {
          if (this.editIndex === -1) {
            this.form.value = this.form.value.replace(/\n/g, "，");
            this.tableData.unshift(this.form);
          } else {
            let item = this.tableData[this.editIndex];
            item.name = this.form.name;
            item.order = this.form.order;
            item.status = this.form.status;
            item.type = this.form.type;
            item.value = this.form.value.replace(/\n/g, "，");
          }
          // 关闭模态框
          this.createModel = false;
          this.$message({
            type: "success",
            message: this.editIndex === -1 ? "添加成功！" : "修改成功！",
          });
        }
      });
    },

    // 删除单个
    delectItem(scope) {
      this.$confirm("是否要删除该规格？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring",
      }).then(() => {
        this.tableData.splice(scope.$index, 1);
        this.$message({
          type: "success",
          message: "删除成功！",
        });
      });
    },

    // 批量删除
    deleteAll() {
      this.multipleSelection.forEach((item) => {
        let index = this.tableData.findIndex((v) => v.id === item.id);
        if (index !== -1) {
          this.tableData.splice(index, 1);
        }
      });
      this.multipleSelection = [];
    },

    // 监听表格项的选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style scoped>
.sku-list-item > i {
  display: none;
  cursor: pointer;
}

.sku-list-item:hover {
  background-color: #f4f4f4;
}

.sku-list-item:hover > font {
  display: none;
}

.sku-list-item:hover > i {
  display: inline-block;
}
</style>
