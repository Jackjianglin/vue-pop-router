import Vue from 'vue';

import App from './App.vue'
import VuePopRouter from './router'
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
new VuePopRouter({
  routers
})
const app = new Vue({
  render: h => h(App),
}).$mount('#app')
app.$router.push('home')