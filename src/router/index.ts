import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Host from '../views/Host.vue';
import Hosts from '../views/Hosts.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/hosts',
    name: 'Hosts',
    component: Hosts,
  },
  {
    path: '/hosts/:ip',
    name: 'Host',
    component: Host,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
