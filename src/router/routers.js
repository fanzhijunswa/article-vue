export default [
  {
    path: '', // 默认子路由
    name: 'home',
    component: () => import('@/views/Home')
  }, {
    path: '/qa',
    name: 'qa',
    component: () => import('@/views/Qa')
  }, {
    path: '/video',
    name: 'video',
    component: () => import('@/views/Video')
  }, {
    path: '/my',
    name: 'my',
    component: () => import('@/views/My')
  }
]
