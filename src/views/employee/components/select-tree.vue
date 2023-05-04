<template>
  <el-cascader size="mini" :options="treeData" :props="props" separator="-" :value="value" />
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
    }
  }
}
</script>

<style scoped>

</style>
