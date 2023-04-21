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

// 新增部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 获取部门详情
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 更新/编辑部门
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

// 删除部门
export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
