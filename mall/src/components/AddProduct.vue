<template>
  <el-row type="flex" justify="center">
    <el-col :span="6">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商品名称">
          <el-input v-model="form.skuName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品编码">
          <el-input v-model="form.skuCode" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.skuPrice" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="form.skuNum" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品简介">
          <el-input type="textarea" v-model="form.skuBulletin" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-input type="textarea" v-model="form.skuSpecification" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="form.skuDescription" size="mini"></el-input>
        </el-form-item>
        &nbsp;&nbsp;&nbsp;<span style="font-weight: bold;color: gray;">商品分类</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-cascader
        :options="options" :props="{expandTrigger:'hover'}" style="margin-bottom: 20px;" @change="change"
        filterable></el-cascader>
        <template>
          <Upload
            multiple
            type="drag"
            action="http://localhost:8081/mall/upload" name="file" :on-success="handleSuccess">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>Click or drag files here to upload</p>
            </div>
          </Upload>
        </template>
        <el-form-item>
          <el-button type="primary" @click="addProduct">立即添加</el-button>
          <el-button>取消</el-button>
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
          skuName: '',
          skuCode: '',
          skuPrice: '',
          skuDescription: '',
          skuSpecification: '',
          skuBulletin: '',
          skuNum: 0,
          skuCategory: 0,
          skuImage: ''
        },
        options: []
      }
    },
    created() {
      this.$http.get('/findNestedCategory').then(result => {
        this.options = result.data
      })
    },
    methods: {
      addProduct: function () {
        this.$http.post('/addProduct', {
          skuName: this.form.skuName,
          skuCode: this.form.skuCode,
          skuPrice: this.form.skuPrice,
          skuSpecification: this.form.skuSpecification,
          skuBulletin: this.form.skuBulletin,
          skuDescription: this.form.skuDescription,
          skuNum: this.form.skuNum,
          skuCategory: this.form.skuCategory,
          skuImage: this.form.skuImage
        }).then(result => {
          this.$message('添加成功')
        })
      },
      upload: function (file) {
        alert(this.form.skuImage)
        let formData = new FormData()
        formData.append('file', file)
        this.$http.post('/addProduct', formData, {'ContentType': 'multipart/form-data'}).then(result => {
          this.form.skuImage = result.data
        })
      },
      handleSuccess: function (response, file, fileList) {
        this.form.skuImage = response
      },
      change: function (val) {
        let values = (val + '').split(',')
        this.form.skuCategory = parseInt(values[values.length - 1])
      }
    }
  }
</script>
