<template>
  <el-table :data="category" height="100vh">
    <el-table-column prop="categoryId" label="分类序号"></el-table-column>
    <el-table-column prop="categoryCode" label="分类编码"></el-table-column>
    <el-table-column prop="categoryName" label="分类名称"></el-table-column>
    <el-table-column prop="level" label="分类等级"></el-table-column>
    <el-table-column prop="parentId" label="父级编号"></el-table-column>
  </el-table>
</template>
<script>
  export default {
    data() {
      return {
        category: []
      }
    },
    created() {
      this.$http.get('/findAllCategory').then(result => {
        this.category = result.data
      })
    }
  }
</script>
