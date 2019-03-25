<template>
    <div class="nhsuk-form-group">
        <label class="nhsuk-label" for="input-width-10">
            {{title}}
        </label>
        <input class="nhsuk-input nhsuk-input--width-10" id="input-width-10" name="test-width-10" type="text" v-model="inputValue">
    </div>
</template>

<script>
    export default {
        props: ['title', 'value'],
        data() {
            return {
                inputValue: this.value
            }
        },
        watch: {
            value(val) {
                this.inputValue = val
            },
            inputValue(val) {
                this.$emit('input', val)
            }
        }
    }
</script>