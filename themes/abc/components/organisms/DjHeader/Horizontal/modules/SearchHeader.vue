<template>
    <div class="quick-search flex-grow-1">
        <form class="d-flex justify-content-center" @submit.prevent="handleSubmit">
            <div class="d-flex align-items-center search-input pr-2 w-full pl-6">
                <input
                    v-model="searchText"
                    class="form-control p-0"
                    type="text"
                    :placeholder="$t('header.search.placeholder')"
                    @keyup="handleSearchProduct"
                />
                <div @click.prevent="closeSearchHeader" v-if="searchText">
                    <SvgIcon name="cross" />
                </div>
                <v-progress-circular v-if="isLoading" indeterminate color="#fcb800" width="2" size="16" />
            </div>
            <button class="bg-primary search-btn font-700 px-8">{{ $t('header.search.button') }}</button>
        </form>
        <div class="dj-form--quick-search">
            <div
                :class="[
                    'dj-panel--search-result',
                    'd-flex px-5',
                    true === isSearching && false === isLoading ? 'active' : ''
                ]"
                v-click-outside="handleClickOutside"
            >
                <div class="col-12 pa-0">
                    <div
                        v-if="searchResults.products && searchResults.products.length > 0"
                        class="dj-panel__content"
                    >
                        <div v-for="product in searchResults.products" :key="product.id" class="dj-panel__content__result">
                            <DjLink :href="localePath(`/product/${product.product.sku}`)">
                                <div @click.prevent="closeSearchHeader">
                                    <ProductSmall
                                        :image="product.variant"
                                        :name="product.product.name"
                                        :brand="product.product.brand"
                                        :sku="product.product.sku"
                                        :key="product.id"
                                        :navigationCategoryName="product.navigationCategoryName"
                                    />
                                </div>
                            </DjLink>
                            <nuxt-link :to="localePath(`/product/${product.product.sku}`)">
                                <DjButton
                                    text=""
                                    shape="icon"
                                    variant="outlined"
                                    :iconDisplayed="true"
                                    icon="magnifier"
                                />
                            </nuxt-link>
                        </div>
                    </div>
                    <div v-else class="dj-panel__content py-4">
                        {{ $tc('notification.search', searchText, {search: searchText}) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductSmall from '@components/organisms/productCard/ProductSmall.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjProductThumbnailActions from '@components/molecules/DjProductThumbnailActions/DjProductThumbnailActions.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';


export default {
    name: 'SearchHeader',
    components: { ProductSmall, DjButton, DjProductThumbnailActions, SvgIcon, DjLink },
    computed: {
        searchText: {
            get() {
                const searchInput = this.$store.state.shop.rq;
                if ('' === searchInput) {
                    this.closeSearchHeader();
                }
                return searchInput;
            },
            set(value) {
                this.$store.commit('shop/setRq', value);
            },
        },
    },
    data() {
        return {
            filterSearch: ['All', 'Products', 'Suppliers'],
            isSearching: false,
            isLoading: false,
            isOfferLoading: false,
            product: {},
            searchResults: [],
            componentKey: 1,
        };
    },
    methods: {
        async handleSearchProduct(e) {
            if ('' !== e.target.value) {
                this.isSearching = true;
                this.isLoading = true;
                const searchResults = await this.$core.useShop.searchAutocomplete(e.target.value, "PRODUCT");
                if (searchResults) {
                    setTimeout(
                        function () {
                            this.isLoading = false;
                            this.searchResults = searchResults;
                        }.bind(this),
                        500
                    );
                }
            } else {
                this.isSearching = false;
            }
        },
        // On click on the X
        closeSearchHeader() {
            this.isSearching = false;
            this.isLoading = false;
            this.componentKey += 1;
            this.product = {};
            this.searchText = '';
        },
        handleClickOutside() {
            if (this.$store.state.app.search === false) {
                this.closeSearchHeader();
            }
        },
        handleSubmit() {
            if (this.searchText !== null || this.searchText !== '') {
                this.isSearching = false;
                this.$store.commit('shop/setRq', this.searchText);
                window.location.href = this.localePath(`/search?keyword=${this.searchText}`);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.search-input {
    height: 50px; // Épaisseur de la barre
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom: 1px solid var(--color-grey-nuance-4);
    border-top: 1px solid var(--color-grey-nuance-4);
    border-left: 1px solid var(--color-grey-nuance-4);
    input {
        border: none;
        height: 100%;
        font-size: 16px;
    }
}

.search-btn {
    height: 50px; // Même hauteur que l'input pour l'alignement
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
}

.search-btn:hover {
    background-color: var(--color-primary) !important;
}
</style>
