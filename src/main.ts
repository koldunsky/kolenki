import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  beforeCreate () {
    this.$store.commit('initializeStore')
  }
}).$mount('#app')
