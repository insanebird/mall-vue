<template>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <div style="margin-top:200px;">
        <h3 style="text-align: center">Sign In</h3>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
          <el-form-item label="用户名">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
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
      return {
        ruleForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      submitForm: function () {
        this.$http.post('/signIn', {
          username: this.ruleForm.username,
          password: this.ruleForm.password
        }).then(result => {
          this.$router.push('/')
        })
      },
      resetForm: function (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
