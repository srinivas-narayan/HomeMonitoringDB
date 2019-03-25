<template>
    <div class="nhsuk-grid-row">
        <div class="nhsuk-grid-column-one-quarter">
            <primary-button text="Refresh" @click="test()"></primary-button>
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
    import axios from 'axios'

    export default {
        components: {
            PrimaryButton,
            TableRow,
            TableHeader,
            TextInput
        },
        data() {
            return {
                filter: '',
                tableHeader: [
                    {
                        name: 'Name',
                        field: 'name'
                    },
                    {
                        name: 'Diagnosis',
                        field: 'diagnosis'
                    },
                    {
                        name: 'Weight',
                        field: 'weight_today'
                    },
                    {
                        name: 'Weight Gain/Loss',
                        field: 'name'
                    },
                    {
                        name: 'Saturation',
                        field: 'saturation'
                    },
                    {
                        name: 'Feed',
                        field: 'feed'
                    },
                    {
                        name: 'Nappy',
                        field: 'nappy'
                    }
                ],
                fieldToSort: 'name',
                tableData: [
                    {
                        name: 'John Smith',
                        diagnosis: 'ls',
                        weight_today: 2400,
                        weight_yesterday: 2100,
                        weight_three_days_ago: 2000,
                        saturation: 40,
                        feed: 100,
                        nappy: 10
                    },
                    {
                        name: 'Adam Test',
                        diagnosis: 'google',
                        weight_today: 2500,
                        weight_yesterday: 2100,
                        weight_three_days_ago: 2000,
                        saturation: 80,
                        feed: 100,
                        nappy: 10
                    },
                    {
                        name: 'Henry Ford',
                        diagnosis: 'something',
                        weight_today: 2800,
                        weight_yesterday: 2200,
                        weight_three_days_ago: 2000,
                        saturation: 70,
                        feed: 100,
                        nappy: 10
                    }
                ]
            }
        },
        methods: {
            changeSortField(field) {
                this.fieldToSort = field
            },
            test() {
                console.log('test')
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
