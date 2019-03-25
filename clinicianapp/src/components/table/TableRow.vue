<template>
    <tr class="nhsuk-table__row">
        <td class="nhsuk-table__cell">{{patientData.name}}</td> 
        <td class="nhsuk-table__cell">{{patientData.diagnosis}}</td> 
        <td class="nhsuk-table__cell">{{patientData.weight_today}}</td> 
        <td class="nhsuk-table__cell">{{calculateWeightDiffToday()}}</td> 
        <td class="nhsuk-table__cell">{{patientData.saturation}}</td> 
        <td class="nhsuk-table__cell">{{patientData.feed}}</td> 
        <td class="nhsuk-table__cell">{{patientData.nappy}}</td> 
    </tr>
</template>

<script>
    export default {
        props: ['patient'],
        data() {
            return {
                patientData: this.patient
            }
        },
        watch: {
            patient(val) {
                console.log(val)
                this.patientData = val
            }
        },
        methods: {
            calculateWeightDiffToday() {
                return this.patientData.weight_today - this.patientData.weight_yesterday
            }
        }
    }
</script>