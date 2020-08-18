import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import moduleApp from './modules/app'
import moduleUsers  from './modules/user'
import moduleCate  from './modules/category'
import modulePermission from './modules/permission'
Vue.use(Vuex);

const modules = {
    app: moduleApp,
    user: moduleUsers,
    category: moduleCate,
    permission: modulePermission
}




const store = new Vuex.Store({
    modules,
    getters
})

export default store