<template>
  <el-table :data="users">
    <el-table-column label="头像">
      <template slot-scope="scope">
        <el-image :src="scope.row.image" style="width:100px;height:100px;"></el-image>
      </template>
    </el-table-column>
    <el-table-column label="姓名" prop="name"></el-table-column>
    <el-table-column label="用户名" prop="username"></el-table-column>
    <el-table-column label="密码" prop="password"></el-table-column>
    <el-table-column label="生日" prop="displayTime"></el-table-column>
    <el-table-column label="是否为商家">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.isRetailer"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          disabled
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="是否为会员">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.identity"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          disabled
        ></el-switch>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.$http.get("/findAllUser").then(result => {
      this.users = result.data;
    });
  }
};
</script>