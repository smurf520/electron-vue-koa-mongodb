import Vue from 'vue'
import Router from 'vue-router'
import Chat from './../components/chat.vue'
// import Login from './../components/login.vue'
// import Register from './../components/register.vue'
// import store from './../store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'chat',
    component: Chat
  }, {
    path: '*',
    redirect: '/'
  }]
  // 注释打开就能用路由功能
  // routes: [{
  //   path: '/',
  //   name: 'login',
  //   component: Login,
  //   meta: {
  //     requiresAuth: true
  //   }
  // }, {
  //   path: '/register',
  //   name: 'register',
  //   component: Register
  // }, {
  //   path: '*',
  //   redirect: '/'
  // }]
})

// //  注册全局钩子用来拦截导航
// router.beforeEach((to, from, next) => {
//   //  获取store里面的token
//   let token = store.state.token
//   //  判断要去的路由有没有requiresAuth
//   if (to.meta.requiresAuth) {
//     if (token) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         } // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
//       })
//     }
//   } else {
//     next() // 如果无需token,那么随它去吧
//   }
// })

export default router
