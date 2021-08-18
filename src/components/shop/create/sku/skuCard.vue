<template>
  <!-- 规格卡片 -->
  <!-- <el-card shadow="never">
    <div
      slot="header"
      class="d-flex align-items-center"
      style="line-height: 15px;"
    >
      <span>规格项：</span>
      <el-input class="w-25" size="mini">
        <el-button slot="append" icon="el-icon-more"></el-button>
      </el-input>
      <el-radio-group size="mini" class="ml-3 " style="margin-bottom: -10px">
        <el-radio label="无"></el-radio>
        <el-radio label="颜色"></el-radio>
        <el-radio label="图片"></el-radio>
      </el-radio-group>
      <el-button icon="el-icon-bottom" class="ml-auto" size="mini"></el-button>
      <el-button icon="el-icon-top" size="mini"></el-button>
      <el-button type="text" size="mini">删除</el-button>
    </div>
    123
  </el-card> -->
  <div class="card mb-2" style="line-height: 15px;">
    <div class="card-header d-flex align-items-center">
      规格项：
      <el-input
        class="w-25"
        size="mini"
        :value="item.name"
        @input="vModel(index, 'name', $event)"
      >
        <el-button slot="append" icon="el-icon-more"></el-button>
      </el-input>
      <el-radio-group
        size="mini"
        class="ml-3 "
        style="margin-bottom: -10px"
        :value="item.type"
        @input="vModel(index, 'type', $event)"
      >
        <el-radio :label="0">无</el-radio>
        <el-radio :label="1">颜色</el-radio>
        <el-radio :label="2">图片</el-radio>
      </el-radio-group>
      <!-- 上移 -->
      <el-button
        icon="el-icon-top"
        size="mini"
        class="ml-auto"
        @click="sortCard('moveUp', index)"
        :disabled="index === 0"
      ></el-button>
      <!-- 下移 -->
      <el-button
        icon="el-icon-bottom"
        size="mini"
        @click="sortCard('moveDown', index)"
        :disabled="index === total"
      ></el-button>
      <!-- 删除 -->
      <el-button type="text" size="mini" @click="delSkuCarkClick(index)"
        >删除</el-button
      >
    </div>
    <div class="card-body">
      <!-- 规格属性列表 -->
      <div class="d-flex align-items-center flex-wrap">
        <skuCardChild
          :type="item.type"
          v-for="(li, indey) in list"
          :key="indey"
          :item="li"
          :index="index"
          :indey="indey"
          v-dragging="{ item: li, list: list, group: `skuItem${index}` }"
        ></skuCardChild>
      </div>
      <!-- 增加规格属性 -->
      <div class="mt-3">
        <el-button
          type="text"
          size="mini"
          icon="el-icon-plus"
          @click="addSkuCardValue(index)"
          >增加规格值</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import skuCardChild from "components/shop/create/sku/skuCardChild";

export default {
  name: "skuCard",
  props: {
    item: Object,
    index: Number,
    total: Number,
  },
  data() {
    return {
      list: this.item.list,
    };
  },
  components: {
    skuCardChild,
  },
  computed: {},
  mounted() {
    // 监听拖拽的过程
    // this.$dragging.$on("dragged", ({ value }) => {
    //   console.log(value.item);
    //   console.log(value.list);
    //   console.log(value.otherData);
    // });
    // 监听拖拽的结束
    this.$dragging.$on("dragend", () => {
      this.sortSkuCardValue(this.index, this.list);
      console.log("拖拽结束");
    });
  },
  methods: {
    ...mapMutations([
      "delSkuCark",
      "vModelSkuCard",
      "sortSkuCard",
      "addSkuValue",
      "delSkuValue",
      "sortSkuValue",
    ]),

    // 删除规格卡片
    delSkuCarkClick(index) {
      this.delSkuCark(index);
    },

    // 修改规格卡片数据
    vModel(index, key, value) {
      this.vModelSkuCard({ index, key, value });
    },

    // 卡片排序
    sortCard(action, index) {
      // 上移
      this.sortSkuCard({ action, index });
    },

    // 增加规格卡片的属性
    addSkuCardValue(index) {
      this.addSkuValue(index);
    },

    // 更新规格卡片的规格属性列表
    sortSkuCardValue(index, value) {
      this.sortSkuValue({ index, value });
    },
  },
};
</script>
<style scoped></style>
