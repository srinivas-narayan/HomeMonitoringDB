<template>
    <thead class="nhsuk-table__head">
        <tr class="nhsuk-table__row">
            <th v-for="(item, index) in headers" class="nhsuk-table__header" :key="index" scope="col">
                {{item.name}}
            </th>
        </tr>
    </thead>
</template>

<script>
    export default {
        props: ['headers']
    }
</script>