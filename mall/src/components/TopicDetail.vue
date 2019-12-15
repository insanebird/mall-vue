<template>
  <div style="width:1200px;margin:auto;">
    <el-table :data="comments" height="600">
      <el-table-column label="用户">
        <template slot-scope="scope">
          <el-image :src="scope.row.user.image" style="width:50px;height:50px;"></el-image><br>
          <el-tag type='primary'>{{scope.row.user.name}}</el-tag><br>
          <span>{{scope.row.displayTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <el-tag type="primary">{{scope.row.content}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column type="expand" label="查看回复">
        <template slot-scope="scope">
          <el-table :data="scope.row.children" height="200" fit>
            <el-table-column label prop="user.name" align="left"></el-table-column>
            <el-table-column label prop="content" align="right">
              <template slot-scope="scope">
                <el-tag type="primary" v-if="scope.row.receiver==0">{{scope.row.content}}</el-tag>
                <el-tag
                  type="success"
                  v-if="scope.row.receiver!=0"
                >{{scope.row.user.name}}&nbsp;@&nbsp;{{scope.row.receiveUser.name}}:&nbsp;{{scope.row.content}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label prop="displayTime" align="right"></el-table-column>
            <el-table-column label="回复">
              <template slot-scope="scope">
                <el-input v-model="reply" size="mini" style="width:150px;"></el-input>
                <el-button
                  type="primary"
                  size="mini"
                  @click="replyComment(scope.row.user.id,scope.row.commentId)"
                >回复</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-input v-model="reply" size="mini" style="width:200px;"></el-input>
          <el-button
            type="primary"
            size="mini"
            @click="replyComment(scope.row.user.id,scope.row.id)"
          >回复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form :model="form">
      <el-form-item>
        <el-input type="textarea" v-model="form.content" placeholder="评论内容，文明用语" style="300"></el-input>
        <el-button type="primary" @click="addComment">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reply: "",
      comments: [],
      form: {
        content: ""
      }
    };
  },
  created() {
    this.$http
      .post("/getTopicDetail", { id: this.$route.params.id })
      .then(result => {
        this.comments = result.data;
        this.reply = "";
      });
  },
  methods: {
    replyComment: function(id, commentId) {
      this.$http
        .post("/replyComment", {
          content: this.reply,
          commentId: commentId,
          sender: this.$store.state.user.id,
          receiver: id
        })
        .then(result => {
          this.comments = result.data;
        });
    },
    addComment: function() {
      this.$http
        .post("/addComment", {
          content: this.form.content,
          reviewer: this.$store.state.user.id,
          topicId: this.$route.params.id
        })
        .then(result => {
          this.comments = result.data;
          this.reply = "";
        });
    }
  }
};
</script>