import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        baseUrl: 'http://hapi.fhir.org/baseDstu3'
    },
    getters: {
        obsUrl: (state) => (id) => {
            return `${state.baseUrl}/Observation?patient=${id}&_count=5000&_pretty=true`
        },
        demographicsUrl: (state) => (id) => {
            return `${state.baseUrl}/Patient/${id}`
        }
    },
    mutations: {

    },
    actions: {

    }
})
