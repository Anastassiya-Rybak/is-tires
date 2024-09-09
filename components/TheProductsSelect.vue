<template>
    <section class="product-menu">
        <h3>{{ $t('layout.modal.choose_product') }}</h3>
        <ul class="product-menu__categories">
            <li v-for="category in categories" :key="category" @click="openCategory(category)">
                <h4 :class="{'active': activeCategory === category}">{{ category }}</h4>
                <ul class="product-menu__products" v-if="activeCategory === category">
                    <li v-for="product in categoryProducts" :key="product" @click="emitProduct(product.name)">
                        {{ product.name }}
                    </li>
                </ul>
            </li>
        </ul>
        <div class="product-menu__close" @click="$emit('closeMenu')">
            <img src="./../assets/close.png" alt="Закрыть">
        </div>
    </section>
</template>

<script setup>
    import JSON from '~/server/bd.json';
    const { categories, products } = JSON;
    const activeCategory = ref(null);
    const categoryProducts = ref(null);

    const openCategory = (category) => {
        categoryProducts.value = products.filter(product => product.type === category);
        activeCategory.value = category;
    };

    const emit = defineEmits(['addProduct', 'closeMenu']);

    const emitProduct = (name) => {
        emit('addProduct', name);
        emit('closeMenu');
    }
</script>

<style lang="scss" scoped>
    .product-menu {
        padding: 5%;
        background-color: $main-light;
        color: #000000;
        overflow: hidden;
        box-shadow: 0px 0px 20px 10px rgb(255, 255, 255) inset, 0px 5px 10px 2px rgba(0, 0, 0, 0.233);
        border-radius: 10px;
        overflow-y: scroll;

        h3 {
            font-size: 1.5em;
            text-transform: uppercase;
            text-decoration: underline;
            margin-bottom: 1em;
        }

        &__categories {
            display: flex;
            flex-direction: column;
            row-gap: 1em;

            li h4,
            li>ul>li {
                cursor: pointer;

                @include hover {
                    color: $accent;
                }
            }

            .active {
                color: $accent;
           }
        } 

        &__close {
            position: fixed;
            width: 4%;
            right: 15%;
            top: 15%;
            cursor: pointer;

            @include hover {
                transform: scale(1.1);
            }
        }
    }
</style>