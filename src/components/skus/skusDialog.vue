<template>
  <!-- 选择选择弹出层 -->

  <el-dialog
    title="商品规格选择"
    :visible.sync="createModel"
    width="80%"
    top="4vh"
  >
    <el-container style="height: 70vh; position: relative; margin: -30px -20px">
      <el-container>
        <!-- 侧部 -->
        <el-aside
          width="200px"
          style="position: absolute; top: 0px; left: 0; bottom: 50px;"
          class="bg-white border-right"
        >
          <!-- 侧边 | 规格卡片标题 -->
          <ul class="list-group list-group-flush ">
            <li
              class="list-group-item list-group-item-action "
              v-for="(item, index) in skusList"
              :key="index"
              :class="skuIndex === index ? 'sum-active' : ''"
              @click="chooseSku(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </el-aside>
        <!-- 底部分页 -->
        <el-footer
          style="position: absolute;left: 0;bottom: 0;width: 200px; height: 50px;"
          class="border d-flex align-items-center justify-content-center"
        >
          <el-pagination
            :current-page="page.current"
            :page-sizes="page.sizes"
            :page-size="page.size"
            layout="prev,next"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-footer>

        <!-- 主内容 -->
        <el-container>
          <el-header
            style="position: absolute; top: 0px; bottom: 0px; left: 200px; right: 0; line-height: 60px;"
            class="border-top border-bottom"
          >
            <el-button type="primary" size="mini" @click="doChooseAll">{{
              isChooseAll ? "取消全选" : "全选"
            }}</el-button>
          </el-header>

          <!-- 图片 -->
          <el-main
            style="position: absolute; top: 60px; bottom: 0px; left: 200px; right: 0; "
          >
            <div class="d-flex flex-wrap">
              <span
                class="border rounded py-1 px-2 m-2 "
                style="cursor: pointer;"
                v-for="(item, index) in skuItems"
                :key="index"
                :class="item.ischeck ? 'sum-active' : ''"
                @click="choose(item)"
                >{{ item.name }}</span
              >
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>

    <span slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>

  <!-- 预览图片模态框 -->
  <!-- <el-dialog :visible.sync="previewModel" width="60vw">
      <div style="margin: -60px -20px -30px -20px;">
        <img class="w-100 h-100" :src="previewUrl" alt="" />
      </div>
    </el-dialog> -->
</template>

<script>
import { table_page_Mixin } from "common/mixin.js";
export default {
  name: "skusDialog",
  mixins: [table_page_Mixin],
  data() {
    return {
      preUrl: "skus",
      loading: false, //关闭layout的loading
      createModel: false, // 隐藏选择图片
      callback: false, // 接收函数字段
      chooseList: [], // 选中数组
      // 数据
      skuIndex: 0, // 被操作规格卡片索引
      // 规格卡片列表
      skusList: [
        // {
        //   name: "色调", // 规格名称
        //   type: 0, // 规格类型 0无 1颜色 2图片
        //   // 规格属性列表
        //   list: [
        //     {
        //       id: "1",
        //       name: "蓝色",
        //       color: "",
        //       image: "",
        //       ischeck: false,
        //     },
        //     {
        //       id: "2",
        //       name: "黄色",
        //       color: "",
        //       image: "",
        //       ischeck: false,
        //     },
        //   ],
        // },
        // {
        //   name: "尺寸", // 规格名称
        //   type: 0, // 规格类型 0无 1颜色 2图片
        //   // 规格属性列表
        //   list: [
        //     {
        //       id: "3",
        //       name: "XL",
        //       color: "",
        //       image: "",
        //       ischeck: false,
        //     },
        //     {
        //       id: "4",
        //       name: "XXL",
        //       color: "",
        //       image: "",
        //       ischeck: false,
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {
    // 当前规格卡片下的属性列表
    skuItems() {
      let item = this.skusList[this.skuIndex];
      return item ? item.list : [];
    },

    // 是否全选规格卡片上的规格属性
    isChooseAll() {
      return this.skuItems.length === this.chooseList.length;
    },
  },
  created() {},
  methods: {
    // 处理请求结果
    getListResult(data) {
      this.skusList = data.list.map((item) => {
        let list = item.default ? item.default.split(",") : [];
        item.list = list.map((v) => {
          return {
            name: v,
            color: "",
            image: "",
            ischeck: false,
          };
        });
        return item;
      });
    },

    // 打开弹出层
    chooseSkus(callback) {
      this.callback = callback;
      this.createModel = true;
    },

    // 确定
    confirm() {
      // 选中图片的sku
      if (typeof this.callback === "function") {
        let item = this.skusList[this.skuIndex];
        this.callback({
          id: item.id,
          name: item.name,
          type: item.type,
          list: this.chooseList,
        });
        // this.chooseList = [];
      }
      // 隐藏
      this.hide();
    },

    // 隐藏弹出层
    hide() {
      this.unChooseAll();
      this.createModel = false;
      this.callback = false;
    },

    // 切换规格卡片
    chooseSku(index) {
      this.unChooseAll();
      this.skuIndex = index;
    },

    // 规格卡片选中的属性
    choose(item) {
      if (!item.ischeck) {
        // 加入选中列表
        let list = [];
        list.push(item);
        // this.chooseList.push({
        //   list,
        // });
        this.chooseList.push(item);
        return (item.ischeck = true);
      }
      // 之前被选中 找到当前对象在chooseList中的索引
      let index = this.chooseList.findIndex((v) => {
        return v.id === item.id;
      });
      if (index < 0) {
        return;
      }
      // 从选中列表中移除
      this.chooseList.splice(index, 1);
      // 修改选中状态
      item.ischeck = false;
    },

    // 选中/取消选中
    doChooseAll() {
      let list = this.skusList[this.skuIndex].list; // 拿到相应规格卡片的属性列表
      // 已经全选
      if (this.isChooseAll) {
        // true 取消全选
        return this.unChooseAll();
      }
      // 未全选时全选
      this.chooseList = list.map((v) => {
        v.ischeck = true;
        return v;
      });
    },

    // 取消全选
    unChooseAll() {
      let list = this.skusList[this.skuIndex].list; // 拿到相应规格卡片的属性列表
      list.forEach((val) => {
        val.ischeck = false; // 取消规格属性选中状态
      });
      return (this.chooseList = []); // 清空选中列表
    },
  },
};
</script>
<style scoped>
.sum-active {
  color: white;
  background-color: teal;
}
</style>
