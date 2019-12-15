<template>
  <el-table :data="products" height="100vh">
    <el-table-column prop="skuId" label="商品序号"></el-table-column>
    <el-table-column label="商品图片">
      <template slot-scope="scope">
        <el-image :src="scope.row.skuImage"></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="skuName" label="商品名称"></el-table-column>
    <el-table-column prop="skuPrice" label="商品售价"></el-table-column>
    <el-table-column prop="skuNum" label="商品库存"></el-table-column>
    <el-table-column prop="skuBulletin" label="商品简介"></el-table-column>
    <el-table-column prop="skuDescription" label="商品规格"></el-table-column>
    <el-table-column prop="categoryDisplay" label="商品分类"></el-table-column>
    <el-table-column label="商品评分">
      <template slot-scope="scope">
        <el-rate v-model="scope.row.rate" disabled></el-rate>
      </template>
    </el-table-column>
    <el-table-column label="商品状态">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.skuStatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          @change="changeStatus(scope.row)"
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="商品评论" type="expand">
      <template slot-scope="scope">
        <el-table :data="scope.row.comments" height="220">
          <el-table-column label="用户">
            <template slot-scope="scope">
              <el-image :src="scope.row.user.image" style="width:100px;height:100px;"></el-image>
              <br />
              <el-tag type="primary">{{scope.row.user.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="评论时间" prop="displayTime"></el-table-column>
          <el-table-column label="内容" prop="content"></el-table-column>
          <el-table-column label="评分">
            <template slot-scope="scope">
              <el-rate v-model="scope.row.rate" disabled></el-rate>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
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
    this.$http
      .post("/getSKUByRetailerId", { id: this.$store.state.retailer.id })
      .then(result => {
        this.products = result.data;
      });
  },
  methods: {
    changeStatus: function(sku) {
      this.$http
        .post("/changeProductStatus", {
          skuId: sku.skuId,
          skuStatus: sku.skuStatus
        })
        .then(result => {
          this.$message("修改成功");
        });
    }
  }
};
</script>
