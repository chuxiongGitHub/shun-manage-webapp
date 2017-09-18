import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'
Vue.use(Router)

const routers = new Router({
  mode: 'history',
  base: '/app',
  routes: [
    { path: '/', name: 'user', component: resolve => require(['@/components/user/View'], resolve) },
    { path: '/map', name: 'map', component: resolve => require(['@/components/map/View'], resolve) },
    { path: '/dispatch', name: 'task-new', component: resolve => require(['@/components/dispatch/View'], resolve) },
    { path: '/note', name: 'note', component: resolve => require(['@/components/note/View'], resolve) },
    { path: '/device', name: 'device', component: resolve => require(['@/components/device/View'], resolve) },
    { path: '/company', name: 'company', component: resolve => require(['@/components/company/View'], resolve) }
  ]
})

routers.beforeEach((to, from, next) => {
  iview.LoadingBar.start()
  next()
})
routers.afterEach((to, from, next) => {
  iview.LoadingBar.finish()
})

export default routers
