<template>
    <header class="header container" >
        <nav class="header__nav">
            <nuxt-link :to="localePath('/')" class="header__logo" @click="reset">{{ $t("home_title") }}</nuxt-link>
            <div class="header__burger burger-wrap" @click="toggleVisible">
                <div class="burger">
                    <hr><hr><hr>
                </div>
            </div>
        </nav>
        <LazyMobileTheHeaderMenu v-if="burgerOpen" @close-menu="toggleVisible" @tocall="$emit('call')"/>
        <MobileTheHeaderSearch />
    </header>
</template>

<script setup>
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useSearchStore } from '~/stores/search';
    import { useFilterStore } from '~/stores/filter';

    const localePath = useLocalePath();

    const burgerOpen = ref(false);
    const filterStore = useFilterStore();

    const searchStore = useSearchStore();
    const { inpData } = storeToRefs(searchStore);

    onBeforeMount(() => {
        searchStore.restoreState();
    });

    const reset = () => {
        if (inpData !== '') searchStore.editItem('');
        filterStore.resetFilter();
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

            @include media(450px) {
            }
        }

        &__burger {
            width: 5%;
            transition: all 0.4s;

            @include media(580px) {
                width: 6%;
            }

            @include media(480px) {
                width: 7%;
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
    }
</style>