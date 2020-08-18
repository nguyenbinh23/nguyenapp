import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import vuetify from '@/plugins/vuetify'
import { directives } from '@/directives'
import { filters } from '@/filters'
import configPermission from './permission'

filters.forEach(filter => {
  Vue.filter( filter.name , filter.handle )
})
directives.forEach(directive => {
  Vue.directive( directive.name , directive.handle )
})
Vue.use(Vuelidate)

Vue.config.productionTip = false


router.beforeEach(configPermission)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
