<template>
  <div>
    <router-link
      :to="{ name: 'shop_goods_list' }"
      style="position: absolute; top: 10px;left: 200px;"
    >
      <el-button size="mini">回到商品列表</el-button>
    </router-link>
    <div
      class="bg-white pl-2 goods_create"
      style="margin: -20px; margin-top: -10px; margin-bottom: 0!important; "
    >
      <el-tabs v-model="tabIndex" @tab-click="handleClick" class="bg-white">
        <el-tab-pane label="基础设置">
          <baseCreate></baseCreate>
        </el-tab-pane>
        <el-tab-pane label="商品规格">
          <!-- 规格选项 -->
          <el-form ref="form" label-width="80px">
            <el-form-item label="商品规格">
              <el-radio-group
                :value="skus_type"
                @input="vModel('skus_type', $event)"
                size="medium"
              >
                <el-radio-button :label="0">统一规格</el-radio-button>
                <el-radio-button :label="1">多规格</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <!-- 单规格 -->
          <template v-if="skus_type === 0">
            <singleAttrs></singleAttrs>
          </template>
          <!-- 多规格 -->
          <template v-else>
            <!-- 规格卡片 -->
            <el-form ref="form" label-width="80px">
              <el-form-item label="添加规格">
                <skuCard
                  v-for="(item, index) in sku_card"
                  :key="index"
                  :item="item"
                  :index="index"
                  :total="skuCardLength"
                ></skuCard>
                <el-button
                  type="success"
                  class="mt-2"
                  size="mini"
                  @click="addSkuCardClick"
                  >添加规格</el-button
                >
              </el-form-item>
            </el-form>

            <el-form ref="form" label-width="80px">
              <el-form-item label="批量设置">
                <template v-if="!updateAllStatus">
                  <el-button
                    type="text"
                    v-for="(btn, btnindex) in updateList"
                    :key="btnindex"
                    @click="openUpdateAllStatus(btn)"
                    >{{ btn.name }}</el-button
                  >
                </template>

                <div v-else class="d-flex align-items-center">
                  <el-input
                    type="number"
                    size="small"
                    class="mr-2"
                    style="width: 150px;"
                    v-model="updateValue"
                    :placeholder="updateAllPlaceholder"
                  ></el-input>
                  <el-button type="primary" size="mini" @click="updateAllSubmit"
                    >设置</el-button
                  >
                  <el-button size="mini" @click="closeUpdateAllStatus"
                    >取消</el-button
                  >
                </div>
              </el-form-item>
              <el-form-item label="规格设置">
                <!-- 规格设置表格 -->
                <skuTable ref="table"></skuTable>
              </el-form-item>
            </el-form>
          </template>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form label-width="80px">
            <el-form-item label="商品类型">
              <el-select
                :value="goods_type_id"
                @change="vModel('goods_type_id', $event)"
                placeholder="请选择商品类型"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-card>
              <div slot="header" class="clearfix">
                <span>商品属性</span>
                <el-button style="float: right; padding: 3px 0" type="text"
                  >操作按钮</el-button
                >
                <el-form label-width="80px">
                  <el-form-item label="输入框">
                    <el-input
                      :value="goods_attrs.phone_model"
                      style="width: 250px;"
                      size="medium"
                      @input="
                        vModelGoodsAttrs({ key: 'phone_model', value: $event })
                      "
                      placeholder="请输入手机型号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="输入框">
                    <el-radio-group v-model="radio">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="媒体设置">
          <el-form label-width="80px">
            <el-form-item label="商品大图">
              <div class="d-flex flex-wrap">
                <div
                  style="width: 150px; height: 150px;"
                  class="mr-3 mb-3 position-relative bg-primary"
                  v-if="item.url"
                  v-for="(item, index) in banners"
                  :key="index"
                  @click="chooseImage(index)"
                >
                  <img
                    style="width: 100%; height: 100%;"
                    :src="item.url"
                    alt=""
                  />
                  <i
                    class="el-icon-delete p-2 text-white position-absolute"
                    style="top: 0; right: 0; background-color: rgba(0, 0, 0, 0.4);"
                    @click.stop="delectImage(index)"
                  ></i>
                </div>

                <div
                  v-if="banners.length < 9"
                  style="width: 150px; height: 150px;"
                  class="border rounded d-flex align-items-center justify-content-center mr-3 mb-3"
                  @click="chooseImage(-1)"
                >
                  <i
                    class="el-icon-plus text-muted"
                    style="font-size: 30px; cursor: pointer;"
                  ></i>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品详情">
          <!-- 富文本编辑器 -->
          <tinymce ref="editor" v-model="msg" @onClick="onClick"></tinymce>
        </el-tab-pane>
        <el-tab-pane label="折扣设置">
          <el-form ref="form" label-width="80px">
            <el-form-item label="会员价">
              <el-input
                style="width: 250px;"
                :value="discount"
                @input="vModel('discount', $event)"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import baseCreate from "components/shop/create/baseCreate";
import singleAttrs from "components/shop/create/singleAttrs";
import multiAttrs from "components/shop/create/multiAttrs";
import skuCard from "components/shop/create/sku/skuCard";
import skuTable from "components/shop/create/skuTable";
import tinymce from "components/common/tinymce";

export default {
  name: "Create",
  inject: ["app"],
  data() {
    return {
      tabIndex: 0,
      msg: "Welcome to Use Tinymce Editor",
      // 批量修改
      updateList: [
        {
          name: "销售价",
          key: "pprice",
        },
        {
          name: "市场价",
          key: "oprice",
        },
        {
          name: "成本价",
          key: "cprice",
        },
        {
          name: "库存",
          key: "stock",
        },
        {
          name: "体积",
          key: "volume",
        },
        {
          name: "重量",
          key: "weight",
        },
      ],
      updateAllStatus: false,
      updateAllPlaceholder: "", // input占位符
      updateValue: "",
      radio: "",
    };
  },
  components: {
    baseCreate,
    singleAttrs,
    multiAttrs,
    skuCard,
    skuTable,
    tinymce,
  },
  computed: {
    // 导入vuex的state
    ...mapState({
      sku_card: (state) => state.goods_create.sku_card,
      skus_type: (state) => state.goods_create.skus_type, // sku类型：0单规格 1多规格
      banners: (state) => state.goods_create.banners,
      goods_type_id: (state) => state.goods_create.goods_type_id,
      goods_attrs: (state) => state.goods_create.goods_attrs,
      discount: (state) => state.goods_create.discount,
    }),

    // 规格卡片的总数
    skuCardLength() {
      let length = this.sku_card.length - 1;
      return length;
    },
  },
  mounted() {},
  methods: {
    // 加载数据
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    // 导入vuex的mutations
    ...mapMutations(["vModelState", "addSkuCard", "vModelGoodsAttrs"]),

    // 修改表单的值
    vModel(key, value) {
      this.vModelState({ key, value });
    },

    // 增加规格卡片
    addSkuCardClick() {
      this.addSkuCard();
    },

    // 富文本编辑器鼠标单击的事件
    onClick(e, editor) {
      console.log("Element clicked");
      console.log(e);
      console.log(editor);
    },

    // 修改批量设置状态
    openUpdateAllStatus(item) {
      this.updateAllStatus = item.key;
      this.updateAllPlaceholder = item.name;
    },
    // 取消批量设置
    closeUpdateAllStatus() {
      this.updateAllStatus = false;
      this.updateValue = "";
    },

    // 提交批量设置
    updateAllSubmit() {
      this.$refs.table.list.forEach((item) => {
        item[this.updateAllStatus] = this.updateValue;
      });
      this.closeUpdateAllStatus();
    },

    // 媒体设置选择图片
    chooseImage(index) {
      // 传递一个函数
      const MAX = 9;
      let count = MAX - this.banners.length;
      this.app.chooseImage(
        (res) => {
          let list = [];
          if (index === -1) {
            list = [...this.banners, ...res]; // 将两个数组进行合并
          } else {
            list = [...this.banners];
            list[index] = res[0];
          }
          this.vModel("banners", list);
        },
        index === -1 ? count : 1
      );
    },

    // 媒体设置删除图片
    delectImage(index) {
      this.$confirm("手否删除该图片？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let list = [...this.banners];
        list.splice(index, 1);
        this.vModel("banners", list);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
  },
};
</script>
<style scoped>
.goods_create .el-form-item {
  margin-bottom: 10px;
}
</style>
