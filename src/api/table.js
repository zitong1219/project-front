import request from '@/utils/request'

export function getPeopleList(params) {
  return request({
    url: '/table/peoplelist',
    method: 'get',
    params
  })
}

