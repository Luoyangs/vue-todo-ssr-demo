export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "todo-view" */'../views/todo/list.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login-view" */'../views/login/login.vue')
  }
]
