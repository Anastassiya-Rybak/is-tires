<template>
    <section class="catalog">
        <div class="catalog__filter-wrap container">
            <TheButton colour="green" class="catalog__filter-btn" :text="$t('layout.btns.filter')" @click="toggleFilter"/>
            <TheButton v-if="showResetSerchBtn" :text="$t('layout.btns.reset', 1)" colour="black" @click.prevent="resetSearch" />
            <div class="catalog__filter-content" v-show="filterOn">
                <div class="catalog__selects">
                    <TheFilterSelect v-for="(select, idx) in selects" :key="idx" :index="idx"
                    :aria-label="select.name" :name="select.name" :id="select.name + 'id'" class="filter-item"
                    :selectData="select" :save="isSave"/>
                </div>
                <div class="catalog__filter-btns">
                    <TheButton class="catalog__apply-btn" :text="$t('layout.btns.filter_go')" colour="green" @click="getApply"/>
                    <TheButton :text="$t('layout.btns.reset', 2)" colour="black" @click.prevent="reset" />
                </div> 
            </div>
        </div>
        <ClientOnly class="catalog__content">
            <!-- TODO: обработать case с отсутстыием продукции. -->
            <div class="catalog__product-cards container" v-if="nothing">
                <p>К сожалению, не найдено продукции, подходящей под указанные критерии.</p>
            </div>
            <div class="catalog__product-cards container" v-else>
                <ProductCard class="catalog__product-card" v-for="product in sortedProducts" :key="product"
                :productData="product" />
            </div>
        </ClientOnly>
    </section>
</template>

<script setup>
    import { useFilterStore } from '~/stores/filter';
    import { useSearchStore } from '~/stores/search';
    import { useRoute, useRouter } from 'vue-router';
    import JSON from '~/server/bd.json';
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';

    const route = useRoute();
    const router = useRouter();
    const filterStore = useFilterStore();
    const searchStore = useSearchStore();
    const { selectedRd, selectedType, selectedSize, selectedIdx, selectedTube } = storeToRefs(filterStore);
    const filterCombo = [selectedRd, selectedType, selectedSize, selectedIdx, selectedTube];
    const isSave = ref(false);
    const props = defineProps({
        searchItem: {
            type: String || undefined,
        }
    })

    const products = JSON.products;
    const sortedProducts = ref(products);
    const filterOn = ref(false);
    const nothing = ref(false);
    const selects = JSON.selects;

    const showResetSerchBtn = ref(false);

    const resetSearch = async() => {
        sortedProducts.value = products;
        showResetSerchBtn.value = false;

        await navigateTo({
            path: '/catalog'
        });
    }

    const openObject = (obj) => {
        const firstDoor = Object.values(obj).flat();

        const secondDoor = firstDoor.filter(prop => typeof prop === 'object').map(prop => {
            Object.values(prop)
        }).flat();

        const result = firstDoor.filter(n => typeof n !== 'object').concat(secondDoor).join();

        return result;
    }

    const saveParams = () => {

    }

    const getFilter = (item) => {
        const sortedItems = [];

        // const currentParameters = filterCombo.map(filter => {
        //     (filter && !selects.some(obj => { obj.options[0] == filter })) ? filter : 'null'
        // });

        let needsArr = [];

        // const updatedQuery = { ...route.query };
        // if ( updatedQuery.sort.split('+') !== currentParameters ) {
        //     updatedQuery.type = 'filter';
        //     updatedQuery.sort = currentParameters.join('+');
        // }
        
        needsArr = item.split('+').filter((n) => n !== 'null');

        // needsArr = currentParameters.filter((n) => n !== 'null');
        
        if ( needsArr.length !== 0 ) {
            needsArr.forEach(need => { sortedItems.concat(sortProducts(need)); })
        }
        // router.push({ query: updatedQuery });
        return sortedItems;
    }

    const sortProducts = (item) => {
        const sortedItem = [];

        products.forEach((product) => {  
            const valueMerger = openObject(product);
            if (valueMerger.toLowerCase().includes(item.toLowerCase())) { 
                sortedItem.push(product); 
            } else if (route.query.type !== 'search') { sortedItem.length = 0; }
        });
        
        return sortedItem
    }

    const toggleFilter = () => {
        filterOn.value = !filterOn.value;
    }

    const reset = () => {
        const selectElements = document.querySelectorAll('select');
        
        for (let i = 0; i < selectElements.length; i++) {
            selects[i].selectedIndex = 0;
        }
        filterStore.resetFilter();
    }

    const resetFilter = () => {
        reset();
        getFilter();
    }

    const getApply = () => {
        toggleFilter();
        getFilter();
    }

    onBeforeMount(()=>{
        if (route.query.sort) {  
            route.query.type === 'search' 
            ? sortedProducts.value = sortProducts(route.query.sort) 
            : sortedProducts.value = getFilter(route.query.sort);
        }        
    })

    watch(() => sortedProducts.value, (oldState, newState)=>{ 
        (newState.length === 0 && route.query.sort) ? nothing.value = true : nothing.value = false;
    })

    watch(() => route.fullPath,(older, newer) => {     
        if (route.query.type && route.query.type === 'search') {
            sortedProducts.value = sortProducts(route.query.sort);
            showResetSerchBtn.value = true;
        } else if (route.query.type) {
            sortedProducts.value = getFilter(route.query.sort);            
        }
    })

</script>

<style lang="scss" scoped>
    .catalog {
        background-color: #f1f1f1;
        padding: 14vh 0 5vh;

        @include media(690px) {
            padding: 10vh 0 5vh;
        }

        @include media(480px) {
            padding: 7vh 0 3vh;
        }

        &__filter-btn {
            font-size: 20px;
            font-weight: 900;
            padding: 0.5em 1em;

            @include media(1100px) {
                font-size: 16px;
            }

            &:hover {
                filter: brightness(90%);
            }
            
            &:active {
                transform: scale(0.98, 0.98);
            }
        }

        &__cancel-btn {
            margin-left: 2vw;
            color: $main-dark;
            font-size: 20px;
            font-weight: 900;
            padding: 0.5em 1em;
            border: 0.1px solid $main-dark; 
            border-radius: 10px;
            cursor: pointer;
            transition: 0.3s;

            @include hover(){
                opacity: 0.7;
            }
        }

        &__selects {
            padding: 30px 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 20px;

            @include media(1100px) {
                padding: 2vh 0;
                flex-wrap: wrap;
            }
        }

        &__filter-btns {
            display: flex;

            button {
                padding: 0.7em;
                font-size: 14px;

                @include media(1100px) {
                    font-size: 12px;
                }
            }
        }

        &__product-cards {
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            row-gap: 3dvh;
            margin-top: 3dvh;

            @include media(1240px) {
                row-gap: 2dvh;
                margin-top: 2dvh;
            }
        }

        &__product-card {
            width: calc(25% - 2%);

            @include media(1240px) {
                width: calc(25% - 1%);
            }

            @include media(990px) {
                width: calc(33% - 1%);
            }

            @include media(550px) {
                width: calc(50% - 2%);
            }
        }
    }
</style>