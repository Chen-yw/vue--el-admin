export const toStringFilter = {
  filters: {
    numToString(value) {
      return value.toString();
    },
  },
};

// 分页，表格混入
export const table_page_Mixin = {
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
      loading: true, //true 默认开启layout的loading
    };
  },
  computed: {
    // 表格选中行id组成的数组
    ids() {
      return this.multipleSelection.map((item) => {
        return item.id;
      });
    },
  },
  created() {
    this.getList();
  },
  methods: {
    // 展示loading
    showLoading() {
      if (this.loading) {
        this.layout.showLoading();
      }
    },

    // 隐藏loading
    hideLoading() {
      if (this.loading) {
        this.layout.hideLoading();
      }
    },

    // 获取请求列表分页的url
    getListUrl() {
      return `/admin/${this.preUrl}/${this.page.current}?limit=${this.page.size}`;
    },

    // 请求数据
    getList() {
      if (this.preUrl === "") return;
      this.showLoading();
      let url = this.getListUrl();
      this.axios
        .get(url, { token: true })
        .then((res) => {
          let data = res.data.data;
          this.page.total = data.totalCount;
          this.getListResult(data);
          this.hideLoading();
        })
        .catch((err) => {
          this.hideLoading();
        });
    },

    // 处理请求结果， 可以在引入页面中重写
    getListResult(data) {
      // this.tableData = data.list;
    },

    // 监听表格项的选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 表格中 添加/修改
    addOrEdit(data, id = 0) {
      // id = 0 添加操作
      let msg = id > 0 ? "修改成功！" : "添加成功";
      let url =
        id > 0 ? `/admin/${this.preUrl}/${id}` : `/admin/${this.preUrl}`;
      this.showLoading();
      this.axios
        .post(url, data, { token: true })
        .then((res) => {
          this.$message({
            type: "success",
            message: msg,
          });
          this.getList();
          this.hideLoading();
        })
        .catch((err) => {
          this.hideLoading();
        });
    },

    // 修改状态 启用/禁用
    changeStatus(item) {
      console.log("禁用/启用");
      let status = item.status === 1 ? 0 : 1;
      this.showLoading();
      this.axios
        .post(
          `/admin/${this.preUrl}/${item.id}/update_status`,
          {
            status: status,
          },
          { token: true }
        )
        .then((res) => {
          item.status = status;
          this.$message({
            message: item.status !== 1 ? "启用成功！" : "禁用成功！",
            type: "success",
          });
          this.hideLoading();
        })
        .catch((err) => {
          this.hideLoading();
        });
    },

    // 删除单个
    delectItem(scope) {
      console.log("删除单个");
      this.$confirm("是否要删除该规格？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring",
      }).then(() => {
        // this.tableData.splice(scope.$index, 1);
        this.showLoading();
        this.axios
          .post(`/admin/${this.preUrl}/${scope.id}/delete`, {}, { token: true })
          .then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功！",
            });
            this.getList();
            this.hideLoading();
          })
          .catch((err) => {
            console.log(err);
            this.hideLoading();
          });
      });
    },

    deleteAll() {
      console.log("批量删除");
      if (this.ids.length === 0) {
        return this.$message({
          type: "warning",
          message: "请先选择需要删除的数据！",
        });
      }
      this.$confirm("是否要删除该规格？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring",
      }).then(() => {
        this.showLoading();
        this.axios
          .post(
            `/admin/${this.preUrl}/delete_all`,
            {
              ids: this.ids,
            },
            { token: true }
          )
          .then((res) => {
            this.multipleSelection = [];
            this.$message({
              type: "success",
              message: "删除成功！",
            });
            this.getList();
            this.hideLoading();
          })
          .catch((err) => {
            this.hideLoading();
          });
      });
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
