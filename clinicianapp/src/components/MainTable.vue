<template>
    <div class="nhsuk-grid-row">
        <div class="nhsuk-grid-column-one-quarter">
            <primary-button text="Refresh" @click="getPatientData()"></primary-button>
        </div>
        <div class="nhsuk-grid-column-one-quarter">
            <text-input title="Search Name" v-model="filter"></text-input>
        </div>
        <div class="nhsuk-grid-column-full">
            <div class="nhsuk-table-responsive">
                <table class="nhsuk-table">
                    <caption class="nhsuk-table__caption">Clinican Table</caption>
                    <table-header :headers="tableHeader" @sort="changeSortField($event)"></table-header>
                    <tbody class="nhsuk-table__body">
                        <table-row v-for="(patient, index) in filterData" :patient="patient" :key="index"></table-row>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
    import TableHeader from '@/components/table/TableHeader.vue'
    import TableRow from '@/components/table/TableRow.vue'
    import TextInput from '@/components/inputs/TextInput.vue'
    import tableHeader from '@/assets/js/table-header.js'
    import ApiConnector from '@/mixins/api-connector.js'
    import axios from 'axios'

    export default {
        components: {
            PrimaryButton,
            TableRow,
            TableHeader,
            TextInput
        },
        mixins: [ ApiConnector ],
        data() {
            return {
                filter: '',
                patients: ['1695511', '1697315', '1697318', '1697321'],
                tableHeader: tableHeader,
                fieldToSort: 'name',
                tableData: []
            }
        },
        methods: {
            changeSortField(field) {
                this.fieldToSort = field
            },
            getPid(resource) {
                var reference = resource.subject.reference
                return reference.split('/')[1]
            },
            getPatientName(data) {
                var name = data.name[0]
                return `${name.given[0]} ${name.family}`
            },
            getKey(code) {
                if (code.system === 'http://hapi.fhir.org/baseDstu3/CodeSystem/NHSHMP-FeedType-1') {
                    return 'feed'
                }
                else if (code.system === 'http://hapi.fhir.org/baseDstu3/CodeSystem/NHSHMP-Nappy-1') {
                    return 'nappy'
                }
                else if (code.code === '27113001') {
                    return 'weight' 
                }
                else if (code.code === '103228002') {
                    return 'saturation'
                }
                else {
                    return null
                }
            },
            getPatientData() {
                var demoQueries = []
                var obsQueries = []
                var patients = {}
                this.tableData = []
                for (var id of this.patients) {
                    demoQueries.push(this.getDemographics(id))
                    obsQueries.push(this.getObs(id))
                }
                axios.all(demoQueries)
                .then((res) => {
                    for (var patient of res) {
                        var data = patient.data
                        if (!(data.id in patients)) {
                            patients[data.id] = {
                                name: this.getPatientName(data)
                            }
                        }
                    }
                    return axios.all(obsQueries)
                })
                .then((res) => {
                    for (var observation of res) {
                        console.log(observation)
                        if (observation.data.entry) {
                            for (var entry of observation.data.entry) {
                                var resource = entry.resource
                                var pid = this.getPid(resource)
                                var codes = resource.code.coding
                                for (var code of codes) {
                                    var key = this.getKey(code)

                                    if (key === 'nappy') {
                                        var item = {
                                            updated: resource.issued,
                                            quantity: {
                                                value: resource.code.text
                                            }
                                        }
                                    }
                                    else {
                                        var item = {
                                            updated: resource.issued,
                                            quantity: resource.valueQuantity
                                        }
                                    }

                                    if (!patients[pid][key]) {
                                        patients[pid][key] = []
                                        patients[pid][key].push(item)
                                    }
                                    else {
                                        patients[pid][key].push(item)
                                    }
                                }
                            }
                        }
                    }
                    console.log(patients)
                    for (var key in patients) {
                        this.tableData.push(patients[key])
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
            }
        },
        computed: {
            filterData() {
                var sortFunc = (a, b) => {
                    if (a[this.fieldToSort] > b[this.fieldToSort]) {
                        return 1
                    }
                    if (a[this.fieldToSort] < b[this.fieldToSort]) {
                        return -1
                    }
                    return 0
                }

                if (this.filter != '') {
                    return this.tableData.filter((patient) => {
                        return patient.name.toLowerCase().includes(this.filter.toLowerCase())
                    }).sort(sortFunc)
                }

                return this.tableData.sort(sortFunc)
            }
        }
    }
</script>
