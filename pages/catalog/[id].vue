<template>
    <section class="product-page-wrap">
        <div class="back-btn container">
            <ButtonGreen class="back-btn-in" :text="$t('layout.btns.back')" @click="$router.back()" />
        </div>
        <div class="product-page container">
            <div class="product-page__img">
                <img :src='image' :alt="product.name">
            </div>
            <div class="product-page__text">
                <div class="product-page__name">
                    <h2>{{ product.name }}</h2>
                    <ClientOnly>
                        <span>{{ product.class }}</span>
                    </ClientOnly>
                </div>
                <ClientOnly>
                    <span class="product-page__type"> {{ $t('products.rd', product.rd === 'РАДИАЛЬНЫЕ' ? 1 : 2) }} | {{ product.type }}</span>
                    <div v-show="product.desc" class="product-page__description">
                        <ol v-for="n in product.desc" :key="n">
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
                        <tbody v-if="product.var">
                            <tr v-for="v in product.var" :key="v">
                                <td>{{ v.size }}</td>
                                <td>{{ v.idx_frame }}</td>
                                <td>{{ v.tube }}</td>
                                <td>{{ v.li_ss }}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td>{{ product.size }}</td>
                                <td>{{ product.idx_frame }}</td>
                                <td>{{ product.tube }}</td>
                                <td>{{ product.li_ss }}</td>
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
    import { ref } from 'vue';
    import JSON from '~/server/bd.json'

    const { id } = useRoute().params;
    const image = `/tyres/${id}.webp`;
    const visible = ref(false);
    const product = JSON.products[id-1];

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
        padding: 14vh 0 5vh;

        @include media(1150px) {
            padding: 3vh 2vw;
        }

        @include media(690px) {
            padding: 10vh 0 3vh;
        }

        @include media(480px) {
            padding: 7vh 0 3vh;
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

        @include media(780px) {
            flex-direction: column;
        }

        &__img {
            width: 35%;

            @include media(780px) {
                width: 75%;
            }
        }

        &__text {
            width: 60%;
            display: flex;
            flex-direction: column;
            align-items: center;

            @include media(780px) {
                width: 95%;
            }
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

            @include media(790px) {
                font-size: 36px;
            }

            @include media(480px) {
                font-size: 28px;
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
                font-size: 16px;
            }

            @include media(480px) {
                font-size: 10px;
                letter-spacing: 0.2em;
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
                font-size: 14px;
            }

            @include media(480px) {
                font-size: 10px;
                margin: 2em 0 0;
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
                    font-size: 12px;
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
                    font-size: 12px;
                }

                @include media(480px) {
                    font-size: 10px;
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
                    font-size: 12px;
                }

                @include media(480px) {
                    font-size: 10px;
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
                font-size: 10px;
            }
        }
    }

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