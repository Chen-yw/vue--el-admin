<template>
  <div>
    <!-- <el-container class="container"> -->
    <!-- <el-main> -->
    <el-row type="flex" justify="space-around" class="el-row">
      <el-col :xs="14" :sm="10" :md="11" :lg="6" :xl="6">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <h3 style="color: slategray;">{{ $conf.logo }}</h3>
          </div>
          <div class="card-body">
            <el-form ref="form" :model="form" :rules="rules">
              <el-form-item prop="username">
                <el-input
                  v-model="form.username"
                  size="medium"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="form.password"
                  size="medium"
                  type="password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="width: 100%;"
                  type="primary"
                  size="medium"
                  @click="submitForm('form')"
                  :loading="loading"
                  >{{ loading ? "登录中..." : "立即登录" }}</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- </el-main> -->
    <!-- </el-container> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["adminIndex"]),
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((e) => {
        if (!e) return;
        this.loading = true;
        // 提交表单
        this.axios
          .post("/admin/login", this.form, {
            loading: true,
          })
          .then((res) => {
            // 存储到vuex
            let data = res.data.data;
            // 存储到本地存储
            this.$store.commit("login", data);
            // 存储权限规则
            if (data.role && data.role.rules) {
              window.sessionStorage.setItem(
                "rules",
                JSON.stringify(data.role.rules)
              );
            }

            // 生成后台菜单
            this.$store.commit("createNavBar", data.tree);
            // 成功提示
            this.$message("登录成功！");
            this.loading = false;
            // 跳转后台菜单首页
            this.$router.push({ name: this.adminIndex });
          })
          .catch((err) => {
            this.loading = false;
          });
      });
    },
  },
};
</script>
<style scoped>
.el-row {
  width: 100%;
  margin-top: 200px;
}
.box-card {
  /* width: 500px; */
}
.card-header {
  text-align: center;
}
</style>
