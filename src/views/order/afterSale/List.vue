<template>
  <div
    class="bg-white pl-2"
    style="margin: -20px; margin-top: -10px; margin-bottom: 0!important; "
  >
    <button-search class="pt-3" :showSearch="true">
      <template #right>
        <div class="d-flex align-items-center">
          <el-date-picker
            class="mx-2"
            v-model="search.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="medium"
          >
          </el-date-picker>
          <el-input
            class="mx-2"
            v-model="search.keyword"
            size="medium"
            style="width: 200px;"
            placeholder="请输入订单号"
          ></el-input>
          <el-button class="mx-2" type="info" size="medium">搜索</el-button>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="45"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="商品信息"> </el-table-column>
        <el-table-column
          label="商品清单"
          prop="username"
          align="center"
        ></el-table-column>
        <el-table-column
          label="订单金额"
          prop="price"
          align="center"
        ></el-table-column>
        <el-table-column
          label="收货信息"
          prop="price"
          align="center"
        ></el-table-column>
        <el-table-column
          label="买家"
          prop="content"
          align="center"
        ></el-table-column>
        <el-table-column
          label="交易状态"
          prop="code"
          align="center"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="create_time"
          align="center"
        ></el-table-column>

        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              :plain="true"
              @click="delectItem(scope)"
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
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </el-footer>
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
      search: {
        time: "",
        keyword: "",
      },
    };
  },
  components: {
    buttonSearch,
  },
  created() {},
  methods: {
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
