<template>
    <div>
        <section class="frst-block-wrap">
            <div class="first-block container">
                <h1>ИСКРА СЕРВИС</h1>
                <p>Высококачественные шины и общее решение для шин позволяют максимально повысить производительность вашего автопарка и снизить эксплуатационные расходы.</p>
                <div class="first-block__btns">
                    <nuxt-link to="/catalog">ОТКРЫТЬ КАТАЛОГ</nuxt-link>
                    <ButtonGreen text="ОСТАВИТЬ ЗАЯВКУ" @click="visibleModal" />
                    <LazyCallModal v-show = "visible" from="form" @close-modal="visibleModal" />
                </div>
            </div>
        </section>
        <section class="second-block-wrap">
            <div class="second-block container">
                <h2>Рекомендуемые товары</h2>
                <Swiper class="second-bloc__slider"
                :modules="[SwiperAutoplay, SwiperNavigation]"
                :slides-per-view="3"
                :space-between="100"
                :loop="true"
                :preventClicks = true
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false,
                }"
                :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }">
                    <SwiperSlide
                    v-for="product in products.slice(0, 6)" :key="product">
                        <ProductCard :productName="product.name" :noSlide="false"/>
                    </SwiperSlide>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </Swiper>
            </div>
        </section>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import JSON from '~/server/bd.json';

    const products = JSON.products;
    const visible = ref(false);
    const slides = ref([]);

    const visibleModal = () => {
        visible.value = !visible.value;
    }
</script>

<style lang="scss">
    .frst-block-wrap {
        background-image: url(./../assets/back/1block.png);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        padding: 30dvh 0;
        color: #f1f1f1;
    }

    .first-block{
        h1 {
            font-size: 64px;
            letter-spacing: 5px;
        }

        p {
            font-size: 20px;
            line-height: 1.2em;
            letter-spacing: 2px;
            margin: 1.6em auto;
        }

        &__btns {
            display: flex;
            gap: 3%;

            button,
            a {
                width: 20%;
                font-size: 14px;
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

                &:active {
                    transform: scale(0.98, 0.98);
                    background-color: #01aa59;
                }
            }            
        }
    } 

    .second-block-wrap {
        background-image: url(./../assets/back/2block.png);
        background-position: start;
        background-size: cover;
        background-repeat: no-repeat;
        padding-bottom: 100px;
    }

    .second-block {
        position: relative;

        h2 {
            color: #f1f1f1;
            font-size: 40px;
            letter-spacing: 0.1em;
            text-shadow: 0px 0.1em 0.1em rgba(0, 0, 0, 0.25);
            padding: 1.1em 0;
        }
        
        &__slider {
            width: 93%;
            display: flex;
            justify-content: space-between;

            .swiper-button-next::after,
            .swiper-button-prev::after {
                color: #0000009d;
            }

            .swiper-button-next:hover::after,
            .swiper-button-prev:hover::after {
                color: #4b4b4b;
                transform: scale(1.2);
            }
        }
    }

    @media (max-width: 1380px) {
        .frst-block p {
            line-height: 40px;
            margin: 30px auto;
        }

        .frst-block button {
            width: 20%;
            font-size: 14px;
            margin-top: 10px;
        }

        .frst-block a {
            width: 20%;
            padding: 12px 22px;
            border-radius: 1.09em;
            font-size: 14px;
        }
    }

    @media (max-width: 1065px) {
        .frst-block button,
        .frst-block a {
            width: 30%;
        }
    }

    @media (max-width: 890px) {
        #prev, #next {
            width: 3%;
            top: 105%;
        }

        #prev {
            left: 40%;
        }

        #next {
            right: 40%;
            transform: rotate(180deg) scaleY(-1);
        }

        #prev:hover, #next:hover {
            opacity: 0.9;
        }

        #prev:active {
            transform: scale(1.05);
        }

        #next:active {
            width: 3.2%;
            top: 104.8%;
            right: 40%;
        }

        .secnd-block h2 {
            font-size: 38px;
        }


        .frst-block button,
        .frst-block a {
            width: 30%;
        }
    }

    @media (max-width: 770px) {
        .frst-block button,
        .frst-block a {
            width: 47%;
        }

        .frst-block p {
            line-height: 30px;
            font-size: 24px;
            margin: 25px auto;
            text-align: justify;
        }
    }

    @media (max-width: 665px) {
        .frst-block h1 {
            font-size: 46px;
        }

        .frst-block p {
            letter-spacing: 0.02em;
            line-height: 20px;
            font-size: 20px;
            margin: 25px auto;
        }

        .secnd-block h2 {
            font-size: 24px;
        }

        .secnd-block-wrap {
            padding-bottom: 50px;
        }


    }

    @media (max-width: 491px) {
        .frst-block h1 {
            font-size: 38px;
        }

        .frst-block p {
            letter-spacing: 0.03em;
            font-size: 16px;
        }

        .frst-block button,
        .frst-block a {
            font-size: 10px;
        }
    }

</style>