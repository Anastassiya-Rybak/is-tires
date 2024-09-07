<template>
    <div class="contact-line">
        <HeaderSelectLocal class="contact-line__lang" />
        <ul class="contact-line__list">
            <li><a href="tel: +00000000000">+00000000000</a></li>
            <li><a href="emailto: company@mail.ru">company@mail.ru</a></li>
        </ul>
        <TheButton class="contact-line__call-btn" :text="$t('layout.btns.call_btn')" colour="green" @click.prevent="$emit('call')" />
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
        &__list {
            width: 70%;
            display: flex;
            justify-content: baseline;
            gap: 3%;
            text-transform: uppercase;
            font-size: calcFlexFontSize(10, 12);
            letter-spacing: 0.2em;
            opacity: 0.7;

            &:hover {
                opacity: 1;
            }

            @include media(1100px){
                width: 60%;
            }
        }

        &__call-btn {
            width: 15%;
            font-size: calcFlexFontSize(10, 12);

            @include media(1100px){
                width: 25%;
            }
        }
    }
</style>