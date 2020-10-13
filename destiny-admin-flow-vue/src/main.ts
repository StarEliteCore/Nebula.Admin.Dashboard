import Vue from 'vue'
import App from '@/layout/layout.vue'
import router from './router'
import store from './store'
import "@/plugin"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
