<template>
  <div>
    <table
      width="400"
      height="500"
      style="margin-left:100px;margin-top:100px;border-radius:10px;border:solid 5px gray;"
    >
      <tr>
        <td>店铺商标：</td>
        <td>
          <el-image :src="seller.logo" style="width:100px;height:100px;"></el-image>
          <br />
          <el-button type="primary" size="mini" @click="changeInformation">修改店铺信息</el-button>
        </td>
      </tr>
      <tr>
        <td>店铺名称：</td>
        <td>
          <el-input v-model="seller.name" :disabled="true"></el-input>
        </td>
      </tr>
      <tr>
        <td>店铺创始人：</td>
        <td>
          <span>{{seller.founderName}}</span>
        </td>
      </tr>
      <tr>
        <td>店铺创建时间：</td>
        <td>
          <span>{{seller.displayTime}}</span>
        </td>
      </tr>
      <tr>
        <td>店铺简介：</td>
        <td>
          <span>{{seller.description}}</span>
        </td>
      </tr>
      <tr>
        <td>评价：</td>
        <td>
          <el-rate v-model="seller.rate" disabled></el-rate>
        </td>
      </tr>
    </table>
    <el-dialog title="修改店铺信息" :visible.sync="retailerInformation">
      <el-form :model="form">
        <el-form-item label="店铺名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <Upload action="http://localhost:8081/mall/upload" name="file" :on-success="handleSuccess">
        <Button icon="ios-cloud-upload-outline">店铺LOGO</Button>
      </Upload>
      <el-button type="primary" @click="changeRetailerInformation">提交</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seller: {},
      form: {
        name: "",
        description: "",
        logo: ""
      },
      retailerInformation: false
    };
  },
  created() {
    this.$http
      .post("/getRetailerByFounder", { founder: this.$store.state.user.id })
      .then(result => {
        this.seller = result.data;
      });
  },
  methods: {
    handleSuccess: function(response, file, fileList) {
      this.form.logo = response;
    },
    changeRetailerInformation: function() {
      this.$http
        .post("/changeRetailerInformation", {
          id: this.seller.id,
          name: this.form.name,
          description: this.form.description,
          logo: this.form.logo
        })
        .then(result => {
          this.seller = result.data;
          this.$store.state.retailer = result.data;
          this.$message("修改成功");
          this.retailerInformation = false;
        });
    },
    changeInformation: function() {
      this.retailerInformation = true;
    }
  }
};
</script>