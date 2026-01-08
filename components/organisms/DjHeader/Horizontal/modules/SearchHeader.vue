<template>
    <div class="dj-with-quick-search dj-form--quick-search">
        <form class="dj-form--quick-search" @submit.prevent="handleSubmit">
            <div class="ps-form__input">
                <input
                    v-model="searchText"
                    class="form-control"
                    type="text"
                    :placeholder="$t('header.search.placeholder')"
                    @keyup="handleSearchProduct"
                />
                <div class="closeSearchText" @click.prevent="closeSearchHeader" v-if="searchText">
                    <DjIcon class="icon icon-cross"></DjIcon>
                </div>
                <v-progress-circular v-if="isLoading" indeterminate color="#fcb800" width="2" size="16" />
            </div>
            <button class="search__header">{{ $t('header.search.button') }}</button>
        </form>
        <div
            :class="`dj-panel--search-result ${isSearching === true && isLoading === false ? 'active' : ''}`"
            class="d-flex"
            v-click-outside="handleClickOutside"
        >
            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 pa-0">
                <div
                    v-if="searchResults && searchResults.length > 0"
                    class="dj-panel__content dj-panel__content__withoffers"
                >
                    <div v-for="product in searchResults" :key="product.id" class="dj-panel__content__result">
                        <DjLink :href="localePath(`/product/${product.sku}`)">
                            <div @click.prevent="closeSearchHeader">
                                <ProductSmall
                                    :image="product.mainImageUrl"
                                    :name="product.name"
                                    :brand="product.brand"
                                    :sku="product.sku"
                                    :navigationCategoryName="product.navigationCategoryName"
                                    :key="product.id"
                                />
                            </div>
                        </DjLink>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <div class="dj-btn div-flexbasic" v-bind="attrs" v-on="on" @click="viewOffers(product)">
                                    <DjButton
                                        :iconDisplayed="true"
                                        :textDisplayed="false"
                                        size="small"
                                        class="dj-btn__view-offers"
                                        styleB="icon"
                                        icon="icon-arrow-right-circle"
                                    />
                                </div>
                            </template>
                            <span>{{ $t('product.viewOffers') }}</span>
                        </v-tooltip>
                    </div>
                </div>
                <div class="dj-panel__content dj-panel__content__withoffers" v-else>
                    <span>{{
                        $tc('notification.search', searchText, {
                            search: searchText,
                        })
                    }}</span>
                </div>
            </div>
            <div v-if="product?.offers && product?.offers?.length > 0" class="col-xl-5 col-lg-5 col-md-5 col-sm-5 pa-0">
                <div v-for="offer in product.offers" :key="offer.id">
                    <div
                        v-for="offerPrice in $core.getOffer.getOfferPrices(offer)"
                        :key="offerPrice.id"
                        class="ma-0 dj-product__price-right dj-product__autocomplete_offer"
                    >
                        <div v-if="offer.offerPrices.length > 0">
                            <DjProductThumbnailActions
                                :itemPrice="$core.getOffer.getFirstPriceFromOfferPrice(offerPrice)"
                                :quantityPerPack="$core.getOffer.getOfferItemPerPack(offerPrice)"
                                :offerId="$core.getOffer.getOfferId(offerPrice)"
                                :productVariantId="$core.getOffer.getOfferProductVariantId(offer)"
                                :productName="product.name"
                                :showIncrement="true"
                                :key="componentKey"
                                :offer="offer"
                            />
                        </div>
                        <div v-else>
                            <span>no offers</span>
                        </div>
                    </div>
                </div>
                <div v-if="isOfferLoading" class="d-flex flex-column align-items-center justify-content-center">
                    <v-progress-circular indeterminate color="grey" width="2" size="24" class="mt-5 pt-3" />
                    <div>{{ $t('header.search.loadingOffers') }}</div>
                </div>
                <div
                    v-if="!isOfferLoading && product.offers && product.offers.length === 0"
                    class="d-flex flex-column align-items-center justify-content-center pt-4"
                >
                    <span>{{ $t('header.search.noOffers') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductSmall from '@components/organisms/productCard/ProductSmall.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjProductThumbnailActions from '@components/molecules/DjProductThumbnailActions/DjProductThumbnailActions.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';

export default {
    name: 'SearchHeader',
    components: { ProductSmall, DjLink, DjButton, DjProductThumbnailActions, DjIcon },
    computed: {
        searchText: {
            get() {
                let res = this.$store.state.shop.rq;
                if (res === '') {
                    this.closeSearchHeader();
                }
                return this.$store.state.shop.rq;
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
            if (e.target.value !== '') {
                this.isSearching = true;
                this.isLoading = true;
                const result = await this.$core.useShop.searchProducts(e.target.value);
                if (result) {
                    setTimeout(
                        function () {
                            this.isLoading = false;
                            this.searchResults = result;
                        }.bind(this),
                        500
                    );
                }
            } else {
                this.isSearching = false;
            }
        },
        //When u click on the X
        closeSearchHeader() {
            this.isSearching = false;
            this.isLoading = false;
            this.componentKey += 1;
            this.product = {};
            this.searchText = '';
        },
        // When u click fastly outsite
        handleClickOutside() {
            if (this.$store.state.app.search === false) {
                this.isSearching = false;
                this.isLoading = false;
                this.componentKey += 1;
                this.product = {};
                this.searchText = '';
            }
        },
        handleSubmit() {
            if (this.searchText !== null || this.searchText !== '') {
                this.isSearching = false;
                this.$store.commit('shop/setRq', this.searchText);
                const checklocal = this.$nuxt.$route.name.substring(this.$nuxt.$route.name.length - 2);
                if (checklocal === 'en') {
                    this.$router.push({ path: '/en/search', query: { keyword: this.searchText } });
                } else {
                    this.$router.push({ path: '/search', query: { keyword: this.searchText } });
                }
            }
        },
        async viewOffers(product) {
            this.product = {};
            const result = await this.$core.useOffer.getProductOffers(product.sku);
            this.isOfferLoading = true;
            this.isSearching = true;
            this.isLoading = false;
            setTimeout(
                function () {
                    this.isOfferLoading = false;
                    this.product = product;
                    this.product.offers = result;
                }.bind(this),
                500
            );
        },
        showOffer(item) {
            this.isOfferLoading = true;
            setTimeout(
                function () {
                    this.isOfferLoading = false;
                    this.product = item.product;
                    this.product.offers = item.offers;
                }.bind(this),
                500
            );
        },
    },
};
</script>

<style lang="scss">
.dj-btn__view-offers {
    button {
        padding: 5px;
        width: 50px;
    }
}
.closeSearchText {
    position: absolute;
    margin-left: -10px;
    margin-right: auto;
    text-align: right;
    z-index: 1;
    width: 100%;
    font-size: 15px;
    top: 9px;
}
.dj-with-quick-search {
    width: 100%;
}
.div-flexbasic {
    flex-basis: unset;
    padding: 0px 0px;
    background-color: transparent;
}
</style>
