<template>
    <header class="header container">
        <nav class="header__nav">
            <nuxt-link to="/" class="header__logo" @click="resetSearch">ИСКРА СЕРВИС</nuxt-link>
            <div class="header__burger burger-wrap" @click="toggleVisible">
                <div class="burger">
                    <hr><hr><hr>
                </div>
            </div>
            <ButtonGreen class="header__call-btn" text="ОБРАТНЫЙ ЗВОНОК" 
                @click="openModal('call')" />
            <LazyCallModal v-show = "visible" :from="modalFrom" 
                @close-modal="visible = false" />
        </nav>
        <LazyMobileTheHeaderMenu v-if="burgerOpen" 
            @close-menu="toggleVisible" />
        <MobileTheHeaderSearch />
    </header>
</template>

<script setup>
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useSearchStore } from '~/stores/search';

    const burgerOpen = ref(false);
    const visible = ref(false);
    const modalFrom = ref('');

    const searchStore = useSearchStore();
    const { inpData } = storeToRefs(searchStore);

    onBeforeMount(() => {
        searchStore.restoreState();
    });

    const resetSearch = () => {
        if (inpData !== '') searchStore.editItem('');
    };

    const openModal = (n) => {
        visible.value = true;
        modalFrom.value = n;
    };

    const toggleVisible = () => {
        burgerOpen.value = !burgerOpen.value;
    };

</script>

<style lang="scss" scoped>
    .header {
        position: relative;
        padding: 1.5vh 0;

        &__nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__logo {
            font-size: 22px;
            width: 15%;
        }

        &__burger {
            width: 5%;
            transition: all 0.4s;
            margin-left: 40%;

            @include media(580px) {
                width: 6%;
            }

            @include media(480px) {
                margin-left: 35%;
                width: 7%;
            }

            @include media(450px) {
                margin-left: 30%;
            }

            div {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 7px;

                hr {
                    border: 1px solid $accent;
                }
            }
        }

        &__call-btn {
            font-size: 14px;

            @include media(580px) {
                font-size: 12px;
            }
        }
    }
</style>