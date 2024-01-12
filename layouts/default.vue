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

        &::before {
            content: url('~/assets/back/back-mail.png');
            position: absolute;
            left: -5px;
            top: 0;
        }

        h3 {
            font-size: 30px;
            color: #f1f1f1;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.37);
            z-index: 2;
        }

        .mail-form {
            width: 94%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            input {
                width: 50%;
                padding: 0.6em 1.4em;
                background-color: #f1f1f1;
                font-size: 18px;
                border: none;
                border-radius: 10px;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.13) inset;
                filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
            }

            button {
                width: 48%;
                padding: 0.6em 1.4em;
                border-radius: 10px;
                cursor: pointer;
                color: #f1f1f1;
                font-size: 18px;
                letter-spacing: 0.1em;
                word-spacing: 0.2em;
                border: none;
                box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.43) inset;
                background-color: rgb(19, 19, 19);

                &:hover {
                    filter: brightness(90%);
                }

                &:active {
                    transform: scale(0.98, 0.98);
                }
            }
        }
    }
    @keyframes showModal {
        from { height: 0px; } to { height: 200px; }
    }

</style>