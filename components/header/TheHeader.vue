<template>
    <header class="header">
        <HeaderTheHeaderNav class="header__nav" @call="$emit('call')"/>
    </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .header {
        position: relative;
        position: absolute;
        top: 6vh;
        left: 0;
        width: 100%;
        background-color: #0c0c0c69;
    }
</style>