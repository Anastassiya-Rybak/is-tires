<template>
    <header class="header container">
        <nav class="header__nav">
            <nuxt-link to="/" class="header__logo" @click="resetSearch">ИСКРА СЕРВИС</nuxt-link>
            <div v-if="showMobileVersion" class="header__burger burger-wrap" @click="toggleVisible('burgerOpen')">
                <div class="burger">
                    <hr><hr><hr>
                </div>
            </div>
            <ul v-show="!showMobileVersion" class="header__menu" :class="{'header__menu_compact': searchOpen}">
                <li>
                    <nuxt-link active-class="header__active-page" to="/" @click="resetSearch">ГЛАВНАЯ</nuxt-link>
                </li>
                <li>
                    <nuxt-link active-class="header__active-page" to="/catalog">КАТАЛОГ</nuxt-link>
                </li>
                <li>
                    <nuxt-link active-class="header__active-page" to="/contact" @click="resetSearch">КОНТАКТЫ</nuxt-link>
                </li>
            </ul>
            <LazyTheHeaderSearch v-show="searchOpen && !showMobileVersion" />
            <div v-show="!searchOpen && !showMobileVersion" class="header__loop" @click="toggleVisible('searchOpen')" >
                <img src="./../assets/Frame 5.svg" alt="Поиск по сайту">
            </div>
            <ButtonGreen class="header__call-btn" text="ОБРАТНЫЙ ЗВОНОК" @click="openModal('call')" />
            <LazyCallModal v-show = "visible" :from="modalFrom" @close-modal="visible = false" />
        </nav>
        <LazyMobileTheHederMenu v-if="showMobileVersion && burgerOpen" @close-item="toggleVisible('burgerOpen')"/>
        <LazyMobileTheHederSearch v-if="showMobileVersion && searchOpen" @close-item="toggleVisible('searchOpen')"/>
    </header>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useSearchStore } from '~/stores/search';

    const searchOpen = ref(false);
    const burgerOpen = ref(false);
    const showMobileVersion = ref(false);
    const visible = ref(false);
    const modalFrom = ref('');

    const searchStore = useSearchStore();
    const { inpData } = storeToRefs(searchStore);

    onBeforeMount(() => {
        searchStore.restoreState();
    });

    const resetSearch = () => {
        searchOpen.value = false;
        if (inpData !== '') searchStore.editItem('');
    };

    const toggleVisible = (item) => { item === 'burgerOpen' ? burgerOpen.value = !burgerOpen.value : searchOpen.value = !searchOpen.value; };

    const openModal = (n) => {
        visible.value = true;
        modalFrom.value = n;
    };

    // onMounted(() => {
    //     const mediaQuery = window.matchMedia("(max-width:768px)");
    //     showMobileVersion.value = mediaQuery.matches;
    //     const listener = e => showMobileVersion = e.matches;
    //     mediaQuery.addEventListener(listener);
    //     $once('hook:beforeDestroy', () => mediaQuery.removeEventListener(listener));
    // })


</script>

<style lang="scss" scoped>
    .header {
        position: relative;

        &__nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__logo {
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

                &::after {
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
            background-color: #00BA61;
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