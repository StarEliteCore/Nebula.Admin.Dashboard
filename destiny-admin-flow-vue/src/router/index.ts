import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import Home from '@/views/home-page/home-page.vue'
import { constansRoute } from './constansRoute';

Vue.use(VueRouter)

// const routes: Array<RouteConfig> = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   }
// ]
const routes: Array<RouteConfig> = constansRoute;

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;

router.afterEach((to: any) => {
  document.title = "DestinyFlow";
});
