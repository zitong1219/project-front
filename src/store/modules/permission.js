import { asyncRouterMap, constantRouterMap } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },

  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      console.log('*** SET_ROUTERS addRouters:', state.addRouters)
      state.routers = constantRouterMap.concat(routers)
      console.log('*** SET_ROUTERS routers:', state.routers)
    }
  },

  actions: {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        /**
         * roles中有admin则加载全部asyncRouterMap 
         * 否则调用filterAsyncRouter一个个解析roles里的元素
         */
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        }
        else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        console.log('*** generateRoutes is OK, accessedRouters: ', accessedRouters)
        resolve()
      })
    }
  }
}

function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (accessPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    else {
      return false
    }
  })
  return accessedRouters
}

function accessPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  }
  else {
    return true
  }
}

export default permission