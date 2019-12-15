<template>
  <el-row>
    <el-col :span="4" v-for="(item, index) in this.$store.state.products" :key="index">
      <el-link :href="'/#/productInfo/'+item.skuId">
        <el-card :body-style="{ padding: '15px' }">
          <img :src="item.skuImage" class="image" />
          <div style="padding: 14px;">
            <span>{{item.skuName}}</span>
            <br />
            <el-tag type="primary">￥{{item.skuPrice}}</el-tag>
          </div>
        </el-card>
      </el-link>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.image {
  width: 200px;
  height: 200px;
}
</style>