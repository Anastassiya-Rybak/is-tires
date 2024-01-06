<template>
    <div>
        <TheHeader />
        <main>
            <slot />
            <section class="container">
                <div class="mailing">
                    <h3>Узнавайте первыми о самых актуальных предложениях!</h3>
                    <mailing-form />
                </div>
            </section>
        </main>
        <TheFooter />
    </div>
</template>

<script setup>
</script>

<style lang="scss">
    .mailing {
        margin: 75px auto;
        padding: 45px 30px 45px 15%;
        overflow: hidden;
        border-radius: 20px;
        background: $accent;
        box-shadow: 0px 10px 10px 0px rgba(255, 255, 255, 0.46) inset;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3vh;
        position: relative;

        &::before {
            content: url('~/assets/back/back-mail.png');
            position: absolute;
            left: -5px;
            top: 0;
        }

        h3 {
            font-size: 30px;
            color: #f1f1f1;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.37);
            z-index: 2;
        }

        .mail-form {
            width: 94%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            input {
                width: 50%;
                padding: 0.6em 1.4em;
                background-color: #f1f1f1;
                font-size: 18px;
                border: none;
                border-radius: 10px;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.13) inset;
                filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
            }

            button {
                width: 48%;
                padding: 0.6em 1.4em;
                border-radius: 10px;
                cursor: pointer;
                color: #f1f1f1;
                font-size: 18px;
                letter-spacing: 0.1em;
                word-spacing: 0.2em;
                border: none;
                box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.43) inset;
                background-color: rgb(19, 19, 19);

                &:hover {
                    filter: brightness(90%);
                }

                &:active {
                    transform: scale(0.98, 0.98);
                }
            }
        }
    }
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