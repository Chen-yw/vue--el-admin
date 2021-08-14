<template>
  <div>
    <el-container
      style="position: absolute; top: 55px; bottom: 0;left: 0;right: 0;"
    >
      <!-- 头部 -->
      <el-header class="d-flex align-items-center border-bottom">
        <div class="d-flex mr-auto">
          <el-select
            v-model="formOption.order"
            placeholder="请选择图片排序方式"
            size="mini"
            style="width: 150px;"
            class="mr-2"
          >
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
          <el-input
            v-model="formOption.keyWord"
            class="mr-2"
            style="width: 150px;"
            size="mini"
            placeholder="输入相册名称"
          ></el-input>
          <el-button type="success" size="mini">搜索</el-button>
        </div>
        <div class="d-flex">
          <el-button type="success" size="mini" @click="openAlbumModel()"
            >创建相册</el-button
          >
          <el-button type="warning" size="mini">上传图片</el-button>
        </div>
      </el-header>

      <el-container>
        <el-aside
          width="200px"
          style="position: absolute; top: 60px; left: 0; bottom: 60px;"
          class="bg-white border-right"
        >
          <!-- 侧边 | 相册列表 -->
          <ul class="list-group list-group-flush">
            <album-item @openAlbumModel="openAlbumModel(obj)"></album-item>
          </ul>
        </el-aside>

        <!-- 主内容 -->
        <el-main
          width="100% - 200px"
          style="position: absolute; top: 60px; bottom: 60px; left: 200px; right: 0; "
        >
          Main
          <div style="height: 1000px;"></div>
        </el-main>
      </el-container>

      <!-- 底部 -->
      <el-footer>Footer</el-footer>
    </el-container>

    <!-- 修改相册 | 创建相册 模态框-->
    <el-dialog :title="albumForm.title" :visible.sync="albumModel">
      <el-form :model="albumForm" label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="albumForm.name"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number
            v-model="albumForm.order"
            :min="0"
            size="medium"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="albumModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import albumItem from "@/components/image/albumItem";
export default {
  name: "index",
  data() {
    return {
      formOption: {
        order: "",
        keyWord: "",
      },
      albumIndex: 0,
      albumModel: false,
      albums: [],
      albumForm: {
        title: "",
        name: "",
        order: 0,
      },
      albumEditIndex: -1,
    };
  },
  compoenets: {
    albumItem,
  },
  created() {
    this.__init();
  },
  methods: {
    __init() {
      for (let i = 1; i <= 10; i++) {
        this.albums.push({
          name: "相册" + i,
          num: Math.floor(Math.random() * 100),
          order: 0,
        });
      }
    },

    // 删除相册并弹出提示弹框
    // albumDel(index) {
    //   this.$confirm("是否永久删除该相册?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!",
    //       });
    //       // 删除相册
    //       this.albums.splice(index, 1);
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },

    // 打开修改或创建相册的模态框
    openAlbumModel(obj) {
      // 修改
      if (obj) {
        let { item, index } = obj;
        // 初始化表单
        this.albumForm.title = "修改相册";
        this.albumForm.name = item.name;
        this.albumForm.order = item.order;
        this.albumEditIndex = index;
        // 打开模态框
        return (this.albumModel = true);
      } else {
        // 创建
        this.albumForm = {
          title: "创建相册",
          name: "",
          order: 0,
        };
        this.albumEditIndex = -1;
        this.albumModel = true;
      }
    },

    // 点击模态框按钮创建或修改相册
    confirmAlbumModel() {
      // 判断是否为修改  albumEditIndex > -1 为修改相册
      if (this.albumEditIndex > -1) {
        this.albumEdit();
        return (this.albumModel = false);
      } else {
        // 创建相册
        this.albums.unshift({
          name: this.albumForm.name,
          order: this.albumForm.order,
          num: 0,
        });
        this.albumModel = false;
      }
    },

    // 修改相册
    albumEdit() {
      this.albums[this.albumEditIndex].name = this.albumForm.name;
      this.albums[this.albumEditIndex].order = this.albumForm.order;
    },
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  color: #333;
}

.el-aside {
  color: #333;
}

.el-main {
  color: #333;
}
</style>
