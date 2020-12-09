import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Layout from '@/layouts';
import mainLayout from '@/layouts/mainLayout';
import echartRouter from './modules/echarts';
import componentsRouter from './modules/components';
import nestRouter from './modules/nest';

//基础路由
export const baseRoute = [
    {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/register/index1'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error/403'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/error/500'),
    hidden: true
  }
];

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    hidden: true,
    children: [
      {
        name: 'index',
        path: '/index',
        component: () => import('@/views/index/index'),
        meta: {
          role: ['admin','test'],
          title: '首页',
          icon: 'dashboard'
        }
      },
      {
        name: 'introduce',
        component: mainLayout,
        path: '/intorduce',
        redirect: '/introduce/laboratory',
        meta: {
          role: ['admin', 'test'],
          title: '介绍',
          icon: 'nest'
        },
        children: [
          {
            name: 'laboratory',
            path: '/introduce/laboratory',
            component: () => import('@/views/introduce/laboratory/index'),
            meta: { title: '实验室介绍' }
          },
          {
            name: 'project',
            path: '/introduce/project',
            component: () => import('@/views/introduce/project/index'),
            meta: { title: 'ADMS项目介绍' }
          }
        ]
      },
      // {
      //   name: 'datadisplay',
      //   path: '/datadisplay',
      //   component: () => import('@/views/datadisplay/index'),
      //   meta: {
      //     role: ['admin', 'test'],
      //     title: '数据展示',
      //     icon: 'echarts'
      //   }
      // },
      echartRouter,
      {
        name: 'dataanalysis',
        path: '/dataanalysis',
        component: () => import('@/views/dataanalysis/index'),
        meta: {
          role: ['admin', 'test'],
          title: '数据分析',
          icon: 'distance'
        }
      },

      // {
      //   name: 'icon',
      //   path: '/icon',
      //   component: () => import('@/views/icon/index'),
      //   meta: {
      //     role: ['admin', 'test'],
      //     title: '图标',
      //     icon: 'icon'
      //   }
      // },
     // componentsRouter,
      //nestRouter,
      {
        name: 'notices',
        path: '/notices',
        component: () => import('@/views/notice/show/index'),
        meta: {
          role: ['admin', 'test'],
          title: '公告',
          icon: 'label'
        }
      },
      {
        name: 'userSystem',
        component: mainLayout,
        path: '/userSystem',
        redirect: '/userSystem/userInfo',
        meta: { title: '个人设置', icon: 'user' },
        children: [
          {
            name: 'userInfo',
            path: '/userSystem/userInfo',
            component: () => import('@/views/userSystem/userInfo/index'),
            meta: { title: '个人中心' }
          },
          {
            name: 'setting',
            path: '/userSystem/setting',
            component: () => import('@/views/userSystem/setting/index'),
            meta: { title: '用户设置' }
          }
        ]
      },

      {
        name: 'noticep',
        path: '/noticep',
        component: () => import('@/views/notice/push/index'),
        meta: {
          role: ['admin'],
          title: '发送公告',
          icon: 'label'
        }
      },

      {
        name: 'system',
        component: mainLayout,
        path: '/system',
        redirect: '/system/userManage',
        meta: {
          role: ['admin'],
          title: '系统管理',
          icon: 'system'
        },
        children: [
          {
            name: 'userManage',
            path: '/system/userManage',
            component: () => import('@/views/system/userManage/index'),
            meta: { title: '用户管理' }
          },
          {
            name: 'roleManage',
            path: '/system/roleManage',
            component: () => import('@/views/system/roleManage/index'),
            meta: { title: '角色管理' }
          },
          {
            name: 'patientManage',
            path: '/system/patientManage',
            component: () => import('@/views/system/patientManage/index'),
            meta: { title: '患者管理' }
          }
        ]
      },

      {
        name: 'error',
        path: '/error',
        component: mainLayout,
        redirect: '/error/403',
        meta: { title: '错误页面', icon: 'error' },
        children: [
          {
            name: '403',
            path: '/error/403',
            component: () => import('@/views/error/403'),
            meta: { title: '403' }
          },
          {
            name: '404',
            path: '/error/404',
            component: () => import('@/views/error/404'),
            meta: { title: '404' }
          },
          {
            name: '500',
            path: '/error/500',
            component: () => import('@/views/error/500'),
            meta: { title: '500' }
          }
        ]
      },

      {
        name: 'webGl',
        component: mainLayout,
        path: '/webGl',
        redirect: '/webGl/ArcGis',
        meta: {
          role: ['admin', 'test'],
          title: '地图',
          icon: 'webGl'
        },
        children: [
          {
            name: 'ArcGis',
            path: '/webGl/ArcGis',
            component: () => import('@/views/webGl/ArcGis/index'),
            meta: { title: 'ArcGis' }
          },
          {
            name: 'OpenLayers',
            path: '/webGl/OpenLayers',
            component: () => import('@/views/webGl/OpenLayers/index'),
            meta: { title: 'OpenLayers' }
          }
        ]
      }

    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = function() {
  return new VueRouter({
    // mode: 'history',
    routes: baseRoute,
    scrollBehavior: () => ({ y: 0 })
  });
};

const router = createRouter();

export function resetRouter() {
  router.matcher = createRouter().matcher;
}

//重定向时报错，用这个不让他报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

export default router;
