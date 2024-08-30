<template>
    <select class="filter-select-wrap" v-model="selectedValue" @change="editFilter">
        <option v-for="(option, idx) in selectData.options" :key="idx" :value="option">{{ findValue(idx, option) }}</option>
    </select>
</template>

<script setup>
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    const props = defineProps({
        selectData: {
            type: Object,
            required: true,
            default: {}
        },
        index: {
            type: Number,
            required: true
        },
    });

    const currentSelect = ref(`selects.${props.index + 1}`);
    const selectedValue = ref(props.selectData.options[props.selectData.selectedLet]);

    const findValue = (idx, option) => {
        const { t } = useI18n();
        if (idx === 0) { return t(currentSelect.value, 0); }
        else if (props.index === 0) { return t(currentSelect.value, idx); }
        else if (props.index === 1) { return t(`main.second_block.categories.${idx}`) }
        else { return option; }
    };
</script>

<style lang="scss" scoped>
    .filter-select-wrap {
        padding: 0.7em 2em 0.7em 0.7em;
        font-size: 14px;
        border-radius: 10px;
        border: 1px solid $accent;
        background-size: 15px;

        @include media(1100px) {
            font-size: 12px;
        }
    }
</style>