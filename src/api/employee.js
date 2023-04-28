import request from '@/utils/request'

export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 导出excel
export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    responseType: 'blob'
  })
}

// 下载员工导入模板
export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob'
  })
}

// 导入excel
export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data // from-data类型
  })
}

// 员工删除
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
