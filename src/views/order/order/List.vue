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
      ></el-tab-pane>
    </el-tabs>

    <button-search
          placeholder="要搜索的订单编号"
          @search="searchEvent"
          ref="buttonSearch"
          :showSearch="true"
        >
          <template #left>
            <!-- 左边 -->

            <el-button 
              type="success" 
              size="mini"
              @click="exportModel = true" >导出数据</el-button
            >
            <el-button type="danger" size="mini" @click="deleteAll">批量删除</el-button>
          </template>
          <!-- 高级搜索的表单 -->
          <template #form>
            <el-form :inline="true">
              <el-form-item label="订单编号" class="mb-0">
                <el-input
                  v-model="form.no"
                  size="mini"
                  placeholder="请输入商品名称"
                />
              </el-form-item>
              <!-- <el-form-item label="订单状态" class="mb-0">
                <el-select
                  v-model="form.type"
                  size="mini"
                  placeholder="请选择订单状态"
                >
                  <el-option label="类型一" value="上海"></el-option>
                  <el-option label="类型二" value="北京"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="下单时间" class="mb-0">
                <el-date-picker
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="收货人" class="mb-0">
                <el-input
                  v-model="form.name"
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
            <el-table-column label="商品" width="330">
              <template slot-scope="scope">
                <div class="d-flex">
                  <div style="flex: 1">
                    <p class="mb-1">订单编号：</p>
                    <p class="mb-1"><small>{{scope.row.no}}</small></p>
                  </div>
                  <div style="flex: 1">
                    <p class="mb-1">下单时间</p>
                    <p class="mb-1"><small>{{scope.row.create_time}}</small></p>
                  </div>
                </div>
                <div class="media border-top py-2" v-for="(item, index) in scope.row.order_items" :key="index">
                  <img
                    :src="item.goods_item ? 'item.goods_item.cover' : 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg'"
                    class="mr-3"
                    style="width: 60px; height: 60px;"
                  />
                  <div class="media-body">
                    <p class="mb-0 font-weight-bold text-info">
                      {{ item.goods_item ? 'item.goods_item.title' : '荣耀 V10全网通 标配版' }}
                    </p>
                    <p class="my-0">分类：{{ item.goods_item ? 'item.goods_item.type' : '手机' }}</p>
                    <p class="my-0">时间：{{ item.goods_item ? 'item.goods_item.create_time' : '2019-07-17 18:34:14'}}</p>
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
                <span>￥{{scope.row.total_price}}</span>
                <p><small>(含运费：￥0.00)</small></p>
              </template>
            </el-table-column>
            <el-table-column prop="sale_count" label="买家" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.user.username}}</span>
                <p><small>(用户ID：{{scope.row.user_id}})</small></p>
              </template>
            </el-table-column>
            <el-table-column label="支付方式" align="center">
              <template slot-scope="scope">
                <span class="badge badge-success" v-if="scope.row.payment_method === 'wechat'">微信支付</span>
                <span class="badge badge-primary" v-else-if="scope.row.payment_method === 'alipay'">支付宝支付</span>
                <span class="badge badge-danger" v-else>待支付</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="stock"
              label="配送方式"
              align="center"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.ship_data">
                  <div>{{scope.row.ship_data.express_company}}</div>
                  <div>{{scope.row.ship_data.express_no}}</div>
                </div>
                <span v-else class="badge badge-secondary">未配送</span>
              </template>
            </el-table-column>
            <el-table-column prop="pprice" label="交易状态" align="center">
              <template slot-scope="scope">
                <div>
                  付款状态：<span class="badge" :class="scope.row.payment_method ? 'badge-success' : 'badge-secondary'">{{scope.row.payment_method ? "已付款" : "未付款"}}</span>
                </div>
                <div>
                  发货状态：<span class="badge" :class="scope.row.ship_data ? 'badge-success' : 'badge-secondary'">{{scope.row.ship_data ? "已发货" : "未发货"}}</span>
                </div>
                <div>
                  收货状态：<span class="badge" :class="scope.row.ship_status === 'received' ? 'badge-success' : 'badge-secondary'">{{scope.row.ship_status === 'received' ? "已收货" : "未收货"}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150px">
              <template slot-scope="scope">
                <el-button type="text" size="mini" 
                  >订单详情</el-button
                >
                <el-button  type="text" size="mini" @click="ship(scope.row)"
                  v-if="scope.row.ship_status === 'pending' && scope.row.closed === 0 && scope.row.payment_method && scope.row.refund_status === 'pending'"
                  >订单发货</el-button
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
      </el-tab-pane>

      <!-- 订单发货 -->
      <el-dialog
        title="订单发货"
        :visible.sync="shipModel"
        width="60%"
        >
        <el-form :model="shipForm"  ref="ruleForm" label-width="80px">
          <el-form-item label="快递公司" prop="express_company">
            <el-select v-model="shipForm.express_company" placeholder="请选择">
              <el-option
                v-for="(item, index) in express_company_options"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号" prop="express_no">
            <el-input type="text" v-model="shipForm.express_no"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="shipModel = false">取 消</el-button>
          <el-button type="primary" @click="shipSubmit">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="导出数据"
        :visible.sync="exportModel"
        width="40%"
        >
        <el-form :model="exportForm"  ref="ruleForm" label-width="80px">
          <el-form-item label="订单类型" prop="tab">
            <el-select v-model="exportForm.tab" placeholder="请选择">
              <el-option
                v-for="(item, index) in tabbars"
                :key="index"
                :label="item.name"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围" prop="time">
            <el-date-picker
              v-model="exportForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="exportModel = false">取 消</el-button>
          <el-button type="primary" @click="exportExcel">确 定</el-button>
        </span>
      </el-dialog>


  </div>
</template>

<script>
import buttonSearch from "components/common/buttonSearch";
import { table_page_Mixin } from "common/mixin.js";
export default {
  inject: ["layout"],
  mixins: [table_page_Mixin],
  data() {
    return {
      preUrl: "order",
      tabIndex: 0,
      tabbars: [
        { name: "全部", key: 'all' },
        { name: "待付款", key: 'nopay' },
        { name: "待发货", key: 'noship' },
        { name: "已发货", key: 'shiped' },
        { name: "已收货", key: 'received' },
        { name: "已完成", key: 'finish' },
        { name: "已关闭", key: 'closed' },
        { name: "退款中", key: 'refunding' },
      ],
      form: {
        no: "",
        // type: "",
        time: "",
        endtime: '',
        name: "",
        phone: "",
      },
      tableData: [],
      // multipleSelection: [],
      shipModel: false,
      shipForm: {
        express_company: '',
        express_no: ''
      },
      shipId: 0,
      express_company_options: [],
      exportModel: false, // 导出数据模态框
      exportForm: {
        tab: '',
        time: ''
      }
    };
  },
  components: {
    buttonSearch,
  },
  computed: {
    tab() {
      return this.tabbars[this.tabIndex].key
    },
    params() {
      let str = '';
      for (let key in this.form) {
        let val = this.form[key];
        if (val) {
          if (Array.isArray(val)) {
            str += `&starttime=${val[0]}`;
            str += `&endtime=${val[1]}`;
          } else {
            str += `&${key}=${val}`
          }
        }
      }
      return str;
    }
  },
  created() {
    // this.__getData();
    this.axios.get('/admin/express_company/1?limit=50', {token: true}).then(res => {
      let data = res.data.data;
      this.express_company_options = data.list;
    }).catch(err => {

    })
  },
  methods: {
    // 获取请求列表分页的url
    getListUrl() {
      // &no=[:no]&starttime=[:starttime]&endtime=[:endtime]&name=[:name]&phone=[:phone]
      return `/admin/${this.preUrl}/${this.page.current}?limit=${this.page.size}&tab=${this.tab}${this.params}`;
    },

    // 处理请求结果
    getListResult(data) {
      // console.log(data);
      this.tableData = data.list;
      // this.user_level = data.user_level;
    },

    __getData() {
      // for (let i = 0; i < this.tabbars.length; i++) {
      //   this.tableData.push({
      //     currentPage: 1,
      //     list: [],
      //   });
        for (let j = 0; j < 20; j++) {
          this.tableData.push({
            id: j,
            title: "荣耀 V10全网通 标配版" ,
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
      },
      
    // 加载数据
    handleClick(tab, event) {
      // console.log(tab, event);
      this.getList();
    },

    // 搜索
    searchEvent(keyWord = false) {
      // 简单搜索
      if (typeof keyWord === "string") {
        this.form.no = keyWord;
        this.getList();
        return console.log("简单搜索", keyWord);
      }
      // 高级搜索
      this.getList();
      console.log("高级搜索");
    },
    
    // 清空高级搜索条件
    clearSearch() {
      this.form = {
        no: "",
        // type: "",
        time: "",
        name: "",
        phone: "",
      };
      // this.$refs.buttonSearch[this.tabIndex].closeSuperSearch();
    },

    // 监听表格项的选择
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },

    // 删除表格中当前商品
    // deleteItem(index) {
    //   this.$confirm("是否删除该商品？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       this.tableData[this.tabIndex].list.splice(index, 1);
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!",
    //       });
    //     })
    //     .catch(() => {});
    // },
    
    // 订单发货
    ship(scope) {
      console.log(scope);
      this.shipId = scope.id
      this.shipModel = true;
    },

    shipSubmit() {
      this.layout.showLoading();
      this.axios.post(`/admin/order/${this.shipId}/ship`, this.shipForm, {token: true}).then(res => {
        this.shipModel = false;
        this.$message({
          type: 'success',
          message: '发货成功'
        })
        this.getList();
        this.layout.hideLoading();
      }).catch(err => {
        this.layout.hideLoading();
      })
    },

    // 导出数据
    exportExcel() {
      if (!this.exportForm.tab) {
        return this.$message({
          type: 'error',
          message: '订单类型不能为空'
        })
      }
      let params = '';
      let val = this.exportForm.time;
        if (val && Array.isArray(val)) {
          params += `&starttime=${val[0]}`;
          params += `&endtime=${val[1]}`;
          
        }
      let url = `/admin/order/excelexport?tab=${this.exportForm.tab}${params}`
      this.axios.post(url, {}, {token: true, responseType: 'blob' }).then(res => {
        if (res.status == 200) {
          // 下载
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link= document.createElement('a');
          link.style.display='none';
          link.href=url;
          let filename = new Date().getTime() + '.xlsx';
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
        }
      }).catch(err => {
        this.$message({
          type:"error",
          message:"下载失败"
        });
      })
    },
  },
};
</script>
<style scoped></style>
