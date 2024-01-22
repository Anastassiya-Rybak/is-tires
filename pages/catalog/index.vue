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
                :productData="product" />
            </div>
            <div class="catalog__product-cards container" v-else-if="notany">
                <p>Ксожалению, не найдено товара, подходящего под указанные критерии.</p>
            </div>
            <div class="catalog__product-cards container" v-else>
                <ProductCard class="catalog__product-card" v-for="product in productsSort" :key="product"
                :productData="product" />
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
            this.$route.query.type === 'search' ? this.sortBeforePageLoad() : this.getFilter();
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
            toSortOfProducts(item){
                const openObjects = (obj) => {
                    let result = Object.values(obj).flat();

                    result.forEach((el, idx) => {
                        if (idx === 0) result = result.with(0, "");
                        if (Object.hasOwn(el, "size")) {
                            result = result.with(idx, Object.values(el));
                        }
                    })
                    return result;
                }

                this.products.forEach((product) => {
                    const fullInOne = openObjects(product).flat();
                    if (fullInOne.some(n => n.toLowerCase().includes(item.toLowerCase()))) { this.productsSort.push(product); }
                })
            },
            sortBeforePageLoad() {
                if (this.searchItem) {
                    this.productsSort=[];
                    this.notany=false;
                    this.toSortOfProducts(this.searchItem);
                    if (this.productsSort.length === 0) this.notany = true;
                }
            },
            getApply (){
                this.toggleFilter();
                this.getFilter();
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
            getFilter() {
                this.productsSort = [];
                this.notany = false;
                const currentParameters = `${this.selectedRd ? this.selectedRd : 'null'}+${this.selectedType ? this.selectedType : 'null'}+${this.selectedIdx ? this.selectedIdx : 'null'}+${this.selectedTube ? this.selectedTube : 'null'}`;
                let needsArr = [];
                const updatedQuery = { ...this.$route.query };
                if ( updatedQuery.sort !== currentParameters ) { // Если параметры фильтрации еще не записаны в query, то надо их записать.
                    updatedQuery.type = 'filter';
                    updatedQuery.sort = currentParameters;
                }
                needsArr = currentParameters.split('+').filter((n) => n !== 'null');
                
                if (needsArr.length !== 0) { // Если критерии фильтрации присутствуют, то фильтруем.
                    for (let i = 0; i < needsArr.length; i++) {
                        this.toSortOfProducts(needsArr[i]); 
                    }
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