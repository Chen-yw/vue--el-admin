import $Util from "common/util";

export default {
  // namespaced: true, // 命名空间
  state: {
    title: "", // 商品名称
    category: [], // 商品分类
    desc: "", // 商品描述
    unit: "", // 单位
    stock: 0, // 总库存
    min_stock: 0, // 库存预警
    display_stock: 0, // 库存显示 0隐藏 1显示
    status: 0, // 是否上架 0仓库 1上架
    express: "", // 运费模板
    skus_type: 1, // sku类型：0单规格 1多规格

    banners: [], // 商品大图

    oprice: 0, // 市场价格
    pprice: 0, // 销售价格
    cprice: 0, // 成本价格
    weight: 0, // 重量
    volume: 0, // 体积

    // 规格卡片
    sku_card: [
      {
        name: "色调", // 规格名称
        type: 0, // 规格类型 0无 1颜色 2图片
        // 规格属性列表
        list: [
          {
            name: "蓝色",
            color: "",
            image: "",
          },
          {
            name: "黄色",
            color: "",
            image: "",
          },
        ],
      },
    ],

    goods_type_id: "", // 商品类型
    discount: 0, // 折扣

    // 商品属性
    goods_attrs: {
      phone_model: "",
    },

    // 表头
    ths: [
      { name: "商品规格", rowspan: 1, colspan: 1, width: "" },
      { name: "sku图片", rowspan: 2, width: "60" },
      { name: "销售价", rowspan: 2, width: "100" },
      { name: "市场价", rowspan: 2, width: "100" },
      { name: "成本价", rowspan: 2, width: "100" },
      { name: "库存", rowspan: 2, width: "100" },
      { name: "体积", rowspan: 2, width: "100" },
      { name: "重量", rowspan: 2, width: "100" },
      { name: "编码", rowspan: 2, width: "100" },
    ],
  },
  getters: {},
  mutations: {
    // 修改state中的数据
    vModelState(state, { key, value }) {
      state[key] = value;
    },

    // 增加规格卡片
    addSkuCard(state) {
      state.sku_card.push({
        name: "规格名称",
        type: 0,
        list: [],
      });
    },

    // 删除规格卡片
    delSkuCark(state, index) {
      state.sku_card.splice(index, 1);
    },

    // 修改卡片数据
    vModelSkuCard(state, { index, key, value }) {
      state.sku_card[index][key] = value;
    },

    // 规格卡片排序
    // sortSkuCard(state, index) {
    //   // 上移
    //   $Util.moveUp(state.sku_card, index);
    // },
    sortSkuCard(state, { action, index }) {
      // 上移
      $Util[action](state.sku_card, index);
    },

    // 增加规格卡片的规格属性
    addSkuValue(state, index) {
      state.sku_card[index].list.push({
        name: "属性名",
        color: "",
        image: "",
      });
    },

    // 删除指定规格卡片的规格属性
    delSkuValue(state, { index, indey }) {
      state.sku_card[index].list.splice(indey, 1);
    },

    // 修改规格卡片的规格属性
    updateSkuValue(state, { index, indey, key, val }) {
      state.sku_card[index].list[indey][key] = val;
    },

    // 排序规格卡片的规格属性列表
    sortSkuValue(state, { index, value }) {
      state.sku_card[index].list = value;
      console.log(state.sku_card[index]);
    },
  },
  actions: {},
};
