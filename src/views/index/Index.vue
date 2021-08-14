<template>
  <div>
    <!-- 数据统计 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card shadow="hover">
          <div class="cards">
            <i :class="item.icon"></i>
            <div>
              <h3>{{ item.num }}</h3>
              <small class="text-muted">{{ item.desc }}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 店铺、订单提示 | 统计图 -->
    <el-row :gutter="20" style="margin-top: 15px;">
      <el-col :span="12" class="gd-col">
        <el-card
          class="box-card"
          shadow="never"
          v-for="(tip, index) in tips"
          :key="index"
        >
          <div slot="header" class="clearfix">
            <span>{{ tip.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{
              tip.desc
            }}</el-button>
          </div>
          <el-row :gutter="20">
            <el-col
              :span="tip.list.length | getCol"
              v-for="(list, indey) in tip.list"
              :key="indey"
            >
              <el-button class="list-button">
                <h4>{{ list.value }}</h4>
                <small style="color: #909399;">{{ list.name }}</small>
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card" style="height: 370px;">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>

          <!-- 统计图容器 -->
          <div ref="myChart" style="width: 100%; height: 270px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 销售情况统计 | 单品销售排名 -->
    <el-row :gutter="20" class="my-3">
      <!-- 销售情况统计 -->
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>{{ sales.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{
              sales.desc
            }}</el-button>
          </div>
          <div
            class="media align-items-center border  mb-3 "
            v-for="(tab, index) in sales.tabs"
            :key="index"
          >
            <span class="border-right py-5 px-3 bg-light">{{ tab.name }}</span>
            <div class="media-body">
              <!-- <div class="msg"> -->
              <div class="border-bottom pl-3 py-3">
                <span>{{ tab.order }}</span> {{ tab.ocount }}
              </div>
              <!-- <div class="line"></div> -->
              <!-- <div class="msg"> -->
              <div class="pl-3 py-3">
                <span>{{ tab.amount }}</span> {{ tab.acount }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 单品销售排名 -->
      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>单品销售排名</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >按周期统计商家店铺的订单量和订单金额</el-button
            >
          </div>
          <el-table :data="tableData" height="275" border style="width: 100%">
            <el-table-column type="index" label="#" width="50">
            </el-table-column>
            <el-table-column prop="name" label="商品信息"> </el-table-column>
            <el-table-column prop="num" label="销量" width="80">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Index",
  data() {
    return {
      counts: [
        {
          icon: "el-icon-user-solid card-icon",
          num: 30,
          desc: "关注人数（个）",
          // iconbgc: "#1684f1",
        },
        {
          icon: "el-icon-s-finance card-icon",
          num: 30,
          desc: "关注人数（个）",
        },
        {
          icon: "el-icon-s-order card-icon",
          num: 30,
          desc: "关注人数（个）",
        },
        {
          icon: "el-icon-s-data card-icon",
          num: 30,
          desc: "关注人数（个）",
        },
      ],
      tips: [
        {
          title: "店铺及商品提示",
          desc: "需要关注的店铺信息及待处理事项",
          list: [
            { value: "64", name: "出售中" },
            { value: "10", name: "待回复" },
            { value: "0", name: "库存预警" },
            { value: "3", name: "仓库中" },
          ],
        },
        {
          title: "交易提示",
          desc: "您需要立即处理的交易订单",
          list: [
            { value: "0", name: "待付款" },
            { value: "10", name: "待发货" },
            { value: "0", name: "已发货" },
            { value: "3", name: "已收货" },
            { value: "3", name: "退款中" },
            { value: "3", name: "待售后" },
          ],
        },
      ],
      sales: {
        title: "销售情况统计",
        desc: "按周期统计商家店铺的订单量和订单金额",
        tabs: [
          {
            name: "昨日销量",
            order: "订单量(件)",
            ocount: "12",
            amount: "订单金额(元)",
            acount: "12",
          },
          {
            name: "本月销量",
            order: "订单量(件)",
            ocount: "12",
            amount: "订单金额(元)",
            acount: "12",
          },
        ],
      },
      tableData: [
        {
          name: "王小虎哒哒哒哒哒哒多多多",
          num: "9",
        },
        {
          name: "王小虎哒哒哒哒哒哒多多多",
          num: "9",
        },
        {
          name: "王小虎哒哒哒哒哒哒多多多",
          num: "9",
        },
        {
          name: "王小虎哒哒哒哒哒哒多多多",
          num: "9",
        },
        {
          name: "王小虎哒哒哒哒哒哒多多多",
          num: "9",
        },
        {
          name: "王小虎哒哒哒哒哒哒多多多",
          num: "9",
        },
        {
          name: "王小虎哒哒哒哒哒哒多多多",
          num: "9",
        },
        {
          name: "王小虎哒哒哒哒哒哒多多多",
          num: "9",
        },
        {
          name: "王小虎哒哒哒哒哒哒多多多",
          num: "9",
        },
        {
          name: "王小虎哒哒哒哒哒哒多多多",
          num: "9",
        },
        {
          name: "王小虎哒哒哒哒哒哒多多多",
          num: "9",
        },
      ],
    };
  },
  filters: {
    getCol(total) {
      total = 24 / total;
      return total;
    },
  },
  mounted() {
    // 调用方法来画统计图
    this.drawChart();
  },
  methods: {
    drawChart() {
      // 初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart);
      // 配置参数
      myChart.setOption({
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.gd-col {
  height: 370px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}

.cards {
  display: flex;
  align-items: center;
}
.card-icon {
  border: 1px solid rgb(243, 240, 240);
  background-color: #1684f1;
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 25px;
  text-align: center;
  line-height: 40px;
  margin-right: 20px;
}

.list-button {
  width: 100%;
}

h4 {
  font-size: 20px;
  padding-bottom: 5px;
}

/* .media {
  display: flex;
  align-items: center;
  margin-top: 15px;
  border: 0.1px solid #c6c9cc;
}
.border {
  width: 10%;
  padding: 50px 20px;
  background-color: #f4f7fa;
}

.media-body {
  width: 90%;
}

.msg {
  padding: 20px 10px;
}
.line {
  width: 100%;
  border-bottom: 0.1px solid #c6c9cc;
} */
</style>
