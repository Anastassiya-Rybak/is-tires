<template>
    <div>
        <section class="frst-block-wrap">
            <div class="first-block">
                <h1>{{ $t("main.first_block.title") }}</h1>
                <p>{{ $t("main.first_block.paragraf_1") }}</p>
                <p>{{ $t("main.first_block.paragraf_2") }}</p>
                <div class="first-block__btns">
                    <nuxt-link :to="localePath('/catalog')">{{ $t("layout.btns.open") }}</nuxt-link>
                    <ButtonGreen :text="$t('layout.btns.application')" @click="visibleModal" />
                    <LazyCallModal v-show = "visible" from="form" @close-modal="visibleModal" />
                </div>
            </div>
        </section>
        <section class="second-block container">
            <div class="second-block__text">
                <span>{{ $t("main.second_block.span") }}</span>
                <h3>{{ $t("main.second_block.h3") }}</h3>
                <h2>{{ $t("main.second_block.h2") }}</h2>
            </div>
            <TheCategoryCard class="second-block__card"
                v-for="(category, idx) in categories" :key="idx" 
                :categoryName="$t('main.second_block.categories', idx + 1)"
                :category="category" />
            <nuxt-link class="second-block__link" :to="localePath('/catalog')">{{ $t("main.second_block.link") }}</nuxt-link>
        </section>
        <section class="therd-block-wrap">
            <div class="therd-block container">
                <h2>{{ $t('main.therd_block.title') }}</h2>
                <Swiper class="therd-block__slider"
                :modules="[SwiperAutoplay, SwiperNavigation]"
                :slides-per-view="mobile ? 1 : 3"
                :space-between="mobile ? 10 : 40"
                :loop="true"
                :preventClicks = true
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: true,
                }"
                :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }">
                    <SwiperSlide
                    v-for="product in products.slice(0, 6)" :key="product">
                        <ProductCard class="therd-block__card" :productData="product" :noSlide="false"/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import JSON from '~/server/bd.json';
    import { storeToRefs } from 'pinia';
    import { useMobileStore } from '~/stores/mobile';

    const localePath = useLocalePath();

    const mobileStore = useMobileStore();
    const { mobile } = storeToRefs(mobileStore);

    const products = JSON.products;
    const categories = JSON.categories;
    const visible = ref(false);

    const visibleModal = () => {
        visible.value = !visible.value;
    }
</script>

<style lang="scss">
    .swiper {
        overflow-y: visible;
    }
    .frst-block-wrap {
        background-image: url(./../assets/back/1block.png);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        padding: 45dvh 0 30dvh;
        color: #f1f1f1;
    }

    .first-block{
        width: 90%;
        max-width: 1440px;
        margin: 0 auto;

        @include media (1440px) {
            width: 43%;
            margin: 0 5%;
        }

        @include media(920px) {
            width: 55%;
        }

        @include media(690px) {
            width: 90%;
            margin: 0 auto;
        }

        h1 {
            font-size: 390%;
            letter-spacing: 0.08em;

            @include media(1240px) {
                font-size: 5.1vw;
            }

            @include media(690px) {
                font-size: 8vw;
            }
        }

        p {
            text-align: justify;
            font-size: 20px;
            line-height: 1.2em;
            letter-spacing: 2px;
            margin: 1.6em 0;
            width: 47%;

            @include media (1440px) {
                width: 100%;
            }

            @include media(1240px) {
                font-size: 1.5vw;
            }

            @include media(690px) {
                font-size: 2.9vw;
            }
        }

        &__btns {
            display: flex;
            justify-content: space-between;
            width: 47%;

            @include media (1440px) {
                width: 100%;
            }

            @include media(690px) {
                flex-direction: column;
                gap: 1vh;
            }

            button,
            a {
                width: 49%;
                font-size: 14px;

                @include media(1000px) {
                    font-size: 1.2vw;
                }

                @include media(690px) {
                    font-size: 2.5vw;
                    width: 100%;
                }
            }

            a {
                display: block;
                padding: 0.8em 1.6em;
                border-radius: 10px;
                cursor: pointer;
                background-color: $accent;
                color: #f1f1f1;
                text-align: center;
                text-shadow: 0px 0.3em 0.3em rgba(0, 0, 0, 0.25);
                border: 1px solid rgba(0, 0, 0, 0.089);
                box-shadow: 0px 0.3em 0.3em 0px rgba(255, 255, 255, 0.68) inset, 0px 0.3em 0.3em 0px rgba(0, 0, 0, 0.25);
                transition: 0.3s;
                
                &:hover {
                    filter: brightness(90%);
                }

                &:active {
                    transform: scale(0.98, 0.98);
                    background-color: #01aa59;
                }
            }            
        }
    }

    .second-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 1%;
        row-gap: 10px;
        align-items: center;
        padding: 5vh 0;

        @include media(680px) {
            row-gap: 1vh;
            justify-content: space-between;
        }

        &__text {
            width: 59%;
            display: flex;
            flex-direction: column;

            @include media(680px) {
                width: 49%;
            }

            span {
                color: $main-light;
                font-size: 240%;
                letter-spacing: 0.08em;
                line-height: 2.5em;

                @include media(1440px){
                    font-size: 2.4vw;
                }

                @include media(680px) {
                    font-size: 18px;
                }
            }

            h3,
            h2 {
                font-size: 280%;
                letter-spacing: 0.08em;
                line-height: 1.5em;

                @include media(1440px){
                    font-size: 2.6vw;
                }

                @include media(680px) {
                    font-size: 2.3vw;
                }

                @include media(500px) {
                    font-size: 4.5vw;
                }
            }

            h3 {
                color: $accent;
            }

            h2 {
                color: $main-light;
            }
        }

        &__card {
            width: 19%;
            height: 45vh;

            @include media(1370px) {
                height: 35vh;
            }

            @include media(830px) {
                height: 22vh;
            }

            @include media(680px) {
                width: 49%;
                height: 15vh;
            }
        }

        &__link {
            width: calc(38% + 10px);
            border-radius: 10px;
            background-color: #01aa58c9;
            height: 45vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f1f1f1;
            font-size: 120%;
            font-weight: 800;
            opacity: 0.7;
            transition: all 0.3s ease;

            @include media(1370px) {
                height: 35vh;
            }

            @include media(1150px) {
                font-size: 80%;
            }

            @include media(830px) {
                opacity: 1;
                height: 22vh;
            }

            @include media(680px) {
                height: 15vh;
                font-size: 1.8vw;
                width: 49%;
            }

            @include media(500px) {
                height: 10vh;
                font-size: 2.5vw;
            }

            @media (hover: hover) {
                &:hover {
                    opacity: 1;
                    font-size: 100%;
                    -webkit-tap-highlight-color: transparent;

                    @include media(1150px) {
                        font-size: 70%;
                    }
                }
            }
        }

        &__text,
        &__link {
            @include media(500px) {
                width: 100%;
            }
        }
    }

    .therd-block-wrap {
        background-image: url(./../assets/back/2block.png);
        background-position: start;
        background-size: cover;
        background-repeat: no-repeat;
        padding: 2vh 0 8vh;
    }

    .therd-block {
        position: relative;

        h2 {
            color: #f1f1f1;
            font-size: 40px;
            letter-spacing: 0.1em;
            text-shadow: 0px 0.1em 0.1em rgba(0, 0, 0, 0.25);
            padding: 1.1em 0;
            text-align: center;

            @include media(620px) {
                font-size: 32px;
            }

            @include media(450px) {
                font-size: 26px;
            }
        }
        
        &__slider {
            width: 93%;
            display: flex;
            justify-content: space-between;

            .swiper-button-next::after,
            .swiper-button-prev::after {
                color: #000000c7;
                font-weight: 800;
            }

            @media (hover: hover) {
                .swiper-button-next:hover::after,
                .swiper-button-prev:hover::after {
                    color: #4b4b4b;
                    transform: scale(1.2);
                }
            }

            @media (hover: none) {
                .swiper-button-next:active::after,
                .swiper-button-prev:active::after {
                    color: #4b4b4b;
                    transform: scale(1.2);
                }
            }
        }

        &__card {
            @include media(1300px) {
                p {
                    font-size: 80%;
                }
            }

            @include media(1070px) {
                .product-card__img {
                    height: 230px;
                    margin: 10px 0;
                }

                h3 {
                    margin-bottom: 10px;
                }
            }

            @include media(680px) {
                width: 60%;
                margin: 0 auto;
            }

            @include media(450px) {
                width: 75%;
            }
        }
    }
</style>