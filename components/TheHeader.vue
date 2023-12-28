<template>
    <header class="header container">
        <nav class="header__nav">
            <nuxt-link to="/" class="header__logo" @click="cleanSearch">ИСКРА СЕРВИС</nuxt-link>
            <div class="header__burger burger-wrap" @click="openBurger">
                <div class="burger">
                    <hr><hr><hr>
                </div>
            </div>
            <ul class="header__menu">
                <li>
                    <nuxt-link active-class="header__active-page" to="/" @click="cleanSearch">ГЛАВНАЯ</nuxt-link>
                </li>
                <li>
                    <nuxt-link active-class="header__active-page" to="/catalog" @click="cleanSearch">КАТАЛОГ</nuxt-link>
                </li>
                <li>
                    <nuxt-link active-class="header__active-page" to="/contact" @click="cleanSearch">КОНТАКТЫ</nuxt-link>
                </li>
            </ul>
            <LazyTheHeaderSearch v-show="searchOpen" />
            <div v-show="!searchOpen && !showMobileVersion" class="header__loop" @click="openSearchInput" >
                <img src="./../assets/Frame 5.svg" alt="Поиск по сайту">
            </div>
            <ButtonGreen class="header__call-btn" text="ОБРАТНЫЙ ЗВОНОК" @click="openModal('call')" />
            <LazyCallModal v-show = "visible" :from="modalFrom" @close-modal="visible = false" />
        </nav>
        <LazyMobileTheHederMenu v-if="showMobileVersion" />
        <LazyMobileTheHederSearch v-if="showMobileVersion" />
    </header>
</template>

<script setup>


</script>

<style lang="scss" scoped>
    .header {
        position: relative;

        &__nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 4%;
        }

        &__logo {
            flex-grow: 0;
            font-size: 30px;
        }

        &__burger {
            display: none;
            width: 5%;
            transition: all 0.4s;

            div {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 7px;

                hr {
                    border: 1px solid #00BA61;
                }
            }

            .open-burger {
                transform: rotate(90deg);
            }
        }

        &__menu {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 10%;
            width: 55%;
            margin: 30px 0;

            li a {
                display: inline-block;
                position: relative;
                line-height: 2;
                font-size: 14px;

                &::after,
                .header__active-page::before {
                    display: block;
                    position: absolute;
                    content: '';
                    height: 2px;
                    width: 0%;
                    bottom: 0;
                    background-color: #00BA61;
                    transition: width 0.4s ease-in-out;
                }

                &:hover::after,
                &:focus::after,
                .header__active-page::before {
                    width: 100%;
                }
            }
        }

        &__loop {
            cursor: pointer;
            transition: 0.3s;
            width: 2%;
             &:hover {
                opacity: 0.7;
                transform: scale(1.1);
             }
        }

        &__call-btn {
            font-size: 12px;
        }
    }
</style>