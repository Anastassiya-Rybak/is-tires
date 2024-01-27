<template>
    <article class="product-card" @click="openMore">
        <figure class="product-card__img">
            <img :src="image" :alt="productData.name">
        </figure>
        <h3>{{ productData.name }}</h3>
        <p :class="{full: !noSlide}">{{ productDescription }}</p>
        <div class="product-card__btns">
            <LazyButtonGreen v-show="noSlide" :text="$t('layout.btns.application')" @click.stop @click="visibleModal('form')"/>
            <LazyCallModal v-if="visible" :from="modalFrom" @close-modal="visibleModal" />
            <nuxt-link :to="localePath(link)" class="product-card__more" :class="{full: !noSlide}">{{ $t('layout.btns.more') }}</nuxt-link>
        </div>
    </article>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    
    const props = defineProps({
        productData: {
            type: Object,
            required: true,
            default: {}
        },
        noSlide: {
            type: Boolean,
            default: true
        }
    })

    const localePath = useLocalePath();

    const link = `/catalog/${props.productData.id}`;
    const image = `/tyres/${props.productData.id}.webp`;
    const visible = ref(false);
    const modalFrom = ref('');

    const visibleModal = (n) => {
        visible.value = !visible.value;
        if (visible.value) modalFrom.value = n;
    }

    const productDescription = computed(() => {
        const { t } = useI18n();
        const desc = t(`products.description.${props.productData.id}.1`);
        return desc.length <= 55 ? desc : desc.slice(0, 56) + ' ...';
    })

    const openMore = (async () =>{
        await navigateTo({
            path: localePath(link),
            query: false
        });
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
        border: 1px solid rgba(155, 155, 155, 0.1);
        box-shadow: 0px 10px 8px 0px rgba(197, 197, 197, 0.11);
        cursor: pointer;

        &:hover {
            background-color: #ffffff;
        }

        &:hover>.product-card__img {
            transform: scale(1.3);
        }
        
        @include media(1240px) {
            padding: 0 10px 10px;
        }

        &__img {
            height: 270px;
            width: 90%;
            overflow: hidden;
            transition: all 0.4s ease;

            @include media(1300px) {
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
            font-size: 90%;
            position: relative;
            overflow: hidden;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            height: 40px;

            @include media(1300px) {
                font-size: 1.7vw;
            }

            @include media(550px) {
                margin: 0 auto 10px;
                height: 20px;
            }

            &::after {
                content: '';
                width: 100%;
                position: absolute;
                height: 50%;
                bottom: 0;
                left: 0;
                background: #ffffffb0;
                background: linear-gradient(0deg, #ffffffc0 0%, #ffffffaf 58%, #ffffff6c 100%);                z-index: 3;
            }
        }

        &__btns {
            width: 95%;
            display: flex;
            justify-content: space-between;

            @include media(710px) {
                flex-direction: column-reverse;
                gap: 7px;
            }

            @include media(650px) {
                gap: 5px;
            }

            button {
                padding: 0.7em 0.1em;
                font-size: 14px;
                width: calc(55% - 5px);

                @include media(1280px) {
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
            width: calc(45% - 5px);
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            color: $main-dark;
            font-size: 14px;
            letter-spacing: 0.1em;
            text-shadow: 0px 0.3em 0.3em rgba(0, 0, 0, 0.25);
            transition: 0.3s;

            @include hover(){
                opacity: 0.8;
                transform: scale(1.01);
            }

            @include media(1280px) {
                font-size: 12px;
            }

            @include media(710px) {
                width: 100%;
            }

            @include media(650px) {
                font-size: 10px;
            }

            @media (hover: hover) {
                &:hover {
                    filter: brightness(130%);
                }
            }

            &:active {
                transform: scale(0.98, 0.98);
            }
        }

        .full {
            width: 90% !important;
            text-align: center;
            margin: 1vh auto;

            &::after {
                display: none;
            }
        }
    }
</style>