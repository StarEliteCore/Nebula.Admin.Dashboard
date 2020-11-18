import "@/plugin";
import "./DynamicRouter";

import App from '@/App.vue';
import Vue from 'vue';
import router from './router';
import store from './store';

import directives from "@/shared/directives";

for (const [key, value] of directives) {
  Vue.directive(key, value);
}

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');