<template>
    <nav class="nav container">
        <HeaderTheHeaderTop class="nav__top" />
        <nuxt-link :to="localePath('/')" class="nav__logo">{{ $t("home_title") }}</nuxt-link>
        <ul class="nav__menu">
            <li>
                <nuxt-link active-class="header__active-page" :to="localePath('/')">{{ $t("layout.header.nav.main") }}</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="header__active-page" :to="localePath('/catalog')">{{ $t("layout.header.nav.catalog") }}</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="header__active-page" :to="localePath('/contact')">{{ $t("layout.header.nav.contacts") }}</nuxt-link>
            </li>
        </ul>
        <HeaderTheHeaderSearch />
    </nav>
</template>

<script setup>
    import { useSearchStore } from '~/stores/search';

    const searchStore = useSearchStore();

    const localePath = useLocalePath();

    onBeforeMount(() => {
        searchStore.restoreState();
    });

</script>

<style lang="scss" scoped>
    .nav {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__top {
            position: absolute;
            top: -70%;
        }

        &__logo {
            font-size: 30px;

            @include media(1015px) {
                font-size: 22px;
            }

            @include media(745px) {
                width: 15%;
            }
        }

        &__menu {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 10%;
            // width: 55%;
            flex: content;
            margin: 1.4vw 0;

            @include media(1115px) {
                padding: 0;
                width: 48%;
            }

            li a {
                display: inline-block;
                position: relative;
                line-height: 2;
                font-size: 14px;

                @include media(1015px) {
                    font-size: 10px;
                }

                &::after {
                    display: block;
                    position: absolute;
                    content: '';
                    height: 2px;
                    width: 0%;
                    bottom: 0;
                    background-color: $accent;
                    transition: width 0.4s ease-in-out;
                }

                &:hover::after,
                &:focus::after {
                    width: 100%;
                }
            }
        }

        &__active-page::before {
            display: block;
            position: absolute;
            content: '';
            height: 2px;
            width: 100%;
            bottom: 0;
            background-color: $accent;
        }
    }

</style>