export const toStringFilter = {
  filters: {
    numToString(value) {
      return value.toString();
    },
  },
};

export const shopTableMixin = {
  data() {
    return {
      preUrl: "",
      page: {
        current: 1, //当前页码
        size: 10, //每页默认显示数量
        sizes: [10, 20, 50, 100], // 每页显示条数的可选项
        total: 10, // 总条数
      },
      multipleSelection: [],
    };
  },
  created() {
    console.log("mixin created");
    this.getList();
  },
  methods: {
    // 请求数据
    getList() {
      if (this.preUrl === "") {
        return;
      }
      this.layout.showLoading();
      let url = `/admin/${this.preUrl}/${this.page.current}?limit=${this.page.size}`;
      this.axios
        .get(url, { token: true })
        .then((res) => {
          let data = res.data.data;
          this.tableData = data.list;
          this.page.total = data.totalCount;
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });
    },

    // 监听表格项的选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 分页 每页条数变化
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.size = val;
      this.getList();
    },

    // 分页 当前页码改变
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page.current = val;
      this.getList();
    },
  },
};
