<template>
  <div
    class="bg-white pl-2"
    style="margin: -20px; margin-top: -10px; margin-bottom: 0!important; "
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="支付设置" name="first">
        <el-table
          border
          :data="tableData"
          class=" mt-2"
          style="width: 100%; margin-bottom: 60px;"
        >
          <el-table-column label="支付方式" align="center">
            <template slot-scope="scope">
              <div class="d-flex align-items-center">
                <!-- <img
                  class="rounded mr-2"
                  :src="scope.row.src"
                  style="width: 40px; height: 40px; "
                  alt=""
                /> -->
                <div
                  class="d-flex flex-column"
                  style="align-items: flex-start;"
                >
                  <h6>{{ scope.row.name }}</h6>
                  <small class="d-block text-secondary">{{
                    scope.row.desc
                  }}</small>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150px">
            <template slot-scope="scope">
              <el-button type="text" size="mini">配置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="购物设置" name="second">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="支付订单">
            <el-input
              type="number"
              size="mini"
              :min="0"
              style="width: 40%;"
              placeholder="支付订单"
            >
              <template slot="append">天后自动关闭</template>
            </el-input>
            <small class="text-secondary d-block">
              订单下单未支付，n天后自动关闭，设置0天不自动关闭
            </small>
          </el-form-item>
          <el-form-item label="已发货订单">
            <el-input
              type="number"
              size="mini"
              :min="0"
              style="width: 40%;"
              placeholder="已发货订单"
            >
              <template slot="append">天后自动确认收货</template>
            </el-input>
            <small class="text-secondary d-block">
              如果在期间未确认收货，系统将自动完成收益，设置0天不自动收货
            </small>
          </el-form-item>
          <el-form-item label="已完成订单">
            <el-input
              type="number"
              size="mini"
              :min="0"
              style="width: 40%;"
              placeholder="已完成订单"
            >
              <template slot="append">天内允许申请售后</template>
            </el-input>
            <small class="text-secondary d-block">
              订单完成后，用户在n天内可以发起售后申请，设置0天不允许申请售后
            </small>
          </el-form-item>
          <el-form-item label="运费组合策略">
            <el-select
              v-model="form.region"
              size="mini"
              placeholder="请选择运费组合策略"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          name: "银联卡支付",
          desc: "该系统支持即时到账接口",
          src: "http://wxcs.niuteam.cn/addons/NsUnionPay/ico.png",
        },
        {
          name: "支付宝支付",
          desc: "该系统支持即时到账接口",
          src: "http://wxcs.niuteam.cn/addons/NsAlipay/ico.png",
        },
        {
          name: "微信支付",
          desc: "该系统支持微信网页支付和扫码支付",
          src: "http://wxcs.niuteam.cn/addons/NsWeixinpay/ico.png",
        },
      ],
      form: {
        region: "",
      },
    };
  },
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
</style>
