<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="depts" :props="defaultProps" default-expand-all>
        <template v-slot="{data}">
          <el-row style="width: 100%;line-height: 40px" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span>{{ data.managerName }}</span>
              <el-dropdown>
                <span class="el-dropdown-link tree-manager">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>

      </el-tree>
    </div>
  </div>
</template>
<script>
import { getDepartmentList } from '@/api/department'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Department',
  data() {
    return {
      depts: [{
        name: '',
        managerName: '',
        children: [{
          name: '',
          managerName: ''
        }]
      }],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      const result = await getDepartmentList()
      this.depts = transListToTreeData(result, 0)
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 140px;
}

.tree-manager {
  width: 50px;
  display: inline-block;
  margin: 10px;
  font-size: 16px;
}
</style>
