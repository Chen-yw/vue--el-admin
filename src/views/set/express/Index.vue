<template>
  <div
    class="bg-white pl-2"
    style="margin: -20px; margin-top: -10px; margin-bottom: 0!important; "
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="运费模板" name="first">
        <div>
          <el-button class="mb-2" type="primary" size="mini"
            >添加模板</el-button
          >
        </div>
        <el-table
          border
          :data="tableData"
          class=" mt-2"
          style="width: 100%; margin-bottom: 60px;"
        >
          <el-table-column label="模板名称" prop="name" align="center">
          </el-table-column>
          <el-table-column label="计费方式" align="center">
            <template slot-scope="scope">
              {{ scope.row.type | formatType }}
            </template>
          </el-table-column>
          <el-table-column prop="order" label="排序" align="center">
          </el-table-column>
          <el-table-column prop="create_time" label="添加时间" align="center">
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150px">
            <template slot-scope="scope">
              <el-button type="text" size="mini">修改</el-button>
              <el-button type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="物流跟踪" name="second">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="快递100 Customer">
            <el-input
              v-model="form.customer"
              size="mini"
              style="width: 30%;"
              placeholder="快递100 Customer"
            >
            </el-input>
            <small class="text-secondary d-block">
              用于查询物流信息<a href="#">快递100申请</a>
            </small>
          </el-form-item>
          <el-form-item label="快递100 Key">
            <el-input
              v-model="form.key"
              size="mini"
              style="width: 50%;"
              placeholder="快递100 Key"
            >
            </el-input>
            <small class="text-secondary d-block">
              秘钥设置关系系统中api调用签名串的编码规则，以及会员token解析，请慎重设置，注意设置之后对应会员要求重新登录获取token
            </small>
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
          name: "全国统一邮费",
          type: 1,
          create_time: "2019-07-17 16:29:32",
          status: 1, // 启用
          order: 100,
        },
      ],
      form: {
        customer: "",
        key: "",
      },
    };
  },
  filters: {
    formatType(value) {
      let arr = ["按重量", "按件数"];
      return arr[value];
    },
  },
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
</style>
