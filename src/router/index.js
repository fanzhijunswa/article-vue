import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routers'
import store from '@/store'
import { Dialog } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      requireAuth: false
    },
    component: () => import('@/views/Login')
  }, {
    path: '/',
    component: () => import('@/components/Layout'),
    children: [...routers]
  }, {
    path: '*',
    component: () => import('@/components/NotFound')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('article_token')
  const userInfo = store.state.User.userInfo
  if (!!(to.meta?.requireAuth)) {
    if (!token || !Object.keys(userInfo).length) {
      // 没有登录，提示是否登录
      Dialog.confirm({
        title: '访问提示',
        message: '该功能需要登录才能访问，确认登录吗'
      }).then(() => { // 确认执行这里
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }).catch(() => { // 取消执行这里
      // 取消了，中断路由导航
        next(false)
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
