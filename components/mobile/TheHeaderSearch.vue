<template>
    <div class="out-search-combo">
        <div class="search-input-container">
            <input id="search-input" type="text" v-model="searchData" class="search-input" placeholder="Введите товар/свойство">
            <label for="search-input">
                <a href="/catalog" class="search-btn" @click="openSearch">Поиск</a>
            </label>
            <button class="search-clean-out" v-show="searchData" @click="reload">
                <img src="~/assets/clean.png" alt="" title="СБРОС ПОИСКА">
            </button>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .out-search-combo {
        display: none;
        position: absolute;
        width: 95%;
        bottom: -70px; left: 50%;
        -webkit-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
    }

    .out-search-combo .search-input-container {
        background: #2e2e2e25;
    }

    .out-search-combo .search-input,
    .out-search-combo .search-btn {
        background: none;
        border: none;
        color: #f1f1f1;
        cursor: pointer;
        font-size: 16px;
        transition: 0.3s;
    }

    .out-search-combo .search-btn {
        text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
        color: #00BA61;
    }

    .out-search-combo .search-input {
        width: 90%;
    }

    .out-search-combo .search-input::placeholder {
        color: #ffffffc9;
        text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    }

    .out-search-combo .search-btn:hover {
        color: #00BA61;
    }

</style>