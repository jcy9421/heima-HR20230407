<template>
  <el-dialog
    :visible="showDialog"
    title="添加角色"
    width="500px"
    @close="close"
  >
    <el-form ref="roleForm" :model="roleForm" :rules="roleRules">
      <el-form-item prop="name" label="角色名称">
        <el-input v-model="roleForm.name" style="width: 80%" />
      </el-form-item>
      <el-form-item prop="state" label="启用">
        <el-switch
          v-model="roleForm.state"
          :active-value="1"
          size="mini"
          :inactiv-value="0"
        />
      </el-form-item>
      <el-form-item prop="description" label="角色描述">
        <el-input
          v-model="roleForm.description"
          style="width: 80%"
          type="textarea"
        >3
        </el-input>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-row type="flex" justify="center">
      <el-col span="12">
        <el-button type="primary" @click="btnOk">确定</el-button>
        <el-button @click="close">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddRole',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        state: '',
        description: ''
      },
      roleRules: {
        name: [{ required: true, message: '请填写角色名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请填写角色描述信息', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$refs.roleForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    btnOk() {
      this.$refs.roleForm.validate()
    }
  }
}
</script>

<style scoped></style>
