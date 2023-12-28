<template>
    <div>
        <TheHeader />
        <main>
            <slot />
            <section class="content">
                <div class="mailing">
                    <h3>Узнавайте первыми о самых актуальных предложениях!</h3>
                    <mailing-form />
                </div>
            </section>
        </main>
        <TheFooter />
    </div>
</template>

<script>
    import { useSearchStore } from '~/stores/search';
    import TheHeader from '~/components/TheHeader.vue';
    import TheFooter from '~/components/TheFooter.vue';
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
        components: { CallModal, ButtonGreen, MailingForm, TheHeader, TheFooter },
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

<style lang="scss" scoped>
    @keyframes showModal {
        from { height: 0px; } to { height: 200px; }
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