export default {
  // namespaced: true, // 命名空间
  state: {
    title: "",
    category: [],
    desc: "",
    unit: "",
    stock: 0,
    min_stock: 0,
    display_stock: 0,
    status: 0,
    express: "",
    skus_type: 1,
  },
  getters: {},
  mutations: {
    // 修改state中的数据
    vModelState(state, { key, value }) {
      state[key] = value;
    },
  },
  actions: {},
};
