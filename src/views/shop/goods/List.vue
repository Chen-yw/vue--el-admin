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
          placeholder="要搜索的商品名称"
          @search="searchEvent"
          ref="buttonSearch"
        >
          <template #left>
            <!-- 左边 -->
            <router-link :to="{ name: 'shop_goods_create' }">
              <el-button type="success" size="mini" @click="successClick"
                >发布商品</el-button
              >
            </router-link>
            <el-button type="warning" size="mini">恢复商品</el-button>
            <el-button type="danger" size="mini">批量删除</el-button>
            <el-button size="mini">下架</el-button>
            <el-button size="mini">上架</el-button>
            <el-button size="mini">推荐</el-button>
          </template>
          <!-- 高级搜索的表单 -->
          <template #form>
            <el-form :inline="true">
              <el-form-item label="商品名称" class="mb-0">
                <el-input
                  v-model="form.name"
                  size="mini"
                  placeholder="请输入商品名称"
                />
              </el-form-item>
              <el-form-item label="商品编码" class="mb-0">
                <el-input
                  v-model="form.code"
                  size="mini"
                  placeholder="请输入商品编码"
                />
              </el-form-item>
              <el-form-item label="商品类型" class="mb-0">
                <el-select
                  v-model="form.type"
                  size="mini"
                  placeholder="请选择商品类型"
                >
                  <el-option label="类型一" value="上海"></el-option>
                  <el-option label="类型二" value="北京"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品分类" class="mb-0">
                <el-input v-model="form.category" size="mini" />
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
            <el-table-column label="商品" width="380px">
              <template slot-scope="scope">
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
              label="商品类型"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="sale_count"
              label="实际销量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="order"
              label="商品排序"
              align="center"
            ></el-table-column>
            <el-table-column label="商品状态" align="center">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  size="mini"
                  :plain="true"
                  @click="scope.row.ischeck = 1"
                  >审核通过</el-button
                >
                <el-button
                  class="ml-0 mt-2"
                  type="danger"
                  size="mini"
                  :plain="true"
                  @click="scope.row.ischeck = 2"
                  >审核拒绝</el-button
                >
                <!-- <el-button :type="scope.row.status ? 'success' : 'danger' " size="mini" :plain="true" @click="changeStatus(scope.row)">{{scope.row.status ? '上架' : '下架'}}</el-button> -->
              </template>
            </el-table-column>
            <el-table-column
              prop="stock"
              label="总库存"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="pprice"
              label="价格(元)"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center" width="150px">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button type="primary" size="mini" :plain="true"
                    >修改</el-button
                  >
                  <el-button
                    type="danger"
                    size="mini"
                    :plain="true"
                    @click="deleteItem(scope.$index)"
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
        { name: "审核中" },
        { name: "出售中" },
        { name: "已下架" },
        { name: "库存预警" },
        { name: "回收站" },
      ],
      form: {
        name: "",
        code: "",
        type: "",
        category: "",
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
        name: "",
        code: "",
        type: "",
        category: "",
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

    // 修改商品上下架状态
    changeStatus(item) {
      item.status = item.status === 1 ? 0 : 1;
    },
  },
};
</script>
<style scoped></style>
