<template>
  <el-row>
    <el-col :span="3">
      <el-menu
        background-color="#545c64"
        text-color="#ffffff"
        active-text-color="#ffd04b"
        class="sideBar"
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>基本信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/myShop/retailerInformation">店铺基本信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-notebook-1"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/myShop/todayOrder">今日交易</el-menu-item>
            <el-menu-item index="/myShop/retailerOrder">交易趋势</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-house"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/myShop/addProduct">添加商品</el-menu-item>
            <el-menu-item index="/myShop/retailerProduct">所有商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/" class="el-icon-back">返回首页</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>
<style>
.sideBar {
  height: 100vh;
}
</style>
