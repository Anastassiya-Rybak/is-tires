<template>
    <footer class="footer">
        <div class="footer__content">
            <div class="footer__contacts-data">
                <h2>СВЯЗАТЬСЯ С НАМИ</h2>
                <ul>
                    <li>
                        <div class="footer__img">
                            <img src="./../assets/locate.svg" alt="Адрес">
                        </div>
                        <a href="https://2gis.kz/karaganda/inside/11822584677016903/firm/11822477302836082?floor=1&m=73.086988%2C49.80103%2F20" target="_blank">г. Караганда, ​БЦ Pazl  (​Проспект Бухар-жырау, 57/1)</a>
                    </li>
                    <li>
                        <div class="footer__img">
                            <img src="./../assets/tel.svg" alt="Телефон">
                        </div>
                        <a href="tel:8136745677554"> 8136745677554 </a>
                    </li>
                    <li>
                        <div class="footer__img">
                            <img src="./../assets/mail.svg" alt="Почтовый адрес">
                        </div>
                            <a href="mailto:email@shelter.com">email@shelter.com</a>
                    </li>
                </ul>
            </div>
            <div class="footer__btns">
                <ButtonGreen class="call-btn" text="ОБРАТНЫЙ ЗВОНОК" @click="$emit('call')"/>
                <nuxt-link to="/catalog" @click="goAndReset">ОТКРЫТЬ КАТАЛОГ</nuxt-link>
            </div>
        </div>
    </footer>
</template>

<script setup>
    const emit = defineEmits('reset');
    const goAndReset = async () => {
        emit('reset');
        await navigateTo({
            path: '/catalog',
            query: false
        });
        location.reload();
    }
</script>

<style lang="scss" scoped>
    .footer {
        width: 100%;

        &::before {
            content: '';
            display: block;
            width: 100%;
            height: 10px;
            background-color: $accent;
        }

        &__content {
            width: 60%;
            margin: 0 auto;
            padding: 60px 0 105px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            position: relative;

            @include media(810px) {
                width: 90%;
            }

            @include media(530px) {
                flex-direction: column;
            }

            &::after {
                content: '©Искра-Сервис 2020';
                position: absolute;
                bottom: 10%;
                width: 100%;
                text-align: center;
                color: $main-light;
                opacity: 0.7;

                @include media(530px) {
                    font-size: 12px;
                }

                @include media(790px) {
                    font-size: 14px;
                }

            }
        }

        &__contacts-data {
            width: 50%;

            @include media(530px) {
                width: 100%;
            }

            h2 {
                color: $main-light;
                margin-bottom: 3vh;

                @include media(790px) {
                    font-size: 20px;
                }

            }

            ul {
                display: flex;
                flex-direction: column;
                gap: 15px;

                li {
                    display: flex;
                    gap: 15px;
                    align-items: center;

                    @include media(790px) {
                        font-size: 14px;
                    }

                    .footer__img {
                        width: 5%;
                    }

                    a:hover {
                        opacity: 0.8;
                        color: $accent;
                    }
                }
            }
        }

        &__btns {
            display: flex;
            margin-top: 40px;
            flex-direction: column;
            align-items: center;
            width: 40%;
            gap: 10px;

            @include media(530px) {
                width: 100%;
            }

            button {
                width: 100%;
                margin-top: 10px;
                font-size: 14px;
            }

            a {
                width: 100%;
                padding: 0.9em 1.6em;
                margin-top: 10px;
                border-radius: 10px;
                cursor: pointer;
                background-color: $accent;
                color: $main-light;
                text-align: center;
                font-size: 14px;
                border: 1px solid rgba(0, 0, 0, 0.089);
                text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.68) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

                &:hover {
                    filter: brightness(90%);
                }

            }

            @include media(790px) {
                button,
                a {
                    font-size: 12px;
                }
            }

            button:active,
            a:active {
                transform: scale(0.98, 0.98);
                background-color: $accent;
            }

        }
    }

</style>