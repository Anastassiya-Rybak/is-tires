<template>
    <section class="catalog-wrap">
        <div class="catalg-filter content">
            <ButtonGreen text="ФИЛЬТРАЦИЯ" class="filter-btn" @click="openFilter"/>
            <div class="filter-content" v-show="filterOn">
                <div class="selects">
                    <select aria-label="RADIAL-or-DIAGONAL" name="rd" id="rd" class="filter-item">
                        <option class="default-option" selected value="РАДИАЛЬНЫЕ/ДИАГОНАЛЬНЫЕ">РАДИАЛЬНЫЕ/ДИАГОНАЛЬНЫЕ</option>
                        <option value="РАДИАЛЬНЫЕ">РАДИАЛЬНЫЕ</option>
                        <option value="ДИАГОНАЛЬНЫЕ">ДИАГОНАЛЬНЫЕ</option>
                    </select>
                    <select aria-label="APPLICABILITY" name="type" id="type" class="filter-item">
                        <option class="default-option" selected value="ПРИМЕНИМОСТЬ">ПРИМЕНИМОСТЬ</option>
                        <option value="САМОСВАЛЫ С ЖЕСТКОЙ РАМОЙ">САМОСВАЛЫ С ЖЕСТКОЙ РАМОЙ</option>
                        <option value="ШАРНИРНО-СОЧЛЕНЕННЫЕ САМОСВАЛЫ">ШАРНИРНО-СОЧЛЕНЕННЫЕ САМОСВАЛЫ</option>
                        <option value="ПОГРУЗЧИКИ И БУЛЬДОЗЕРЫ">ПОГРУЗЧИКИ И БУЛЬДОЗЕРЫ</option>
                        <option value="ГРЕЙДЕРЫ">ГРЕЙДЕРЫ</option>
                        <option value="ПОДЗЕМНАЯ ТЕХНИКА">ПОДЗЕМНАЯ ТЕХНИКА</option>
                        <option value="МОБИЛЬНЫЕ КРАНЫ">МОБИЛЬНЫЕ КРАНЫ</option>
                        <option value="СКРЕПЕРЫ">СКРЕПЕРЫ</option>
                        <option value="СПЕЦИАЛЬНАЯ И ПОРТОВАЯ ТЕХНИКА">СПЕЦИАЛЬНАЯ И ПОРТОВАЯ ТЕХНИКА</option>
                        <option value="ТЕХНИКА ДЛЯ УСЛОВИЙ ПУСТЫНИ">ТЕХНИКА ДЛЯ УСЛОВИЙ ПУСТЫНИ</option>
                        <option value="ДОРОЖНЫЕ КАТКИ">ДОРОЖНЫЕ КАТКИ</option>
                    </select>
                    <select aria-label="frame-index" name="idx" id="idx_frame" class="filter-item">
                        <option class="default-option" selected value="ПРОЧНОСТЬ КАРКАСА">ПРОЧНОСТЬ КАРКАСА</option>
                        <option value="★★★">★★★</option>
                        <option value="★★★RF">★★★RF</option>
                        <option value="★★">★★</option>
                        <option value="★">★</option>
                        <option value="★★RF">★★RF</option>
                        <option value="12PR">12PR</option>
                        <option value="8"></option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                        <option value="22">22</option>
                        <option value="28">28</option>
                        <option value="14PR">14PR</option>
                        <option value="16PR">16PR</option>
                        <option value="20PR">20PR</option>
                        <option value="24PR">24PR</option>
                        <option value="28PR">28PR</option>
                        <option value="32PR">32PR</option>
                        <option value="34PR">34PR</option>
                        <option value="58PR">58PR</option>
                        <option value="40PR">40PR</option>
                        <option value="36PR">36PR</option>
                        <option value="44PR">44PR</option>
                    </select>
                    <select aria-label="tube" name="tube" id="tube" class="filter-item">
                        <option class="default-option" selected value="КАМЕРА">КАМЕРА</option>
                        <option value="TT">TT</option>
                        <option value="TL">TL</option>
                    </select>
                </div>
                <div class="filter-btns-group">
                    <ButtonGreen text="ПРИМЕНИТЬ" @click="getApply"/>
                    <ButtonGreen text="СБРОСИТЬ ВСЕ" @click="reset"/>
                </div>
            </div>
        </div>
        <div class="product-cards content" v-if="productsSort.length === 0 && !notany">
            <ProductCard class="product-card-catalog" v-for="product in products" :key="product"
            :productName="product.name" />
        </div>
        <div class="product-cards content" v-else-if="notany">
            <p>Ксожалению, не найдено товара, подходящего под указанные критерии.</p>
        </div>
        <div class="product-cards content" v-else>
            <ProductCard class="product-card-catalog" v-for="product in productsSort" :key="product"
            :productName="product.name" />
        </div>
    </section>
</template>

<script>
    import ProductCard from '~/components/ProductCard.vue';
    import JSON from '~/static/bd.json'

    export default {
        name: 'catalog',
        components: { ProductCard },
        data() {
            return {
                products: JSON.products,
                productsSort: [],
                search: this.$route.query.param,
                filterOn: false,
                notany: false,
                visible: false,
            }
        },
        beforeMount() {
            this.sortBeforePageLoad();
        },
        methods: {
            sortBeforePageLoad() {
                if (this.search){
                    this.productsSort = [];
                    this.notany = false;
                    this.products.forEach((product) => {
                        let yes = false;
                        for (let productValue of Object.values(product)) {
                            if (typeof productValue === 'string' && productValue.toLowerCase().includes(this.search.toLowerCase())) {
                                yes = true;
                            } else if (Array.isArray(productValue)) {
                                productValue.forEach((productValueItem) => {
                                    if (typeof productValueItem === 'string' && productValueItem.toLowerCase().includes(this.search.toLowerCase())) {
                                        yes = true;
                                    }
                                    for( let i of Object.values(productValueItem)) {
                                        if (i.toLowerCase().includes(this.search.toLowerCase())) {
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
                this.openFilter();
                this.getFilter();
            },
            openFilter() {
                this.filterOn ? this.filterOn = false : this.filterOn = true;
            },
            reset() {
                const selects = document.querySelectorAll('select');
                for (let i = 0; i < selects.length; i++) {
                    selects[i].selectedIndex = 0;
                }
            },
            getFilter() {
                const selects = document.querySelectorAll('select');
                this.productsSort = [];
                this.notany = false;
                const needs = {
                    "rd": '',
                    "type": '',
                    "idx_frame": '',
                    "tube": ''
                }
                for (let i = 0; i < selects.length; i++) {
                    const value = selects[i].options[selects[i].selectedIndex].value;
                    switch (i) {
                        case 0:
                            if ( selects[i].selectedIndex !== 0 ) needs.rd = value;
                            break;
                        case 1:
                            if ( selects[i].selectedIndex !== 0 ) needs.type = value;
                            break;
                        case 2:
                            if ( selects[i].selectedIndex !== 0 ) needs.idx_frame = value;
                            break;
                        case 3:
                            if ( selects[i].selectedIndex !== 0 ) needs.tube = value;
                            break;
                        default:
                            break;
                    }
                }
                const needsArr = Object.values(needs).filter((n) => n !== '');
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
        justify-content: space-between;
        flex-wrap: wrap;
        row-gap: 3dvh;
        margin-top: 3dvh;
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