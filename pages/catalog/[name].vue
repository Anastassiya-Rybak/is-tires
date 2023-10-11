<template>
    <section class="product-card-page-wrap">
        <div class="product-card-page content">
            <div class="product-img-wrap">
                <img :src='image' :alt="name">
            </div>
            <div class="text-part-product-page">
                <div class="full-name">
                    <h2>{{ name }}</h2>
                    <span>{{ productInfo.class }}</span>
                </div>
                <span class="type-rd" v-show="productInfo.rd === 'РАДИАЛЬНЫЕ'">РАДИАЛЬНАЯ  |  НА {{ productInfo.type }}</span>
                <span class="type-rd" v-show="productInfo.rd === 'ДИАГОНАЛЬНЫЕ'">ДИАГОНАЛЬНАЯ  |  НА {{ productInfo.type }}</span>
                <div class="description">
                    <ol v-for="n in productInfo.desc" :key="n">
                        <li>{{ n }}</li>
                    </ol>
                </div>
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
                <ButtonGreen text="ОСТАВИТЬ ЗАЯВКУ" class="application" @click="openModal"/>
                <CallModal v-show = "visible" from="form" @close-modal="visible = false" />
            </div>
        </div>
    </section>
</template>

<script>
    import ButtonGreen from '~/components/ButtonGreen.vue';
    import CallModal from '~/components/CallModal.vue';
    import JSON from '~/static/bd.json'

    export default {
        components: { CallModal, ButtonGreen },
        setup() {
            const { name } = useRoute().params;
            const { products } = JSON;
            let productInfo;

            products.forEach(product => {
                if (product.name === name) {
                    productInfo = product;
                }
            });

            return {
                name,
                productInfo
            };
        },
        data() {
            return {
                image: `/images/${this.name}.png`,
                visible: false,
            }
        },
        methods: {
            openModal() {
                this.visible = true;
            },
        }
    }
</script>
    
<style scoped>
    .product-card-page-wrap {
        background-color: #f1f1f1;
        padding: 50px 0;
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
</style>