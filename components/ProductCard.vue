<template>
    <div class="product-card">
        <div class="product-card__img">
            <img :src="image" :alt="productName">
        </div>
        <h3>{{ productName }}</h3>
        <div class="product-card__btns">
            <LazyButtonGreen v-show="noSlide" text="ОСТАВИТЬ ЗАЯВКУ" @click="visibleModal('form')"/>
            <LazyCallModal v-show="visible" :from="modalFrom" @close-modal="visibleModal" />
            <nuxt-link :to="link" class="product-card__more" :class="{full: !noSlide}">ПОДРОБНЕЕ . . .</nuxt-link>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    
    const props = defineProps({
        productName: {
            type: String,
            required: true,
            default: ""
        },
        noSlide: {
            type: Boolean,
            default: true
        }
    })

    const link = `/catalog/${props.productName}`;
    const image = `/images/${props.productName}.png`;
    const visible = ref(false);
    const modalFrom = ref('');

    const visibleModal = (n) => {
        visible.value = !visible.value;
        if (visible.value) modalFrom.value = n;
    }
</script>

<style lang="scss">
    .product-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;

        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.11);

        &__img {
            height: 270px;
            width: 90%;
            overflow: hidden;
            margin: 30px 0;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        h3 {
            font-size: 32px;
            color: rgb(22, 22, 22);
            text-shadow: 0px 0.08em 0.28em rgba(0, 0, 0, 0.25);
            margin-bottom: 30px;
        }

        &__btns {
            width: 87%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            button {
                padding: 0.8em 0.8em;
                font-size: 14px;
                width: calc(50% - 5px);

            }
        }

        &__more {
            width: calc(50% - 5px);
            padding: 0.8em 0.8em;
            border-radius: 10px;
            background-color: rgb(19, 19, 19);
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            color: $main-light;
            font-size: 14px;
            border: none;
            box-shadow: 0px 0.3em 0.3em 0px rgba(255, 255, 255, 0.43) inset, 0px 0.1em 0.15em 0.02em rgba(0, 0, 0, 0.25);

            &:hover {
                filter: brightness(90%);
            }

            &:active {
                transform: scale(0.98, 0.98);
            }
        }

        .full {
            width: 100% !important;
        }
    }    

    @media (max-width: 1265px) {
        .product-card-btns button {
            padding: 8px 6px;
            font-size: 10px;
        }
        
        .more {
            font-size: 10px;
        }
    }

    @media (max-width: 1170px) {
        .product-card-img {
            max-height: 200px;
            margin: 10px 0;
        }
    }

    @media (max-width: 920px) {
        .product-card-btns button,
        .more {
            width: 49%;
            padding: 0.8em 0.6em;
            font-size: 8px;
        }

        .product-card-img {
            max-height: 180px;
        }

        h3 {
            font-size: 28px;
            margin-bottom: 10px;
        }
    }

    @media (max-width: 770px) {
        .product-card-img {
            max-height: 150px;
        }
    }

    @media (max-width: 600px) {
        .product-card-btns {
            flex-direction: column-reverse;
            align-items: center;
            justify-content: center;
            row-gap: 3px;
        }

        .product-card-img {
            max-height: 150px;
        }

        h3 {
            font-size: 20px;
            margin-bottom: 5px;
        }

        .product-card-btns button,
        .more {
            width: 90%;
            font-size: 8px;
        }
    }

    @media (max-width: 420px) {
        .product-card-img {
            max-height: 120px;
        }

        h3 {
            font-size: 16px;
        }

        .product-card-btns {
            margin-bottom: 10px;
        }
    }

    @media (max-width: 360px) {
        .product-card-img {
            max-height: 110px;
        }

        h3 {
            font-size: 12px;
        }

        .product-card-btns button,
        .more {
            width: 95%;
            font-size: 7px;
        }
    }

</style>