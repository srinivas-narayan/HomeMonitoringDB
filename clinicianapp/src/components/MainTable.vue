<template>
    <div class="nhsuk-grid-row">
        <div class="nhsuk-grid-column-full">
            <div class="nhsuk-table-responsive">
                <table class="nhsuk-table">
                    <caption class="nhsuk-table__caption">Clinican Table</caption>
                    <thead class="nhsuk-table__head">
                        <tr class="nhsuk-table__row">
                            <th class="nhsuk-table__header" scope="col">Patient Name</th>
                            <th class="nhsuk-table__header" scope="col">Diagnosis</th>
                            <th class="nhsuk-table__header" scope="col">Weight Today</th>
                            <th class="nhsuk-table__header" scope="col">Weight Gain/loss</th>
                            <th class="nhsuk-table__header" scope="col">Saturation</th>
                            <th class="nhsuk-table__header" scope="col">Feed</th>
                            <th class="nhsuk-table__header" scope="col">Nappy</th>
                        </tr>
                    </thead>
                    <tbody class="nhsuk-table__body">
                        <table-row v-for="patient in sortedData" :patient="patient"></table-row>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="nhsuk-grid-column-one-quarter">
            <primary-button text="Refresh"></primary-button>
        </div>
    </div>
</template>

<script>
    import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
    import TableRow from '@/components/TableRow.vue'
    import axios from 'axios'

    export default {
        components: {
            PrimaryButton,
            TableRow
        },
        data() {
            return {
                fieldToSort: 'name',
                tableData: [
                    {
                        name: 'test patient',
                        diagnosis: 'something',
                        weight_today: 2400,
                        weight_yesterday: 2100,
                        weight_three_days_ago: 2000,
                        saturation: 80,
                        feed: 100,
                        nappy: 10
                    },
                    {
                        name: 'test patient',
                        diagnosis: 'something',
                        weight_today: 2500,
                        weight_yesterday: 2100,
                        weight_three_days_ago: 2000,
                        saturation: 80,
                        feed: 100,
                        nappy: 10
                    },
                    {
                        name: 'test patient',
                        diagnosis: 'something',
                        weight_today: 2800,
                        weight_yesterday: 2200,
                        weight_three_days_ago: 2000,
                        saturation: 80,
                        feed: 100,
                        nappy: 10
                    }
                ]
            }
        },
        methods: {
        },
        computed: {
            sortedData () {
                function compare(a, b) {
                    if (a[this.fieldToSort] < b[this.fieldToSort]) {
                        return -1
                    }
                    if (a[this.fieldToSort] > b[this.fieldToSort]) {
                        return 1
                    }
                    return 0
                }

                return this.tableData.sort(compare)
            }
        }
    }
</script>
