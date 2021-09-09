<template>
  <div
    class="bg-white pl-2"
    style="margin: -20px; margin-top: -10px; margin-bottom: 0!important; "
  >
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in tabbars"
        :key="index"
        :label="item.name"
      >
        <button-search
          placeholder="要搜索的订单编号"
          @search="searchEvent"
          ref="buttonSearch"
          :showSearch="true"
        >
          <template #left>
            <!-- 左边 -->

            <el-button type="success" size="mini" @click="successClick"
              >导出数据</el-button
            >
            <el-button type="danger" size="mini">批量删除</el-button>
          </template>
          <!-- 高级搜索的表单 -->
          <template #form>
            <el-form :inline="true">
              <el-form-item label="订单编号" class="mb-0">
                <el-input
                  v-model="form.code"
                  size="mini"
                  placeholder="请输入商品名称"
                />
              </el-form-item>
              <el-form-item label="订单状态" class="mb-0">
                <el-select
                  v-model="form.type"
                  size="mini"
                  placeholder="请选择订单状态"
                >
                  <el-option label="类型一" value="上海"></el-option>
                  <el-option label="类型二" value="北京"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="下单时间" class="mb-0">
                <el-date-picker
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="收货人" class="mb-0">
                <el-input
                  v-model="form.username"
                  size="mini"
                  placeholder="收货人"
                />
              </el-form-item>
              <el-form-item label="手机号" class="mb-0">
                <el-input
                  v-model="form.phone"
                  size="mini"
                  placeholder="请输入手机号"
                />
              </el-form-item>
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
            :data="tableData[index].list"
            class=" mt-2"
            style="width: 100%; margin-bottom: 60px;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="45"
              align="center"
            ></el-table-column>
            <el-table-column label="商品" width="330">
              <template slot-scope="scope">
                <div class="d-flex">
                  <div style="flex: 1">
                    <p class="mb-1">订单编号：</p>
                    <p class="mb-1"><small>2018080298545157</small></p>
                  </div>
                  <div style="flex: 1">
                    <p class="mb-1">下单时间</p>
                    <p class="mb-1"><small>2018080298545157</small></p>
                  </div>
                </div>
                <div class="media">
                  <img
                    :src="scope.row.cover"
                    class="mr-3"
                    style="width: 60px; height: 60px;"
                  />
                  <div class="media-body">
                    <p class="mb-0 font-weight-bold text-info">
                      {{ scope.row.title }}
                    </p>
                    <p class="my-0">分类：{{ scope.row.type }}</p>
                    <p class="my-0">时间：{{ scope.row.create_time }}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              label="实付款"
              align="center"
              width="120"
            >
              <template slot-scope="scope">
                <span>￥20</span>
                <p><small>(含运费：￥0.00)</small></p>
              </template>
            </el-table-column>
            <el-table-column prop="sale_count" label="买家" align="center">
              <template slot-scope="scope">
                <span>用户名</span>
                <p><small>(用户ID：4616464)</small></p>
              </template>
            </el-table-column>
            <el-table-column label="支付方式" align="center">
              <template slot-scope="scope">
                <span class="badge badge-success">微信支付</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="stock"
              label="配送方式"
              align="center"
            ></el-table-column>
            <el-table-column prop="pprice" label="交易状态" align="center">
              <template slot-scope="scope">
                <div>
                  付款状态：<span class="badge badge-success">已付款</span>
                </div>
                <div>
                  发货状态：<span class="badge badge-success">待发货</span>
                </div>
                <div>
                  收货状态：<span class="badge badge-success">待收货</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150px">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" :plain="true"
                  >订单详情</el-button
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
              :current-page="tableData[index].currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination>
          </div>
        </el-footer>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buttonSearch from "components/common/buttonSearch";
export default {
  name: "List",
  data() {
    return {
      tabIndex: 0,
      tabbars: [
        { name: "全部" },
        { name: "待付款" },
        { name: "待发货" },
        { name: "已发货" },
        { name: "已收货" },
        { name: "已完成" },
        { name: "已关闭" },
        { name: "退款中" },
      ],
      form: {
        code: "",
        type: "",
        time: "",
        username: "",
        phone: "",
      },
      tableData: [],
      multipleSelection: [],
    };
  },
  components: {
    buttonSearch,
  },
  created() {
    this.__getData();
  },
  methods: {
    __getData() {
      for (let i = 0; i < this.tabbars.length; i++) {
        this.tableData.push({
          currentPage: 1,
          list: [],
        });
        for (let j = 0; j < 20; j++) {
          this.tableData[i].list.push({
            id: j,
            title: "荣耀 V10全网通 标配版" + i + "-" + j,
            cover: "http://static.yoshop.xany6.com/2018071718294208f086786.jpg",
            create_time: "2019-07-17 18:34:14",
            category: "手机",
            type: "普通商品",
            sale_count: 20,
            order: 100,
            status: 1,
            stock: 200,
            pprice: 1000,
            ischeck: 1,
            // 0未审核 1通过 2不通过
          });
        }
      }
    },

    // 加载数据
    handleClick(tab, event) {
      // console.log(tab, event);
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
      this.form = {
        code: "",
        type: "",
        time: "",
        username: "",
        phone: "",
      };
      this.$refs.buttonSearch[this.tabIndex].closeSuperSearch();
    },

    // 监听表格项的选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 删除表格中当前商品
    deleteItem(index) {
      this.$confirm("是否删除该商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData[this.tabIndex].list.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },

    // 导出数据
    successClick() {},
  },
};
</script>
<style scoped></style>
