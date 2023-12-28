<template>
    <section class="catalog-wrap">
        <div class="catalg-filter container">
            <ButtonGreen text="ФИЛЬТРАЦИЯ" class="filter-btn" @click="toggleFilter"/>
            <div class="filter-content" v-show="filterOn">
                <div class="selects">
                    <TheFilterSelect v-for="(select, idx) in selects" :key="idx"
                    :aria-label="select.name" :name="select.name" :id="select.name + 'id'" class="filter-item"
                    :selectData="select"/>
                </div>
                <div class="filter-btns-group">
                    <ButtonGreen text="ПРИМЕНИТЬ" @click="getApply"/>
                    <ButtonGreen text="СБРОСИТЬ ВСЕ" @click="reset"/>
                </div>
            </div>
        </div>
        <client-only>
            <div class="product-cards container" v-if="productsSort.length === 0 && !notany">
                <ProductCard class="product-card-catalog" v-for="product in products" :key="product"
                :productName="product.name" />
            </div>
            <div class="product-cards container" v-else-if="notany">
                <p>Ксожалению, не найдено товара, подходящего под указанные критерии.</p>
            </div>
            <div class="product-cards container" v-else>
                <ProductCard class="product-card-catalog" v-for="product in productsSort" :key="product"
                :productName="product.name" />
            </div>
        </client-only>
    </section>
</template>

<script>
    import ProductCard from '~/components/ProductCard.vue';
    import JSON from '~/server/bd.json';
    import { storeToRefs } from 'pinia';
    import { useSearchStore } from '~/stores/search';
    import { useFilterStore } from '~/stores/filter';

    export default {
        name: 'catalog',
        components: { ProductCard },
        setup(){
            const searchStore = useSearchStore();
            const filterStore = useFilterStore();

            const { inpData } = storeToRefs(searchStore);

            const { selectedRd, selectedType, selectedIdx, selectedTube } = storeToRefs(filterStore);
            
            return {
                searchStore,
                filterStore,
                searchItem: inpData,
                selectedRd, selectedType, selectedIdx, selectedTube 
            }
        },
        data() {
            return {
                products: JSON.products,
                productsSort: [],
                filterOn: false,
                notany: false,
                visible: false,
                selects: [
                    {
                        name: "rd",
                        selectedLet: "selectedRd",
                        selectValue: "РАДИАЛЬНЫЕ/ДИАГОНАЛЬНЫЕ",
                        options: ["РАДИАЛЬНЫЕ", "ДИАГОНАЛЬНЫЕ"]
                    },
                    {
                        name: "type",
                        selectedLet: "selectedType",
                        selectValue: "ПРИМЕНИМОСТЬ",
                        options: ["САМОСВАЛЫ С ЖЕСТКОЙ РАМОЙ", "ШАРНИРНО-СОЧЛЕНЕННЫЕ САМОСВАЛЫ", "ПОГРУЗЧИКИ И БУЛЬДОЗЕРЫ", "ГРЕЙДЕРЫ", "ПОДЗЕМНАЯ ТЕХНИКА", "МОБИЛЬНЫЕ КРАНЫ", "СКРЕПЕРЫ", "СПЕЦИАЛЬНАЯ И ПОРТОВАЯ ТЕХНИКА", "ТЕХНИКА ДЛЯ УСЛОВИЙ ПУСТЫНИ", "ДОРОЖНЫЕ КАТКИ"]
                    },
                    {
                        name: "idx",
                        selectedLet: "selectedIdx",
                        selectValue: "ПРОЧНОСТЬ КАРКАСА",
                        options: ["★★★","★★★RF","★★","★","★★RF","12PR","8","10","12","16","18","20","22","28","14PR","16PR","20PR","24PR","28PR","32PR","34PR","58PR","40PR","36PR","44PR"]
                    },
                    {
                        name: "tube",
                        selectedLet: "selectedTube",
                        selectValue: "КАМЕРА",
                        options: ["TT", "TL"]
                    }
                ]
            }
        },
        beforeCreate() {
            if (process.client) this.searchStore.restoreState();
        },
        beforeMount() {
            this.sortBeforePageLoad();
        },
        methods: {
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
                    this.$route.query.param = '';
                }
            },
            getApply (){
                this.toggleFilter();
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
                this.filterStore.editItem('rd', '');
                this.filterStore.editItem('tube', '');
                this.filterStore.editItem('type', '');
                this.filterStore.editItem('idx', '');
            },
            getFilter() {
                this.productsSort = [];
                this.notany = false;

                const needsArr = [this.selectedRd, this.selectedType, this.selectedIdx, this.selectedTube].filter((n) => n !== '');
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
                }
            }
            
        }
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

<style scoped>
    .catalog-wrap {
        background-color: #f1f1f1;
        padding: 50px 0;
    }
    .filter-btn {
        font-size: 20px;
        border-radius: 0.8em;
        font-weight: 900;
        letter-spacing: 1px;
        padding: 7px 40px 7px 10px;
    }

    button:hover {
        filter: brightness(90%);
    }

    button:active {
        transform: scale(0.98, 0.98);
    }

    .selects {
        padding: 30px 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
    }

    .filter-item {
        border-radius: 5px;
        border: 1px solid #00BA61;
        background: rgba(255, 255, 255, 0.473);
        background-image: url('~/assets/back/select.svg');
        background-repeat: no-repeat;
        background-position: bottom 50% right 7px;
        box-shadow: 0px 0.3em 0.3em 0px rgba(0, 0, 0, 0.25);
        font-size: 16px;
        padding: 10px 30px 10px 10px;
        appearance: none;
        position: relative;
        cursor: pointer;
        transition: 0.3s;
    }

    .filter-btns-group {
        display: flex;
        gap: 20px;
    }

    .filter-btns-group button {
        padding: 0.7em;
        font-size: 14px;
    }

    .filter-btns-group button:last-child {
        background-color: black;
    }

    .product-cards {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        row-gap: 3dvh;
        margin-top: 3dvh;
    }

    .product-card-catalog {
        width: calc(25% - 2%);
    }

    @media (max-width: 1240px) {
        .selects {
            padding: 2dvh 0;
            justify-content:flex-start;
        }

        .filter-item {
            font-size: 12px;
        }
    }

    @media (max-width: 1000px) {
        .selects {
            flex-wrap: wrap;
        }

        .filter-item {
            max-width: 294px;
        }
    }

    @media (max-width: 847px) {
        .filter-btn,
        .filter-btns-group button {
            font-size: 16px;
        }

        .catalog-wrap {
            padding: 80px 0 50px;
        }
    }

    @media (max-width: 670px) {
        .product-card-catalog {
            width: 46%;
        }
    }

    @media (max-width: 540px) {
        .filter-btn,
        .filter-btns-group button {
            font-size: 12px;
        }

        .filter-item {
            font-size: 10px;
        }
    }

    @media (max-width: 360px) {
        .filter-btn,
        .filter-btns-group button {
            font-size: 10px;
        }

        .product-card-catalog {
            width: 48%;
        }
    }

</style>