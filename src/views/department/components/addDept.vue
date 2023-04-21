<template>
  <el-dialog :visible="showDialog" title="新增部门" :hide-on-click="false" @close="close">
    <el-form ref="depFrom" :model="depFrom" :rules="depRules">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="depFrom.name" style="width: 90%" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="depFrom.code" style="width: 90%" />
      </el-form-item>
      <el-form-item prop="code" label="部门负责人">
        <el-select v-model="depFrom.managerId" style="width: 90%" placeholder="请选择负责人">
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="code" label="部门介绍">
        <el-input v-model="depFrom.introduce" type="textarea" style="width: 90%" />
      </el-form-item>
      <el-divider />
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary">确定</el-button>
            <el-button>取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script>
import { getDepartmentList, getSimpleList } from '@/api/department'

export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {

      managerList: [],
      depFrom: {
        name: '',
        code: '',
        managerId: [],
        introduce: '',
        pid: ''
      },
      depRules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }, {
          min: 2,
          max: 10,
          message: '2-10个字符之间',
          trigger: 'blur'
        }, {
          trigger: 'blur', validator: async(rule, value, callback) => {
            const result = await getDepartmentList(value)
            if (result.some(item => item.name === value)) {
              callback(new Error('部门名称已存在'))
            } else {
              callback()
            }
          }
        }],
        code: [{ required: true, message: '请输入部门编码', trigger: 'blur' }, {
          min: 2,
          max: 10,
          message: '2-10个字符之间',
          trigger: 'blur'
        }, {
          trigger: 'blur', validator: async(rule, value, callback) => {
            const result = await getDepartmentList(value)
            if (result.some(item => item.code === value)) {
              callback(new Error('部门编码已存在'))
            } else {
              callback()
            }
          }
        }],
        managerId: [],
        introduce: [{ required: true, message: '请输入部门介绍', trigger: 'blur' }, {
          min: 1,
          max: 100,
          message: '1-100个字符之间',
          trigger: 'blur'
        }],
        pid: ''
      }
    }
  },
  created() {
    this.getSimpleList()
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false)
    },
    async getSimpleList() {
      const result = await getSimpleList()
      this.managerList = result
    }
  }
}
</script>

<style scoped>

</style>
