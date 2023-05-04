<template>
  <el-cascader size="mini" :options="treeData" :props="props" separator="-" :value="value" @change="changeValue" />
</template>

<script>
import { getDepartmentList } from '@/api/department'
import { transListToTreeData } from '@/utils'

export default {
  name: 'SelectTree',
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      treeData: [],
      props: {
        value: 'id',
        label: 'name'
      }
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      const result = await getDepartmentList()
      const data = transListToTreeData(result, 0)
      this.treeData = data
    },
    changeValue(list) {
      if (list.length > 0) {
        this.$emit('input', list[list.length - 1])
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>

<style scoped>

</style>
