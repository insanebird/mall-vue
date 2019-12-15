<template>
  <el-table :data="users">
    <el-table-column label="头像">
      <template slot-scope="scope">
        <el-image :src="scope.row.image"></el-image>
      </template>
    </el-table-column>
    <el-table-column label="姓名" prop="name"></el-table-column>
    <el-table-column label="用户名" prop="username"></el-table-column>
    <el-table-column label="密码" prop="password"></el-table-column>
    <el-table-column label="生日" prop="displayTime"></el-table-column>
    <el-table-column label="禁言状态">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.isSpeak"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="0"
          :inactive-value="1"
          @change="changeStatus(scope.row)"
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="发布的主题" type="expand">
      <template slot-scope="scope">
        <el-table :data="scope.row.topics">
          <el-table-column label="发布时间" prop="displayTime"></el-table-column>
          <el-table-column label="内容" prop="topic"></el-table-column>
          <el-table-column label="热度">
            <template slot-scope="scope">
              <i class="el-icon-chat-dot-square"></i>
              &nbsp;{{scope.row.commentNum}}
            </template>
          </el-table-column>
          <el-table-column label="所有评论" type="expand">
            <template slot-scope="scope">
              <el-table :data="scope.row.comments">
                <el-table-column label="发布时间" prop="displayTime"></el-table-column>
                <el-table-column label="内容" prop="content"></el-table-column>
                <el-table-column label="所有回复" type="expand">
                  <template slot-scope="scope">
                    <el-table :data="scope.row.children">
                      <el-table-column label="发布时间" prop="displayTime"></el-table-column>
                      <el-table-column label="内容" prop="content"></el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>
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
    this.$http.get("getVIPList").then(result => {
      this.users = result.data;
    });
  },
  methods: {
    changeStatus: function(user) {
      this.$http
        .post("/changeSpeakStatus", { id: user.id, isSpeak: user.isSpeak })
        .then(result => {});
      this.$message("修改成功");
    }
  }
};
</script>