<template>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <el-form ref="form" :model="form" :rules="rules" status-icon>
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="form.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介">
          <el-input v-model="form.description" type="text"></el-input>
        </el-form-item>
        <template>
          <Upload
            multiple
            type="drag"
            action="http://localhost:8081/mall/upload"
            name="file"
            :on-success="handleSuccess"
          >
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>店铺LOGO,点击或拖拽上传</p>
            </div>
          </Upload>
        </template>
        <el-form-item>
          <el-button type="primary" @click="submit">立即提交</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("店铺名称不能为空"));
      }
      setTimeout(async () => {
        var flag = true;
        await this.$http
          .post("/checkRetailer", { name: this.form.name })
          .then(result => {
            flag = result.data;
          });
        if (flag == false) {
          return callback(new Error("店铺名称已存在"));
        } else {
          return callback();
        }
      }, 1000);
    };
    return {
      form: {
        name: "",
        description: "",
        logo: ""
      },
      rules: {
        name: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSuccess: function(response, file, fileList) {
      this.form.logo = response;
    },
    submit: function() {
      this.$http
        .post("/toBeRetailer", { id: this.$store.state.user.id })
        .then(result => {
          this.$store.state.user = result.data;
        });
      this.$http
        .post("/addRetailer", {
          name: this.form.name,
          description: this.form.description,
          logo: this.form.logo,
          founder: this.$store.state.user.id,
          founderName: this.$store.state.user.username
        })
        .then(result => {
          this.$router.push("/myShop");
          this.$store.state.retailer = result.data;
        });
    },
    reset: function() {
      this.$refs["form"].resetFields();
    }
  }
};
</script>
