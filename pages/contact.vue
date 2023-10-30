<template>
    <div class="contact-page-wrap">
        <div class="contact-page content">
            <section class="contact-page-part1">
                <h1>КОНТАКТЫ КОМПАНИИ <span>ИСКРА СЕРВИС</span></h1>
                <ul>
                    <li>
                        <span>АДРЕС ОФИСА:</span><br>
                        <a href="https://2gis.kz/karaganda/inside/11822584677016903/firm/11822477302836082?floor=1&m=73.086988%2C49.80103%2F20" target="_blank">г. Караганда, ​БЦ "Pazl" (​Проспект Бухар-жырау, 57/1)</a>
                    </li>
                    <li>
                        <span>ТЕЛЕФОН:</span><br>
                        <a href="tel:8136745677554"> 8136745677554 </a>
                    </li>
                    <li>
                        <span>ЭЛЕКТРОННАЯ ПОЧТА:</span><br>
                        <a href="mailto:email@shelter.com">email@shelter.com</a>
                    </li>
                </ul>
            </section>
            <section class="contact-page-part2">
                <form class="mess-form" method="POST">
                    <h2>ОСТАВИТЬ СООБЩЕНИЕ</h2>
                    <input type="text" class="user-name" placeholder="Как к Вам обращаться?">
                    <input  type="email" name="email" id="email" placeholder="Укажите Вашу электронную почту">
                    <textarea  name="" id="form-text" cols="30" rows="10" placeholder="Сообщение . . ."></textarea>
                    <ButtonGreen  class="call-me" text="ОТПРАВИТЬ"/>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
    import ButtonGreen from '~/components/ButtonGreen.vue';
    export default {
        name: 'ContactPage',
        components: { ButtonGreen },
    }
</script>

<style scoped>
    .contact-page-wrap {
        background-color: #f1f1f1;
        padding: 50px 0;
    }

    .contact-page {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        font-size: 30px;
        text-shadow: 0px 0.1em 0.1em rgba(0, 0, 0, 0.25);
    }

    h1 span {
        font-size: 1.2em;
        color: #00BA61;
    }

    ul {
        padding: 5dvh 0;
    }

    ul li span {
        background-color: rgba(139, 201, 158, 0.123);
        border: 1px solid #00BA61;
        padding: 0.4em;
        border-radius: 0.5em;
    }

    ul li {
        margin-bottom: 3dvh;
    }

    ul li a {
        border-bottom: 1px solid #00BA61;
        border-left: 1px solid #00BA61;
        display: inline-block;
        padding: 0.4em 0;
        line-height: 2em;
        color: black;
        padding-left: 10%;
    }

    ul li a:hover {
        opacity: 0.8;
        text-shadow: 0px 0.1em 0.1em #00d36da1;
    }

    .contact-page-part1 {
        width: 60%;
    }

    .contact-page-part2 {
        width: 37%;
    }

    .mess-form {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        gap: 1dvh;
    }

    .mess-form input,
    .mess-form textarea {
        padding: 5px;
        font-size: 14px;
        border-radius: 0.4em;
    }

    @media (max-width: 850px) {
        .contact-page-wrap {
            padding: 80px 0 30px;
        }

    }

    @media (max-width: 705px) {
        .contact-page {
            flex-direction: column;
        }

        h1 {
            font-size: 26px;
        }

        .contact-page-part1,
        .contact-page-part2 {
            width: 95%;
        }
    }

    @media (max-width: 550px) {
        h1 {
            font-size: 22px;
            text-align: center;
        }

        .contact-page-part1,
        .contact-page-part2 {
            width: 100%;
        }

        ul li span {
            font-size: 14px;
        }

        ul li a {
            font-size: 12px;
        }

    }

    @media (max-width: 401px) {
        ul li span {
            font-size: 12px;
        }

        h2 {
            font-size: 20px;
            text-align: center;
        }

        .mess-form input,
        .mess-form textarea {
            padding: 5px;
            font-size: 12px;
            border-radius: 0.4em;
        }

    }

</style>