<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <el-table :data="orders" height="500">
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
        <el-table-column prop="displayDate" label="日期"></el-table-column>
        <el-table-column prop="price" label="总价格"></el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        orders: []
      }
    },
    created() {
      this.$http.get('/getOrderList').then(result => {
        this.orders = result.data
      })
    }
  }
</script>
