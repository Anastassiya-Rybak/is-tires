<template>
    <div class="product-card">
        <div class="product-card-img">
            <img :src="image" :alt="productName">
        </div>
        <h3>{{ productName }}</h3>
        <div class="product-card-btns">
            <ButtonGreen v-show="noSlide" text="ОСТАВИТЬ ЗАЯВКУ" @click="openModal('form')"/>
            <CallModal v-show = "visible" :from="modalFrom" @close-modal="visible = false" />
            <nuxt-link :to="link" class="more" >ПОДРОБНЕЕ . . .</nuxt-link>
        </div>
    </div>
</template>

<script>
import ButtonGreen from './ButtonGreen.vue'
import CallModal from './CallModal.vue'
    export default {
        name: 'ProductCard',
        components: { ButtonGreen, CallModal },
        props: {
            productName: {
                type: String,
                required: true,
                default: ""
            },
            noSlide: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                link: `/catalog/${this.productName}`,
                image: `/images/${this.productName}.png`,
                visible: false,
                modalFrom: ''
            }
        },
        methods: {
            openModal(n) {
                this.visible = true;
                this.modalFrom = n;
            },
        }
    }
</script>

<style lang="css" scoped>
    .product-card {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;

        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.11);
    }

    .product-card-img {
        max-height: 270px;
        overflow: hidden;
        margin: 30px 0;
    }

    h3 {
        font-size: 32px;
        text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
        margin-bottom: 30px;
    }

    .product-card-btns {
        width: 85%;
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 20px;
    }

    .product-card-btns button {
        padding: 12px 12px;
        font-size: 14px;

    }
    
    .more {
        width: calc(50% - 5px);
        padding: 12px 12px;
        border-radius: 15px;
        cursor: pointer;
        color: #ffffff;
        font-size: 14px;
        border: none;
        box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.43) inset;
    }

    .more:hover {
        filter: brightness(90%);
    }

    .more:active {
        transform: scale(0.98, 0.98);
    }

    .more {
        background-color: #000;
    }
</style>