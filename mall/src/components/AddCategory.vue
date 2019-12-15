<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.categoryName" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类等级">
          <el-radio-group v-model="form.categoryLevel" @change="changeValue">
            <el-radio :label="1">二级分类</el-radio>
            <el-radio :label="2">三级分类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-cascader
          :options="options"
          :props="{expandTrigger:'hover'}"
          style="margin-bottom: 20px;"
          @change="change"
          filterable
        ></el-cascader>
        <el-form-item>
          <el-button type="primary" @click="addCategory">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      form: {
        categoryName: "",
        categoryLevel: 1,
        parentId: 0
      }
    };
  },
  created() {
    this.$http.get("/findNestedCategory").then(result => {
      this.options = result.data;
    });
  },
  methods: {
    change: function(val) {
      let values = (val + "").split(",");
      this.form.parentId = parseInt(values[values.length - 1]);
    },
    changeValue: function(val) {
      this.$http.post("/findNestedCategory", { level: val }).then(result => {
        this.options = result.data;
      });
    },
    addCategory: function() {
      this.$http
        .post("/addCategory", {
          categoryName: this.form.categoryName,
          level: this.form.categoryLevel - 1,
          parentId: this.form.parentId
        })
        .then(result => {
          this.$message("添加成功");
        });
    }
  }
};
</script>