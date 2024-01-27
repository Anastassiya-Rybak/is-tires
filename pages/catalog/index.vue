<template>
    <section class="catalog">
        <div class="catalog__filter-wrap container">
            <ButtonGreen :text="$t('layout.btns.filter')" class="catalog__filter-btn" @click="toggleFilter"/>
            <button class="catalog__cancel-btn" v-show="showCancelBtn" @click.prevent="resetSearch">{{ $t('layout.btns.reset', 1) }}</button>
            <div class="catalog__filter-content" v-show="filterOn">
                <div class="catalog__selects">
                    <TheFilterSelect v-for="(select, idx) in selects" :key="idx" :index="idx"
                    :aria-label="select.name" :name="select.name" :id="select.name + 'id'" class="filter-item"
                    :selectData="select"/>
                </div>
                <div class="catalog__filter-btns">
                    <ButtonGreen class="catalog__apply-btn" :text="$t('layout.btns.filter_go')" @click="getApply"/>
                    <button class="catalog__cancel-btn" @click.prevent="reset">{{ $t('layout.btns.reset', 2) }}</button>
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
            const localePath = useLocalePath();
            
            return {
                filterStore,
                searchStore,
                selectedRd, selectedType, selectedSize, selectedIdx, selectedTube,
                localePath
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
                selects: JSON.selects
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
                    path: this.localePath('/catalog'),
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