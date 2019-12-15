<template>
  <div>
    <el-table :data="topics">
      <el-table-column label>
        <template slot="header" slot-scope="scope">
          <el-input size="small" style="width:200px;" v-model="key"></el-input>
          <el-button size="small" @click="searchTopic">搜索</el-button>
        </template>
        <template slot-scope="scope">
          <el-tag type="primary">{{scope.row.topic}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" prop="displayTime"></el-table-column>
      <el-table-column label="发布者" prop="user.name"></el-table-column>
      <el-table-column label="热度">
        <template slot-scope="scope">
          <i class="el-icon-chat-dot-square"></i>
          &nbsp;{{scope.row.commentNum}}
        </template>
      </el-table-column>
      <el-table-column label align="right">
        <template slot="header">
          <el-button
            type="primary"
            @click="showWindow"
            v-if="this.$store.state.user.isSpeak==0"
          >发布主题</el-button>
          <el-button
            type="primary"
            @click="showWindow"
            v-if="this.$store.state.user.isSpeak==1"
            disabled
          >发布主题</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" @click="topicDetail(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="发布主题" :visible.sync="visible">
      <el-input v-model="topic" placeholder></el-input>
      <el-button type="primary" @click="addTopic">确认</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topics: [],
      key: "",
      visible: false,
      topic: ""
    };
  },
  created() {
    this.$http.get("/getTopics").then(result => {
      this.topics = result.data;
    });
  },
  methods: {
    topicDetail: function(id) {
      this.$router.push("/topicDetail/" + id);
    },
    showWindow: function() {
      this.visible = true;
    },
    addTopic: function() {
      this.$http
        .post("/addTopic", {
          topic: this.topic,
          author: this.$store.state.user.id
        })
        .then(result => {
          this.visible = false;
          this.topics = result.data;
        });
    },
    searchTopic: function() {
      this.$http.post("/searchByKey", { key: this.key }).then(result => {
        this.topics = result.data;
      });
    }
  }
};
</script>