import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routers'
import { Toast } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  }, {
    path: '/',
    component: () => import('@/components/Layout'),
    children: [...routers]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('article_token')
  if (!token && to.path !== '/login') {
    next('/login')
    Toast.fail('您还没有登录，请重新登录')
  } else {
    next()
  }
})

export default router
