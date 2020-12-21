import Vue from 'vue'
import VueCookie from 'vue-cookie'

import App from './App.vue'
import router from './router'
import VueGeolocation from 'vue-browser-geolocation'

Vue.use(VueCookie);

export const eventBus = new Vue();
Vue.use(VueGeolocation)
Vue.config.productionTip = false

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key:'AIzaSyALrbdHiqtqa2-gX3NHtFzbHk0TjmLkcM8'
  }
  // installComponent: false
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');