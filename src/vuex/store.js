import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
    state:{
        arrmenu:[]
    },
    mutations
})
