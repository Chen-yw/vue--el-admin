<template>
  <div>
    <!-- 规格卡片 -->
    <skuCard></skuCard>
    <!-- 多规格 -->
    <el-form ref="form" label-width="80px">
      <el-form-item label="添加规格">
        <skuCard></skuCard>
        
      </el-form-item>
      <el-form-item label="批量设置">
        <el-button type="text">销售价</el-button>
        <el-button type="text">成本价</el-button>
        <el-button type="text">市场价</el-button>
        <el-button type="text">库存</el-button></el-button>
        <el-button type="text">体积</el-button>
        <el-button type="text">重量</el-button>
      </el-form-item>
      <el-form-item label="规格设置">
        规格设置
      </el-form-item> 
    </el-form>
  </div>
</template>

<script>
import skuCard from 'components/shop/create/sku/skuCard'

export default {
  name: "multiAttrs",
  data() {
    return {};
  },
  components: {
    skuCard
  }
};
</script>
<style scoped></style>
