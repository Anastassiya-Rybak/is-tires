<template>
    <section class="catalog">
        <div class="catalog__filter-wrap container">
            <ButtonGreen text="ФИЛЬТРАЦИЯ" class="catalog__filter-btn" @click="toggleFilter"/>
            <ButtonGreen text="СБРОС ПОИСКА" class="catalog__cancel-btn" v-show="showCancelBtn" @click="resetSearch"/>
            <div class="catalog__filter-content" v-show="filterOn">
                <div class="catalog__selects">
                    <TheFilterSelect v-for="(select, idx) in selects" :key="idx"
                    :aria-label="select.name" :name="select.name" :id="select.name + 'id'" class="filter-item"
                    :selectData="select"/>
                </div>
                <div class="catalog__filter-btns">
                    <ButtonGreen text="ПРИМЕНИТЬ" @click="getApply"/>
                    <ButtonGreen text="СБРОСИТЬ ВСЕ" @click="reset"/>
                </div>
            </div>
        </div>
        <ClientOnly class="catalog__content">
            <div class="catalog__product-cards container" v-if="hasTriage">
                <ProductCard class="catalog__product-card" v-for="product in products" :key="product"
                :productName="product.name" />
            </div>
            <div class="catalog__product-cards container" v-else-if="notany">
                <p>Ксожалению, не найдено товара, подходящего под указанные критерии.</p>
            </div>
            <div class="catalog__product-cards container" v-else>
                <ProductCard class="catalog__product-card" v-for="product in productsSort" :key="product"
                :productName="product.name" />
            </div>
        </ClientOnly>
    </section>
</template>

<script>
    import ProductCard from '~/components/ProductCard.vue';
    import JSON from '~/server/bd.json';
    import { storeToRefs } from 'pinia';
    import { useFilterStore } from '~/stores/filter';
    import { useSearchStore } from '~/stores/search';

    export default {
        name: 'catalog',
        components: { ProductCard },
        setup(){
            const filterStore = useFilterStore();
            const searchStore = useSearchStore();
            const { selectedRd, selectedType, selectedIdx, selectedTube } = storeToRefs(filterStore);
            
            return {
                filterStore,
                searchStore,
                selectedRd, selectedType, selectedIdx, selectedTube 
            }
        },
        data() {
            return {
                searchItem: this.$route.query.sort,
                products: JSON.products,
                productsSort: [],
                filterOn: false,
                notany: false,
                visible: false,
                selects: [
                    {
                        name: "rd",
                        selectedLet: 0,
                        selectValue: "РАДИАЛЬНЫЕ/ДИАГОНАЛЬНЫЕ",
                        options: ["РАДИАЛЬНЫЕ/ДИАГОНАЛЬНЫЕ","РАДИАЛЬНЫЕ", "ДИАГОНАЛЬНЫЕ"]
                    },
                    {
                        name: "type",
                        selectedLet: 0,
                        selectValue: "ПРИМЕНИМОСТЬ",
                        options: ["ПРИМЕНИМОСТЬ","САМОСВАЛЫ С ЖЕСТКОЙ РАМОЙ", "ШАРНИРНО-СОЧЛЕНЕННЫЕ САМОСВАЛЫ", "ПОГРУЗЧИКИ И БУЛЬДОЗЕРЫ", "ГРЕЙДЕРЫ", "ПОДЗЕМНАЯ ТЕХНИКА", "МОБИЛЬНЫЕ КРАНЫ", "СКРЕПЕРЫ", "СПЕЦИАЛЬНАЯ И ПОРТОВАЯ ТЕХНИКА", "ТЕХНИКА ДЛЯ УСЛОВИЙ ПУСТЫНИ", "ДОРОЖНЫЕ КАТКИ"]
                    },
                    {
                        name: "idx",
                        selectedLet: 0,
                        selectValue: "ПРОЧНОСТЬ КАРКАСА",
                        options: ["ПРОЧНОСТЬ КАРКАСА","★★★","★★★RF","★★","★","★★RF","12PR","8","10","12","16","18","20","22","28","14PR","16PR","20PR","24PR","28PR","32PR","34PR","58PR","40PR","36PR","44PR"]
                    },
                    {
                        name: "tube",
                        selectedLet: 0,
                        selectValue: "КАМЕРА",
                        options: ["КАМЕРА","TT", "TL"]
                    }
                ]
            }
        },
        beforeMount() {
            this.$route.query.type === 'search' ? this.sortBeforePageLoad() : this.getFilter(1);
            this.checkSelects();
        },
        methods: {
            async resetSearch(){
                this.searchStore.editItem('');
                this.searchStore.saveState();
                await navigateTo({
                    path: '/catalog',
                    query: false
                });
                location.reload();
            },
            sortBeforePageLoad() {
                if (this.searchItem){
                    this.productsSort = [];
                    this.notany = false;
                    this.products.forEach((product) => {
                        let yes = false;
                        for (let productValue of Object.values(product)) {
                            if (typeof productValue === 'string' && productValue.toLowerCase().includes(this.searchItem.toLowerCase())) {
                                yes = true;
                            } else if (Array.isArray(productValue)) {
                                productValue.forEach((productValueItem) => {
                                    if (typeof productValueItem === 'string' && productValueItem.toLowerCase().includes(this.searchItem.toLowerCase())) {
                                        yes = true;
                                    }
                                    for( let i of Object.values(productValueItem)) {
                                        if (i.toLowerCase().includes(this.searchItem.toLowerCase())) {
                                            yes = true;
                                        }
                                    }
                                })
                            }
                        }
                        if (yes) this.productsSort.push(product);
                    })
                    if (this.productsSort.length === 0) this.notany = true;
                }
            },
            getApply (){
                this.toggleFilter();
                this.getFilter(0);
            },
            resetFilter(){
                this.reset();
                this.getFilter();
            },
            toggleFilter() {
                this.filterOn = !this.filterOn;
            },
            reset() {
                const selects = document.querySelectorAll('select');
                for (let i = 0; i < selects.length; i++) {
                    selects[i].selectedIndex = 0;
                }
                this.filterStore.resetFilter();
            },
            getFilter(w) {
                this.productsSort = [];
                this.notany = false;
                let needsArr = [];
                const updatedQuery = { ...this.$route.query };
                if (updatedQuery.type !== 'filter' || w === 0) {
                    updatedQuery.type = 'filter';
                    updatedQuery.sort = `${this.selectedRd ? this.selectedRd : 'null'}+${this.selectedType ? this.selectedType : 'null'}+${this.selectedIdx ? this.selectedIdx : 'null'}+${this.selectedTube ? this.selectedTube : 'null'}`;
                    needsArr = [this.selectedRd, this.selectedType, this.selectedIdx, this.selectedTube].filter((n) => n !== '');
                } else if (updatedQuery.type === 'filter') {
                    needsArr = updatedQuery.sort.split('+').filter((n) => n !== 'null');
                }
                if (needsArr.length !== 0) {
                    this.products.forEach((product) => {
                        let have = Object.values(product);
                        if (product.var) {
                            product.var.forEach((productVar) => {
                                const varframes = productVar.idx_frame.split(",");
                                have = have.concat(varframes);
                                have = have.concat(Object.values(productVar));
                            })
                        }
                        if (product.idx_frame) {
                            const frames = product.idx_frame.split(",");
                            have = have.concat(frames);
                        }
                        if (needsArr.every(i => have.includes(i))) {
                            this.productsSort.push(product);
                        }
                    })
                    if (this.productsSort.length === 0) this.notany = true;
                    this.$router.push({ query: updatedQuery });
                } else { this.$router.push({ query: '' }); }
            },
            checkSelects(){
                const filterQuery = { ...this.$route.query };
                if (filterQuery.type === 'filter') {
                    filterQuery.sort.split('+').forEach((el, idx) => {
                        this.selects[idx].selectedLet = (el === 'null') ? 0 : this.selects[idx].options.findIndex(n => n === el);
                    })
                }
            }
            
        },
        computed: {
            hasTriage(){
                return this.productsSort.length === 0 && !this.notany ? true : false;
            },
            showCancelBtn(){
                return this.searchItem && this.$route.query.type === 'search' ? true : false;
            }
        },
    }



    // ПОПЫТКА НАПИСАНИЯ НА COMPOSITION API

    // import JSON from '~/server/bd.json';
    // import { ref, onBeforeMount } from 'vue';
    // import { storeToRefs } from 'pinia';
    // import { useSearchStore } from '~/stores/search';

    // const selects = [
    //     {
    //         name: "rd",
    //         selectedLet: "selectedRd",
    //         value: "РАДИАЛЬНЫЕ/ДИАГОНАЛЬНЫЕ",
    //         options: ["РАДИАЛЬНЫЕ", "ДИАГОНАЛЬНЫЕ"]
    //     },
    //     {
    //         name: "type",
    //         selectedLet: "selectedType",
    //         value: "ПРИМЕНИМОСТЬ",
    //         options: ["САМОСВАЛЫ С ЖЕСТКОЙ РАМОЙ", "ШАРНИРНО-СОЧЛЕНЕННЫЕ САМОСВАЛЫ", "ПОГРУЗЧИКИ И БУЛЬДОЗЕРЫ", "ГРЕЙДЕРЫ", "ПОДЗЕМНАЯ ТЕХНИКА", "МОБИЛЬНЫЕ КРАНЫ", "СКРЕПЕРЫ", "СПЕЦИАЛЬНАЯ И ПОРТОВАЯ ТЕХНИКА", "ТЕХНИКА ДЛЯ УСЛОВИЙ ПУСТЫНИ", "ДОРОЖНЫЕ КАТКИ"]
    //     },
    //     {
    //         name: "idx",
    //         selectedLet: "selectedIdx",
    //         value: "ПРОЧНОСТЬ КАРКАСА",
    //         options: ["★★★","★★★RF","★★","★","★★RF","12PR","8","10","12","16","18","20","22","28","14PR","16PR","20PR","24PR","28PR","32PR","34PR","58PR","40PR","36PR","44PR"]
    //     },
    //     {
    //         name: "tube",
    //         selectedLet: "selectedTube",
    //         value: "КАМЕРА",
    //         options: ["TT", "TL"]
    //     }
    // ]

    // const products = JSON.products;
    // const productsSort = ref([]);
    // const filterOn = ref(false);
    // const notany = ref(false);

    // const searchStore = useSearchStore();
    // // const { inpData } = storeToRefs(searchStore);
    // const inpData = searchStore.inpData;

    // onBeforeMount(() => {
    //     searchStore.restoreState();
    //     sortBeforePageLoad();
    // })

    // const sortBeforePageLoad = () => {

    //     if (inpData){
    //         console.log(inpData);
    //         productsSort.value = [];
    //         notany.value = false;
    //         products.forEach((product) => {
    //             let yes = false;
    //             for (let productValue of Object.values(product)) {
    //                 if (typeof productValue === 'string' && productValue.toLowerCase().includes(inpData.toLowerCase())) {
    //                     yes = true;
    //                 } else if (Array.isArray(productValue)) {
    //                     productValue.forEach((productValueItem) => {
    //                         if (typeof productValueItem === 'string' && productValueItem.toLowerCase().includes(inpData.toLowerCase())) {
    //                             yes = true;
    //                         }
    //                         for( let i of Object.values(productValueItem)) {
    //                             if (i.toLowerCase().includes(inpData.toLowerCase())) {
    //                                 yes = true;
    //                             }
    //                         }
    //                     })
    //                 }
    //             }
    //             if (yes) productsSort.value.push(product);
    //         })
    //         if (productsSort.value.length === 0) notany.value = true;
    //         $route.query.param = '';
    //     }
    // }
    // const toggleFilter = () => {
    //     filterOn.value = !filterOn.value;
    // }
    // const reset = () => {
    //     const selects = document.querySelectorAll('select');
    //     for (let i = 0; i < selects.length; i++) {
    //         selects[i].selectedIndex = 0;
    //     }
    // }
    // const getFilter = () => {
    //     const selects = document.querySelectorAll('select');
    //     productsSort.value = [];
    //     notany.value = false;

    //     const needs = {
    //         "rd": '',
    //         "type": '',
    //         "idx_frame": '',
    //         "tube": ''
    //     }
    //     for (let i = 0; i < selects.length; i++) {
    //         const value = selects[i].options[selects[i].selectedIndex].value;
    //         switch (i) {
    //             case 0:
    //                 if ( selects[i].selectedIndex !== 0 ) needs.rd = value;
    //                 break;
    //             case 1:
    //                 if ( selects[i].selectedIndex !== 0 ) needs.type = value;
    //                 break;
    //             case 2:
    //                 if ( selects[i].selectedIndex !== 0 ) needs.idx_frame = value;
    //                 break;
    //             case 3:
    //                 if ( selects[i].selectedIndex !== 0 ) needs.tube = value;
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    //     const needsArr = Object.values(needs).filter((n) => n !== '');
    //     if (needsArr.length !== 0) {
    //         products.forEach((product) => {
    //             let have = Object.values(product);
    //             if (product.var) {
    //                 product.var.forEach((productVar) => {
    //                     const varframes = productVar.idx_frame.split(",");
    //                     have = have.concat(varframes);
    //                     have = have.concat(Object.values(productVar));
    //                 })
    //             }
    //             if (product.idx_frame) {
    //                 const frames = product.idx_frame.split(",");
    //                 have = have.concat(frames);
    //             }
    //             if (needsArr.every(i => have.includes(i))) {
    //                 productsSort.value.push(product);
    //             }
    //         })
    //         if (productsSort.value.length === 0) notany.value = true;
    //     }
    // }

    // const getApply =  () => {
    //     openFilter();
    //     getFilter();
    // }
</script>

<style lang="scss" scoped>
    .catalog {
        background-color: #f1f1f1;
        padding: 12vh 0 5vh;

        @include media(690px) {
            padding: 10vh 0 5vh;
        }

        @include media(480px) {
            padding: 7vh 0 3vh;
        }

        &__filter-btn,
        &__cancel-btn {
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
            background-color: $main-dark;
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
            gap: 20px;

            button {
                padding: 0.7em;
                font-size: 14px;

                @include media(1100px) {
                    font-size: 12px;
                }

                &:last-child {
                    background-color: $main-dark;
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