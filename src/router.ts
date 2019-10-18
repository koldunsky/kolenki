import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/Add.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'add',
      component: HelloWorld
    },
    {
      path: '/drill',
      name: 'drill',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Drill/index.vue')
    }
  ]
})
