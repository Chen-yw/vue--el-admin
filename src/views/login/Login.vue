<template>
  <div>
    <!-- <el-container class="container"> -->
    <!-- <el-main> -->
    <el-row type="flex" justify="space-around" class="el-row">
      <el-col :xs="14" :sm="10" :md="13" :lg="6" :xl="6">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <h3 style="color: slategray;">UNI-ADMIN</h3>
          </div>
          <div class="card-body">
            <el-form ref="form" :model="form" :rules="rules">
              <el-form-item prop="userName">
                <el-input
                  v-model="form.userName"
                  size="medium"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item prop="passWord">
                <el-input
                  v-model="form.passWord"
                  size="medium"
                  type="passWord"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="width: 100%;"
                  type="primary"
                  size="medium"
                  @click="submitForm('form')"
                  >登录</el-button
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
export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        passWord: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push({ name: "home" });
          alert("登录成功！");
        } else {
          console.log("error submit!!");
          alert("用户名或密码错误！");
          return false;
        }
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
