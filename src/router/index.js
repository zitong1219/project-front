import Vue from 'vue'
import Router from 'vue-router'

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
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/PersonnelManagement',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'PersonnelManagement',
        component: () => import('@/views/PersonnelManagement/index'),
        meta: { title: '人员管理', icon: 'user' }
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
        component: () => import('@/views/CaseSamples/explosive'),
        meta: { title: '炸药与原材料', icon: 'table' }
      },
      {
        path: 'device',
        name: 'deviceCaseSamples',
        component: () => import('@/views/CaseSamples/device'),
        meta: { title: '爆炸装置', icon: 'table' }
      }
    ]
  },

  {
    path: '/CommonSamples',
    component: Layout,
    // redirect: '/example/table',
    name: 'CommonSamples',
    meta: { title: '常见样本', icon: 'tree' },
    children: [
      {
        path: 'explosive',
        name: 'explosiveCommonSamples',
        component: () => import('@/views/CommonSamples/explosive'),
        meta: { title: '炸药与原材料', icon: 'table' }
      },
      {
        path: 'device',
        name: 'deviceCommonSamples',
        component: () => import('@/views/CommonSamples/device'),
        meta: { title: '爆炸装置', icon: 'table' }
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
        component: () => import('@/views/AnalysisAndJudgment/explosive'),
        meta: { title: '炸药与原材料', icon: 'table' }
      },
      {
        path: 'device',
        name: 'deviceAnalysisAndJudgment',
        component: () => import('@/views/AnalysisAndJudgment/device'),
        meta: { title: '爆炸装置', icon: 'table' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

