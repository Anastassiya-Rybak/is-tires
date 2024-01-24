<template>
    <header class="header ">
        <nav class="header__nav container">
            <nuxt-link :to="localePath('/')" class="header__logo" @click="getOut">{{ $t("home_title") }}</nuxt-link>
            <ul class="header__menu" :class="{'header__menu_compact': searchOpen}">
                <li>
                    <nuxt-link active-class="header__active-page" :to="localePath('/')" @click="getOut">{{ $t("main_nav") }}</nuxt-link>
                </li>
                <li>
                    <nuxt-link active-class="header__active-page" :to="localePath('/catalog')">{{ $t("catalog_nav") }}</nuxt-link>
                </li>
                <li>
                    <nuxt-link active-class="header__active-page" :to="localePath('/contact')" @click="getOut">{{ $t("contacts_nav") }}</nuxt-link>
                </li>
            </ul>
            <LazyTheHeaderSearch v-if="searchOpen" />
            <div v-else class="header__loop" @click="toggleVisible('searchOpen')" >
                <img src="./../assets/Frame 5.svg" alt="Поиск по сайту">
            </div>
            <ButtonGreen class="header__call-btn" :text="$t('call_btn')" @click="$emit('call')" />
            <SelectLocal />
        </nav>
    </header>
</template>

<script setup>
    import { ref } from 'vue';
    import { useSearchStore } from '~/stores/search';

    const searchOpen = ref(false);
    const searchStore = useSearchStore();

    const localePath = useLocalePath();

    onBeforeMount(() => {
        searchStore.restoreState();
    });

    const emit = defineEmits('reset');

    const getOut = () => {
        searchOpen.value = false;
        emit('reset');
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