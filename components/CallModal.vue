<template>
    <section class="call-modal-wrapper" @click="$emit('close-modal')">
        <form v-if="from === 'form'" class="call-modal" target="hidden-iframe"
        :action="url" @click.stop method="POST" @submit="handleSubmit">
            <h2>ЗАПОЛНИТЕ ФОРМУ</h2>
            <input v-model="formData.name" name="user-name" type="text" class="user-name" placeholder="Как к Вам обращаться?" required>
            <input v-model="formData.email" type="email" name="user-email" id="email" placeholder="Укажите Вашу почту для ответа" required>
            <textarea v-model="formData.message" name="user-massege" id="form-text" cols="20" rows="5" placeholder="Опишите суть Вашего запроса тут" required></textarea>
            <ButtonGreen type="submit" class="call-modal__btn" :text="btnText"/>
            <div class="close-call-window" @click="$emit('close-modal')">
                <img src="./../assets/close.png" alt="Закрыть">
            </div>
        </form>
        <form v-else class="call-modal" @click.stop method="POST">
            <h2>ЗАПОЛНИТЕ ФОРМУ</h2>
            <input v-model="callData.name" type="text" class="user-name" placeholder="Как к Вам обращаться?" required>
            <select v-model="callData.method" aria-label="communication-method" name="call-select" id="call-select" class="select-met">
                <option value="Способ связи" selected>Способ связи</option>
                <option value="Phone">Phone</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Telegram">Telegram</option>
            </select>
            <input v-model="callData.tel" type="tel" name="number" id="call-number" placeholder="Введите номер Вашего телефона">
            <ButtonGreen @click.prevent="handleCall" class="call-modal__btn" :text="btnText"/>
            <div class="close-call-window" @click="$emit('close-modal')">
                <img src="./../assets/close.png" alt="Закрыть">
            </div>
        </form>
    </section>
</template>

<script>
    import ButtonGreen from './ButtonGreen.vue'
    export default {
        name: 'CallModal',
        components: { ButtonGreen },
        props: {
            from: {
                type: String,
                required: true,
                default: ""
            },
        },
        data() {
            return {
                formData: {
                    name: '',
                    email: '',
                    message: '',
                },
                callData: {
                    name: '',
                    method: 'Способ связи',
                    tel: ''
                },
                url: 'https://formsubmit.co/ajax/7c41d79fcd709f6bf7d62753f5059d41',
                btnText: this.from === 'form' ? 'ОТПРАВИТЬ ЗАПРОС' : 'СВЯЖИТЕСЬ СО МНОЙ'
            };
        },
        methods: {
            async handleSubmit(event) {
                event.preventDefault();
                try {
                    // Отправляем данные на сервер с использованием fetch
                    const response = await fetch('https://formsubmit.co/ajax/7c41d79fcd709f6bf7d62753f5059d41', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(this.formData),
                    });

                    if (response.ok) {
                        // Обработайте успешный ответ от сервера
                        const data = await response.json();
                        console.log('Успешно отправлено:', data);
                        for (let key in this.formData) {
                            this.formData[key] = "";
                        }
                        this.btnText = "ЗАПРОС ОТПРАВЛЕН"
                        // Выполните дополнительные действия при успешной отправке
                    } else {
                        // Обработайте ошибку отправки запроса
                        console.error('Ошибка отправки:', response.status);
                        // Выполните дополнительные действия при ошибке
                    }
                } catch (error) {
                    console.error('Ошибка отправки:', error);
                }
            },
            async handleCall(){
                // const apiKey = 'instance67025';
                // const phone = '+77776840869';
                const message = `${this.callData.name} ждёт, чтобы с ним(ней) как можно скорее связались по номеру ${this.callData.tel} посредством ${this.callData.method}`;

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "App 85f2d1beb2da1f7a358891e9384ac6e3-14a0e93b-69d2-4144-8a19-a8cae3f38f84");
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Accept", "application/json");

                var raw = JSON.stringify({
                    "from": "447860099299",
                    "to": "77776840869",
                    "messageId": "a28dd97c-1ffb-4fcf-99f1-0b557ed381da",
                    "content": {
                        "text": message
                    }
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://dk1yxl.api.infobip.com/whatsapp/1/message/text", requestOptions)
                    .then(response => response.text())
                    .then(result => this.$emit('close-modal'))
                    .catch(error => console.log('error', error));

            }
        },
        computed: {
            message() {
                return process.env.WA_INSTANCE_ID;
            },
        },
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

        &:hover {
            opacity: 0.9;
        }

        &:active {
            padding: 10px;
        }


    }

    .call-modal {
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        row-gap: 20px;
        justify-content: space-between;
        width: 34%;
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

        @keyframes showModal {
            from { opacity: 0; } to { opacity: 1; }
        }

        h2 {
            color: #000000;
            font-size: 2em;
        }

        input,
        select,
        textarea {
            border-radius: 15px;
            font-size: 1.3em;
            padding: 8px;
        }
        input,
        textarea {
            width: 100%;
        }

        .select-met {
            width: 30%;
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

        #call-number {
            width: 65%;
        }
    }


    @media (max-width: 1370px) {
        .call-modal {
            width: 50%;
        }

    }

    @media (max-width: 850px) {
        .call-modal {
            width: 70%;
        }
    }

    @media (max-width: 670px) {
        .call-modal h2 {
            font-size: 28px;
        }

    }

    @media (max-width: 570px) {
        .call-modal {
            width: 90%;
        }
        .call-modal h2 {
            font-size: 28px;
        }

        .select-met,
        #call-number {
            width: 100%;
        }

        .close-call-window {
            width: 12%;
        }

    }

    @media (max-width: 400px) {
        .call-modal h2 {
            font-size: 20px;
        }

        .user-name,
        .select-met,
        #call-number,
        #email,
        #form-text {
            border-radius: 10px;
            font-size: 0.8em;
            padding: 5px;
            margin-top: 0.8em;
        }

        .call-me,
        #email,
        #form-text {
            font-size: 0.8em;
            margin-top: 1em;
        }

        .close-call-window {
            position: absolute;
            top: 5px;
            right: 8px;
            padding: 10px;
        }
    }

     
</style>