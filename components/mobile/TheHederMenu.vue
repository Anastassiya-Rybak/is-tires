<template>
    <nav class="menu-out-wrap">
        <ul class="menu-out" >
            <li>
                <nuxt-link active-class="active-page" to="/" @click="cleanSearch">ГЛАВНАЯ</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="active-page" to="/catalog" @click="cleanSearch">КАТАЛОГ</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="active-page" to="/contact" @click="cleanSearch">КОНТАКТЫ</nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .menu-out-wrap {
        display: none;
        width: 100%;
    }

    .menu-out {
        margin-top: 2dvh;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .menu-out li a{
        display: inline-block;
        position: relative;
        line-height: 2;
    }

</style>