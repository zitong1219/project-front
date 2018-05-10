import service from '@/utils/request'

export function getPeopleList(params) {
  return service({
    url: '/table/peoplelist',
    method: 'get',
    params
  })
}

export function getDataList(params) {
  return service({
    url: '/table/explosiveList',
    method: 'get',
    params
  })
}

export function getShapeDataList(params) {
  return service({
    url: '/table/deviceShapeList',
    method: 'get',
    params
  })
}

export function getExlpoMatch(params) {
  return service({
    url: '/table/exlpoMatch ',
    method: 'get',
    params
  })
}

export function getDevCompMatch(params) {
  return service({
    url: '/table/devCompMatch',
    method: 'get',
    params
  })
}

export function updatePeople(data) {
  console.log('--- api updatePeople data: ', data)
  return service({
    url: '/table/propleListUpdate',
    method: 'post',
    data
  })
}

export function updateData(data) {
  return service({
    url: '/table/explosiveListUpdate',
    method: 'post',
    data
  })
}

export function updateDeviceShapeData(data) {
  return service({
    url: '/table/deviceShapeListUpdate',
    method: 'post',
    data
  })
}
