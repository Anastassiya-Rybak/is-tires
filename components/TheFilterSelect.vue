<template>
    <select class="filter-select-wrap" v-model="selectedValue" @change="editFilter">
        <option v-for="(option, idx) in selectData.options" :key="idx" :value="option">{{ option }}</option>
    </select>
</template>

<script setup>
    import { ref } from 'vue';
    import { useFilterStore } from '~/stores/filter';

    const filterStore = useFilterStore();

    const props = defineProps({
        selectData: {
            type: Object,
            required: true,
            default: {}
        }
    })

    const selectedValue = ref(props.selectData.options[props.selectData.selectedLet]);

    const editFilter = () => {
        filterStore.editItem(props.selectData.name, selectedValue.value);
    }

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