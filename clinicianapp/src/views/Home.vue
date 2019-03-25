<template>
    <div class="home">
        <a class="nhsuk-skip-link" href="#maincontent">Skip to main content</a>
        <nhs-banner></nhs-banner>
        

   

        <div class="nhsuk-width-container">
            <main class="nhsuk-main-wrapper" id="maincontent">
                <main-table></main-table>
            </main>
        </div>

        <nhs-footer></nhs-footer>

    </div>
</template>

<script>
    // @ is an alias to /src
    import NhsBanner from '@/components/NhsBanner.vue'
    import NhsFooter from '@/components/NhsFooter.vue'
    import MainTable from '@/components/MainTable.vue'

    export default {
        name: 'home',
        components: {
            NhsBanner,
            NhsFooter,
            MainTable
        }
    }
</script>
