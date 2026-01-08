<template>
    <div class="dj-shopping mt-0">
        <div class="dj-shopping__header align-items-center">
            <div class="hidden-on-mobile">
                <span v-if="searchWord" class="text">
                    <strong> {{ totalElements }} </strong>
                    {{ 1 < totalElements ? $t('shop.productFoundPlur') : $t('shop.productFoundSing') }}
                    {{ $t('shop.forYourSearch') }}
                    <strong class="text-black size-14 d-inline">{{ searchWord }}</strong>
                </span>
                <span v-else-if="categoryName" class="text">
                    <strong> {{ totalElements }} </strong>
                    {{ 1 < totalElements ? $t('shop.productFoundPlur') : $t('shop.productFoundSing') }}
                    {{ $t('shop.forTheCategory') }}
                    <strong class="text-black size-14 d-inline">{{ categoryName }}</strong>
                </span>
                <span v-else-if="supplierName" class="text">
                    <strong> {{ totalElements }} </strong>
                    {{ 1 < totalElements ? $t('shop.productFoundPlur') : $t('shop.productFoundSing') }}
                    {{ $t('shop.forVendor') }}
                    <strong class="text-black size-14 d-inline">{{ supplierName }}</strong>
                </span>
                <span v-else class="text">
                    <strong> {{ totalElements }} </strong>
                    {{ 1 < totalElements ? $t('shop.productFoundPlur') : $t('shop.productFoundSing') }}
                </span>
            </div>
            <v-select
                v-model="selectedValue"
                class="sortSelector"
                :items="selectedItems.optionTri"
                :item-text="'value'"
                height="42"
                :placeholder="'Trier par '"
                outlined
                hide-details
                @input="handleSelectChange"
            />
            <div class="dj-shopping__actions">
                <div class="dj-shopping__view">
                    <p class="hidden-on-mobile">{{ $t('shop.view') }}</p>
                    <div class="d-flex gap-3">
                        <div class="pointer" @click.prevent="() => handleChangeViewMode(false)">
                            <SvgIcon :name="true === listView ? 'product-grid' : 'product-grid-selected'" />
                        </div>
                        <div class="pointer" @click.prevent="() => handleChangeViewMode(true)">
                            <SvgIcon :name="true === listView ? 'product-list-selected' : 'product-list'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dj-shopping__content">
            <div v-if="listView === false" class="dj-shopping-product">
                <div class="productList">
                    <div v-if="isLoading" class="products row">
                        <div v-for="x in 20" :key="x" class="product-item col-lg-3">
                            <v-skeleton-loader
                                v-bind="attrs"
                                type="card-avatar, article, actions"
                                class="product-item_thumb"
                            ></v-skeleton-loader>
                        </div>
                    </div>
                    <div v-else class="row">
                        <div
                            v-for="product in products"
                            :key="product?.product?.id"
                            class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                        >
                            <ProductThumbnail :product="product" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="dj-shopping-product">
                <div v-if="isLoading">
                    <div v-for="x in 10" :key="x" class="col-lg-12">
                        <v-skeleton-loader
                            v-bind="attrs"
                            type="card, actions"
                            class="w-full d-flex justify-content-between"
                            style="height: 110px; margin-bottom: 0 !important"
                        ></v-skeleton-loader>
                    </div>
                </div>
                <div v-else>
                    <div v-for="product in products" :key="product?.product?.id" class="mb-4">
                        <ProductThumbnailHorizontal :product="product" />
                    </div>
                </div>
            </div>

            <div v-if="categoryDescription" class="mt-4">
                <p class="mb-4 text-center size-24 font-700 text-center">{{ categoryName }}</p>
                <div :class="{ 'category-description': !showFullDescription }" v-html="categoryDescription"></div>

                <div v-if="!showFullDescription" class="d-flex">
                    <button
                        class="text-decoration-underline text-link"
                        @click="showFullDescription = !showFullDescription"
                    >
                        En savoir plus
                    </button>
                </div>
            </div>

            <div class="mt-30">
                <v-pagination
                    v-if="0 < totalElements"
                    v-model="page"
                    color="var(--color-primary)"
                    total-visible="8"
                    :length="totalPages"
                    @input="handleChangePagination"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';
import ProductThumbnailHorizontal from '@components/organisms/productCard/ProductThumbnailHorizontal.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import { findCurrentCategoryExternalId } from '~/purjus/helpers/common/categoriesHelper';

export default {
    name: 'ProductList',
    components: { ProductThumbnailHorizontal, ProductThumbnail, SvgIcon },
    props: {
        productThumbnails: {
            type: Object,
            required: false,
            default: () => {},
        },
        category: {
            type: Object,
            required: false,
            default: null,
        },
        categoryName: {
            type: String,
            required: false,
            default: null,
        },
        searchWord: {
            type: String,
            required: false,
            default: null,
        },
        supplierName: {
            type: String,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            listView: false,
            page: 1,
            products: [],
            selectedValue: null,
            selectedItems: {
                optionTri: [
                    { order: 'ASC', type: 'NAME', value: 'A-Z' },
                    { order: 'DESC', type: 'NAME', value: 'Z-A' },
                    { order: 'ASC', type: 'PRICE', value: 'Prix Croissant' },
                    { order: 'DESC', type: 'PRICE', value: 'Prix Décroissant' },
                ],
            },
            pageSize: 20,
            query: false,
            ListProducts: null,
            attrs: {
                class: 'mb-6',
                elevation: 1,
            },
            showFullDescription: false,
        };
    },
    head() {
        const clientName = this.$config.clientName.toUpperCase();
        let titlePart = 'Liste des produits';

        if (this.searchWord) {
            titlePart = `Recherche : ${this.searchWord}`;
        } else if (this.categoryName) {
            titlePart = `Categorie : ${this.categoryName}`;
        }

        return {
            titleTemplate: ` ${clientName} | ${titlePart}`,
        };
    },
    computed: {
        totalElements() {
            return this.$core.getShop.getTotalElements(this.productThumbnails);
        },
        totalPages() {
            return this.$core.getShop.getTotalPages(this.productThumbnails);
        },
        isLoading() {
            return this.$store.state.shop.isLoading;
        },
        categoryDescription() {
            const description =
                this.category?.customFieldValues.find((el) => el.customField.externalId === 'DESCRIPTION') ?? null;
            return description?.value;
        },
    },
    watch: {
        productThumbnails: {
            handler() {
                this.products = this.$core.getShop.getProducts(this.productThumbnails);
            },
            immediate: true,
        },
    },
    created() {
        this.$root.$on('newPaginationNumber', (val) => {
            this.page = val;
            this.handleChangePagination(val);
        });
        const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
        this.page = parseInt(currentProductFilters.page) ? parseInt(currentProductFilters.page) + 1 : 1;
        this.listView = window.innerWidth < 960;
    },
    beforeDestroy() {
        this.$store.commit('shop/initShop');
    },
    methods: {
        handleChangePagination(value) {
            this.$store.commit('shop/setRq', this.searchWord);
            let currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
            currentProductFilters = { ...currentProductFilters, page: value - 1 };
            const link = this.$core.useHelper.generateLink(
                window.location.pathname,
                this.$route.params.id,
                currentProductFilters,
            );

            window.scrollTo({ top: 0, behavior: 'smooth' });

            this.$router.push(link);
        },
        handleChangeViewMode(value) {
            this.listView = value;
            this.$emit('listView', this.listView);
        },
        async handleSelectChange() {
            if (!this.selectedValue) {
                return;
            }
            const indexSelectedValue = this.selectedItems.optionTri.findIndex((option) => {
                return option.value === this.selectedValue;
            });
            this.$store.commit('shop/setSortType', this.selectedItems.optionTri[indexSelectedValue].type);
            this.$store.commit(
                'shop/setSort',
                `${this.selectedItems.optionTri[indexSelectedValue].type.toLowerCase()}|${this.selectedItems.optionTri[indexSelectedValue].order}`,
            );
            const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);

            currentProductFilters.idType = 'EXTERNAL_ID';

            const categoriesList = await this.$core.useCategories.getCategoriesList();
            const currentCategoryId = findCurrentCategoryExternalId(categoriesList, this.$route.params.id);

            await this.$core.useShop.getFiltredProductListv2(currentCategoryId, currentProductFilters, 'PRODUCT');
        },
    },
};
</script>

<style lang="scss" scoped>
::v-deep .theme--light.v-pagination .v-pagination__item--active {
    color: var(--color-black);
    font-weight: 700;
    font-size: 18px;
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

.sortSelector {
    margin-left: 0;
    @media (min-width: 960px) {
        display: flex;
        margin-left: auto;
        max-width: 20%;
    }
}

::v-deep .v-text-field--outlined > .v-input__control > .v-input__slot {
    min-height: initial;
}

::v-deep .v-text-field--enclosed .v-input__append-inner {
    margin-top: 10px;
}

.category-description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
