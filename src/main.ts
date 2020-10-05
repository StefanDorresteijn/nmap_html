import Vue from 'vue';
import VueTailwind from 'vue-tailwind';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import './assets/tailwind.css';

Vue.config.productionTip = false;

Vue.use(VueTailwind);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
