<template>
    <div>
        <header class="container">
            <nav class="header__nav">
                <nuxt-link to="/" class="logo" @click="cleanSearch">ИСКРА СЕРВИС</nuxt-link>
                <div class="burger-wrap" @click="openBurger">
                    <div class="burger">
                        <hr><hr><hr>
                    </div>
                </div>
                <ul class="menu">
                    <li>
                        <nuxt-link active-class="active-page" to="/" @click="cleanSearch">ГЛАВНАЯ</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link active-class="active-page" to="/catalog" @click="cleanSearch">КАТАЛОГ</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link active-class="active-page" to="/contact" @click="cleanSearch">КОНТАКТЫ</nuxt-link>
                    </li>
                </ul>
                <div class="search">
                    <div class="search-combo">
                        <div v-show="searchOpen" class="search-input-container">
                            <input id="search-input" type="text" v-model="searchData" class="search-input" placeholder="Введите товар/свойство">
                            <label for="search-input">
                                <a href="/catalog" class="search-btn" @click="openSearch">Поиск</a>
                            </label>
                            <button class="search-clean" v-show="searchData" @click="reload">
                                <img src="~/assets/clean.png" alt="" title="СБРОС ПОИСКА">
                            </button>
                        </div>
                    </div>
                    <div v-show="!searchOpen" class="loop" @click="openSearchInput" >
                        <img src="./../assets/Frame 5.svg" alt="Поиск по сайту">
                    </div>
                </div>
                <ButtonGreen class="call-btn" text="ОБРАТНЫЙ ЗВОНОК" @click="openModal('call')" />
                <CallModal v-show = "visible" :from="modalFrom" @close-modal="visible = false" />
            </nav>
            <nav class="menu-out-wrap">
                <ul class="menu-out" >
                    <li>
                        <nuxt-link active-class="active-page" to="/" @click="cleanSearch">ГЛАВНАЯ</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link active-class="active-page" to="/catalog" @click="cleanSearch">КАТАЛОГ</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link active-class="active-page" to="/contact" @click="cleanSearch">КОНТАКТЫ</nuxt-link>
                    </li>
                </ul>
            </nav>
            <div class="out-search-combo">
                <div class="search-input-container">
                    <input id="search-input" type="text" v-model="searchData" class="search-input" placeholder="Введите товар/свойство">
                    <label for="search-input">
                        <a href="/catalog" class="search-btn" @click="openSearch">Поиск</a>
                    </label>
                    <button class="search-clean-out" v-show="searchData" @click="reload">
                        <img src="~/assets/clean.png" alt="" title="СБРОС ПОИСКА">
                    </button>
                </div>
            </div>
        </header>
        <main>
            <slot />
            <section class="content">
                <div class="mailing">
                    <h3 @click="test">Узнавайте первыми о самых актуальных предложениях!</h3>
                    <mailing-form />
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
    import { useSearchStore } from '~/stores/search';
    import ButtonGreen from '~/components/ButtonGreen.vue';
    import CallModal from '~/components/CallModal.vue';
    import MailingForm from '~/components/MailingForm.vue';
    export default {
        name: 'default',
        setup() {
            const searchStore = useSearchStore();

            const { inpData } = storeToRefs(searchStore);
            return {
                searchStore,
                searchData: inpData
            }
        },
        data() {
            return {
                searchOpen: this.searchData ? true : false,
                visible: false,
                modalFrom: ''
            }
        },
        beforeCreate() {
            if (process.client) this.searchStore.restoreState();
        },
        components: { CallModal, ButtonGreen, MailingForm },
        methods: {
            openBurger() {
                document.querySelector('.burger-wrap').classList.toggle('open-burger');
                document.querySelector('.menu-out-wrap').classList.toggle('open');
            },
            openModal(n) {
                this.visible = true;
                this.modalFrom = n;
            },
            openSearchInput() {
                this.searchOpen = true;
            },
            async openSearch() {
                if (this.searchData !== '') {
                    this.searchStore.editItem(this.searchData);
                    if (process.client) this.searchStore.saveState();
                }
            },
            async cleanSearch() {
                if (this.searchData !== '') {
                    this.searchData = '';
                    this.searchStore.editItem(this.searchData);
                    if (process.client) this.searchStore.saveState();
                }
            },
            reload () {
                this.searchData = '';
                this.searchStore.editItem(this.searchData);
                if (process.client) this.searchStore.saveState();
                location.reload();
            }
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
      background-color: rgb(26, 26, 26);
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

    .open {
        display: block !important;
    }

    @keyframes showModal {
        from { height: 0px; } to { height: 200px; }
    }

    header {
        position: relative;
    }

    .contacts-data ul li a:hover {
        opacity: 0.8;
        color: #00ba6063;
    }

    .compact {
        max-width: 23%;
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
    flex-grow: 0;
    font-size: 40px;
  }

    .header__nav,
    .menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header__nav {
        gap: 4%;
    }

    .burger-wrap {
        display: none;
        width: 5%;
        transition: all 0.4s;
    }

    .burger {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 7px;
    }

    .burger hr {
        border: 1px solid #00BA61;
    }

    .open-burger {
        transform: rotate(90deg);
    }

    .menu {
        flex-grow: 2;
        margin: 30px 0;
    }

    .compacted {
        width: 20% !important;
    }

    .hide {
        display: none !important;
    }

    .search {
        max-width: 28%;
        flex-grow: 0.5;
        /* flex-basis: content; */
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .loop {
        cursor: pointer;
        transition: 0.3s;
        max-width: 50%;
    }

    .search-clean,
    .search-clean-out {
        border: none;
        background: none;
    }

    .search-clean {
        width: 6%;
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }

    .search-clean-out {
        width: 3%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 1%;
        cursor: pointer;
    }

    .loop:hover,
    .search-clean:hover {
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
        display: flex;
        justify-content: space-between;
        align-items: center;
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

    .search-input {
        width: 75%;
    }

    .search-input:focus {
        outline: none;
        cursor: default;
    }

    .search-btn:hover {
        color: #00BA61;
    }

    .out-search-combo {
        display: none;
        position: absolute;
        width: 95%;
        bottom: -70px; left: 50%;
        -webkit-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
    }

    .out-search-combo .search-input-container {
        background: #2e2e2e25;
    }

    .out-search-combo .search-input,
    .out-search-combo .search-btn {
        background: none;
        border: none;
        color: #f1f1f1;
        cursor: pointer;
        font-size: 16px;
        transition: 0.3s;
    }

    .out-search-combo .search-btn {
        text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
        color: #00BA61;
    }

    .out-search-combo .search-input {
        width: 90%;
    }

    .out-search-combo .search-input::placeholder {
        color: #ffffffc9;
        text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    }

    .out-search-combo .search-btn:hover {
        color: #00BA61;
    }

    .menu-out-wrap {
        display: none;
        width: 100%;
    }

    .menu-out {
        margin-top: 2dvh;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .menu-out li a{
        display: inline-block;
        position: relative;
        line-height: 2;
    }

    .call-btn {
        flex-grow: 0s;
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
        padding: 0.9em 1.6em;
        margin-top: 10px;
        border-radius: 1.09em;
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

    @media (max-width: 1385px) {
        .logo {
            font-size: 30px;
        }

        .menu li a{
            font-size: 14px;
        }


        .mailing::before {
            display: none;
        }

        .mailing {
            padding: 55px 30px 55px 15px;
        }

    }

    @media (max-width: 1130px) {
        .menu {
            min-width: 230px;
        }

        .search-input-container {
            border-radius: 10px;
        }

        .search-input,
        .search-btn {
            font-size: 12px;
            padding: 3px 5px 3px 4px;
        }

        .call-btn {
            font-size: 10px;
        }

        .mailing {
            padding: 35px 15px 35px 15px;
        }

        .mailing h3 {
            font-size: 24px;
        }

        .mail-form {
            flex-direction: column;
            gap: 15px;
        }

        #mailing,
        .mail-form .mail-btn {
            width: 90%;
        }

        /* Footer */

        .footer-wrapper {
            width: 60%;
        }

        .footer-btns {
            width: 35%;
        }
    }

    @media (max-width: 990px) {
        .logo {
            max-width: 15%;
        }

        .menu {
            min-width: 230px;
        }

        .search-input,
        .search-btn {
            font-size: 12px;
            padding: 3px 5px 3px 4px;
        }

        .call-btn {
            font-size: 10px;
        }
    }

    @media (max-width: 845px) {
        header {
            padding: 15px 0;
        }

        .logo {
            max-width: 70%;
            width: 70%;
        }

        .burger-wrap {
            display:inline-block;
        }

        .menu {
            display: none;
        }

        .out-search-combo {
            display: block;
        }

        .search {
            display: none;
        }

        .mailing {
            padding: 20px 15px 20px 15px;
            margin: 30px 0;
        }

        .mailing h3 {
            font-size: 20px;
        }

        #mailing,
        .mail-form .mail-btn {
            font-size: 14px;
            padding: 0.8em;
        }
    }

    @media (max-width: 700px) {
        .logo {
            width: 60%;
        }

        .search-input-container {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        .out-search-combo .search-input {
            width: 85%;
        }

        .mailing h3 {
            text-align: center;
        }

        /* Footer */

        .footer-wrapper {
            width: 70%;
        }

        .footer-btns {
            margin-top: 20px;
            width: 40%;
            gap: 0;
        }

        .footer-wrapper h2 {
            font-size: 1em;
        }

        .contacts-data ul {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .contacts-data ul li {
            gap: 10px;
            font-size: 0.8em;
        }

        .contacts-data-img {
            width: 5%;
        }

        .footer-btns button,
        .footer-btns a {
            font-size: 10px;
        }
    }

    @media (max-width: 520px) {
        .logo {
            width: 20%;
            font-size: 18px;
            margin-right: 30%;
        }

        .out-search-combo .search-input {
            width: 80%;
        }

        .search-clean-out {
            width: 5%;
        }

    }

    @media (max-width: 475px) {
        .footer-wrapper {
            flex-direction: column-reverse;
            padding-top: 10px;
        }

        .footer-wrapper h2 {
            text-align: center;
        }

        .contacts-data ul {
            flex-direction: row;
            justify-content: space-evenly;
            flex-wrap: wrap;
        }

        .contacts-data ul li {
            gap: 5px;
        }

        .contacts-data-img {
            width: 10%;
        }

        .footer-btns {
            margin-top: 0;
            margin-bottom: 15px;
            width: 90%;
        }

    }

    @media (max-width: 445px) {
        .out-search-combo .search-input {
            width: 75%;
        }

        .search-clean-out {
            width: 7%;
        }

        .mailing {
            gap: 15px;
        }

        .mailing h3 {
            font-size: 16px;
        }

        #mailing,
        .mail-form .mail-btn {
            font-size: 12px;
            padding: 0.8em;
        }
    }

    @media (max-width: 400px) {
        #mailing,
        .mail-form .mail-btn {
            width: 95%;
            font-size: 10px;
        }
    }
</style>