<template>
    <div>
        <section class="frst-block-wrap">
            <div class="frst-block content">
                <h1>Искра сервис</h1>
                <p>Высококачественные шины и общее решение для шин позволяют максимально повысить производительность вашего автопарка и снизить эксплуатационные расходы.</p>
                <div class="frst-block-btns">
                    <nuxt-link to="/catalog">ОТКРЫТЬ КАТАЛОГ</nuxt-link>
                    <ButtonGreen text="ОСТАВИТЬ ЗАЯВКУ" @click="openModal" />
                    <CallModal v-show = "visible" from="form" @close-modal="visible = false" />
                </div>
            </div>
        </section>
        <section class="secnd-block-wrap">
            <div class="secnd-block content">
                <h2>Рекомендуемые товары</h2>
                <swiper class="slider"
                :slides-per-view="1"
                :space-between="40"
                :loop="true"
                :autoplay="{
                    delay: 1000,
                }"
                >
                    <swiper-slide>
                        <ProductCardVue v-for="product in products.slice(0, 3)" :key="product"
                        :productName="product.name" :noSlide="false"/>
                    </swiper-slide>
                    <swiper-slide>
                        <ProductCardVue v-for="product in products.slice(3, 6)" :key="product"
                        :productName="product.name" :noSlide="false"/>
                    </swiper-slide>
                </swiper>
            </div>
            <div id="prev" @click="toSwipe">
                <img src="~/assets/arrprev.svg" alt="Назад">
            </div>
            <div id="next" @click="toSwipe">
                <img src="~/assets/arrprev.svg" alt="Вперед">
            </div>
        </section>
    </div>
</template>

<script>
    import JSON from '~/static/bd.json'
    import ProductCardVue from '~/components/ProductCard.vue'
    import ButtonGreen from '~/components/ButtonGreen.vue'
    import CallModal from '~/components/CallModal.vue'
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import {Autoplay, Navigation} from 'swiper';
    import 'swiper/swiper-bundle.min.css';
    
    export default {
        name: 'index',
        components: { ProductCardVue, ButtonGreen, CallModal, Swiper, SwiperSlide},
        setup() {
            return {
                modules: [Autoplay, Navigation],
            };
        },
        data() {
            return {
                products: JSON.products,
                visible: false,
                slides: []
            }
        },
        methods: {
            openModal() {
                this.visible = true;
            },
            toSwipe(){
                const activeSlide = document.querySelector('.swiper-slide-active');
                const slider = document.querySelector('.swiper-wrapper');
                const slides = document.querySelectorAll('.swiper-slide');
                for(let i = 0; i <= 1; i++) {
                    if (activeSlide !== slides[i]) {
                        const next = activeSlide.nextElementSibling;
                        slider.insertBefore(activeSlide, slides[i].nextElementSibling);
                        slider.insertBefore(slides[i], next);
                    }
                }
            }
        },
        // mounted() {
        //     new Swiper('.swiper-container', {
        //         direction: 'horizontale',
        //         loop: true,

        //         // If we need pagination
        //         pagination: {
        //             el: '.swiper-pagination',
        //         },

        //         // Navigation arrows
        //         navigation: {
        //             nextEl: '.swiper-button-next',
        //             prevEl: '.swiper-button-prev',
        //         },

        //         // And if we need scrollbar
        //         scrollbar: {
        //             el: '.swiper-scrollbar',
        //         },
        //     });
        // },
    }
</script>

<style lang="css">
     .frst-block-wrap {
        background-image: url(./../assets/back/1block.png);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        padding: 30dvh 0;
        color: #f1f1f1;
    }

    .content {
        width: 85%;
        max-width: 1240px;
        margin: 0 auto;
    }

    .frst-block h1 {
        font-size: 64px;
        letter-spacing: 5px;
    }

    .frst-block p {
        font-size: 28px;
        line-height: 48px;
        letter-spacing: 2px;
        margin: 34px auto;
    }

    .frst-block-btns {
        display: flex;
        gap: 3%;
    }

    .frst-block button {
        width: 20%;
        font-size: 18px;
        margin-top: 10px;
    }

    .frst-block a {
        width: 20%;
        display: block;
        padding: 12px 22px;
        margin-top: 10px;
        border-radius: 15px;
        cursor: pointer;
        background-color: #00BA61;
        color: #f1f1f1;
        text-align: center;
        font-size: 18px;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(0, 0, 0, 0.089);
        box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.68) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    .frst-block a:active {
        transform: scale(0.98, 0.98);
        background-color: #01aa59;
    }

    .secnd-block-wrap {
        background-image: url(./../assets/back/2block.png);
        background-position: start;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        padding-bottom: 100px;
    }

    .secnd-block h2 {
        color: #f1f1f1;
        font-size: 48px;
        letter-spacing: 4.8px;
        text-shadow: 0px 0.1em 0.1em rgba(0, 0, 0, 0.25);
        padding: 1.1em 0;
    }

    .swiper {
        padding-bottom: 50px;
    }

    .swiper-slide {
        display: flex;
        justify-content: space-between;
    }

    #prev, #next {
        position: absolute;
        cursor: pointer;
        width: 4%;
        top: 45%;
    }

    #prev {
        left: 12%;
    }

    #next {
        right: 12%;
        transform: rotate(180deg) scaleY(-1);
    }

    #prev:hover, #next:hover {
        opacity: 0.9;
    }

    #prev:active {
        transform: scale(1.05);
    }

    #next:active {
        width: 4.2%;
        top: 44.8%;
        right: 11.8%;
    }


</style>