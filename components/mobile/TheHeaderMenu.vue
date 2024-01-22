<template>
    <nav class="menu-out">
        <button class="menu-out__close" @click.prevent="$emit('close-menu')">
            <hr><hr>
        </button>
        <ul class="menu-out__content" >
            <li>
                <nuxt-link active-class="active-page" to="/" @click="reset">ГЛАВНАЯ</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="active-page" to="/catalog" @click="reset">КАТАЛОГ</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="active-page" to="/contact" @click="reset">КОНТАКТЫ</nuxt-link>
            </li>
        </ul>
        <ButtonGreen class="menu-out__call-btn" text="ОБРАТНЫЙ ЗВОНОК" 
            @click="$emit('call')" />
    </nav>
</template>

<script setup>
    import { defineEmits } from 'vue';
    import { useSearchStore } from '~/stores/search';
    import { useFilterStore } from '~/stores/filter';

    const filterStore = useFilterStore();
    const searchStore = useSearchStore();

    const emit = defineEmits('close-menu');

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
            margin-top: 20vh;
            width: 60%;
        }
    }
</style>