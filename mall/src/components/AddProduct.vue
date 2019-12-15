<template>
  <el-row type="flex" justify="center">
    <el-col :span="20">
      <el-form ref="form" :model="form" label-width="100px">
        <table>
          <tr>
            <td>
              <el-form-item label="商品名称">
                <el-input v-model="form.skuName" size="mini"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="商品编码">
                <el-input v-model="form.skuCode" size="mini"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="商品库存">
                <el-input v-model="form.skuNum" size="mini"></el-input>
              </el-form-item>
            </td>
            <td>
              <Upload
                action="http://localhost:8081/mall/upload"
                style="margin-left:100px;margin-bottom:20px;"
                name="file"
                :on-success="handleSmallImage"
              >
                <Button icon="ios-cloud-upload-outline">商品缩略图</Button>
              </Upload>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="商品售价">
                <el-input v-model="form.skuPrice"></el-input>
              </el-form-item>
            </td>
            <td>
              <span style="font-weight: bold;color: gray;margin-left:35px;">商品分类</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-cascader
                :options="options"
                :props="{expandTrigger:'hover'}"
                style="margin-bottom: 20px;"
                @change="change"
                filterable
              ></el-cascader>
            </td>
          </tr>
        </table>
        <el-form-item label="商品简介">
          <el-input type="textarea" v-model="form.skuBulletin" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-input type="textarea" v-model="form.skuSpecification" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="form.skuDescription" size="mini"></el-input>
        </el-form-item>&nbsp;&nbsp;&nbsp;
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
              <p>商品介绍图片</p>
            </div>
          </Upload>
        </template>
        <el-form-item>
          <el-button type="primary" @click="addProduct">立即添加</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      form: {
        skuName: "",
        skuCode: "",
        skuPrice: "",
        skuDescription: "",
        skuSpecification: "",
        skuBulletin: "",
        skuNum: 0,
        skuCategory: 0,
        skuImage: "",
        retailerId: this.$store.state.retailer.id,
        introduceImages: ""
      },
      options: []
    };
  },
  created() {
    this.$http.post("/findNestedCategory", { level: 3 }).then(result => {
      this.options = result.data;
    });
  },
  methods: {
    addProduct: function() {
      this.$http
        .post("/addProduct", {
          skuName: this.form.skuName,
          skuCode: this.form.skuCode,
          skuPrice: this.form.skuPrice,
          skuSpecification: this.form.skuSpecification,
          skuBulletin: this.form.skuBulletin,
          skuDescription: this.form.skuDescription,
          skuNum: this.form.skuNum,
          skuCategory: this.form.skuCategory,
          skuImage: this.form.skuImage,
          retailerId: this.form.retailerId,
          introduceImages: this.form.introduceImages
        })
        .then(result => {
          this.$message("添加成功");
        });
    },
    handleSuccess: function(response, file, fileList) {
      this.form.introduceImages += response + ",";
    },
    change: function(val) {
      let values = (val + "").split(",");
      this.form.skuCategory = parseInt(values[values.length - 1]);
    },
    reset: function() {
      this.$refs["form"].resetFields();
    },
    handleSmallImage: function(response, file, fileList) {
      this.form.skuImage = response;
    }
  }
};
</script>
