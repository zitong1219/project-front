import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPages/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    alwaysShow: true,
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/index'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: '' }
      }
    ]
  },

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/PersonnelManagement',
    component: Layout,
    redirect: '/PersonnelManagement/index',
    meta: { roles: ['superAdmin', 'admin'] },
    children: [
      {
        path: 'index',
        name: 'PersonnelManagement',
        component: _import('PersonnelManagement/index'),
        meta: { 
          title: '人员管理', 
          icon: 'user',
          roles: ['superAdmin', 'admin']
        },
      }
    ]
  },

  {
    path: '/PersonnelManagement',
    component: Layout,
    meta: { roles: ['superAdmin', 'admin'] },
    hidden: true,
    children: [
      {
        path: 'index/form',
        name: 'PersonnelManagement',
        component: _import('PersonnelManagement/form'),
        meta: { 
          title: '增加人员', 
          roles: ['superAdmin', 'admin']
        },
      }
    ]
  },

  {
    path: '/CaseSamples',
    component: Layout,
    // redirect: '/example/table',
    name: 'CaseSamples',
    meta: { title: '案件样本', icon: 'tree' },
    children: [
      {
        path: 'explosive',
        name: 'explosiveCaseSamples',
        component: _import('CaseSamples/explosive'),
        meta: { title: '炸药与原材料', icon: 'table' }
      },
      {
        path: 'device',
        name: 'deviceCaseSamples',
        component: _import('CaseSamples/device'),
        meta: { title: '爆炸装置', icon: 'table' }
      }
    ]
  },

  {
    path: '/CommonSamples',
    component: Layout,
    // redirect: '/example/table',
    name: 'CommonSamples',
    meta: { title: '常见样本', icon: 'tree', roles: ['superAdmin', 'admin', 'user'] },
    children: [
      {
        path: 'explosive',
        name: 'explosiveCommonSamples',
        component: _import('CommonSamples/explosive'),
        meta: { title: '炸药与原材料', icon: 'table', roles: ['superAdmin', 'admin', 'user'] }
      },
      {
        path: 'device',
        name: 'deviceCommonSamples',
        component: _import('CommonSamples/device'),
        meta: { title: '爆炸装置', icon: 'table', roles: ['superAdmin', 'admin', 'user'] }
      }
    ]
  },

  {
    path: '/AnalysisAndJudgment',
    component: Layout,
    // redirect: '/example/table',
    name: 'AnalysisAndJudgment',
    meta: { title: '分析研判', icon: 'example' },
    children: [
      {
        path: 'explosive',
        name: 'explosiveAnalysisAndJudgment',
        component: _import('AnalysisAndJudgment/explosive'),
        meta: { title: '炸药与原材料', icon: 'table' }
      },
      {
        path: 'device',
        name: 'deviceAnalysisAndJudgment',
        component: _import('AnalysisAndJudgment/device'),
        meta: { title: '爆炸装置', icon: 'table' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }

]
