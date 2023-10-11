import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/FormPage.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'form',
      component: HomeView
    },
    {
      path: '/home',
      name: 'home',

      component: () => import('../views/IndexPage.vue')
    }
  ]
})

export default router
