<template>
    <div>
        <LazyMobileTheHeader v-if="showMobileVersion" @call="openModal('call')"/>
        <LazyTheHeader v-else @call="openModal('call')" @reset="reset"/>
        <LoadingItem v-show="loading"/>
        <main>
            <LazyCallModal v-show = "modalVisible" :from="modalFrom" @close-modal="modalVisible = false" />
            <slot />
            <section class="mailing-wrap">
                <div class="container">
                    <div class="mailing">
                        <h3>Узнавайте первыми о самых актуальных предложениях!</h3>
                        <mailing-form />
                    </div>
                </div>
            </section>
        </main>
        <TheFooter @call="openModal('call')" @form="openModal('form')"
        @reset="reset"/>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useMobileStore } from '~/stores/mobile';
    import { useSearchStore } from '~/stores/search';
    import { useFilterStore } from '~/stores/filter';

    const loading = ref(true);
    const mobileStore = useMobileStore();
    const { mobile } = storeToRefs(mobileStore);

    const showMobileVersion = ref(mobile);

    onMounted(() => {
        const mediaQuery = window.matchMedia("(max-width: 690px)");
        showMobileVersion.value = mediaQuery.matches;
        mobileStore.editItem(mediaQuery.matches);
        mobileStore.saveState();
        loading.value = false;
    });

    const modalVisible = ref(false);
    const modalFrom = ref('');

    const openModal = (n) => {
        modalVisible.value = true;
        modalFrom.value = n;
    };

    const searchStore = useSearchStore();
    const filterStore = useFilterStore();

    const reset = async() => {
        searchStore.editItem('');
        filterStore.resetFilter();
    };
</script>

<style lang="scss">
    .mailing-wrap {
        width: 100%;
        padding: 17vh 0;
        background-image: url('~/assets/back/mailing.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        @include media(790px) {
            padding: 3vh 0;
        }
    }

    .mailing {
        padding: 45px 30px;
        overflow: hidden;
        border-radius: 10px;
        background: $accent;
        box-shadow: 0px 10px 10px 0px rgba(255, 255, 255, 0.46) inset;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3vh;
        position: relative;

        @include media(825px) {
            padding: 3vw;
        }

        h3 {
            font-size: 30px;
            color: #f1f1f1;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.37);
            z-index: 2;

            @include media(1200px) {
                font-size: 28px;
            }

            @include media(920px) {
                font-size: 26px;
            }

            @include media(825px) {
                text-align: center;
                font-size: 24px;
            }

            @include media(690px) {
                font-size: 18px;
            }

            @include media(440px) {
                font-size: 16px;
            }
        }
    }
    @keyframes showModal {
        from { height: 0px; } to { height: 200px; }
    }

</style>