<template>
    <header class="header ">
        <nav class="header__nav container">
            <nuxt-link to="/" class="header__logo" @click="reset">ИСКРА СЕРВИС</nuxt-link>
            <ul class="header__menu" :class="{'header__menu_compact': searchOpen}">
                <li>
                    <nuxt-link active-class="header__active-page" to="/" @click="reset">ГЛАВНАЯ</nuxt-link>
                </li>
                <li>
                    <nuxt-link active-class="header__active-page" to="/catalog">КАТАЛОГ</nuxt-link>
                </li>
                <li>
                    <nuxt-link active-class="header__active-page" to="/contact" @click="reset">КОНТАКТЫ</nuxt-link>
                </li>
            </ul>
            <LazyTheHeaderSearch v-show="searchOpen" />
            <div v-show="!searchOpen" class="header__loop" @click="toggleVisible('searchOpen')" >
                <img src="./../assets/Frame 5.svg" alt="Поиск по сайту">
            </div>
            <ButtonGreen class="header__call-btn" text="ОБРАТНЫЙ ЗВОНОК" @click="$emit('call')" />
        </nav>
    </header>
</template>

<script setup>
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useSearchStore } from '~/stores/search';
    import { useFilterStore } from '~/stores/filter';

    const searchOpen = ref(false);
    const filterStore = useFilterStore();

    const searchStore = useSearchStore();
    const { inpData } = storeToRefs(searchStore);

    onBeforeMount(() => {
        searchStore.restoreState();
    });

    const reset = () => {
        searchOpen.value = false;
        searchStore.editItem('');
        filterStore.resetFilter();
    };

    const toggleVisible = (item) => {
        if (item === 'burgerOpen') {
            switch (burgerOpen.value) {
                case false:
                    burgerOpen.value = true;
                    break;
                case true:
                    setTimeout(()=>{ burgerOpen.value = false; }, 700);
                    break;
                default:
                    break;
            }
        } else { searchOpen.value = !searchOpen.value; }
    };

</script>

<style lang="scss" scoped>
    .header {
        position: relative;
        position: absolute;
        top: 3vh;
        left: 0;
        width: 100%;
        background-color: #0c0c0c69;

        &__nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
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
            width: 55%;
            margin: 1.4vw 0;

            @include media(1115px) {
                padding: 0;
                width: 48%;
            }

            &_compact {
                width: 30%;
                padding: 0 2%;
                animation: changeWidth 0.7s ease-in-out alternate;

                @keyframes changeWidth {
                    from { width: 55%; padding: 0 10%; }
                    to { width: 30%; padding: 0 2%; }
                }
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

        &__loop {
            cursor: pointer;
            transition: 0.3s;
            width: 2%;

            @include media(1115px) {
                width: 3%;
            }

            @include media(1015px) {
                width: 2.5%;
            }
            
            &:hover {
                opacity: 0.7;
                transform: scale(1.1);
            }
        }

        &__call-btn {
            font-size: 12px;

            @include media(1015px) {
                font-size: 8px;
            }

            @include media(690px) {
                font-size: 14px;
            }
        }
    }
</style>