<template>
    <section class="catalog">
        <div class="catalog__filter-wrap container">
            <ButtonGreen text="ФИЛЬТРАЦИЯ" class="catalog__filter-btn" @click="toggleFilter"/>
            <button class="catalog__cancel-btn" v-show="showCancelBtn" @click.prevent="resetSearch">СБРОС ПОИСКА</button>
            <div class="catalog__filter-content" v-show="filterOn">
                <div class="catalog__selects">
                    <TheFilterSelect v-for="(select, idx) in selects" :key="idx"
                    :aria-label="select.name" :name="select.name" :id="select.name + 'id'" class="filter-item"
                    :selectData="select"/>
                </div>
                <div class="catalog__filter-btns">
                    <ButtonGreen class="catalog__apply-btn" text="ПРИМЕНИТЬ" @click="getApply"/>
                    <button class="catalog__cancel-btn" @click.prevent="reset">СБРОСИТЬ ПАРАМЕТРЫ</button>
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
            const { selectedRd, selectedType, selectedSize, selectedIdx, selectedTube } = storeToRefs(filterStore);
            
            return {
                filterStore,
                searchStore,
                selectedRd, selectedType, selectedSize, selectedIdx, selectedTube 
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
                        name: "size",
                        selectedLet: 0,
                        selectValue: "РАЗМЕР",
                        options: ["РАЗМЕР", "46/90R57", "33.00R51", "27.00R49","53/80R63","50/80R57","14.00R25","13.00R25(10.00 Rim)","13.00R25(8.50 Rim)","18.00R25","16.00R25","18.00R33","24.00R35","21.00R35","21.00R33","36.00R51","40.00R57","37.00R57","17.5R25","20.5R25","29.5R29","750/65R25","875/65R29","33.25R29","775/65R29","23.5R25","26.5R25","29.5R25","35/65R33","14.00R24","385/95R24 (14.00R24)","385/95R25(14.00R25)","525/80R25(20.5R25)","385/95R25 (14.00R25)","445/95R25 (16.00R25)","505/95R25 (18.00R25)","15.5-25","16/70-20","14.00-24","17.5-25","20.5-25","23.5-25","26.5-25","29.5-25","29.5-29","45/65-45","14.00-24TG","18.00-25","24-21","66×43.00-25","66×44.00-25","18-20","27.25-21","21.00-25","11.00-20","13/80-20","23.1-26","13.00-25","14.00-25","16.00-25","12.00-24"]
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
            openObjects(obj){
                let result = Object.values(obj).flat();

                result.forEach((el, idx) => {
                    if (idx === 0) result = result.with(0, "");
                    if (Object.hasOwn(el, "size")) {
                        result = result.with(idx, Object.values(el));
                    }
                })
                return result;
            },
            toSortOfProducts(item){
                this.products.forEach((product) => {
                    const fullInOne = this.openObjects(product).flat();
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
                const currentParameters = `${(this.selectedRd && this.selectedRd !== "РАДИАЛЬНЫЕ/ДИАГОНАЛЬНЫЕ") ? this.selectedRd : 'null'}+${(this.selectedType && this.selectedType !== "ПРИМЕНИМОСТЬ") ? this.selectedType : 'null'}+${(this.selectedSize && this.selectedSize !== "РАЗМЕР") ? this.selectedSize : 'null'}+${(this.selectedIdx && this.selectedIdx !== "ПРОЧНОСТЬ КАРКАСА") ? this.selectedIdx : 'null'}+${(this.selectedTube && this.selectedTube !== "КАМЕРА") ? this.selectedTube : 'null'}`;
                let needsArr = [];
                const updatedQuery = { ...this.$route.query };
                if ( updatedQuery.sort !== currentParameters ) { // Если параметры фильтрации еще не записаны в query, то надо их записать.
                    updatedQuery.type = 'filter';
                    updatedQuery.sort = currentParameters;
                }
                needsArr = currentParameters.split('+').filter((n) => n !== 'null');

                const toFilterOfProducts = (arr) => { // Выясняем соответсвуют ли эти продукты и всем остальным параметрам запроса.
                    const resultArr = [];
                    for (let i = 1; i < needsArr.length; i++) {
                        arr.forEach((product) => {
                            const fullInOne = this.openObjects(product).flat();
                            if (fullInOne.some(n => n.toLowerCase().includes(needsArr[i].toLowerCase()))) { resultArr.push(product); }
                        })
                        if (resultArr.length === 0) {
                            return [resultArr, true];
                        } else if (needsArr.length >= 2) { 
                            needsArr.shift();
                            toFilterOfProducts(resultArr);
                        }
                    }
                    return [resultArr, false]
                }
                
                if (needsArr.length !== 0 && needsArr.length >= 2) { // Если критерии фильтрации присутствуют, то фильтруем.
                    this.toSortOfProducts(needsArr[0]);
                    if (this.productsSort.length !== 0) {
                        let filterResult = toFilterOfProducts(this.productsSort)
                        this.notany = filterResult[1];
                        this.productsSort = filterResult[0];
                    } else { this.notany = true; }
                    this.$router.push({ query: updatedQuery });
                } else if (needsArr.length === 1) {
                    this.toSortOfProducts(needsArr[0]);
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