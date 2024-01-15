<template>
    <section class="product-page-wrap">
        <div class="back-btn container">
            <ButtonGreen class="back-btn-in" text="НАЗАД" @click="$router.back()" />
        </div>
        <div class="product-page container">
            <div class="product-page__img">
                <img :src='image' :alt="name">
            </div>
            <div class="product-page__text">
                <div class="product-page__name">
                    <h2>{{ name }}</h2>
                    <ClientOnly>
                        <span>{{ productInfo.class }}</span>
                    </ClientOnly>
                </div>
                <ClientOnly>
                    <span class="product-page__type" v-show="productInfo.rd === 'РАДИАЛЬНЫЕ'">РАДИАЛЬНАЯ  |  {{ productInfo.type }}</span>
                    <span class="product-page__type" v-show="productInfo.rd === 'ДИАГОНАЛЬНЫЕ'">ДИАГОНАЛЬНАЯ  |  {{ productInfo.type }}</span>
                    <div v-show="productInfo.desc" class="product-page__description">
                        <ol v-for="n in productInfo.desc" :key="n">
                            <li>{{ n }}</li>
                        </ol>
                    </div>
                </ClientOnly>
                <ClientOnly>
                    <table>
                        <caption>Спецификации</caption>
                        <thead>
                            <tr>
                                <th>РАЗМЕР</th>
                                <th>ИНДЕКС ПРОЧНОСТИ КАРКАСА</th>
                                <th>КАМЕРА TT/TL</th>
                                <th>LI/SS</th>
                            </tr>
                        </thead>
                        <tbody v-if="productInfo.var">
                            <tr v-for="v in productInfo.var" :key="v">
                                <td>{{ v.size }}</td>
                                <td>{{ v.idx_frame }}</td>
                                <td>{{ v.tube }}</td>
                                <td>{{ v.li_ss }}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td>{{ productInfo.size }}</td>
                                <td>{{ productInfo.idx_frame }}</td>
                                <td>{{ productInfo.tube }}</td>
                                <td>{{ productInfo.li_ss }}</td>
                            </tr>
                        </tbody>
                    </table>
                </ClientOnly>
                <ButtonGreen text="ОСТАВИТЬ ЗАЯВКУ" class="product-page__application" @click="visibleModal"/>
                <LazyCallModal v-show = "visible" from="form" @close-modal="visibleModal" />
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import JSON from '~/server/bd.json'

    const { name } = useRoute().params;
    const image = `/images/${name}.png`;
    const visible = ref(false);
    const products = JSON.products;
    const productInfo = ref({});

    onBeforeMount(() => {
        findCurrentProduct();
    })

    const findCurrentProduct = () => {
        for (let i = 0; i < products.length; i++) {
            if (products[i].name === name) {
                productInfo.value = products[i];
            }
        }
    }

    const visibleModal = () => {
        visible.value = !visible.value;
    }

</script>
    
<style lang="scss" scoped>
    .back-btn-in {
        margin-bottom: 2vh;

        @include media(1020px) {
            font-size: 10px;
        }
    }

    .product-page-wrap {
        background-color: $main-light;
        padding: 5vh 0;

        @include media(1150px) {
            padding: 3vh 2vw;
        }

        @include media(690px) {
            padding: 9vh 0 3vh;
        }
    }

    .product-page {
        background-color: #ffffff60;
        border-radius: 10px;
        padding: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include media(1150px) {
            padding: 20px;
        }

        &__img {
            width: 35%;
        }

        &__text {
            width: 60%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__name {
            display: flex;
            font-size: 40px;

            @include media(1150px) {
                font-size: 32px;
            }

            @include media(920px) {
                font-size: 24px;
            }

            span {
                font-size: 0.7em;
            }
        }

        &__type {
            letter-spacing: 0.3em;

            @include media(1150px) {
                font-size: 12px;
            }

            @include media(920px) {
                font-size: 10px;
            }

            @include media(790px) {
                font-size: 8px;
            }
        }

        &__description {
            margin: 2em 0 1em;
            padding-left: 20px;
            letter-spacing: 0.1em;
            width: 90%;

            @include media(1150px) {
                font-size: 12px;
                margin: 1.5em 0 1em;
            }

            @include media(920px) {
                margin: 0.5em 0;
                font-size: 10px;
            }

            @include media(790px) {
                font-size: 8px;
            }

            ol li {
                list-style-type: square;
                text-align: justify;
                margin: 0.5em 0;
            }
        }

        &__name,
        &__type,
        &__description {
            align-self: flex-start;
        }

        table {
            border-collapse: collapse;
            width: 95%;
            margin: 2vh 0;

            caption {
                padding: 10px 0;

                @include media(1150px) {
                    font-size: 12px;
                }

                @include media(920px) {
                    font-size: 8px;
                }
            }

            td {
                padding: 10px 30px 10px 10px;

                @include media(1150px) {
                    font-size: 12px;
                }

                @include media(920px) {
                    font-size: 8px;
                }

                @include media(790px) {
                    font-size: 6px;
                }
            }

            th {
                font-size: 15px;
                vertical-align: middle;
                background-color: rgba(0, 0, 0, 0.308);
                color: #fff;
                font-weight: bold;
                padding: 0.7em 2em 0.7em 1em;

                @include media(1150px) {
                    font-size: 12px;
                }

                @include media(920px) {
                    font-size: 9px;
                }

                @include media(790px) {
                    font-size: 6px;
                }
            }
        }

        &__application {
            width: 90%;
            font-size: 14px;

            @include media(1150px) {
                font-size: 12px;
            }

            @include media(920px) {
                font-size: 8px;
            }

            @include media(790px) {
                font-size: 6px;
            }
        }
    }


    // @media (max-width: 1250px) {
    //     .product-card-page {
    //         padding: 20px;
    //     }

    //     .product-img-wrap {
    //         width: 45%;
    //     }

    //     .text-part-product-page {
    //         width: 55%;
    //     }

    //     .full-name {
    //         font-size: 32px;
    //     }

    //     .description {
    //         padding-left: 25px;
    //         font-size: 12px;
    //     }

    //     caption {
    //         padding: 5px 0;
    //     }

    //     table {
    //         width: 85%;
    //         margin: 0 auto;
    //     }

    //     td {
    //         font-size: 12px;
    //     }

    //     th {
    //         font-size: 14px;
    //     }

    //     .application {
    //         margin: 2dvh auto 0;
    //     }
    // }

    // @media (max-width: 950px) {
    //     .full-name {
    //         font-size: 28px;
    //     }

    //     caption {
    //         font-size: 14px;
    //     }

    //     td {
    //         font-size: 10px;
    //     }

    //     th {
    //         font-size: 10px;
    //     }

    // }

    // @media (max-width: 840px) {
    //     .product-card-page-wrap {
    //         padding: 60px 0 30px;
    //     }

    // }

    // @media (max-width: 780px) {
    //     .back-btn-in {
    //         font-size: 10px;
    //     }
    //     .product-card-page-wrap {
    //         padding: 60px 0 30px;
    //     }

    //     .product-card-page {
    //         flex-direction: column;
    //     }

    //     .product-img-wrap {
    //         width: 75%;
    //     }

    //     .text-part-product-page {
    //         width: 90%;
    //     }
    // }

    // @media (max-width: 510px) {

    //     .text-part-product-page {
    //         width: 98%;
    //     }

    //     .full-name {
    //         font-size: 18px;
    //     }

    //     .type-rd {
    //         font-size: 14px;
    //     }
        
    //     th {
    //         padding: 5px 10px 5px 10px;
    //     }

    // }

</style>