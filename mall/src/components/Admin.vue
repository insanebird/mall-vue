<template>
  <el-row>
    <el-col :span="3">
      <el-menu background-color="#545c64" text-color="#ffffff" active-text-color="#ffd04b" class="sideBar" router>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/allProduct">所有商品</el-menu-item>
            <el-menu-item index="/admin/category">商品分类</el-menu-item>
            <el-menu-item index="/admin/addProduct">添加商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="allOrder">所有订单</el-menu-item>
            <el-menu-item index="todayOrder">今日交易</el-menu-item>
            <el-menu-item index="orderTend">交易趋势</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-office-building"></i>
            <span>商家管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="allRetailer">所有商家</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="allUser">所有用户</el-menu-item>
            <el-menu-item index="disableUser">违规用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
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
