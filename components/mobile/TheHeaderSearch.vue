<template>
    <div class="header__search search">
        <input class="search__input" 
            id="search-input" 
            type="search" 
            v-model="searchData"  
            placeholder="Введите название товара / свойства"
            autosave
            autocomplete="off"
            aria-expanded="true"
            spellcheck="true"
            @keyup.enter="goSearch"
        >
        <label for="search-input">
            <button class="search__btn" @click.prevent="goSearch">Поиск</button>
        </label>
    </div>
</template>

<script setup>
    import { ref, onBeforeUpdate } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useSearchStore } from '~/stores/search';

    const searchStore = useSearchStore();
    const { inpData } = storeToRefs(searchStore);
    const searchData = ref(inpData);

    const goSearch = async () => {
        searchStore.editItem(searchData.value);
        searchStore.saveState();
        if (searchData.value !== '') {
            await navigateTo({
                path: '/catalog',
                query: {
                    type: 'search',
                    sort: searchData.value
                }
            });
            location.reload()
        }
    };

    onBeforeUpdate(() => {
        if (searchData.value === '') {
            searchStore.editItem(searchData.value);
            searchStore.saveState();
        }
    });

</script>

<style lang="scss" scoped>
    .search {
        width: 100%;
        position: absolute;
        bottom: -110%; left: 50%;
            -webkit-transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        display: flex;
        align-items: center;
        border-radius: 10px;
        border: 1px solid $accent;
        background: rgba(32, 32, 32, 0.137);
        padding: 2px;

        @include media(480px) {
            bottom: -85%;
            padding: 1px;
        }

        &__input {
            width: 93%;

            @include media(450px) {
                padding-right: 0 !important;
            }

            &::placeholder {
                @include media(480px) {
                    font-size: 14px;
                }
            }

            &:focus {
                outline: none;
            }

            &::-webkit-search-cancel-button {
                filter: invert(1);
                transform: scale(1.2);

                &:active {
                    transform: scale(1.8);
                }
            }
        }
        &__input,
        &__btn {
            background: none;
            border: none;
            color: $main-light;
            font-size: 18px;
            padding: 0.5em 0.6em 0.5em 0.3em;
            transition: 0.3s;

            @include media(480px) {
                font-size: 14px;
            }
        }

        &__btn {
            &:active {
                color: $accent;
            }
        }

        &__clean {
            border: none;
            background: none;
            width: 6%;
            display: flex;
            flex-direction: column;
        }
    }
</style>