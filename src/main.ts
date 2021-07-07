import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import { i18n } from './i18n'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  render: h => h(App),
  beforeCreate () {
    this.$store.commit('initializeStore')
  }
}).$mount('#app')
