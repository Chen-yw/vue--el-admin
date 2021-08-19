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
                <el-button type="text">销售价</el-button>
                <el-button type="text">市场价</el-button>
                <el-button type="text">成本价</el-button>
                <el-button type="text">库存</el-button></el-button>
                <el-button type="text">体积</el-button>
                <el-button type="text">重量</el-button>
              </el-form-item>
              <el-form-item label="规格设置">
                <!-- 规格设置表格 -->
                <skuTable></skuTable>
              </el-form-item> 
            </el-form>
          </template>
        </el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
        <el-tab-pane label="商品详情">商品详情</el-tab-pane>
        <el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import baseCreate from "components/shop/create/baseCreate";
import singleAttrs from "components/shop/create/singleAttrs";
import multiAttrs from "components/shop/create/multiAttrs";
import skuCard from 'components/shop/create/sku/skuCard';
import skuTable from 'components/shop/create/skuTable'

export default {
  name: "Create",
  data() {
    return {
      tabIndex: 0,
    };
  },
  components: {
    baseCreate,
    singleAttrs,
    multiAttrs,
    skuCard,
    skuTable
  },
  computed: {
    // 导入vuex的state
    ...mapState({
      sku_card: (state) => state.goods_create.sku_card,
      skus_type: (state) => state.goods_create.skus_type, // sku类型：0单规格 1多规格
    }),

    // 规格卡片的总数
    skuCardLength() {
      let length = this.sku_card.length - 1;
      return length;
    },
  },
  mounted() {
    
  },
  methods: {
    // 加载数据
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    // 导入vuex的mutations
    ...mapMutations(["vModelState", "addSkuCard",]),

    // 修改表单的值
    vModel(key, value) {
      this.vModelState({ key, value });
    },

    // 增加规格卡片
    addSkuCardClick() {
      this.addSkuCard();
    },
  },
};
</script>
<style scoped>
.goods_create .el-form-item {
  margin-bottom: 10px;
} 
</style>
