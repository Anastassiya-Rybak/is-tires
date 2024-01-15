<template>
    <div>
        <LazyMobileTheHeader v-if="showMobileVersion" @call="openModal('call')"/>
        <LazyTheHeader v-else @call="openModal('call')"/>
        <main>
            <LazyCallModal v-show = "modalVisible" :from="modalFrom" @close-modal="modalVisible = false" />
            <slot @form="openModal('form')" />
            <section class="container">
                <div class="mailing">
                    <h3>Узнавайте первыми о самых актуальных предложениях!</h3>
                    <mailing-form />
                </div>
            </section>
        </main>
        <TheFooter @call="openModal('call')" @form="openModal('form')"/>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useMobileStore } from '~/stores/mobile';

    const mobileStore = useMobileStore();
    const { mobile } = storeToRefs(mobileStore);

    const showMobileVersion = ref(mobile);

    onMounted(() => {
        const mediaQuery = window.matchMedia("(max-width: 690px)");
        showMobileVersion.value = mediaQuery.matches;
        mobileStore.editItem(mediaQuery.matches);
        mobileStore.saveState();
    });

    const modalVisible = ref(false);
    const modalFrom = ref('');

    const openModal = (n) => {
        modalVisible.value = true;
        modalFrom.value = n;
    };

</script>

<style lang="scss">
    .mailing {
        margin: 75px auto;
        padding: 45px 30px 45px 15%;
        overflow: hidden;
        border-radius: 20px;
        background: $accent;
        box-shadow: 0px 10px 10px 0px rgba(255, 255, 255, 0.46) inset;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3vh;
        position: relative;

        @include media(1200px) {
            padding-left: 20%;
        }

        @include media(1130px) {
            padding-left: 30px;
        }

        @include media(825px) {
            padding: 3vw;
        }

        @include media(790px) {
            margin: 3vh 0;
        }

        &::before {
            content: url('~/assets/back/back-mail.png');
            position: absolute;
            left: -5px;
            top: 0;

            @include media(1130px) {
                display: none;
            }
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