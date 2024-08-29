<template>
    <div class="contact-line">
        <HeaderSelectLocal class="contact-line__lang" />
        <ul class="contact-line__list">
            <li><a href="tel: +00000000000">+00000000000</a></li>
            <li><a href="emailto: company@mail.ru">company@mail.ru</a></li>
        </ul>
        <TheButton class="contact-line__call-btn" :text="$t('layout.btns.call_btn')" colour="green" />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .contact-line {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1vh 0;

        &__list {
            width: 70%;
            display: flex;
            justify-content: baseline;
            gap: 3%;
            text-transform: uppercase;
            font-size: 0.8em;
            letter-spacing: 0.2em;
            opacity: 0.7;

            &:hover {
                opacity: 1;
            }
        }

        &__call-btn {
            width: 15%;
            font-size: 12px;

            @include media(1015px) {
                font-size: 8px;
            }

            @include media(690px) {
                font-size: 14px;
            }
        }
    }
</style>