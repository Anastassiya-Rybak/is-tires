<template>
    <div class="gradient-background">
        <h1>ИСКРА СЕРВИС</h1>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .gradient-background {
        position: fixed;
        z-index: 999;
        width: 100%;
        height: 100vh; /* Измените на необходимую высоту */
        background: linear-gradient(30deg, $main-dark, $accent);
        background-size: 200% 200%;
        animation: gradientAnimation 1.5s ease infinite;
        display: flex;
        align-items: center;
        justify-content: center;

            @keyframes gradientAnimation {
                0% {
                    background: linear-gradient(30deg, $main-dark, $accent);
                }
                15% {
                    background: linear-gradient(35deg, $main-dark, $accent);
                }
                20% {
                    background: linear-gradient(40deg, $main-dark, $accent);
                }
                25% {
                    background: linear-gradient(45deg, $main-dark, $accent);
                }
                35% {
                    background: linear-gradient(50deg, $main-dark, $accent);
                }
                42% {
                    background: linear-gradient(-55deg, $main-dark, $accent);
                }
                50% {
                    background: linear-gradient(-60deg, $main-dark, $accent);
                }
                55% {
                    background: linear-gradient(-65deg, $main-dark, $accent);
                }
                63% {
                    background: linear-gradient(-70deg, $main-dark, $accent);
                }
                75% {
                    background: linear-gradient(-75deg, $main-dark, $accent);
                }
                80% {
                    background: linear-gradient(80deg, $main-dark, $accent);
                }
                90% {
                    background: linear-gradient(85deg, $main-dark, $accent);
                }
                100% {
                    background: linear-gradient(90deg, $main-dark, $accent);
                }
            }

            h1 {
                color: $main-light;
                text-align: center;
                font-size: 2em;
            }
    }
</style>