<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operator">
        <el-button
          type="primary"
          size="small"
          @click="showDialog = true"
        >添加角色
        </el-button>
      </div>
      <!--      表格-->
      <el-table :data="roleList">
        <el-table-column
          prop="name"
          align="center"
          width="300px"
          label="角色"
        />
        <el-table-column prop="state" align="center" width="300px" label="启用">
          <template v-slot="{ row }">
            <el-tag
              :type="getTagColor(row.state)"
            >{{
              row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无"
            }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template>
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页-->
      <el-row type="flex" justify="end" style="height: 60px" align="middle">
        <el-pagination
          layout="prev,pager,next"
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <add-role
      ref="addRole"
      :show-dialog.sync="showDialog"
      @updateRoleList="getRoleList"
    />
  </div>
</template>
<script>
import { getRoleList } from '@/api/role'
import AddRole from '@/views/role/components/addRole.vue'

export default {
  name: 'Role',
  components: { AddRole },
  data() {
    return {
      showDialog: false,
      roleList: [],
      pageParams: {
        page: 1,
        pagesize: 5,
        total: 0
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.roleList = rows
      this.pageParams.total = total
    },
    getTagColor(state) {
      if (state === 1) {
        return 'success'
      } else if (state === 0) {
        return 'danger'
      }
    },
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    }
  }
}
</script>
<style scoped>
.role-operator {
  padding: 10px;
}
</style>
