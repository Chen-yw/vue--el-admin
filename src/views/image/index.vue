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
          <el-button
            type="warning"
            size="mini"
            @click="unChoose"
            v-if="chooseList.length > 0"
            >取消选中</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="imageDel({ all: true })"
            v-if="chooseList.length > 0"
            >批量删除</el-button
          >
          <el-button type="success" size="mini" @click="openAlbumModel()"
            >创建相册</el-button
          >
          <el-button type="warning" size="mini" @click="openUploadModel"
            >上传图片</el-button
          >
        </div>
      </el-header>

      <el-container>
        <!-- 侧部 -->
        <el-aside
          width="200px"
          style="position: absolute; top: 60px; left: 0; bottom: 60px;"
          class="bg-white border-right"
        >
          <!-- 侧边 | 相册列表 -->
          <ul class="list-group list-group-flush">
            <album-item
              v-for="(item, index) in albums"
              :key="index"
              :item="item"
              :index="index"
              :active="albumIndex === index"
              @albumChange="albumChange(index)"
              @albumDel="albumDel(index)"
              @openAlbumModel="openAlbumModel({ item, index })"
            ></album-item>
          </ul>
        </el-aside>

        <!-- 主内容 -->
        <el-main
          style="position: absolute; top: 60px; bottom: 60px; left: 200px; right: 0; "
        >
          <!-- 图片 -->
          <el-row :gutter="10">
            <el-col
              :span="24"
              :lg="4"
              :md="6"
              :sm="8"
              v-for="(item, index) in imageList"
              :key="index"
            >
              <div class="dateRange">
                <el-badge
                  :value="item.checkOrder"
                  :hidden="!item.isCheck"
                  :max="30"
                  class=""
                >
                  <el-card
                    class="box-card mb-3 position-relative"
                    :body-style="{ padding: 0 }"
                    shadow="hover"
                    style="cursor: pointer;"
                  >
                    <div
                      class="border"
                      :class="{ 'border-danger': item.isCheck }"
                    >
                      <img
                        :src="item.url"
                        class="w-100"
                        style=" height: 100px;"
                        @click="imageChoosed(item)"
                      />
                      <!-- 蒙板 -->
                      <div
                        style="background: rgba(0, 0, 0, 0.25); margin-top: -25px;"
                        class="w-100 text-white position-absolute px-1"
                      >
                        <span class="small">{{ item.name }}</span>
                      </div>
                      <div class="p-2 text-center">
                        <el-button-group>
                          <el-button
                            icon="el-icon-view"
                            size="mini"
                            class="p-2"
                            @click.stop="previewImage(item)"
                          ></el-button>
                          <el-button
                            icon="el-icon-edit"
                            size="mini"
                            class="p-2"
                            @click.stop="imageEdit(item, index)"
                          ></el-button>
                          <el-button
                            icon="el-icon-delete"
                            size="mini"
                            class="p-2"
                            @click.stop="imageDel({ index })"
                          ></el-button>
                        </el-button-group>
                      </div>
                    </div>
                  </el-card>
                </el-badge>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>

      <!-- 底部 -->
      <el-footer class="border-top d-flex align-items-center px-0">
        <div
          style="width: 200px; flex-shrink: 0"
          class="h-100 d-flex  align-items-center justify-content-center border-right"
        >
          <el-button-group>
            <el-button size="mini">上一页</el-button>
            <el-button size="mini">下一页</el-button>
          </el-button-group>
        </div>
        <div style="flex: 1" class="px-2">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </el-footer>
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

    <!-- 上传图片模态框 -->
    <el-dialog title="上传图片" :visible.sync="uploadModel">
      <div class="text-center">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadModel = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 预览图片模态框 -->
    <el-dialog :visible.sync="previewModel" width="60vw">
      <div style="margin: -60px -20px -30px -20px;">
        <img class="w-100 h-100" :src="previewUrl" alt="" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import albumItem from "../../components/image/albumItem";
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
      uploadModel: false,
      previewModel: false,
      imageList: [],
      previewUrl: null,
      // 选中数组
      chooseList: [],
      // 默认选中页
      currentPage: 1,
    };
  },
  components: {
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

      for (let i = 1; i <= 20; i++) {
        this.imageList.push({
          id: i,
          url: "https://dss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/skin/879.jpg?2",
          name: "图片" + i,
          isCheck: false,
          checkOrder: 0,
        });
      }
    },

    // 切换相册
    albumChange(index) {
      this.albumIndex = index;
    },

    // 删除相册并弹出提示弹框
    albumDel(index) {
      this.$confirm("是否永久删除该相册?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 删除相册
          this.albums.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

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

    // 发开上传图片的模态框
    openUploadModel() {
      this.uploadModel = true;
    },

    // 预览大图
    previewImage(item) {
      this.previewUrl = item.url;
      this.previewModel = true;
    },

    // 修改图片名称
    imageEdit(item, index) {
      this.$prompt("请输入图片的新名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name,
        // 校验函数
        inputValidator(val) {
          if (val === "") {
            return "图片名不能为空";
          }
        },
      })
        .then(({ value }) => {
          item.name = value;
          this.$message({
            type: "success",
            message: "修改成功！",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        });
    },

    // // 删除图片
    // imageDel(index) {
    //   this.$confirm("是否删除该图片？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //     this.imageList.splice(index, 1);
    //     this.$message({
    //       type: "success",
    //       message: "删除成功！",
    //     });
    //   });
    // },
    // 删除图片
    imageDel(obj) {
      this.$confirm(
        obj.all ? "是否删除选中图片？" : "是否删除选该图片？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        if (obj.all) {
          // 批量删除
          let list = this.imageList.filter((img) => {
            return !this.chooseList.some((c) => c.id === img.id);
          });
          this.imageList = list;
          this.chooseList = [];
        } else {
          this.imageList.splice(obj.index, 1);
        }

        this.$message({
          type: "success",
          message: "删除成功！",
        });
      });
    },

    // 选中图片
    imageChoosed(item) {
      if (!item.isCheck) {
        // 将选中照片加入到相应的数组中
        this.chooseList.push({ id: item.id, url: item.url });
        // 计算选中的序号
        item.checkOrder = this.chooseList.length;
        // 修改照片状态
        item.isCheck = true;
      } else {
        // 找到当前被点击照片在chooseList中的索引，删除
        let n = this.chooseList.findIndex((v) => v.id === item.id);
        if (n === -1) {
          return;
        } else {
          // 重新就算序号
          let length = this.chooseList.length;
          if (n + 1 < length) {
            for (let i = n; i < length; i++) {
              let no = this.imageList.findIndex(
                (v) => v.id === this.chooseList[i].id
              );
              if (no > -1) {
                this.imageList[no].checkOrder--;
              }
            }
          }
        }
        // 删除
        this.chooseList.splice(n, 1);
        // 修改状态、重置序号
        item.isCheck = false;
        item.checkOrder = 0;
      }
    },

    // 取消选中
    unChoose() {
      // 找到所有imageList中选中的图片
      this.imageList.forEach((img) => {
        let i = this.chooseList.findIndex((c) => c.id === img.id);
        if (i > -1) {
          // 取消选中状态，排序归零
          img.isCheck = false;
          img.checkOrder = 0;
          this.chooseList.splice(i, 1);
        }
      });
    },
    // 批量删除
    /* imageDelAll() {
      this.$confirm("是否删除选中的所有图片？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // for (let i = 0; i < this.chooseList.length; i++) {
        //   let x = this.imageList.findIndex(
        //     (v) => v.id === this.chooseList[i].id
        //   );
        //   this.imageList.splice(x, 1);
        // }
        let list = this.imageList.filter((img) => {
          return !this.chooseList.some((c) => c.id === img.id);
        });
        this.imageList = list;
        this.chooseList = [];
        this.$message({
          type: "success",
          message: "删除成功！",
        });
      });
    },
   */

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style scoped>
.dateRange >>> .el-badge__content {
  margin: 3px 6px;
  z-index: 1;
}
</style>
