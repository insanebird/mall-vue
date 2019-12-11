<template>
  <div style="width: 900px;margin:auto;">
    <el-table :data="products" height="500">
      <el-table-column prop="sku.skuImage">
        <template slot-scope="scope">
          <img :src="scope.row.sku.skuImage" width="100px;" alt=""/>
        </template>
      </el-table-column>
      <el-table-column prop="sku.skuName"></el-table-column>
      <el-table-column prop="sku.skuSpecification"></el-table-column>
      <el-table-column prop="num">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.num" @change="getSum"></el-input-number>
        </template>
      </el-table-column>
    </el-table>
    <div style="position: relative;left: 700px;top:30px;">
      <span>总计：￥{{sum}}</span>
      <el-button type="primary" @click="generateOrder">去结算</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        products: [],
        sum: 0
      }
    },
    created() {
      this.$http.get('/getCartList').then(result => {
        this.products = result.data
        for (let i = 0; i < this.products.length; ++i) {
          this.sum += this.products[i].num * this.products[i].sku.skuPrice
        }
      })
    },
    methods: {
      getSum: function (currentValue, oldValue) {
        this.sum = 0
        for (let i = 0; i < this.products.length; ++i) {
          this.sum += this.products[i].num * this.products[i].sku.skuPrice
        }
      },
      generateOrder: function () {
        let res = ''
        for (let i = 0; i < this.products.length; ++i) {
          if (this.products[i].num > 0) {
            res += this.products[i].sku.skuId + '_' + this.products[i].num + '_' + this.products[i].sku.retailerId + '#'
          }
        }
        this.$http.post('/generateOrder', {skuItem: res}).then(result => {
          this.$router.push('/orderList')
        })
      }
    }
  }
</script>
