<template>
  <div>
    <el-row>
      <el-col :span="10">
        <img :src="product.skuImage" style="width:500px;height:500px;" />
      </el-col>
      <el-col :span="14">
        <table cellspacing="10">
          <tr>
            <td colspan="2">
              <span style="font-weight: bold;">{{product.skuName}}</span>&nbsp;
              <span>{{product.skuDescription}}</span>
              <br />
            </td>
          </tr>
          <tr>
            <td>规格：</td>
            <td>
              <div style="width: 300px;height: 100px;background: lightblue;font-size: small;">
                <span>{{product.skuSpecification}}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>京东价：</td>
            <td>
              <strong>￥{{product.skuPrice}}</strong>
            </td>
          </tr>
        </table>
        <el-input-number v-model="productNum"></el-input-number>
        <el-button type="primary" size="large" @click="addCart">加入购物车</el-button>
        <el-button type="primary" size="large" @click="buyProduct">立即购买</el-button>
        <el-table :data="comments" height="220">
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
      </el-col>
    </el-row>
    <el-image v-for="(item, index) in images" :key="index" :src="item"></el-image>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: {},
      specification: {},
      productNum: 1,
      cartList: [],
      comments: [],
      images: []
    };
  },
  created() {
    this.$http
      .post("/getProductInfo", { pId: this.$route.params.id })
      .then(result => {
        this.product = result.data;
        this.images = this.product.introduceImages.split(",");
      });
    this.$http
      .post("/getSKUComments", { skuId: this.$route.params.id })
      .then(result => {
        this.comments = result.data;
      });
  },
  methods: {
    addCart: function() {
      this.$http
        .post("/addCart", {
          skuId: this.$route.params.id,
          num: this.productNum
        })
        .then(result => {
          this.cartList = result.data;
          this.$store.state.cartNum = this.cartList.length;
        });
    },
    buyProduct: function() {
      var str = "";
      str += this.product.skuId + "_" + this.productNum + "#";
      this.$http
        .post("/buyProduct", {
          skuItem: str,
          userId: this.$store.state.user.id,
          retailerId: this.product.retailerId
        })
        .then(result => {
          this.$router.push("/orderList");
        });
    }
  }
};
</script>
<style scoped>
li {
  display: inline;
  margin-right: 30px;
  background: chartreuse;
}

ul {
  margin-left: 200px;
}

.animate:focus {
  border: 5px blue;
}

a {
  margin-right: 30px;
}

a:visited {
}

a:active {
  border: 5px solid gray;
}
</style>
