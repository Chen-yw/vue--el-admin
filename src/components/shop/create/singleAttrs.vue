<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="市场价格">
      <el-input
        class="w-25"
        size="medium"
        type="number"
        :value="oprice"
        @input="vModel('oprice', $event)"
        placeholder=""
      >
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="销售价格">
      <el-input
        class="w-25"
        size="medium"
        type="number"
        :value="pprice"
        @input="vModel('pprice', $event)"
        placeholder=""
      >
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="成本价格">
      <el-input
        class="w-25"
        size="medium"
        type="number"
        :value="cprice"
        @input="vModel('cprice', $event)"
        placeholder=""
      >
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品重量">
      <el-input
        class="w-25"
        size="medium"
        type="number"
        :value="weight"
        @input="vModel('weight', $event)"
        placeholder=""
      >
        <template slot="append">公斤</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品体积">
      <el-input
        class="w-25"
        size="medium"
        type="number"
        :value="volume"
        @input="vModel('volume', $event)"
        placeholder=""
      >
        <template slot="append">立方米</template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "singleAttrs",
  data() {
    return {};
  },
  computed: {
    // vuex 的state
    ...mapState({
      oprice: (state) => state.goods_create.oprice, // 市场价格
      pprice: (state) => state.goods_create.pprice, // 销售价格
      cprice: (state) => state.goods_create.cprice, // 成本价格
      weight: (state) => state.goods_create.weight, // 重量
      volume: (state) => state.goods_create.volume, // 体积
    }),

    // vue文件的计算属性
  },
  methods: {
    // 导入vuex的mutations
    ...mapMutations(["vModelState"]),

    // 修改表单的值
    vModel(key, value) {
      this.vModelState({ key, value });
    },
  },
};
</script>
<style scoped></style>
