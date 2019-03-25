<template>
    <button class="nhsuk-button" type="submit" @click="$emit('click')">
        {{text}}
    </button>
</template>

<script>
    export default {
        props: ['text']
    }
</script>