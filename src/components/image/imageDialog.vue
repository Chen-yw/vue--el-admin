<template>
  <!-- 选择图片弹出层 -->

  <div>
    <el-dialog title="提示" :visible.sync="imageModel" width="80%" top="4vh">
      <el-container
        style="height: 70vh; position: relative; margin: -30px -20px"
      >
        <!-- 头部 -->
        <el-header class="d-flex align-items-center border-bottom">
          <div class="d-flex">
            <el-select
              v-model="formOption.order"
              placeholder="请选择图片排序方式"
              size="mini"
              style="width: 150px; margin-left: 200px;"
              class="mr-2"
            >
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
            <el-input
              v-model="formOption.keyWord"
              class="mr-2"
              style="width: 150px; "
              size="mini"
              placeholder="输入相册名称"
            ></el-input>
            <el-button type="success" size="mini">搜索</el-button>
          </div>
          <div class="d-flex ml-4">
            <el-button
              type="warning"
              size="mini"
              @click="unChoose"
              v-if="chooseList.length > 0"
              >取消选中</el-button
            >
            <!-- <el-button
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
            > -->
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
                :showOptions="false"
                @albumChange="albumChange(index)"
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
                            <!-- <el-button
                              icon="el-icon-edit"
                              size="mini"
                              class="p-2"
                              @click.stop="imageEdit(item, index)"
                            ></el-button> -->
                            <!-- <el-button
                              icon="el-icon-delete"
                              size="mini"
                              class="p-2"
                              @click.stop="imageDel({ index })"
                            ></el-button> -->
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

      <span slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
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
import albumItem from "components/image/albumItem";
export default {
  name: "imageDialog",
  props: {
    // 选中图片数量限制
    max: {
      type: Number,
      default: 9,
    },
  },
  data() {
    return {
      imageModel: false, // 隐藏选择图片
      callback: false, // 接收函数字段
      // 弹窗相册的字段
      formOption: {
        order: "",
        keyWord: "",
      },
      albumIndex: 0,
      albums: [], // 相册数组
      imageList: [], // 图片数组
      previewUrl: null,
      previewModel: false, // 预览大图
      chooseList: [], // 选中数组
      currentPage: 1, // 默认选中页
    };
  },
  components: {
    albumItem,
  },
  created() {
    this.__init();
  },
  methods: {
    // 打开弹出层
    chooseImage(callback) {
      this.unChoose(); // 取消选中
      this.callback = callback;
      this.imageModel = true;
    },

    // 确定
    confirm() {
      // 选中图片的url
      if (typeof this.callback === "function") {
        if (this.chooseList.length === 0) {
          return this.$message({
            message: "请选择图片或点击取消按钮",
            type: "warning",
          });
        }
        this.callback(this.chooseList);
      }
      // 隐藏
      this.hide();
    },

    // 隐藏弹出层
    hide() {
      this.imageModel = false;
      this.callback = false;
    },

    // 初始化虚拟数据
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
      // 限制选中数量
      if (this.chooseList.length >= this.max && !item.isCheck) {
        return this.$message({
          message: "最多选择" + this.max + "张图片",
          type: "warning",
        });
      }
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

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style scoped></style>
