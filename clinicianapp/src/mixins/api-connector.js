import axios from 'axios'

export default {
    methods: {
        getObs(id) {
            return axios.get(this.$store.getters.obsUrl(id))
        },
        getDemographics(id) {
            return axios.get(this.$store.getters.demographicsUrl(id))
        }
    }
}