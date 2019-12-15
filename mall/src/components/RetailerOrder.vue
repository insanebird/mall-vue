<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <el-table :data="orders" height="400" show-summary>
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
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="总价格"></el-table-column>
      </el-table>
      <div style="display:flex;justify-content:start;">
        <div style="width:300px;height:300px;" id="order"></div>
        <div style="width:300px;height:300px;" id="product"></div>
        <div style="width:300px;height:300px;" id="productSaleNum"></div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      orders: [],
      data: []
    };
  },
  created() {
    this.$http
      .post("/getOrderByRetailerId", { id: this.$store.state.retailer.id })
      .then(result => {
        this.orders = result.data;
      });
  },
  mounted() {
    var myChart = this.$echarts.init(document.getElementById("order"));
    var productChart = this.$echarts.init(document.getElementById("product"));
    var productSaleNum = this.$echarts.init(
      document.getElementById("productSaleNum")
    );
    this.$http
      .post("/getMonthOrderTend", { id: this.$store.state.retailer.id })
      .then(result => {
        this.data = result.data;
        myChart.setOption({
          title: {
            text: "月收入趋势图"
          },
          xAxis: {
            data: this.data.day
          },
          tooltip: {},
          yAxis: {},
          series: [
            {
              name: "当天收入",
              data: this.data.profit,
              type: "line"
            }
          ]
        });
      });
    this.$http
      .post("/getProductTend", { id: this.$store.state.retailer.id })
      .then(result => {
        this.data = result.data;
        productChart.setOption({
          title: {
            text: "商品库存图"
          },
          xAxis: {
            data: this.data.name
          },
          tooltip: {},
          yAxis: {},
          series: [
            {
              name: "商品库存量",
              data: this.data.value,
              type: "bar"
            }
          ]
        });
      });
    this.$http
      .post("/getSaleNumTend", { id: this.$store.state.retailer.id })
      .then(result => {
        this.data = result.data;
        productSaleNum.setOption({
          title: {
            text: "商品销售图"
          },
          xAxis: {
            data: this.data.name
          },
          tooltip: {},
          yAxis: {},
          series: [
            {
              name: "商品销售量",
              data: this.data.value,
              type: "bar"
            }
          ]
        });
      });
  }
};
</script>
