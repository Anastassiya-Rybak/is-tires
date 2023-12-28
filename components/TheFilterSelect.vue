<template>
    <select v-model="selectedValue" @change="editFilter">
        <option :value="selectData.selectValue" class="default-option" selected>{{ selectData.selectValue }}</option>
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

    const selectedValue = ref(null);

    const editFilter = () => {
        filterStore.editItem(props.selectData.name, selectedValue.value);
    }

</script>

<style lang="scss" scoped>

</style>