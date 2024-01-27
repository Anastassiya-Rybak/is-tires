<template>
    <div class="contact-page-wrap">
        <div class="contact-page container">
            <section class="contact-page__info">
                <h1>{{ $t('contacts.title') }} <span>{{ $t('home_title') }}</span></h1>
                <ul>
                    <li>
                        <span>{{ $t('layout.footer.adress_alt') }}:</span><br>
                        <a href="https://2gis.kz/karaganda/inside/11822584677016903/firm/11822477302836082?floor=1&m=73.086988%2C49.80103%2F20" target="_blank">{{ $t('layout.footer.adress') }}</a>
                    </li>
                    <li>
                        <span>{{ $t('layout.footer.tel_alt') }}:</span><br>
                        <a href="tel:8136745677554"> 8136745677554 </a>
                    </li>
                    <li>
                        <span>{{ $t('layout.footer.email_alt') }}:</span><br>
                        <a href="mailto:email@shelter.com">email@shelter.com</a>
                    </li>
                </ul>
            </section>
            <section class="contact-page__form">
                <form method="POST">
                    <h2>{{ $t('contacts.messege') }}</h2>
                    <input type="text" class="user-name" :placeholder="$t('layout.modal.name_placeholder')">
                    <input  type="email" name="email" id="email" :placeholder="$t('layout.modal.email_placeholder')">
                    <textarea  name="" id="form-text" cols="30" rows="10" :placeholder="$t('contacts.textarea')"></textarea>
                    <ButtonGreen  class="call-me" :text="$t('contacts.messege_btn')"/>
                </form>
            </section>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
    .contact-page-wrap {
        background-color: $main-light;
        padding: 25vh 0;

        @include media(690px) {
            padding: 11vh 0 5vh;
        }
    }

    .contact-page {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @include media(690px) {
            flex-direction: column;
        }

        &__info {
            width: 60%;

            @include media(690px) {
                width: 100%;
            }

            h1 {
                font-size: 30px;
                text-shadow: 0px 0.1em 0.1em $main-dark;

                span {
                    font-size: 1.2em;
                    color: $accent;
                }
            }

            ul {
                padding: 5dvh 0;

                li {
                    margin-bottom: 3dvh;

                    span {
                        background-color: rgba(139, 201, 158, 0.123);
                        border: 1px solid $accent;
                        padding: 0.4em;
                        border-radius: 0.5em;
                        text-transform: uppercase;
                    }

                    a {
                        border-bottom: 1px solid #00BA61;
                        border-left: 1px solid #00BA61;
                        display: inline-block;
                        padding: 0.4em 0;
                        line-height: 2em;
                        color: black;
                        padding-left: 10%;
                        transition: all 0.3s ease;

                        &:hover {
                            opacity: 0.8;
                            text-shadow: 0px 0.1em 0.1em #00d36da1;
                        }
                    }
                }
                    
            }
        }

        &__form {
            width: 37%;

            @include media(690px) {
                width: 100%;
            }

            form {
                display: flex;
                flex-direction: column;
                margin: 0 auto;
                gap: 1dvh;

                input,
                textarea {
                    padding: 5px;
                    font-size: 14px;
                    border-radius: 10px;
                }
            }
        }
    }

</style>