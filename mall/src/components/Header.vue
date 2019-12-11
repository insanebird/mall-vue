<template>
  <div>
    <el-row>
      <el-col :span="10" class="model">
        <div style="display: flex;justify-content: flex-start;">
          <el-input type="text" aria-placeholder="输入关键词" suffix-icon="el-icon-search"></el-input>
          <el-button slot="append" type="info">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <el-badge :value="this.$store.state.cartNum">
          <el-button class="el-icon-goods" @click="getCartList"></el-button>
        </el-badge>
      </el-col>
      <el-col :span="12" class="model">
        <ul>
          <li>
            <el-link type="info" @click="signIn">您好，请登录</el-link>
          </li>
          <li>
            <el-link type="success" @click="signUp">注册</el-link>
          </li>
          <li>
            <el-link type="success" @click="myOrder">我的订单</el-link>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    methods: {
      getCartList: function () {
        this.$router.push('/cartList')
      },
      myOrder: function () {
        this.$router.push('/orderList')
      },
      signUp: function () {
        this.$router.push('/signUp')
      },
      signIn: function () {
        this.$router.push('/signIn')
      }
    },
    created() {
      let cookie = this.$cookies.get('cart')
      if (cookie != null) this.$store.state.cartNum = cookie.split('#').length - 1
    }
  }
</script>
<style>
  li {
    display: inline;
    list-style: none;
    margin-right: 10px;
  }

  ul {
    padding: 0;
  }

  .model {
    text-align: center;
    height: 50px;
    text-align: center;
  }
</style>
