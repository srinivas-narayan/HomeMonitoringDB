<template>
    <tr class="nhsuk-table__row">
        <td class="nhsuk-table__cell">{{patientData.name}}</td> 
        <!--<td class="nhsuk-table__cell">{{patientData.diagnosis}}</td>-->
        <td class="nhsuk-table__cell" v-html="mostRecent(patientData.weight)"></td> 
        <td class="nhsuk-table__cell" v-html="calculateWeightDiffOne(patientData.weight)"></td>
        <td class="nhsuk-table__cell" v-html="calculateWeightDiffThree(patientData.weight)"></td>  
        <td class="nhsuk-table__cell" v-html="mostRecentSat(patientData.saturation)"></td> 
        <td class="nhsuk-table__cell" v-html="calculateOneDayAgo(patientData.feed)"></td> 
        <td class="nhsuk-table__cell" v-html="mostRecent(patientData.nappy)"></td>
    </tr>
</template>

<script>
    import TableCell from '@/components/table/TableCell.vue'

    export default {
        components: {
            TableCell
        },
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
            parseDate(datestring) {
                return Date.parse(datestring.slice(0,25))
            },
            addRed(htmlString) {
                return `<font color="red">${htmlString}</font>`
            },
            calculateWeightDiffOne(fields) {
                var mostRecent = this.calculateMostRecent(fields)
                var oneDayAgo = Date.parse(mostRecent.updated.slice(0,25)) - 86400000
                var leastRecent = fields[0]
                for (var field of fields) {
                    var currentDate = Date.parse(field.updated.slice(0,25))
                    var leastRecentDate = Date.parse(leastRecent.updated.slice(0,25))
                    if (currentDate > oneDayAgo && currentDate < leastRecentDate) {
                        leastRecent = field
                    }
                }
                var diff = parseFloat(mostRecent.quantity.value) - parseFloat(leastRecent.quantity.value)
                var toReturn = `${diff}<br>
                                <font size="2pt">Comparison with weight recorded on:<br>
                                ${this.formatDate(leastRecent.updated)}</font>`
                if (diff < -30) {
                    return this.addRed(toReturn)
                }
                return toReturn
            },
            calculateWeightDiffThree(fields) {
                var mostRecent = this.calculateMostRecent(fields)
                var oneDayAgo = Date.parse(mostRecent.updated.slice(0,25)) - 259200000
                var leastRecent = fields[0]
                for (var field of fields) {
                    var currentDate = Date.parse(field.updated.slice(0,25))
                    var leastRecentDate = Date.parse(leastRecent.updated.slice(0,25))
                    if (currentDate > oneDayAgo && currentDate < leastRecentDate) {
                        leastRecent = field
                    }
                }
                var diff = parseFloat(mostRecent.quantity.value) - parseFloat(leastRecent.quantity.value)
                var toReturn = `${diff}<br>
                                <font size="2pt">Comparison with weight recorded on:<br>
                                ${this.formatDate(leastRecent.updated)}</font>`
                if (diff < 20) {
                    return this.addRed(toReturn)
                }
                return toReturn
            },
            formatDate(datestring) {
                var dates = datestring.split('T')
                return `${dates[0]} ${dates[1].slice(0,8)}`
            },
            calculateMostRecent(fields) {
                var mostRecent = fields[0]
                for (var field of fields) {
                    var currentMaxDate = Date.parse(mostRecent.updated.slice(0,25))
                    var currentDate = Date.parse(field.updated.slice(0,25))
                    if (currentDate > currentMaxDate) {
                        mostRecent = field
                    }
                }
                return mostRecent
            },
            mostRecent(fields) {
                var mostRecent = this.calculateMostRecent(fields)
                return `${mostRecent.quantity.value}<br>
                        <font size="2pt">Updated: ${this.formatDate(mostRecent.updated)}</font>`
            },
            mostRecentSat(fields) {
                var mostRecent = this.calculateMostRecent(fields)
                var toReturn = `${mostRecent.quantity.value}<br>
                                <font size="2pt">
                                Range: 70 - 80<br>
                                Updated: ${this.formatDate(mostRecent.updated)}</font>`
                var sat = parseFloat(mostRecent.quantity.value)
                if (sat < 70 || sat > 80) {
                    return this.addRed(toReturn)
                }
                return toReturn
            },
            calculateOneDayAgo(fields) {
                var total = 0
                var mostRecent = this.calculateMostRecent(fields)
                var oneDayAgo = Date.parse(mostRecent.updated.slice(0,25)) - 86400000
                for (var field of fields) {
                    var updated = this.parseDate(field.updated)
                    if (updated >= oneDayAgo) {
                        total += parseFloat(field.quantity.value)
                    }
                }
                var target = 100
                var toReturn = `${total}<br>
                        <font size="2pt">
                        Target: 100
                        </font>`

                if (parseFloat(field.quantity.value) < target) {
                    return this.addRed(toReturn)
                }
                return toReturn
            }
        }
    }
</script>