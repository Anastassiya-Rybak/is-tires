<template>
    <div class="header__search search" :class="{'search_open': opened}" id="search">
        <input class="search__input"
            id="search-input"
            type="search" 
            v-model="searchData"  
            :placeholder="opened ? $t('layout.header.search.placeholder') : ''"
            autosave
            autocomplete="off"
            aria-expanded="true"
            spellcheck="true"
            @focusin="openField"
            @keyup.enter="goSearch"
        >
        <label for="search-input">
            <div class="search__loop" @click="goSearch" >
                <img src="./../../assets/Frame 5.svg" alt="Поиск по сайту">
            </div>
        </label>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    const searchData = ref('');
    const opened = ref(false);
    const route = useRoute();

    const closeField = () => {
        const searchBlock = document.getElementById('search');
        opened.value = false;
        searchBlock.classList.add('search_close');
        setTimeout(()=>{ searchBlock.classList.remove('search_close'); }, 700);
    }

    const goSearch = async () => {        
        closeField();
        if (searchData.value) {
            await navigateTo({
                path: '/catalog',
                query: {
                    type: 'search',
                    sort: searchData.value
                }
            });
        }
    };

    const openField = () => {
        opened.value = true;
        function conditionalCloseField (event) {
            if (event.target.closest('.search') != document.getElementById('search') && opened.value) { 
                closeField();
                document.removeEventListener('click', conditionalCloseField);
            }
        }
        document.addEventListener('click', conditionalCloseField);
    }

    watch(() => route.fullPath, (older, newer) => {     
        if (!route.query.type || route.query.type !== 'search') {
            searchData.value = '';
        }
    })

    onMounted(() => {
        if (route.query.type && route.query.type === 'search') {
            searchData.value = route.query.sort;
        }
    })
</script>

<style lang="scss" scoped>
    .search {
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-radius: 12px;
        border: 1px solid $accent;
        background: rgba(255, 255, 255, 0.274);
        padding: 2px;

        &_close {
            width: 15%;
            animation: changeWidthOut 0.7s ease-in-out alternate;
        }

        &_open {
            width: 30%;
            animation: changeWidthIn 0.7s ease-in-out alternate;

            input {
                color: $main-light;
            }
        }

        @keyframes changeWidthIn {
            from { width: 15%; }
            to { width: 30%; }
        }

        @keyframes changeWidthOut {
            from { width: 30%; }
            to { width: 15%; }
        }


        &__input {
            width: 85%;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0);
            font-size: 14px;
            padding: 0.5em 0.6em 0.5em 0.3em;
            transition: 0.4s;

            &:focus {
                outline: none;
                cursor: default;
            }

            &::-webkit-search-cancel-button {
                filter: invert(1);
                cursor: pointer;
                transform: scale(1.2);

                &:hover {
                    transform: scale(1.8);
                }
            }

            @include media(1015px) {
                font-size: 10px;
            }
        }

        &__loop {
            width: 90%;
            cursor: pointer;
            transition: 0.3s;
            
            &:hover {
                opacity: 0.7;
                transform: scale(1.1);
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