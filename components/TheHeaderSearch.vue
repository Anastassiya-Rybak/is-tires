<template>
    <div class="header__search search">
        <input class="search__input" id="search-input" type="text" v-model="searchData"  placeholder="Введите товар/свойство">
        <label for="search-input">
            <a href="/catalog" class="search__btn" @click="openSearch">Поиск</a>
        </label>
        <button class="search__clean" v-show="searchData" @click="searchData = ''">
            <img src="~/assets/clean.png" alt="" title="СБРОС ПОИСКА">
        </button>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .header__search {
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-items: flex-end;


    }

    .search-clean,
    .search-clean-out {
        border: none;
        background: none;
    }

    .search-clean {
        width: 6%;
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }

    .search-clean:hover {
        opacity: 0.7;
        transform: scale(1.1);
    }

    .search-clean-out {
        width: 3%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 1%;
        cursor: pointer;
    }

    .search-input-container {
        border-radius: 15px;
        border: 1px solid #00BA61;
        background: rgba(255, 255, 255, 0.274);
        padding: 4px;
        transition: 0.3s;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .search-input,
    .search-btn {
        background: none;
        border: none;
        color: #f1f1f1;
        cursor: pointer;
        font-size: 16px;
        padding: 7px 10px 7px 5px;
        transition: 0.3s;
    }

    .search-input {
        width: 75%;
    }

    .search-input:focus {
        outline: none;
        cursor: default;
    }

    .search-btn:hover {
        color: #00BA61;
    }



</style>