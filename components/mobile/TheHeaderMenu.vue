<template>
    <nav class="menu-out">
        <button class="menu-out__close" @click.prevent="$emit('close-menu')">
            <hr><hr>
        </button>
        <ul class="menu-out__content" >
            <li>
                <nuxt-link active-class="active-page" :to="localePath('/')" @click="reset">{{ $t("layout.header.nav.main") }}</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="active-page" :to="localePath('/catalog')" @click="reset">{{ $t("layout.header.nav.catalog") }}</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="active-page" :to="localePath('/contact')" @click="reset">{{ $t("layout.header.nav.contacts") }}</nuxt-link>
            </li>
        </ul>
        <MobileSelectLocal />
        <ButtonGreen class="menu-out__call-btn" :text="$t('layout.btns.call_btn')" @click.prevent="$emit('tocall')" />
    </nav>
</template>

<script setup>
    import { defineEmits } from 'vue';
    import { useSearchStore } from '~/stores/search';
    import { useFilterStore } from '~/stores/filter';

    const localePath = useLocalePath();

    const filterStore = useFilterStore();
    const searchStore = useSearchStore();

    const emit = defineEmits(['close-menu', 'tocall']);

    const reset = () => {
        searchStore.editItem('');
        filterStore.resetFilter();
        emit('close-menu');
    };
</script>

<style lang="scss" scoped>
    .menu-out {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        transition: right 2s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: $main-dark;

        &__close {
            background: none;
            border: none;
            color: $main-light;
            position: absolute;
            top: 8%;
            right: 8%;
            width: 10%;
            
            hr {
                width: 100%;

                &:first-child {
                    transform: rotate(45deg);
                }

                &:last-child {
                    transform: rotate(-45deg);
                }
            }

            &:active {
                color: $accent;
                transform: scale(0.9);
            }
        }

        &__content {
            display: flex;
            flex-direction: column;
            gap: 3vh;

            li a {
                display: inline-block;
                position: relative;
                line-height: 2;
                font-size: 24px;
            }

            .active-page::before {
                display: block;
                position: absolute;
                content: '';
                height: 2px;
                width: 100%;
                bottom: 0;
                background-color: $accent;
            }
        }

        &__call-btn {
            margin-top: 2vh;
            width: 60%;
        }
    }
</style>