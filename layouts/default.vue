<template>
    <div>
        <LazyMobileTheHeader v-if="showMobileVersion"/>
        <LazyTheHeader v-else />
        <main>
            <slot />
            <section class="container">
                <div class="mailing">
                    <h3>Узнавайте первыми о самых актуальных предложениях!</h3>
                    <mailing-form />
                </div>
            </section>
        </main>
        <TheFooter />
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

            @include media(440px) {
                font-size: 22px;
            }
        }
    }
    @keyframes showModal {
        from { height: 0px; } to { height: 200px; }
    }

</style>