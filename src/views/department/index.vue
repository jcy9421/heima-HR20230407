<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="depts" :props="defaultProps" default-expand-all>
        <template v-slot="{data}">
          <el-row style="width: 100%;line-height: 40px" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span>{{ data.managerName }}</span>
              <el-dropdown @command="operateDept($event,data.id)">
                <span class="el-dropdown-link tree-manager">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>

      </el-tree>
    </div>
    <addDept
      ref="addDept"
      :current-node-id="currentNodeId"
      :show-dialog.sync="showDialog"
      @updateDepartment="getDepartmentList"
    />
  </div>
</template>
<script>
import { getDepartmentList } from '@/api/department'
import { transListToTreeData } from '@/utils'
import addDept from '@/views/department/components/addDept.vue'

export default {
  name: 'Department',
  components: {
    addDept
  },
  data() {
    return {
      // 存储当前点击ID
      currentNodeId: null,
      showDialog: false,
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
    },
    operateDept(type, id) {
      if (type === 'add') {
        this.showDialog = true
        this.currentNodeId = id
      } else if (type === 'edit') {
        this.showDialog = true
        this.currentNodeId = id
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail()
        })
      }
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
