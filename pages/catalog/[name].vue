<template>
    <section class="product-card-page-wrap">
        <div class="back-btn content">
            <ButtonGreen class="back-btn-in" text = "НАЗАД" @click="$router.back()" />
        </div>
        <div class="product-card-page content">
            <div class="product-img-wrap">
                <img :src='image' :alt="name">
            </div>
            <div class="text-part-product-page">
                <div class="full-name">
                    <h2>{{ name }}</h2>
                    <ClientOnly>
                        <span>{{ productInfo.class }}</span>
                    </ClientOnly>
                </div>
                <ClientOnly>
                    <span class="type-rd" v-show="productInfo.rd === 'РАДИАЛЬНЫЕ'">РАДИАЛЬНАЯ  |  {{ productInfo.type }}</span>
                    <span class="type-rd" v-show="productInfo.rd === 'ДИАГОНАЛЬНЫЕ'">ДИАГОНАЛЬНАЯ  |  {{ productInfo.type }}</span>
                    <div class="description">
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
                <ButtonGreen text="ОСТАВИТЬ ЗАЯВКУ" class="application" @click="visibleModal"/>
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
    
<style scoped>
    .back-btn {
        margin-bottom: 20px;
    }

    .product-card-page-wrap {
        background-color: #f1f1f1;
        padding: 20px 0 50px;
    }

    .product-card-page {
        background-color: rgb(255, 255, 255);
        border-radius: 20px;
        padding: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .product-img-wrap {
        width: 35%;
    }

    .text-part-product-page {
        width: 60%;
        display: flex;
        flex-direction: column;
    }

    .full-name {
        display: flex;
        font-size: 40px;
    }

    .full-name span {
        font-size: 0.7em;
    }

    .type-rd {
        letter-spacing: 0.3em;
    }

    .description {
        margin: 2em 0;
        padding-left: 20px;
        letter-spacing: 0.1em;
        width: 90%;
    }

    .description ol li {
        list-style-type: square;
        text-align: justify;
        margin: 0.5em 0;
    }

    caption {
        padding: 10px 0;
    }

    table {
        border-collapse: collapse;
        width: 95%;
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

    .application {
        width: 90%;
        /* align-self: center; */
        margin-left: 3%;
        margin-top: 30px;
        padding: 12px 12px;
        font-size: 14px;
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