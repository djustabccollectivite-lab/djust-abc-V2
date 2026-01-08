<template>
    <tr>
        <td class="mt-4 pt-6">
            <div class="firstCol dj-form--quick-search">
                <div class="form-group" style="width: 100%">
                    <v-text-field
                        v-if="!productSelected"
                        v-model="searchProduct"
                        class="ps-form__input"
                        type="text"
                        outlined
                        hide-details
                        :placeholder="$t('fastOrder.placeHolder')"
                        @keyup="handleSearchProduct"
                    />
                    <div v-else class="">
                        <div class="d-flex align-center">
                            <ProductSmall
                                :image="productSelected.mainImageUrl"
                                :name="productSelected.name"
                                :navigationCategoryName="productSelected.navigationCategoryName"
                                :sku="productSelected.sku"
                                :brand="productSelected.brand"
                            >
                                <a href="#" class="deleteButton" @click.prevent="removeProduct()">
                                    <i class="icon-trash2"></i>
                                    Supprimer ce produit
                                </a>
                            </ProductSmall>
                        </div>
                    </div>
                </div>
                <div :class="`dj-panel--search-result ${isSearching === true && isLoading === false ? 'active' : ''}`">
                    <div v-if="searchResults && searchResults.length > 0" class="dj-panel__content">
                        <div v-for="product in searchResults" :key="product.id" class="dj-panel__content__result">
                            <ProductSmall
                                :image="product.mainImageUrl"
                                :name="product.name"
                                :navigationCategoryName="product.navigationCategoryName"
                                :addOption="true"
                                :sku="product.sku"
                                :brand="product.brand"
                            />
                            <div
                                class="dj-btn dj-btn--primary"
                                style="
                                    border-radius: 50%;
                                    heigth: 30px;
                                    width: 30px;
                                    flex-basis: unset;
                                    padding: 5px 10px;
                                "
                                @click.prevent="selectProduct(product)"
                            >
                                +
                            </div>
                        </div>
                    </div>
                    <div v-else class="dj-panel__content">
                        {{ $t('fastOrder.notFound') }}
                    </div>
                </div>
            </div>
            <div class="secondCol" v-if="productSelected">
                <span>
                    <v-select
                        class="mt-2"
                        v-if="suppliersList && suppliersList.length > 0"
                        v-model="supplier"
                        :value="suppliersList[0]"
                        :items="suppliersList"
                        dense
                        hide-details
                        outlined
                    />
                </span>
                <span>
                    <div v-if="quantityProduct">
                        <dj-quantity
                            class="mt-2"
                            :quantityValue="quantityProduct"
                            :quantityIncrement="quantityPerPack"
                            @child-quantity="quantityValue"
                            :showIncrement="true"
                            :displayTitle="false"
                        />
                    </div>
                </span>
            </div>
        </td>
        <td v-if="offersList && offersList.length > 0" class="col-3 dj-table--td-hidden">
            <div v-if="productSelected">
                <v-select
                    class="mt-2"
                    v-if="suppliersList && suppliersList.length > 0"
                    v-model="supplier"
                    :value="suppliersList[0]"
                    :items="suppliersList"
                    dense
                    hide-details
                    outlined
                />
            </div>
        </td>
        <td v-if="offersList && offersList.length > 0" class="col-2 dj-table--td-hidden">
            <div v-if="quantityProduct">
                <dj-quantity
                    class="mt-2"
                    :quantityValue="quantityProduct"
                    :quantityIncrement="quantityPerPack"
                    @child-quantity="quantityValue"
                    :showIncrement="true"
                    :displayTitle="false"
                />
            </div>
        </td>

        <td v-if="offersList && offersList.length > 0" class="col-2 dj-table--last">
            <div class="pricettc">
                <span class="mt-1" v-if="offer" v-html="offerBestPrice"></span>
            </div>
        </td>
        <td v-if="offersList && offersList.length > 0" class="dj-table--last">
            <div v-if="offer" class="detailsButton">
                <DjLink :to="'/product/' + productSelected.sku">{{ $t('fastOrder.moreBtn') }}</DjLink>
            </div>
        </td>
        <td v-if="offersList ? offersList.length == 0 : false" colspan="3">
            <b>{{ $t('fastOrder.noOffer') }}</b>
        </td>
    </tr>
</template>

<script>
import { mapState } from 'vuex';
import ProductSmall from '@components/organisms/productCard/ProductSmall.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    components: { ProductSmall, DjQuantity, DjLink },
    props: {
        product: {
            type: Object,
            require: false,
        },
    },
    data() {
        return {
            searchProduct: '',
            isSearching: false,
            isLoading: false,
            searchResults: '',
            productSelected: this.product ? this.product : null,
            quantity: 1,
            quantityProduct: null,
            offersList: null,
            supplier: null,
            productDeleted: false,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        suppliersList() {
            return this.offersList ? this.$core.getOffer.getOffersSupplierList(this.offersList) : null;
        },
        offer() {
            return this.supplier ? this.$core.getOffer.getBestOfferFromSupplier(this.offersList, this.supplier) : null;
        },
        quantityPerPack() {
            return this.offer ? this.$core.getOffer.getOfferItemPerPack(this.offer.offerPrices[0]) : 1;
        },
        offerBestPrice() {
            return this.$core.getOffer.getBestOfferPriceFromOfferInventory(this.offer)
                ? this.$core.getOffer.getFirstPriceWithQuantityFromOfferPrice(
                      this.$core.getOffer.getBestOfferPriceFromOfferInventory(this.offer),
                      this.quantity,
                      this.currency,
                      true
                  )
                : '0';
        },
    },
    methods: {
        selectProduct(params) {
            this.productSelected = params;
            this.isSearching = false;
            this.searchResults = '';
            this.searchProductOffers();
        },
        async searchProductOffers() {
            const result = await this.$core.useOffer.getProductOffers(this.productSelected.sku);
            this.offersList = result;
            this.defineFirstSupplier(result);
        },
        defineFirstSupplier(offers) {
            const BestOffer = offers ? this.$core.getOffer.getBestOfferFromList(offers) : null;
            BestOffer ? (this.supplier = BestOffer.supplier) : null;
        },
        removeProduct() {
            this.productDeleted != this.productDeleted;
            this.productSelected = null;
            this.offersList = null;
            this.supplier = null;
            (this.quantityProduct = null), (this.searchProduct = '');
        },
        quantityValue(params) {
            this.quantity = params;
        },
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
    },
    watch: {
        supplier: function () {
            if (this.supplier && this.offer && this.quantity) {
                this.quantityProduct = this.quantityPerPack;
                this.quantity = this.quantityProduct;
                this.$emit('child-product', {
                    type: 'add',
                    offer: {
                        offerId: this.offer.offerPrices[0].id,
                        minOrder: this.offer.offerInventory.minOrderQuantity,
                        quantity: this.quantity,
                        deliveryLines: [],
                        stock: this.offer.offerInventory.stock,
                    },
                    quoteLine: {
                        productVariantId: this.offer.offerInventory.variant.id,
                        quantity: this.quantity,
                    },
                });
            }
        },
        quantity: function () {
            this.supplier && this.offer && this.quantity
                ? this.$emit('child-product', {
                      type: 'add',
                      offer: {
                          offerId: this.offer.offerPrices[0].id,
                          quantity: this.quantity,
                          minOrder: this.offer.offerInventory.minOrderQuantity,
                          deliveryLines: [],
                          stock: this.offer.offerInventory.stock,
                      },
                      quoteLine: {
                          productVariantId: this.offer.offerInventory.variant.id,
                          quantity: this.quantity,
                      },
                  })
                : null;
        },
        productDeleted: function () {
            this.$emit('child-product', {
                type: 'remove',
                offer: {
                    offerId: this.offer.offerPrices[0].id,
                    quantity: this.quantity,
                    minOrder: this.offer.offerInventory.minOrderQuantity,
                    deliveryLines: [],
                    stock: this.offer.offerInventory.stock,
                },
                quoteLine: {
                    productVariantId: this.offer.offerInventory.variant.id,
                    quantity: this.quantity,
                },
            });
        },
    },
    mounted() {
        this.productSelected ? this.searchProductOffers() : null;
    },
};
</script>
<style lang="scss" scoped>
.deleteButton {
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 100;
    font-size: 12px;
    line-height: 14px;
    color: #4d4d4f;
    padding-bottom: 4px;
}
.detailsButton {
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 100;
    font-size: 13px;
    line-height: 15px;
    text-decoration-line: underline;
    color: rgba(0, 0, 0, 0.75);
}
.pricettc {
    font-family: var(--font-2nd) !important;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #1c1c1c;
}
</style>
