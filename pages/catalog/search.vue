<template>
    <div>

    </div>
</template>

<script>
    export default {
        beforeMount() {
            this.openSearch();
        },
        methods: {
            openSearch() {
                this.$router.push({ path: '/catalog', query: { param: this.$route.query.param } });
            },
       }

    }
</script>

<style scoped>

</style>