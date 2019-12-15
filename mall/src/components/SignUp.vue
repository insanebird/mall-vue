<template>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <div style="margin-top:200px;">
        <h3 style="text-align: center">Sign Up</h3>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(async () => {
        var flag = true;
        await this.$http
          .post("/check", { username: this.ruleForm.username })
          .then(result => {
            flag = result.data;
          });
        if (flag == false) {
          return callback(new Error("用户名已存在"));
        } else {
          return callback();
        }
      }, 1000);
    };
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/addUser", {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
            .then(result => {
              this.$store.state.user = result.data;
              this.$router.push("/");
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
