<template>
  <div
    class="d-flex align-items-center border py-1 px-2 rounded mr-2 position-relative"
  >
    <div v-if="type != 0">
      <!-- 颜色选择器 -->
      <el-color-picker size="medium" v-if="type === 1"></el-color-picker>
      <!-- 图片选择器 -->
      <template v-else>
        <span
          class="btn btn-light border"
          size="medium"
          @click="chooseImage"
          v-if="!item.image"
        >
          <i class="el-icon-plus"></i>
        </span>
        <img
          v-else
          :src="item.image"
          class="rounded"
          style="width: 45px; height: 45px; cursor: pointer;"
          @click="chooseImage"
          alt="图片加载错误"
        />
      </template>
    </div>
    <input
      :value="item.name"
      class="form-control border-0"
      style="width: 80px; font-size: 15px; text-align: center;"
      @input="inputChange($event)"
    />
    <span
      class="btn btn-light p-0 position-absolute "
      style="line-height: 1px; right: -10px; top: -10px; "
      @click="delSkuCarkValue(index, indey)"
    >
      <i class="el-icon-circle-close"></i>
    </span>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "skuCardChild",
  inject: ["app"],
  props: {
    type: {
      type: Number,
      default: 0,
    },
    item: Object,
    index: Number,
    indey: Number,
  },
  methods: {
    ...mapMutations(["delSkuValue", "updateSkuValue"]),

    // 删除规格卡片的属性
    delSkuCarkValue(index, indey) {
      this.delSkuValue({ index, indey });
    },

    inputChange(event) {
      this.updateSkuCardValue("name", event.target.value);
    },

    // 修改规格卡片的属性
    updateSkuCardValue(key, val) {
      this.updateSkuValue({ index: this.index, indey: this.indey, key, val });
    },

    // 选择图片
    chooseImage() {
      // this.app.show();
      // 传递一个函数
      this.app.chooseImage((res) => {
        console.log(res);
        this.updateSkuCardValue("image", res[0].url);
      }, 1);
    },
  },
};
</script>
<style scoped></style>
