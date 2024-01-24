<template>
    <select class="lang-select" v-model="lang" name="locale" id="locales" @change="changeState">
        <option selected value="ru-RU">Русский язык</option>
        <option value="kk-KZ">Қазақ тілі,</option>
        <option value="en-US">English language</option>
    </select>
</template>

<script setup>
    const { locale, setLocale } = useI18n();
    import { useLocaleStore } from '~/stores/locale';

    const localeStore = useLocaleStore();

    const lang = computed({
        get: () => locale.value,
        set: (value) => { setLocale(value); }
    });

    const changeState = () => {
        localeStore.editItem(lang.value);
    }

    onBeforeMount(() => {
        localeStore.restoreState();
    });

    onBeforeUpdate(() => {
        localeStore.saveState();
    })
</script>

<style lang="scss" scoped>
    .lang-select {
        margin-top: 15vh;
        width: 60%;
        padding: 0.3em 1.8em 0.3em 0.5em;
        border-radius: 10px;
        text-shadow: 0px 0.3em 0.3em rgba(0, 0, 0, 0.25);
        background-color: rgba(236, 236, 236, 0.514);
        background-size: 15px;
        text-align: center;
        color: $main-light;

        @include hover() {
            filter: brightness(90%);
        }

        option {
            color: $main-dark;
        }
    }
</style>