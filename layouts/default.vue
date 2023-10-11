<template>
    <div>
        <header class="container">
            <nav class="header__nav">
                <nuxt-link to="/" class="logo">ИСКРА СЕРВИС</nuxt-link>
                <ul class="menu">
                    <li>
                        <nuxt-link to="/" class="active-page">ГЛАВНАЯ</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/catalog">КАТАЛОГ</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/contact">КОНТАКТЫ</nuxt-link>
                    </li>
                </ul>
                <div class="search">
                    <div class="search-combo">
                        <div v-show="searchOpen" class="search-input-container">
                            <input id="search-input" type="text" v-model="searchData" class="search-input" placeholder="Введите товар/свойство">
                            <label for="search-input">
                                <nuxt-link to="/catalog" class="search-btn" @click="openSearch">Поиск</nuxt-link>
                            </label>
                        </div>
                    </div>
                    <div v-show="!searchOpen" class="loop" @click="openSearch" >
                        <img src="./../assets/Frame 5.svg" alt="Поиск по сайту">
                    </div>
                </div>
                <ButtonGreen class="call-btn" text="ОБРАТНЫЙ ЗВОНОК" @click="openModal('call')" />
                <CallModal v-show = "visible" :from="modalFrom" @close-modal="visible = false" />
            </nav>
        </header>
        <main>
            <slot />
            <section class="content">
                <div class="mailing">
                    <h3>Узнавайте первыми о самых актуальных предложениях!</h3>
                    <form action="" method="post" class="mail-form">
                        <input type="email" name="mailing" id="mailing" placeholder="ВВЕДИТЕ СВОЙ MAIL"
                        v-model="mail" @keypress.enter.prevent="toSent($event)">
                        <input class="mail-btn" type="button" :value="sendOrSent.text" @click.prevent="toSent">
                    </form>
                </div>
            </section>
        </main>
        <footer>
            <div class="footer-wrapper">
                <div class="contacts-data">
                    <h2>СВЯЗАТЬСЯ С НАМИ</h2>
                    <ul>
                        <li>
                            <div class="contacts-data-img">
                                <img src="./../assets/locate.svg" alt="Адрес">
                            </div>
                            <a href="https://2gis.kz/karaganda/inside/11822584677016903/firm/11822477302836082?floor=1&m=73.086988%2C49.80103%2F20" target="_blank">г. Караганда ​БЦ Pazl <br>​Проспект Бухар-жырау, 57/1</a>
                        </li>
                        <li>
                            <div class="contacts-data-img">
                                <img src="./../assets/tel.svg" alt="Телефон">
                            </div>
                            <a href="tel:8136745677554"> 8136745677554 </a>
                        </li>
                        <li>
                            <div class="contacts-data-img">
                                <img src="./../assets/mail.svg" alt="Почтовый адрес">
                            </div>
                             <a href="mailto:email@shelter.com">email@shelter.com</a>
                        </li>
                    </ul>
                </div>
                <div class="footer-btns">
                    <ButtonGreen class="call-btn" text="ОБРАТНЫЙ ЗВОНОК" @click="openModal('call')" />
                    <nuxt-link to="/catalog">ОТКРЫТЬ КАТАЛОГ</nuxt-link>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import ButtonGreen from '~/components/ButtonGreen.vue';
    import CallModal from '~/components/CallModal.vue';
    export default {
        name: 'default',
        data() {
            return {
                searchData: '',
                searchOpen: false,
                visible: false,
                mail: '',
                sendOrSent: { text: 'ПОДПИСАТЬСЯ НА РАССЫЛКУ'},
                modalFrom: ''
            }
        },
        components: { CallModal, ButtonGreen },
        methods: {
            openModal(n) {
                this.visible = true;
                this.modalFrom = n;
            },
            openSearch() {
                if (this.searchOpen && this.searchData !== '') this.$router.push({ path: '/catalog/search', query: { param: this.searchData } });
                this.searchOpen ? this.searchOpen = false : this.searchOpen = true;
                if (this.searchOpen && this.searchData !== '') this.searchData = '';
            },
            toSent(event){
                event.preventDefault();
                
                if (this.mail.length >= 7 && this.mail.includes('@')) {
                    this.sendOrSent.text='ПОДПИСКА ОФОРМЛЕНА!';
                    this.mail = '';
                }
            },
        },
    }
</script>

<style lang="css">

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
  }

  body {
      background-color: rgb(17, 17, 17);
  }

  li {
    list-style: none;
  }

  img {
    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: rgb(241, 241, 241);
    }

    .contacts-data ul li a:hover {
        opacity: 0.8;
        color: #00ba6063;
    }

    .menu li a{
        display: inline-block;
        position: relative;
        line-height: 2;
    }

    .menu li a::after,
    .active-page::before {
        display: block;
        position: absolute;
        content: '';
        height: 2px;
        width: 0%;
        bottom: 0;
        background-color: #00BA61;
        transition: width 0.4s ease-in-out;
    }

    .menu li a:hover::after,
    .active-page::before,
    .menu li a:focus::after {
        width: 100%;
    }

  .container {
      width: 90%;
      max-width: 1440px;
      margin: 0 auto;
  }

  .logo {
    font-size: 40px;
  }

  .header__nav,
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    }

    .menu {
        width: 35%;
        margin: 30px 0;
    }

    .compacted {
        width: 20% !important;
    }

    .hide {
        display: none !important;
    }

    .search {
        width: fit-content;
    }

    .loop {
        cursor: pointer;
        transition: 0.3s;
    }

    .loop:hover {
        opacity: 0.7;
        transform: scale(1.1);
    }

    .search-combo {
        display: flex;
    }

    .search-input-container {
        border-radius: 15px;
        border: 1px solid #00BA61;
        background: rgba(255, 255, 255, 0.274);
        padding: 4px;
        transition: 0.3s;
    }

    .search-input,
    .search-btn {
        background: none;
        border: none;
        color: #f1f1f1;
        cursor: pointer;
        font-size: 16px;
        padding: 7px 10px 7px 5px;
        transition: 0.3s;
    }

    .search-input:focus {
        outline: none;
        cursor: default;
    }

    .search-btn:hover {
        color: #00BA61;
    }

    .call-btn {
        font-size: 14px;
    }

    /* FOOTER */

    footer {
        width: 100%;
    }

    footer::before {
        content: '';
        display: block;
        width: 100%;
        height: 10px;
        background-color: #01aa59;
    }

    .footer-wrapper {
        width: 40%;
        max-width: 940px;
        margin: 0 auto;
        padding: 60px 0 105px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    .footer-wrapper::after {
        content: '©Искра-Сервис 2020';
        position: absolute;
        bottom: 10%;
        width: 100%;
        text-align: center;
        color: #f1f1f1;
        opacity: 0.7;
    }

    .footer-wrapper h2 {
        color: #f1f1f1;
        margin-bottom: 20px;
    }

    .contacts-data ul {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .contacts-data ul li {
        display: flex;
        gap: 15px;
        align-items: center;
    }

    .contacts-data-img {
        width: 10%;
    }

    .footer-btns {
        display: flex;
        margin-top: 40px;
        flex-direction: column;
        align-items: center;
        width: 40%;
        gap: 10px;
    }

    .footer-btns button {
        width: 100%;
        margin-top: 10px;
        font-size: 14px;
    }

    .footer-btns a {
        width: 100%;
        padding: 12px 22px;
        margin-top: 10px;
        border-radius: 15px;
        cursor: pointer;
        background-color: #00BA61;
        color: #f1f1f1;
        text-align: center;
        font-size: 14px;
        border: 1px solid rgba(0, 0, 0, 0.089);
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.68) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    .footer-btns button:active,
    .footer-btns a:active {
        transform: scale(0.98, 0.98);
        background-color: #01aa59;
    }


    /* MAILING */

    .mailing {
        margin: 75px auto;
        padding: 55px 30px 55px 15%;
        overflow: hidden;
        border-radius: 20px;
        background: #00BA61;
        box-shadow: 0px 10px 10px 0px rgba(255, 255, 255, 0.46) inset;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        position: relative;
    }

    .mailing::before {
        content: url('~/assets/back/back-mail.png');
        position: absolute;
        left: -5px;
        top: 0;
    }

    .mailing h3 {
        font-size: 32px;
        color: #f1f1f1;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.37);
    }

    .mail-form {
        width: 94%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #mailing {
        width: 50%;
        padding: 15px 25px;
        background-color: #f1f1f1;
        font-size: 18px;
        border: none;
        border-radius: 10px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.13) inset;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }

    .mail-form .mail-btn {
        width: 48%;
        padding: 15px 0;
        border-radius: 10px;
        cursor: pointer;
        color: #f1f1f1;
        font-size: 20px;
        letter-spacing: 2px;
        word-spacing: 3px;
        border: none;
        box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.43) inset;
        background-color: #000;
    }

    .mail-form .mail-btn:hover {
        filter: brightness(90%);
    }

    .mail-form .mail-btn:active {
        transform: scale(0.98, 0.98);
    }
</style>