<template>
  <div class="container">
    <div class="app-container">
      <el-button type="primary" class="btn-add" size="mini">添加权限</el-button>
      <el-table :data="permissionList" row-key="id" :default-expand-all="true">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button v-if="row.type===1" type="text" size="mini">添加</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Permission',
  data() {
    return {
      permissionList: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const result = transListToTreeData(await getPermissionList(), 0)
      this.permissionList = result
      console.log(this.permissionList)
    }
  }
}
</script>
<style>
.btn-add {
  margin: 10px;
}
</style>
