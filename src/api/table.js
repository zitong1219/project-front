import request from '@/utils/request'

export function getPeopleList(params) {
  return request({
    url: '/table/peoplelist',
    method: 'get',
    params
  })
}

export function getDataList(params) {
  return request({
    url: '/table/explosiveList',
    method: 'get',
    params
  })
}

export function getShapeDataList(params) {
  return request({
  	url: '/table/deviceShapeList',
  	method: 'get',
  	params
  })
}

export function getExlpoMatch(params) {
  return request({
    url: '/table/exlpoMatch ',
    method: 'get',
    params
  })
}

export function getDevCompMatch(params) {
  return request({
    url: '/table/devCompMatch',
    method: 'get',
    params
  })
}