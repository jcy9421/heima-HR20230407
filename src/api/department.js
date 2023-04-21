import request from '@/utils/request'

export function getDepartmentList() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}

export function getSimpleList() {
  return request({
    url: '/sys/user/simple'
  })
}
