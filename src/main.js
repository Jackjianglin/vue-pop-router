import Vue from 'vue';

import App from './App.vue'
import VueRouter from './router'
Vue.config.productionTip = false
const routers = [
  {
    name: 'home',
    page: import('./components/home.vue')
  },
  {
    name: 'Matryoshka',
    page: import('./components/Matryoshka.vue')
  }
]
new VueRouter({
  routers
})
const app = new Vue({
  render: h => h(App),
}).$mount('#app')
app.$router.push('home')