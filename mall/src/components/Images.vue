<template>
  <div>
    <Upload
      multiple
      type="drag"
      action="http://localhost:8081/mall/upload"
      name="file"
      :on-success="handleSuccess"
    >
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>上传轮播图</p>
      </div>
    </Upload>
    <el-radio-group v-model="type">
      <el-radio :label="0">横向</el-radio>
      <el-radio :label="1">纵向</el-radio>
    </el-radio-group>
    <br />
    <el-button type="primary" @click="changeImages">确认</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: "",
      type: 0
    };
  },
  methods: {
    handleSuccess: function(response, file, fileList) {
      this.images += response + ",";
    },
    changeImages: function() {
      this.$http
        .post("/addRotationChart", { images: this.images, type: this.type })
        .then(result => {
          this.$message("修改成功");
        });
    }
  }
};
</script>