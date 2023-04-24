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
        <el-table-column prop="name" align="center" width="300px" label="角色">
          <template v-slot="{ row }">
            <!--            条件判断-->
            <el-input
              v-if="row.isEdit"
              v-model="row.editRow.name"
              size="mini"
            />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" width="300px" label="启用">
          <template v-slot="{ row }">
            <el-switch
              v-if="row.isEdit"
              v-model="row.editRow.state"
              :active-value="1"
              :inactive-value="0"
            />
            <el-tag
              v-else
              :type="getTagColor(row.state)"
            >{{
              row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无"
            }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{ row }">
            <!--            条件判断-->
            <el-input
              v-if="row.isEdit"
              v-model="row.editRow.description"
              type="textarea"
              size="mini"
            />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <el-button
                size="mini"
                type="primary"
                @click="btnEditSub(row)"
              >确定
              </el-button>
              <el-button
                size="mini"
                @click="row.isEdit = false"
              >取消
              </el-button>
            </template>
            <template v-else>
              <el-button size="mini" type="text">分配权限</el-button>
              <el-button
                size="mini"
                type="text"
                @click="btnEditRow(row)"
              >编辑
              </el-button>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="confirmDel(row.id)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="text"
                  style="margin-left: 8px"
                >删除
                </el-button>
              </el-popconfirm>
            </template>
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
import { delRole, getRoleList, updateRole } from '@/api/role'
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
        pagesize: 10,
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
      this.roleList.forEach((item) => {
        // 添加一个属性，初始值为false
        // item.isEdit = false   动态添加不具备响应式特性
        this.$set(item, 'isEdit', false) // this.$set(目标对象,属性名,初始值)
        // 缓存数据
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
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
    },
    btnEditRow(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    async btnEditSub(row) {
      if (row.editRow.name && row.editRow.description) {
        await updateRole({ ...row.editRow, id: row.id })
        this.$message.success('更新角色成功')
        // eslint-disable-next-line require-atomic-updates
        // row.name = row.editRow.name
        // Object.assign(目标:target,来源:souroe)
        Object.assign(row, {
          ...row.editRow,
          isEdit: false
        })
      } else {
        this.$message.error('角色名称和描述不能为空')
      }
    },
    async confirmDel(id) {
      await delRole(id)
      this.$message.success('删除角色成功')
      // 如果是最后一个
      if (this.roleList.length === 1) this.pageParams.page--
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
