<template>
  <div>
    <el-row>
      <el-col :span="3">
        <el-image
          src="https://img12.360buyimg.com/img/jfs/t1/89187/18/2858/159126/5dd79179E14de8e4d/956e8baea4f177a5.png.webp"
          style="width: 100%;height:400px;"
        ></el-image>
      </el-col>
      <el-col :span="3">
        <ul>
          <li class="bread" v-for="ct in category" @mouseover="loadCategory(ct.categoryId)"
              @mouseleave="hiddenCategory">
            <a href="#" v-for="item in ct.list" style="margin-right: 5px;">{{item.categoryName}} \</a>
          </li>
        </ul>
      </el-col>
      <div id="category" @mouseover="showCategory" @mouseleave="hiddenCategory">
        <ul>
          <li v-for="ct in secondCategory" style="display: block;" class="bread">
            <span style="font-weight: bold;">{{ct.categoryName}}:&nbsp;</span>
            <a v-for="item in ct.list" href="#">{{item.categoryName}}&nbsp;&nbsp;</a>
          </li>
        </ul>
      </div>
      <el-col :span="12">
        <el-carousel height="400px">
          <el-carousel-item>
            <el-image
              src="https://img12.360buyimg.com/pop/s1180x940_jfs/t1/106438/31/3276/206246/5dde375bE6071dd32/24c5d774cff3e4a8.jpg.webp"
              style="height: 100%;width: 100%;"
            ></el-image>
          </el-carousel-item>
          <el-carousel-item>
            <el-image
              src="https://img12.360buyimg.com/pop/s1180x940_jfs/t1/106438/31/3276/206246/5dde375bE6071dd32/24c5d774cff3e4a8.jpg.webp"
              style="height: 400px;width: 100%;"
            ></el-image>
          </el-carousel-item>
          <el-carousel-item>
            <el-image
              src="https://img12.360buyimg.com/pop/s1180x940_jfs/t1/106438/31/3276/206246/5dde375bE6071dd32/24c5d774cff3e4a8.jpg.webp"
              style="height: 400px;width: 100%;"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="3">
        <el-carousel height="400px" direction="vertical">
          <el-carousel-item>
            <el-image
              src="https://img12.360buyimg.com/pop/s1180x940_jfs/t1/106438/31/3276/206246/5dde375bE6071dd32/24c5d774cff3e4a8.jpg.webp"
              style="height: 100%;width: 100%;"
            ></el-image>
          </el-carousel-item>
          <el-carousel-item>
            <el-image
              src="https://img12.360buyimg.com/pop/s1180x940_jfs/t1/106438/31/3276/206246/5dde375bE6071dd32/24c5d774cff3e4a8.jpg.webp"
              style="height: 400px;width: 100%;"
            ></el-image>
          </el-carousel-item>
          <el-carousel-item>
            <el-image
              src="https://img12.360buyimg.com/pop/s1180x940_jfs/t1/106438/31/3276/206246/5dde375bE6071dd32/24c5d774cff3e4a8.jpg.webp"
              style="height: 400px;width: 100%;"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
    <el-row>
      <el-col :span="4" v-for="item in products" :key="item.skuId">
        <div style="text-align: center;">
          <el-link :href="'/#/productInfo/'+item.skuId">
            <el-image :src="item.skuImage" style="height:200px;width:200px;"></el-image>
            <span style="color: red;font-weight: bold;">￥{{item.skuPrice}}</span>
            <br/>
            <span>{{item.skuName}}</span><br>
            <span>{{item.skuBulletin}}</span>
          </el-link>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="5">
        <el-pagination
          :page-count="pagination.pageCount"
          @current-change="changePage"
          @size-change="changeSize"
          :page-sizes="[6,12,18,24,30,36]"
          background
          layout="sizes,prev, pager, next,jumper"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        products: [],
        pagination: {
          pageCount: 0,
          total: 0,
          currentPage: 1,
          pageSize: 6
        },
        category: [],
        secondCategory: []
      };
    },
    created() {
      this.$http
        .post("/accessIndex", {
          pageSize: this.pagination.pageSize,
          currentPage: this.pagination.currentPage
        })
        .then(result => {
          this.products = result.data.products;
          this.pagination = result.data;
        });
      this.$http.get('/getFirstCategory').then(result => {
        this.category = result.data
      })
    },
    methods: {
      changePage: function (val) {
        this.pagination.currentPage = val;
        this.$http
          .post("/accessIndex", {
            pageSize: this.pagination.pageSize,
            currentPage: this.pagination.currentPage
          })
          .then(result => {
            this.products = result.data.products;
            this.pagination = result.data;
          });
      },
      changeSize: function (val) {
        this.pagination.pageSize = val;
        this.$http
          .post("/accessIndex", {
            pageSize: val,
            currentPage: 1
          })
          .then(result => {
            this.products = result.data.products;
            this.pagination = result.data;
          });
      },
      loadCategory: function (id) {
        this.$http.post('/getSecondCategory', {categoryId: id}).then(result => {
          this.secondCategory = result.data
        })
        document.getElementById("category").style.zIndex = '999'
      },
      hiddenCategory: function () {
        document.getElementById("category").style.zIndex = '0'
      },
      showCategory: function () {
        document.getElementById("category").style.zIndex = '999'
      }
    }
  };
</script>

<style>

  .bread {
    display: block;
    margin-bottom: 10px;
    margin-left: 5px;
    height: 25px;
    width: 183px;
    font-size: small;
  }

  .bread:hover {
    background: lightgrey;
  }

  a {
    text-decoration: none;
    color: darkslategray;
  }

  #category {
    position: absolute;
    height: 400px;
    width: 750px;
    left: 376px;
    z-index: 0;
    background: white;
    font-size: small;
  }
</style>
