import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {

      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
      
    },
    {

      path: '/business/account',
      name: 'business-account',
      component: () => import('./views/UpdateBusi.vue')
    },
    {
      
      path: '/login',
      name: 'login',
      component: () => import('./views/LogInView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: ()=> import('./views/SignUp.vue')

    },
    {
      path: '/client/account',
      name: 'client-account',
      component: ()=> import('./views/EditClientAccount.vue')
    },
    {
      path: '/business/reservations',
      name: 'ResBusiness',
      component: () => import('./views/ResBusiness.vue')
    },
    {
      path: '/client/reservations',
      name: 'ResClient',
      component: () => import('./views/ResClient.vue')

    },
    {
      path: '/client/make-reservations',
      name: 'MakeResTableView',
      component: () => import('./views/MakeResTableView.vue')
    },
    {
      path: '/business/edit-reservations',
      name: 'EditResTableView',
      component: () => import('./views/EditResTableView.vue')
    }
  ]
})