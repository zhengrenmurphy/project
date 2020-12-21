import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  duplicateNavigationPolicy: 'ignore',
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('./views/Main.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/Account.vue')
    },
    
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/freets',
      name: 'freets',
      component: () => import('./views/Freets.vue')
    },
    {
      path: '/myfreets',
      name: 'myfreets',
      component: () => import('./components/AuthorFreetList.vue')
    },
    {
      path: '/createnew',
      name: 'createfreets',
      component: () => import('./components/CreateFreetOnly.vue')
    },
    {
      path: '/:username',
      name: 'otherUserProfile',
      component: () => import('./views/OtherProfile.vue'),
      props: true
  },
  ]
})
