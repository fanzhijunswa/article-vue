export default [
  {
    path: '', // 默认子路由
    name: 'home',
    meta: {
      requireAuth: false
    },
    component: () => import('@/views/Home')
  }, {
    path: '/qa',
    name: 'qa',
    meta: {
      requireAuth: false
    },
    component: () => import('@/views/Qa')
  }, {
    path: '/video',
    name: 'video',
    meta: {
      requireAuth: false
    },
    component: () => import('@/views/Video')
  }, {
    path: '/my',
    name: 'my',
    meta: {
      requireAuth: false
    },
    component: () => import('@/views/My')
  }, {
    path: '/article/:articleId',
    name: 'article',
    meta: {
      requireAuth: false
    },
    component: () => import('@/views/Article')
  }
]
