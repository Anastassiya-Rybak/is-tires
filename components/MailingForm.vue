<template>
    <newsletter-form 
        class="mail-form"
        headerText=""
        inputPlaceholder="ВВЕДИТЕ СВОЙ EMAIL"
        buttonText="ПОДПИСАТЬСЯ"
    />    
</template>

<script setup>
</script>


<style lang="scss">
    /* MAILING */
    .mail-form {
        width: 94%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include media(1300px) {
            width: 85%;
        }

        @include media(1130px) {
            flex-direction: column;
            gap: 15px;
        }

        input {
            width: 50%;
            padding: 0.6em 1.4em;
            background-color: #f1f1f1e3;
            font-size: 18px;
            border: none;
            border-radius: 10px;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.13) inset;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

            &:focus {
                background-color: #f1f1f1;
            }
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

        @include media(1130px) {
            input,
            button {
                width: 90%;
            }
        }

        @include media(825px) {
            input,
            button {
                font-size: 14px;
                padding: 0.8em;
            }
        }

        @include media(790px) {
            input,
            button {
                font-size: 12px;
            }
        }

        @include media(440px) {
            input,
            button {
                width: 100%;
            }
        }
    }
</style>