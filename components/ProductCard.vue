<template>
    <article class="product-card">
        <figure class="product-card__img">
            <img :src="image" :alt="productName">
        </figure>
        <h3>{{ productName }}</h3>
        <p>{{ productDescription }}</p>
        <div class="product-card__btns">
            <LazyButtonGreen v-show="noSlide" text="ОСТАВИТЬ ЗАЯВКУ" @click="visibleModal('form')"/>
            <LazyCallModal v-if="visible" :from="modalFrom" @close-modal="visibleModal" />
            <nuxt-link :to="link" class="product-card__more" :class="{full: !noSlide}">ПОДРОБНЕЕ</nuxt-link>
        </div>
    </article>
</template>

<script setup>
    import { ref, computed } from 'vue';
    
    const props = defineProps({
        productName: {
            type: String,
            required: true,
            default: ""
        },
        desc: {
            type: String,
            required: true,
            default: ''
        },
        noSlide: {
            type: Boolean,
            default: true
        }
    })

    const link = `/catalog/${props.productName}`;
    const image = `/tyres/${props.productName}.webp`;
    const visible = ref(false);
    const modalFrom = ref('');

    const visibleModal = (n) => {
        visible.value = !visible.value;
        if (visible.value) modalFrom.value = n;
    }

    const productDescription = computed(() => {
        return props.desc.length <= 55 ? props.desc : props.desc.slice(0, 56) + ' ...';
    })
</script>

<style lang="scss">
    .product-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffffb0;
        padding: 20px 10px;

        border-radius: 20px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.11);

        @include media(1240px) {
            padding: 0 10px 10px;
        }

        &__img {
            height: 270px;
            width: 90%;
            overflow: hidden;

            @include media(1240px) {
                max-height: 220px;
            }

            @include media(710px) {
                height: 200px;
            }

            @include media(650px) {
                height: 180px;
            }

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
            margin: 15px 0;

            @include media(1240px) {
                font-size: 28px;
            }

            @include media(710px) {
                margin: 0 0 10px;
            }

            @include media(650px) {
                font-size: 22px;
                margin-bottom: 5px;
            }
        }

        p {
            width: 94%;
            margin: 0 auto 20px;
            text-align: justify;
            letter-spacing: 0.03em;
            line-height: 1.5em;
        }

        &__btns {
            width: 95%;
            display: flex;
            justify-content: space-between;

            @include media(710px) {
                flex-wrap: wrap;
                gap: 7px;
            }

            @include media(650px) {
                gap: 5px;
            }

            button {
                padding: 0.6em 0;
                font-size: 16px;
                width: calc(50% - 5px);

                @include media(1240px) {
                    font-size: 12px;
                }

                @include media(990px) {
                    padding: 0.6em 0.4em;
                }

                @include media(710px) {
                    width: 100%;
                }

                @include media(650px) {
                    font-size: 10px;
                }
            }
        }

        &__more {
            width: calc(50% - 5px);
            padding: 0.8em 0;
            background-color: rgb(19, 19, 19);
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            color: $main-light;
            font-size: 14px;
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.089);
            text-shadow: 0px 0.3em 0.3em rgba(0, 0, 0, 0.25);
            transition: 0.3s;
            box-shadow: 0px 0.3em 0.3em 0px rgba(255, 255, 255, 0.68) inset, 0px 0.1em 0.15em 0.02em rgba(0, 0, 0, 0.25);

            @include media(1240px) {
                font-size: 12px;
            }

            @include media(710px) {
                width: 100%;
            }

            @include media(650px) {
                font-size: 10px;
            }

            &:hover {
                filter: brightness(130%);
            }

            &:active {
                transform: scale(0.98, 0.98);
            }
        }

        .full {
            width: 100% !important;
        }
    }
</style>