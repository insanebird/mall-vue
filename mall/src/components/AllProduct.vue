<template>
  <el-table :data="products" height="100vh">
    <el-table-column prop="skuId" label="商品序号"></el-table-column>
    <el-table-column prop="skuCode" label="商品编号"></el-table-column>
    <el-table-column label="商品图片">
      <template slot-scope="scope">
        <el-image :src="scope.row.skuImage"></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="skuName" label="商品名称"></el-table-column>
    <el-table-column prop="skuPrice" label="商品售价"></el-table-column>
    <el-table-column prop="skuBulletin" label="商品简介"></el-table-column>
    <el-table-column prop="skuDescription" label="商品规格"></el-table-column>
    <el-table-column prop="category.categoryName" label="商品分类"></el-table-column>
    <el-table-column label="商品状态">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.skuStatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="retailer.name" label="所属商家"></el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      products: []
    };
  },
  created() {
    this.$http.get("/findAll").then(result => {
      this.products = result.data;
    });
  }
};
</script>
