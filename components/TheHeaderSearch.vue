<template>
    <div class="header__search search">
        <input class="search__input" 
            id="search-input" 
            type="search" 
            v-model="searchData"  
            placeholder="Введите товар/свойство"
            autosave
            spellcheck="true"
        >
        <label for="search-input">
            <button to="/catalog" class="search__btn" @click.prevent="openSearch">Поиск</button>
        </label>
        <button class="search__clean" v-show="searchData" @click="searchData = ''">
            <img src="~/assets/clean.png" alt="СБРОС ПОИСКА" title="СБРОС ПОИСКА">
        </button>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .search {
        width: 30%;
        display: flex;
        align-items: center;
        border-radius: 12px;
        border: 1px solid $accent;
        background: rgba(255, 255, 255, 0.274);
        padding: 2px;
        animation: changeWidth 0.7s ease-in-out alternate;

        @keyframes changeWidth {
            from { width: 5%; }
            to { width: 30%; }
        }

        &__input {
            width: 90%;

            &:focus {
                outline: none;
                cursor: default;
            }

            &::-webkit-search-cancel-button {
                // appearance: none;
                filter: invert(1);
                cursor: pointer;
                transform: scale(1.2);

                &:hover {
                    transform: scale(1.8);
                }
            }
        }
        &__input,
        &__btn {
            background: none;
            border: none;
            color: $main-light;
            cursor: pointer;
            font-size: 14px;
            padding: 0.5em 0.6em 0.5em 0.3em;
            transition: 0.3s;
        }

        &__btn {
            &:hover {
                opacity: 0.8;
            }

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
            cursor: pointer;

            &:hover {
                opacity: 0.7;
                transform: scale(1.1);
            }
        }
    }
</style>