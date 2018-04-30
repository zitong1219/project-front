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
    path: '/Dashboard',
    component: Layout,
    // redirect: '/Dashboard',
    // alwaysShow: true,
    hidden: true,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: _import('dashboard/index'),
        meta: { title: 'Dashboard', icon: '' }
      }
    ]
  },

  {
    path: '',
    redirect: '/Handbook',
    component: Layout,
    children: [
      {
        path: 'Handbook',
        name: 'System Handbook',
        component: _import('handbook/index'),
        meta: { title: '系统指南', icon: 'documentation' }
      }
    ]
  }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  /** **** 人员管理模块路由 ******/
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
          icon: 'peoples',
          roles: ['superAdmin', 'admin']
        }
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
        path: 'form',
        name: 'PersonnelManagementForm',
        component: _import('PersonnelManagement/form'),
        meta: {
          title: '增加人员',
          roles: ['superAdmin', 'admin']
        }
      }
    ]
  },

  /** **** 常见样本模块路由 ******/
  {
    path: '/CommonSamples',
    component: Layout,
    redirect: '/CommonSamples/explosive',
    name: 'CommonSamples',
    meta: {
      title: '常见样本',
      icon: 'clipboard'
    },
    children: [
      {
        path: 'explosive',
        name: 'explosiveCommonSamples',
        component: _import('CommonSamples/explosive'),
        meta: { title: '炸药与原材料', icon: 'table' }
      },
      {
        path: '/CommonSamples/device',
        name: 'deviceCommonSamples',
        redirect: '/CommonSamples/device/deviceIngredient',
        component: _import('CommonSamples/device'),
        meta: {
          title: '爆炸装置',
          icon: 'table'
        },
        children: [
          { path: 'deviceIngredient',
            name: 'deviceIngredient',
            component: _import('CommonSamples/deviceIngredient'),
            meta: { title: '爆炸装置-成分' }
          },
          { path: 'deviceShape',
            name: 'deviceShape',
            component: _import('CommonSamples/deviceShape'),
            meta: { title: '爆炸装置-形态' }
          }
        ]
      }
    ]
  },

  {
    path: '/CommonSamples',
    component: Layout,
    meta: { roles: ['superAdmin', 'admin'] },
    hidden: true,
    children: [
      {
        path: 'addExplosive',
        name: 'CommonSamplesExplosiveForm',
        component: _import('CommonSamples/addExplosive'),
        meta: {
          title: '增加常见炸药与原材料样本',
          roles: ['superAdmin', 'admin']
        }
      },
      {
        path: 'addDeviceIngredient',
        name: 'CommonSamplesDeviceIngredientForm',
        component: _import('CommonSamples/addDeviceIngredient'),
        meta: {
          title: '增加常见爆炸装置成分样本',
          roles: ['superAdmin', 'admin']
        }
      },
      {
        path: 'addDeviceShape',
        name: 'CommonSamplesDeviceShapeForm',
        component: _import('CommonSamples/addDeviceShape'),
        meta: {
          title: '增加常见爆炸装置形态样本',
          roles: ['superAdmin', 'admin']
        }
      }
    ]

  },

  /** **** 案件物证模块路由 ******/
  {
    path: '/CaseSamples',
    component: Layout,
    redirect: '/CaseSamples/explosive',
    name: 'CaseSamples',
    meta: {
      title: '案件物证',
      icon: 'tree'
    },
    children: [
      {
        path: 'explosive',
        name: 'explosiveCaseSamples',
        component: _import('CaseSamples/explosive'),
        meta: { title: '炸药与原材料', icon: 'table' }
      },
      {
        path: '/CaseSamples/device',
        name: 'deviceCaseSamples',
        redirect: '/CaseSamples/device/deviceIngredient',
        component: _import('CaseSamples/device'),
        meta: {
          title: '爆炸装置',
          icon: 'table'
        },
        children: [
          {
            path: 'deviceIngredient',
            name: 'deviceIngredient',
            component: _import('CaseSamples/deviceIngredient'),
            meta: { title: '爆炸装置-成分' }
          },
          {
            path: 'deviceShape',
            name: 'deviceShape',
            component: _import('CaseSamples/deviceShape'),
            meta: { title: '爆炸装置-形态' }
          }
        ]
      }
    ]
  },

  {
    path: '/CaseSamples',
    component: Layout,
    hidden: true,
    meta: { title: '案件物证', roles: ['superAdmin', 'admin', 'user'] },
    children: [
      {
        path: 'addExplosive',
        name: 'CaseSamplesExplosiveForm',
        component: _import('CaseSamples/addExplosive'),
        meta: {
          title: '增加案件物证炸药与原材料样本',
          roles: ['superAdmin', 'admin', 'user'] }
      },
      {
        path: 'addDeviceIngredient',
        name: 'CaseSamplesDeviceIngredientForm',
        component: _import('CaseSamples/addDeviceIngredient'),
        meta: {
          title: '增加案件物证爆炸装置成分样本',
          roles: ['superAdmin', 'admin', 'user'] }
      },
      {
        path: 'addDeviceShape',
        name: 'CaseSamplesDeviceShapeForm',
        component: _import('CaseSamples/addDeviceShape'),
        meta: {
          title: '增加案件物证爆炸装置形态样本',
          roles: ['superAdmin', 'admin', 'user'] }
      }
    ]
  },

  /** **** 分析研判模块路由 ******/
  {
    path: '/AnalysisAndJudgment',
    component: Layout,
    redirect: '/AnalysisAndJudgment/explosive',
    name: 'AnalysisAndJudgment',
    meta: {
      title: '分析研判',
      icon: 'example'
    },
    children: [
      {
        path: 'explosive',
        name: 'explosiveAnalysisAndJudgment',
        component: _import('AnalysisAndJudgment/explosive'),
        meta: {
          title: '炸药与原材料',
          icon: 'table'
        }
      },
      {
        path: '/AnalysisAndJudgment/device',
        name: 'deviceAnalysisAndJudgment',
        redirect: '/AnalysisAndJudgment/device/deviceIngredient',
        component: _import('AnalysisAndJudgment/device'),
        meta: {
          title: '爆炸装置',
          icon: 'table'
        },
        children: [
          {
            path: 'deviceIngredient',
            name: 'deviceIngredient',
            component: _import('AnalysisAndJudgment/deviceIngredient'),
            meta: { title: '爆炸装置-成分' }
          },
          {
            path: 'deviceShape',
            name: 'deviceShape',
            component: _import('AnalysisAndJudgment/deviceShape'),
            meta: { title: '爆炸装置-形态' }
          }
        ]
      }
    ]
  },
  {
    path: '/AnalysisAndJudgment',
    component: Layout,
    hidden: true,
    meta: { title: '分析研判', roles: ['superAdmin', 'admin', 'user'] },
    children: [
      {
        path: 'explosiveAnalysis',
        name: 'explosiveAnalysis',
        component: _import('AnalysisAndJudgment/explosiveAnalysis'),
        meta: { title: '炸药与原材料分析' }
      },
      {
        path: 'deviceIngredientAnalysis',
        name: 'deviceIngredientAnalysis',
        component: _import('AnalysisAndJudgment/deviceIngredientAnalysis'),
        meta: { title: '爆炸装置成分分析' }
      },
      {
        path: 'deviceShapeAnalysis',
        name: 'deviceShapeAnalysis',
        component: _import('AnalysisAndJudgment/deviceShapeAnalysis'),
        meta: { title: '爆炸装置成心态分析' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }

]
