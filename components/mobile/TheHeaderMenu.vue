<template>
    <nav class="menu-out">
        <button class="menu-out__close" @click.prevent="$emit('close-menu')">
            <hr><hr>
        </button>
        <ul class="menu-out__content" >
            <li>
                <nuxt-link active-class="active-page" to="/" @click="cleanSearch, $emit('close-menu')">ГЛАВНАЯ</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="active-page" to="/catalog" @click="cleanSearch, $emit('close-menu')">КАТАЛОГ</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="active-page" to="/contact" @click="cleanSearch, $emit('close-menu')">КОНТАКТЫ</nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>

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

        // &_open {
            // animation: open 0.7s ease-in-out alternate;

            // @keyframes open {
            //     from { width: 0%; }
            //     to { width: 100%; }
            // }
        // }

        // &_close {
        //     animation: close 0.7s ease-in-out alternate;

        //     @keyframes close {
        //         from { width: 100%; }
        //         to { width: 0%; }
        //     }
        // }

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
    }
</style>