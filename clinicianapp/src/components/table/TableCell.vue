<template>
    <td class="nhsuk-table__cell" @mouseover="showModal()">
        {{mainDisplay}}
        <div id="tableModal">
            test
        </div>
    </td>
</template>

<script>
    export default {
        props: ['fields'],
        data() {
            return {
                patientFields: this.fields,
                modalVals: [],
                mainDisplay: ''
            }
        },
        watch: {
            fields(val) {
                this.patientFields = val
                
            }
        },
        methods: {
            calculateMostRecent(fields) {
                var mostRecent = fields[0]
                for (var field of fields) {
                    var currentMaxDate = Date.parse(mostRecent.updated.slice(0,25))
                    var currentDate = Date.parse(field.updated.slice(0,25))
                    if (currentDate > currentMaxDate) {
                        mostRecent = field
                    }
                }
                console.log(mostRecent)
                return `${mostRecent.quantity.value} - ${mostRecent.updated}`
            },
            showModal() {
                document.getElementById('tableModal').style.display = 'block'
            }
        }
    }
</script>

<style scoped>
    #tableModal {
        display: none;
        background: gray;
    }
</style>