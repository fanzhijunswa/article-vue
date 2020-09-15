import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routers'

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

export default router
