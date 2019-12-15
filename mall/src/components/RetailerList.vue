<template>
  <el-table :data="retailers">
    <el-table-column prop="id" label="编号"></el-table-column>
    <el-table-column prop="name" label="名称"></el-table-column>
    <el-table-column prop="description" label="简介"></el-table-column>
    <el-table-column prop="displayTime" label="创建时间"></el-table-column>
    <el-table-column prop="founderName" label="创始人"></el-table-column>
    <el-table-column prop="age" label="经营时间"></el-table-column>
    <el-table-column label="评分">
      <template slot-scope="scope">
        <el-rate v-model="scope.row.rate"></el-rate>
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          @change="disableAllProduct(scope.row)"
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="所有商品" type="expand">
      <template slot-scope="scope">
        <el-table :data="scope.row.skuList" height="200">
          <el-table-column prop="skuId" label="商品序号"></el-table-column>
          <el-table-column prop="skuCode" label="商品编号"></el-table-column>
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
        </el-table>
        <el-table :data="scope.row.orders" height="200">
          <el-table-column type="expand" label="商品详情">
            <template slot-scope="scope">
              <el-table :data="scope.row.cartList">
                <el-table-column label="商品图片">
                  <template slot-scope="slot">
                    <el-image :src="slot.row.sku.skuImage" style="width:100px;height:100px;"></el-image>
                  </template>
                </el-table-column>
                <el-table-column prop="sku.skuName" label="商品名称"></el-table-column>
                <el-table-column prop="sku.skuSpecification" label="商品规格"></el-table-column>
                <el-table-column prop="sku.skuPrice" label="商品价格"></el-table-column>
                <el-table-column prop="num" label="商品数量"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="retailer.name" label="商家"></el-table-column>
          <el-table-column prop="user.username" label="用户"></el-table-column>
          <el-table-column prop="displayDate" label="日期"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                active-text="已付款"
                inactive-text="未付款"
                @change="changeStatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="总价格"></el-table-column>
        </el-table>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      retailers: []
    };
  },
  created() {
    this.$http.get("/getRetailerList").then(result => {
      this.retailers = result.data;
      console.log(result);
    });
  },
  methods: {
    disableAllProduct: function(retailer) {
      this.$http
        .post("/disableAllProduct", {
          id: retailer.id,
          status: retailer.status
        })
        .then(result => {
          this.retailers = result.data;
          this.$message("操作成功");
        });
    },
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
