<template>
    <div class="call-modal-wrapper" @click="$emit('close-modal')">
        <form class="call-modal" target="hidden-iframe" @click.stop>
            <h2>{{ $t('layout.modal.fill_the_form') }}</h2>
            <input v-model="formData.name" name="user-name" type="text" class="user-name" :placeholder="$t('layout.modal.name_placeholder')" required>
            <div class="call-modal__body" v-if="from === 'form'">
                <input v-model="formData.email" type="email" name="user-email" id="email" :placeholder="$t('layout.modal.email_placeholder')" required>
                <input class="call-number" v-model="formData.tel" type="tel" name="telephone" id="user-telephone" :placeholder="$t('layout.modal.call_placeholder')">
                <TheButton :text="$t('layout.modal.btn_add')" colour="black" @click.prevent="openSelectMenu"/>
                <div class="call-modal__products-list">
                    <div class="call-modal__product" v-for="(product, idx) in choosenProducts" :key="product"> 
                        {{ product }}
                        <div class="call-modal__del" @click="deleteProduct(idx)">
                            <img src="./../assets/close.png" alt="Закрыть">
                        </div>
                    </div>
                </div>
                <textarea v-model="formData.message" name="user-massege" id="form-text" cols="20" rows="5" :placeholder="$t('layout.modal.message_placeholder')" required></textarea>
                <input type="hidden" name="_captcha" value="false">
                <input type="hidden" name="_next" value="">
            </div>
            <div class="call-modal__body" v-else>
                <select v-model="formData.method" aria-label="communication-method" name="call-select" id="call-select" class="select-met">
                    <option value="Способ связи" selected>{{ $t('layout.modal.method') }}</option>
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Telegram">Telegram</option>
                </select>
                <input class="call-number" v-model="formData.tel" type="tel" name="number" id="call-number" :placeholder="$t('layout.modal.call_placeholder')">
            </div>
            <TheButton type="submit" class="call-modal__btn" :text="btnText" colour="green" @click.prevent="submitCallModalData"/>
            <LazyTheProductsSelect class="call-modal__product-menu" id="product-menu" v-if="openedSelectMenu" @addProduct="addProduct" @closeMenu="openedSelectMenu=false"/>
            <div class="close-call-window" @click="$emit('close-modal')">
                <img src="./../assets/close.png" alt="Закрыть">
            </div>
        </form>
    </div>
</template>

<script setup>
    import { useManagerCall } from '~/composables/useManagerCall';

    const props = defineProps({
        from: {
            type: String,
            required: true,
            default: ""
        },
        product: {
            type: String
        }
    })

    const formData = {
        name: '',
        email: '',
        message: '',
        method: 'Способ связи',
        tel: ''
    };

    const btnText = ref('Отправить');
    const openedSelectMenu = ref(false);
    const choosenProducts = ref([]);

    if (props.product) choosenProducts.value.push(props.product);

    const openSelectMenu = () => {
        openedSelectMenu.value = !openedSelectMenu.value;
    }

    const addProduct = (product) => {
        choosenProducts.value.push(product);
    }

    const deleteProduct = (idx) => {
        choosenProducts.value.splice(idx, 1);
    }

    const handleSubmit = () => {
        const messageComplete = `Телефон: ${formData.tel}. Необходимые товары: ${choosenProducts.value.join()}. Дополнительная информация: ${formData.message}`;

        const info = {
            name: formData.name,
            email: formData.email,
            message: messageComplete
        };

        const res = useHandleSubmit(info);

        if (res) {
            for (let key in formData) {
                key !== 3 ? formData[key] = "" : formData[key] = 'Способ связи';
            }
            choosenProducts.value.length = 0;
            btnText.value = 'Отправлено';
            setTimeout(() => {
                btnText.value = 'Отправить';
            }, 2000);
        } else {
            btnText.value = 'Ошибка';
            setTimeout(() => {
                btnText.value = 'Отправить';
            }, 2000);
        }        
    }

    const handleCall = () => {
        const usersMessage = `${formData.name} ждёт, чтобы с ним(ней) как можно скорее связались по номеру ${formData.tel} посредством ${formData.method}`;

        const res = useManagerCall(usersMessage);

        if (res) {
            for (let key in formData) {                
                key !== 'method' ? formData[key] = "" : formData[key] = 'Способ связи';
            }
            btnText.value = 'Отправлено';
            setTimeout(() => {
                btnText.value = 'Отправить';
            }, 2000);
        } else {
            btnText.value = 'Ошибка';
            setTimeout(() => {
                btnText.value = 'Отправить';
            }, 2000);
        };        
    }

    const submitCallModalData = () => {
        if (props.from === 'form') {
            handleSubmit();
        } else {
            handleCall();
        }
    }
</script>

<style lang="scss" scoped>
    .call-modal-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        backdrop-filter: blur(3px);
        transition: 0.5s;
        z-index: 1000000;
    }

    .close-call-window {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 15px;
        width: 8%;
        cursor: pointer;

        @include media(1010px) {
            width: 10%;
        }

        @include media(725px) {
            width: 12%;
        }

        @include media(635px) {
            width: 12%;
        }

        @media (hover: hover) {
            &:hover {
                opacity: 0.9;
            }
        }

        @media (hover: none) {
            &:active {
                opacity: 0.9;
                padding: 10px;
            }
        }

        &:active {
            padding: 10px;
        }
    }

    .call-modal {
        position: absolute;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        row-gap: 20px;
        justify-content: space-between;
        width: 40%;
        top: 50%; left: 50%;
            -webkit-transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        background-color: $main-light;
        border-radius: 20px;
        padding: 30px 40px;
        overflow: hidden;
        box-shadow: 0px 0px 20px 10px rgb(255, 255, 255) inset, 0px 5px 10px 2px rgba(0, 0, 0, 0.233);
        animation-name: showModal;
        animation-duration: 1s;
        animation-iteration-count: 1;
        transition: all 0.5s ease;

        @include media(1140px) {
            width: 65%;
        }

        @include media(635px) {
            width: 85%;
        }

        @keyframes showModal {
            from { opacity: 0; } to { opacity: 1; }
        }

        h2 {
            color: #000000;
            font-size: 2em;

            @include media(480px) {
                font-size: 1.6em;
            }
        }

        input,
        select,
        textarea {
            border-radius: 15px;
            font-size: 1.3em;
            padding: 8px;
        }

        &__body {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            row-gap: 2vh;
            justify-content: space-between;
        }

        &__products-list,
        input,
        textarea:not(.call-number) {
            width: 100%;
        }

        &__products-list {
            display: flex;
            padding: 0 1em;
            flex-wrap: wrap;
            row-gap: 1em;
            column-gap: 2em;
            color: #000000;
            font-size: 1.3em;
        }

        &__product {
            position: relative;
            padding: 0.5em 0.7em;
            border: 0.5px solid black;
            border-radius: 0.5em;
        }

        .select-met {
            width: 30%;
            background-size: 15px;

            @include media(1270px) {
                width: 34%;
            }

            @include media(1140px) {
                width: 100%;
            }
        }

        &__btn {
            width: 100%;
            letter-spacing: 0.15em;
            font-size: 16px;

            &:active {
                transform: scale(0.98, 0.98);
                background-color: #01aa59;
            }
        }

        .call-number {
            width: 50%;
            @include media(1140px) {
                width: 100%;
            }
        }

        &__product-menu {
            position: relative;
            position: absolute;
            width: 80%;
            height: 80%;
            right: 10%;
            top: 10%;
        }

        &__del {
            position: absolute;
            width: 20%;
            right: -10%;
            top: -20%;
            cursor: pointer;

            &:hover img {
                transform: scale(1.1);
                box-shadow: 0 0 5px  red;
            }
        }
    }
</style>