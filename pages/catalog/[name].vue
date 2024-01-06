<template>
    <section class="product-page-wrap">
        <div class="back-btn container">
            <ButtonGreen class="back-btn-in" text = "НАЗАД" @click="$router.back()" />
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
                    <div class="product-page__description">
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
    .back-btn {
        margin-bottom: 20px;
    }

    .product-page-wrap {
        background-color: $main-light;
        padding: 20px 0 50px;
    }

    .product-page {
        background-color: rgb(255, 255, 255);
        border-radius: 20px;
        padding: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__img {
            width: 35%;
        }

        &__text {
            width: 60%;
            display: flex;
            flex-direction: column;
        }

        &__name {
            display: flex;
            font-size: 40px;

            span {
                font-size: 0.7em;
            }
        }

        &__type {
            letter-spacing: 0.3em;
        }

        &__description {
            margin: 2em 0;
            padding-left: 20px;
            letter-spacing: 0.1em;
            width: 90%;

            ol li {
                list-style-type: square;
                text-align: justify;
                margin: 0.5em 0;
            }
        }

        table {
            border-collapse: collapse;
            width: 95%;

            caption {
                padding: 10px 0;
            }

            td {
                padding: 10px 30px 10px 10px;
            }

            th {
                vertical-align:middle;
                background-color: rgba(0, 0, 0, 0.5);
                color: #fff;
                font-weight: bold;
                padding: 10px 30px 10px 15px;
            }
        }

        &__application {
            width: 90%;
            margin-left: 3%;
            margin-top: 30px;
            padding: 12px 12px;
            font-size: 14px;
        }
    }


    @media (max-width: 1250px) {
        .product-card-page {
            padding: 20px;
        }

        .product-img-wrap {
            width: 45%;
        }

        .text-part-product-page {
            width: 55%;
        }

        .full-name {
            font-size: 32px;
        }

        .description {
            padding-left: 25px;
            font-size: 12px;
        }

        caption {
            padding: 5px 0;
        }

        table {
            width: 85%;
            margin: 0 auto;
        }

        td {
            font-size: 12px;
        }

        th {
            font-size: 14px;
        }

        .application {
            margin: 2dvh auto 0;
        }
    }

    @media (max-width: 950px) {
        .full-name {
            font-size: 28px;
        }

        caption {
            font-size: 14px;
        }

        td {
            font-size: 10px;
        }

        th {
            font-size: 10px;
        }

    }

    @media (max-width: 840px) {
        .product-card-page-wrap {
            padding: 60px 0 30px;
        }

    }

    @media (max-width: 780px) {
        .back-btn-in {
            font-size: 10px;
        }
        .product-card-page-wrap {
            padding: 60px 0 30px;
        }

        .product-card-page {
            flex-direction: column;
        }

        .product-img-wrap {
            width: 75%;
        }

        .text-part-product-page {
            width: 90%;
        }
    }

    @media (max-width: 510px) {

        .text-part-product-page {
            width: 98%;
        }

        .full-name {
            font-size: 18px;
        }

        .type-rd {
            font-size: 14px;
        }
        
        th {
            padding: 5px 10px 5px 10px;
        }

    }

</style>