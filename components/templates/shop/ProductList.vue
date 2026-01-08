<template>
    <div class="dj-shopping">
        <div class="d-flex align-center selected-facets">
            <div v-for="(facet, index) in facets" :key="'facet' + index" class="facet-selected d-flex align-center">
                <div class="position-relative">
                    {{ facet }}
                </div>
                <button type="button" class="remove-facet-button" @click="removeFacet(facet)" />
            </div>
            <button v-if="facets.length" type="reset" class="remove-all-facets-button" @click="removeAllFacets()">
                {{ $t('shop.filters.reset') }}
            </button>
        </div>
        <div class="dj-shopping__header">
            <p>
                <span v-if="searchWord" class="text">
                    <strong> {{ totalElements }} </strong>
                    {{ totalElements > 1 ? $t('shop.productFoundPlur') : $t('shop.productFoundSing') }}
                    {{ $t('shop.forYourSearch') }}
                    <strong> {{ searchWord }} </strong>
                </span>
                <span v-else-if="categoryName" class="text">
                    <strong> {{ totalElements }} </strong>
                    {{ totalElements > 1 ? $t('shop.productFoundPlur') : $t('shop.productFoundSing') }}
                    {{ $t('shop.forTheCategory') }}
                    <strong> {{ categoryName }} </strong>
                </span>
                <span v-else-if="supplierName" class="text">
                    <strong> {{ totalElements }} </strong>
                    {{ totalElements > 1 ? $t('shop.productFoundPlur') : $t('shop.productFoundSing') }}
                    {{ $t('shop.forVendor') }}
                    <strong> {{ supplierName }} </strong>
                </span>
                <span v-else class="text">
                    <strong> {{ totalElements }} </strong>
                    {{ totalElements > 1 ? $t('shop.productFoundPlur') : $t('shop.productFoundSing') }}
                </span>
            </p>
            <v-select
                class="selectSort"
                v-model="selectedValue"
                :items="selectedItems.optionTri"
                :item-text="'value'"
                :placeholder="'Trier par '"
                @input="handleSelectChange"
            >
            </v-select>
            <div class="dj-shopping__actions">
                <div class="dj-shopping__view">
                    <p>{{ $t('shop.view') }}</p>
                    <ul class="dj-tab-list">
                        <li :class="listView === true ? 'active' : ''">
                            <a href="#" @click.prevent="handleChangeViewMode">
                                <i class="icon-grid"></i>
                            </a>
                        </li>
                        <li :class="listView !== true ? 'active' : ''">
                            <a href="#" @click.prevent="handleChangeViewMode">
                                <i class="icon-list4"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="dj-shopping__content">
            <div v-if="listView === false" class="dj-shopping-product">
                <div class="productList">
                    <div class="products row" v-if="isLoading">
                        <div v-for="x in 20" :key="x" class="product-item col-lg-3">
                            <v-skeleton-loader
                                v-bind="attrs"
                                type="card-avatar, article, actions"
                                class="product-item_thumb"
                            ></v-skeleton-loader>
                        </div>
                    </div>
                    <div class="row" v-else>
                        <div v-for="(product, index) in products" :key="index" class="col-lg-3">
                            <product-thumbnail :product="product" />
                        </div>
                    </div>
                </div>
                <footer class="mt-30">
                    <v-pagination
                        v-if="totalElements > 0"
                        color="#00244e"
                        total-visible="8"
                        v-model="page"
                        :length="totalPages"
                        @input="handleChangePagination"
                    />
                </footer>
            </div>

            <div v-else class="dj-shopping-product">
                <div v-if="isLoading">
                    <div v-for="x in 10" :key="x" class="productListMobile col-lg-3">
                        <v-skeleton-loader
                            v-bind="attrs"
                            type="card, actions"
                            class="product-item_thumbvert product-item_with d-flex justify-content-between"
                        ></v-skeleton-loader>
                    </div>
                </div>
                <div v-else>
                    <div v-for="product in products" :key="product.id" class="productListMobile">
                        <product-thumbnail-horizontal :product="product" />
                    </div>
                </div>

                <footer class="mt-30">
                    <v-pagination
                        v-if="totalElements > 0"
                        color="#00244e"
                        v-model="page"
                        total-visible="8"
                        :length="totalPages"
                        @input="handleChangePagination"
                    />
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';
import ProductThumbnailHorizontal from '@components/organisms/productCard/ProductThumbnailHorizontal.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
export default {
    name: 'LayoutShopTemplate',
    components: { ProductThumbnailHorizontal, ProductThumbnail, DjLink },
    props: {
        productThumbnails: {
            type: Object,
            require: true,
            default: () => {},
        },
        categoryName: {
            type: String,
            required: false,
            default: null,
        },
        searchWord: {
            type: String,
            require: false,
            default: null,
        },
        supplierName: {
            type: String,
            required: false,
            default: null,
        },
    },
    computed: {
        totalElements() {
            return this.$core.getShop.getTotalElements(this.productThumbnails);
        },
        totalPages() {
            return this.$core.getShop.getTotalPages(this.productThumbnails);
        },
        products: {
            get() {
                return this.$core.getShop.getProducts(this.productThumbnails);
            },
            set(newList) {
                return this.$core.getShop.getProducts(newList);
            },
        },
        isLoading() {
            return this.$store.state.shop.isLoading;
        },
        paginationLenght() {
            if (this.total % 20 === 0) {
                return parseInt(this.total / this.pageSize);
            } else {
                return parseInt(this.total / 20 + 1);
            }
        },
    },
    data() {
        return {
            listView: false,
            page: 1,
            selectedValue: null,
            selectedItems: {
                optionTri: [
                    { order: 'ASC', type: 'NAME', value: 'A-Z' },
                    { order: 'DESC', type: 'NAME', value: 'Z-A' },
                    { order: 'ASC', type: 'PRICE', value: 'Prix Croissant' },
                    { order: 'DESC', type: 'PRICE', value: 'Prix Décroissant' },
                    { order: 'ASC', type: 'SCORE', value: 'Le plus pertinent' },
                    { order: 'DESC', type: 'SCORE', value: 'Le moins pertinent' },
                ],
            },
            pageSize: 20,
            query: false,
            ListProducts: null,
            attrs: {
                class: 'mb-6',
                elevation: 1,
            },
            facets: [],
        };
    },
    created() {
        this.$root.$on('newPaginationNumber', (val) => {
            this.page = val;
        });
        this.$nuxt.$on('facetsChange', (val) => {
            const putInArray = [
                val.filter_brand,
                val.customFieldsOffer,
                val.customFieldsSupplier,
                val.filter_attribute,
                val.filter_supplier,
            ];
            const filteredArray = putInArray.filter((array) => Array.isArray(array) && array[0]).flat();
            if (putInArray[4]) {
                if (!Array.isArray(putInArray[4]) && putInArray[4].length !== 0) {
                    filteredArray.push(putInArray[4]);
                }
            }
            this.facets = filteredArray;
        });
        let currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
        this.page = parseInt(currentProductFilters.page) ? parseInt(currentProductFilters.page) + 1 : 1;
    },
    methods: {
        async handleChangePagination(value) {
            this.$store.commit('shop/setRq', this.searchWord);
            let currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
            currentProductFilters = { ...currentProductFilters, page: value - 1 };
            const link = this.$core.useHelper.generateLink(
                window.location.pathname,
                this.$route.params.id,
                currentProductFilters
            );
            this.$router.push(link);
        },
        handleChangeViewMode() {
            this.listView = !this.listView;
            this.$emit('listView', this.listView);
        },
        handleSelectChange() {
            if (this.selectedValue) {
                const indexSelectedValue = this.selectedItems.optionTri.findIndex((option) => {
                    return option.value === this.selectedValue;
                });
                this.$store.commit('shop/setSortType', this.selectedItems.optionTri[indexSelectedValue].type);
                this.$store.commit('shop/setSort', this.selectedItems.optionTri[indexSelectedValue].order);
                this.$core.useShop.getProductList();
            }
        },
        removeFacet(facet) {
            this.$root.$emit('update-facet', facet);
        },
        removeAllFacets() {
            this.facets = [];
            this.$root.$emit('resetAttributes');
        },
    },
    beforeDestroy() {
        this.$store.commit('shop/initShop');
    },
};
</script>

<style lang="scss" scoped>
.productListMobile {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .product-item_thumbvert {
        width: 100%;
        height: 80px;
    }

    @media (min-width: 640px) {
        display: block;
    }
}
.title-category {
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 28px;
    color: var(--color-body);
}
.text {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21.6px;
    color: var(--color-body);
}
.productList {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 4rem;
    max-width: 100%;

    @media (min-width: 640px) {
        padding-bottom: 6rem;
    }
}
.product-item_with {
    width: 100%;
}
.selectSort {
    display: flex;
    margin-left: auto;
    max-width: 20%;
}
.facet-selected {
    padding: 6px 12px;
    border: 1px solid #c7c7c7;
    border-radius: 20px;
    color: var(--color-primary-dark);
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
}

.remove-facet-button {
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;

    &::before {
        content: 'x';
        position: absolute;
        top: -2px;
        left: 4px;
        width: 2px;
        height: 10px;
        border-radius: 1px;
        background-color: var(--color-primary-dark);
    }
}
.remove-all-facets-button {
    margin-left: 8px;
    color: var(--color-primary);
    font-family: var(--font-1st);
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0;
    text-decoration: underline;
    cursor: pointer;
}
.selected-facets {
    margin-top: 5px;
    gap: 8px;
}
</style>
