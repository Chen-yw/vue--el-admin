<template>
  <div
    class="bg-white pl-2"
    style="margin: -20px; margin-top: -10px; margin-bottom: 0!important; "
  >
    <button-search
      ref="buttonSearch"
      class="pt-3"
      placeholder="要搜索的商品名称"
      :showSearch="true"
      @search="searchEvent"
    >
      <template #left>
        <!-- 左边 -->
        <el-button type="danger" size="mini" @click="deleteAll()"
          >批量删除</el-button
        >
      </template>
      <template #form>
        <el-form :inline="true">
          <el-form-item label="评价用户" class="mb-0">
            <el-input
              v-model="form.username"
              size="mini"
              placeholder="请输入用户名称"
            />
          </el-form-item>
          <el-form-item label="评价类型" class="mb-0">
            <el-select
              v-model="form.type"
              size="mini"
              placeholder="请选择评价类型"
            >
              <el-option label="类型一" value="上海"></el-option>
              <el-option label="类型二" value="北京"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间" class="mb-0">
            <el-date-picker
              v-model="form.time"
              size="small"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="media">
              <img
                class="mr-3 rounded-circle"
                src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg"
                alt="Generic placeholder image"
                style="height: 70px; width: 70px;"
              />
              <div class="media-body">
                <h6 class="mt-0 d-flex">
                  用户名
                  <small>2019-07-23 14:15:17</small>
                  <el-button class="ml-auto" type="danger" size="mini"
                    >删除</el-button
                  >
                </h6>
                <p>
                  评价内容
                </p>

                <div class="media mt-3">
                  <a class="mr-3" href="#">
                    <img
                      class="rounded-circle"
                      src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=27&gp=0.jpg"
                      alt="..."
                      style="height: 70px; width: 70px;"
                    />
                  </a>
                  <div class="media-body">
                    <h6 class="mt-0 d-flex">
                      客服
                      <small>2019-07-23 14:15:17</small>
                      <el-button class="ml-auto" type="danger" size="mini"
                        >删除</el-button
                      >
                    </h6>
                    <p>
                      客服回复内容
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="70">
        </el-table-column>
        <el-table-column label="商品" width="380">
          <template slot-scope="scope">
            <div class="media">
              <img
                :src="scope.row.goods.cover"
                class="mr-3"
                style="width: 60px; height: 60px;"
              />
              <div class="media-body">
                <p class="mb-0 font-weight-bold text-info">
                  {{ scope.row.goods.title }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="评价信息">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <p>用户名：{{ scope.row.username }}</p>
              <div class="d-flex">
                <p>评分：</p>
                <el-rate
                  v-model="scope.row.star"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                >
                </el-rate>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="评价时间" align="center">
        </el-table-column>
        <el-table-column label="是否显示" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"></el-switch>
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
          id: 1,
          goods: {
            title: "商品标题",
            cover: "http://static.yoshop.xany6.com/2018071718294208f086786.jpg",
          },
          username: "用户名",
          star: 4,
          create_time: "2019-07-23 14:15:17",
          status: 1,
        },
      ],
      currentPage: 1,
      multipleSelection: [],
      form: {
        username: "",
        type: "",
        time: "",
      },
    };
  },
  components: {
    buttonSearch,
  },
  created() {},
  methods: {
    // 清空筛选条件
    clearSearch() {},

    // 搜索
    searchEvent(e) {
      console.log(e);
    },

    changeStatus(item) {
      // 修改状态
      item.status = !item.status;
      this.$message({
        message: !item.status ? "启用成功！" : "禁用成功！",
        type: "success",
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

    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style scoped></style>
