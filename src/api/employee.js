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
