<template>
  <table class="table table-sm table-bordered">
    <thead>
      <tr>
        <th
          scope="col"
          v-for="(th, thi) in tableThs"
          :key="thi"
          :rowspan="th.rowspan"
          :colspan="th.colspan"
        >
          {{ th.name }}
        </th>
      </tr>
      <tr>
        <th scope="col" v-for="(sku, skui) in skuLabels" :key="skui">
          {{ sku.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in list" :key="index">
        <!-- 商品规格 -->
        <th scope="row" v-for="(sku, skuI) in item.skus" :key="skuI">
          {{ sku.name }}
        </th>
        <td>
          <span
            class="btn btn-light border"
            size="medium"
            @click="chooseImage(item)"
            v-if="!item.image"
          >
            <i class="el-icon-plus"></i>
          </span>
          <img
            v-else
            :src="item.image"
            class="rounded"
            style="width: 45px; height: 45px; cursor: pointer;"
            @click="chooseImage(item)"
            alt="图片加载错误"
          />
        </td>
        <td>
          <input
            type="number"
            v-model="item.oprice"
            class="form-control text-center"
          />
        </td>
        <td>
          <input
            type="number"
            v-model="item.pprice"
            class="form-control text-center"
          />
        </td>
        <td>
          <input
            type="number"
            v-model="item.cprice"
            class="form-control text-center"
          />
        </td>
        <td>
          <input
            type="number"
            v-model="item.stock"
            class="form-control text-center"
          />
        </td>
        <td>
          <input
            type="number"
            v-model="item.volume"
            class="form-control text-center"
          />
        </td>
        <td>
          <input
            type="number"
            v-model="item.weight"
            class="form-control text-center"
          />
        </td>
        <td>
          <input
            type="text"
            v-model="item.code"
            class="form-control text-center"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "skuTable",
  inject: ["app"],
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters(["tableThs", "tableData", "skuLabels"]),
    ...mapState({
      sku_card: (state) => state.goods_create.sku_card,
    }),
  },
  watch: {
    tableData(newValue, oldValue) {
      // 直接更改表格中的数据不能被监听到，添加规格属性能被监听到
      console.log(newValue);
      this.list = newValue;
    },
  },
  mounted() {
    this.list = this.tableData;
  },
  methods: {
    // 选择图片
    chooseImage(item) {
      // this.app.show();
      // 传递一个函数
      this.app.chooseImage((res) => {
        console.log(res);
        item.image = res[0].url;
      }, 1);
    },
  },
};
</script>
<style scoped>
.table tr > th,
td {
  text-align: center;
  vertical-align: middle !important;
}

.table td {
  width: 100px;
}
</style>
