<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operator">
        <el-button type="primary" size="small">添加角色</el-button>
      </div>
      <!--      表格-->
      <el-table>
        <el-table-column align="center" width="200px" label="角色" />
        <el-table-column align="center" width="200px" label="启用" />
        <el-table-column align="center" label="描述" />
        <el-table-column align="center" label="操作" />
      </el-table>
      <!--      分页-->
      <el-row type="flex" justify="end" style="height: 60px" align="middle">
        <el-pagination layout="prev,next,pager" />
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Role'
}
</script>
<style scoped>
.role-operator {
  padding: 10px;
}
</style>
