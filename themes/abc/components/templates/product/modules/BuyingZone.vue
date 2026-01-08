<template>
    <div v-if="$auth.loggedIn">
        <div v-if="offerPrices && offerPrices.length > 0">
            <!-- Stickers -->
            <div class="mb-4">
                <div v-if="shippingTime">
                    <div class="shipping-time bg-primary rounded fit-content font-700 size-18 px-2 py-1">
                        {{ shippingTime }}
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <div
                    v-if="onQuote || hasNoPrice"
                    class="rounded font-700 size-18 px-2 py-1 bg-black text-white fit-content mb-4"
                >
                    Sur devis
                </div>
            </div>

            <!-- Prix -->
            <div v-if="actionDisabled" class="py-1">
                <span class="font-700 size-18"> Pas d'offre existante avec ces options. </span>
            </div>
            <div v-else class="d-flex align-items-center gap-2">
                <DjPrice :price="priceDisplayed" :currency="currency" :displayTax="true" size="large" />
                <div v-if="ecoTax" class="eco-part">(+ éco-participation {{ ecoTax }} € HT)</div>
            </div>

            <!-- Sélecteur de variant -->
            <ProductVariantAttributes
                v-if="offers && 0 < offers.length"
                :offers="offers"
                :selectedOffer="selectedOffer"
                @onOfferChange="handleSelectedOffer"
            />

            <!-- Prix dégressifs -->
            <div v-if="offerPrices[0].priceRanges.length > 1" class="border-top pt-2 fit-content mb-8">
                <div class="text-black font-700 size-24 my-2">Prix dégressifs</div>
                <table class="text-center">
                    <thead>
                        <tr>
                            <th class="text-black-3 font-700 size-14 px-4">Quantités</th>
                            <th class="text-black-3 font-700 size-14 px-4">Prix unitaire (HT)</th>
                        </tr>
                    </thead>
                    <tbody class="text-black font-700 size-16">
                        <tr v-for="price in offerPrices[0].priceRanges" :key="price.id">
                            <td>{{ price.quantity }}</td>
                            <td>
                                <DjPrice :price="price.price.itemPrice" :currency="currency" :displayTax="false" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Messages d'information -->
            <div v-if="selectedOffer && 1 < selectedOffer.offerInventory.minOrderQuantity">
                <span>minimum de commande : </span>
                <span>{{ selectedOffer.offerInventory.minOrderQuantity }} </span>
            </div>

            <!-- Boutons d'actions -->
            <div class="d-flex gap-4 mb-2">
                <DjQuantity
                    :key="increment"
                    :quantityIncrement="quantityPerPack"
                    :showIncrement="true"
                    :stock="stock"
                    :isDisabled="actionDisabled"
                    @child-quantity="quantityValue"
                />
                <DjButtonAddToQuote
                    v-if="onQuote"
                    :quantity="quantity"
                    :productId="productVariantId"
                    :productName="productTitle"
                    :fullWidth="true"
                    :supplierId="offerVendorId"
                    :isDisabled="actionDisabled"
                    variant="contained"
                    shape="button"
                    class="mb-2"
                />
                <DjButtonAddToCart
                    v-else
                    :quantity="quantity"
                    :offerId="offerPriceExternalId"
                    :quantityInStock="stock"
                    :minOrderQuantity="selectedOffer?.offerInventory?.minOrderQuantity"
                    shape="button"
                    variant="contained"
                    :fullWidth="true"
                    :isDisabled="actionDisabled"
                />
            </div>
            <DjButtonAddToQuote
                v-if="!onQuote"
                :quantity="quantity"
                :productId="productVariantId"
                :productName="productTitle"
                :fullWidth="true"
                :supplierId="offerVendorId"
                :isDisabled="actionDisabled"
                variant="outlined"
                shape="button"
                iconColor="var(--color-secondary)"
                class="dj-action-btn-outlined mb-2"
            />
            <DjButtonAddToBuyingList
                v-if="$core.useWishlist.IsActive()"
                :quantity="quantity"
                :offerId="offerPriceId"
                :productName="productTitle"
                :isDisabled="actionDisabled"
                :fullWidth="true"
                variant="outlined"
                shape="button"
                iconColor="var(--color-secondary)"
                class="dj-action-btn-outlined"
            />
        </div>
    </div>
    <div v-else>
        <div class="mb-4">
            <div v-if="shippingTime">
                <div class="shipping-time bg-primary rounded fit-content font-700 size-18 px-2 py-1">
                    {{ shippingTime }}
                </div>
            </div>
            <div
                v-if="onQuote || hasNoPrice || !priceVisibilityStatus"
                class="bg-black text-white rounded fit-content font-700 size-18 px-2 py-1 mt-4"
            >
                Prix sur devis
            </div>
        </div>
        <div v-if="priceVisibilityStatus" class="d-flex align-items-center gap-2">
            <DjPrice :price="priceDisplayed" :currency="currency" :displayTax="true" size="large" />
            <div v-if="ecoTax" class="eco-part">(+ éco-participation {{ ecoTax }} € HT)</div>
        </div>
    </div>
</template>

<script>
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjButtonAddToBuyingList from '@components/molecules/DjButtonAddToBuyingList/DjButtonAddToBuyingList.vue';
import DjButtonAddToQuote from '@components/molecules/DjButtonAddToQuote/DjButtonAddToQuote.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import ProductVariantAttributes from '@components/templates/product/modules/ProductVariantAttributes.vue';
import DjPrice from '@components/atoms/DjPrice/DjPrice.vue';
import { mapState } from 'vuex';

export default {
    name: 'BuyingZone',
    components: {
        DjButtonAddToCart,
        DjButtonAddToBuyingList,
        DjButtonAddToQuote,
        DjQuantity,
        ProductVariantAttributes,
        DjPrice,
    },
    props: {
        product: {
            type: Object,
            required: true,
            default: () => {},
        },
        offers: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    emits: ['onSelectedOffer'],
    data() {
        return {
            selectedOffer: null,
            quantity: 1,
            ecoTax: 0,
            shippingTime: 0,
            onQuote: false,
            offerVendorId: null,
            offerQuantityInStock: null,
            offerPrices: null,
            productVariantId: null,
            stock: null,
            quantityPerPack: null,
            offerId: null,
            offerPriceExternalId: null,
            offerPriceId: null,
            priceDisplayed: null,
            priceVisibilityStatus: false,
            hasNoPrice: false,
            actionDisabled: false,
            increment: 1,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        productTitle() {
            return this.$core.getProduct.getProductTitle(this.product);
        },
        offerVariantId() {
            return this.$route.query.variantId;
        },
    },
    mounted() {
        const firstProductToShow = this.offers?.find((offer) => {
            return offer.offerInventory.id === this.offerVariantId;
        });
        this.selectedOffer = firstProductToShow ?? this.getBestOfferFromList([...this.offers]);
        this.quantity = this.selectedOffer?.offerPrices[0].itemPerPack;
        this.updateValues();
    },
    methods: {
        getBestOfferFromList(offers) {
            if (offers && offers.length > 0) {
                let filterOffers =
                    offers.length > 1
                        ? offers.filter((offer) => offer.offerInventory.stock > 0 && offer.offerPrices.length > 0)
                        : offers;
                filterOffers = filterOffers.length === 0 ? offers : filterOffers;
                const BestOffer = filterOffers.sort((a, b) => {
                    const priceA =
                        this.$core.getOffer.getBestOfferPriceFromOfferInventory(a)?.priceRanges[0].price.itemPrice;
                    const priceB =
                        this.$core.getOffer.getBestOfferPriceFromOfferInventory(b)?.priceRanges[0].price.itemPrice;
                    return priceA - priceB;
                })[0];
                return BestOffer;
            } else {
                return null;
            }
        },
        handleSelectedOffer(newOffer) {
            this.selectedOffer = newOffer;
            if (newOffer !== null) {
                this.updateValues();
            } else {
                this.$emit('onSelectedOffer', null);
                this.actionDisabled = true;
            }
        },
        updateValues() {
            if (this.selectedOffer) {
                this.$emit('onSelectedOffer', this.selectedOffer);
                const ecoTax = this.$purjus.utils.extractOfferCustomFieldValue(this.selectedOffer, 'ecoparticipation');
                if (ecoTax) {
                    this.ecoTax = parseFloat(ecoTax).toFixed(2);
                }
                this.shippingTime = this.$purjus.utils.extractOfferCustomFieldValue(
                    this.selectedOffer,
                    'delais_livraison',
                );
                const onQuote = this.$purjus.utils.extractOfferCustomFieldValue(this.selectedOffer, 'devis');
                this.onQuote = onQuote && onQuote[0] === 'TRUE';
                this.offerVendorId = this.$core.getOffer.getOfferSupplierId(this.selectedOffer);
                this.offerQuantityInStock = this.$core.getOffer.getOfferStock(this.selectedOffer);
                this.offerPrices = this.$core.getOffer.getOfferPrices(this.selectedOffer);
                this.productVariantId = this.$core.getOffer.getOfferProductVariantId(this.selectedOffer);
                this.stock = this.$core.getOffer.getOfferStock(this.selectedOffer);
                this.quantityPerPack = this.selectedOffer?.offerPrices[0].itemPerPack;
                this.offerId = this.selectedOffer?.offerInventory.id;
                if (this.offerId !== this.offerVariantId)
                    this.$router.replace({
                        path: this.$route.path,
                        query: {
                            ...this.$route.query,
                            variantId: this.offerId,
                        },
                    });
                this.offerPriceExternalId = this.selectedOffer?.offerPrices[0].externalId;
                this.offerPriceId = this.selectedOffer?.offerPrices[0].id;
                const priceRangeDisplayed = this.$purjus.useOfferHelper.getPriceFromPriceRange(
                    this.offerPrices[0],
                    this.quantity,
                );

                this.hasNoPrice = this.offerPrices[0].priceRanges[0].price.itemPrice === 0;
                this.priceVisibilityStatus =
                    this.product.attributeValues.find((el) => el.attribute.externalId === 'Visibilité_Prix')?.value ===
                    'Oui';
                this.priceDisplayed = priceRangeDisplayed?.price?.itemPrice - this.ecoTax;
            }
            this.actionDisabled = false;
        },
        quantityValue(params) {
            this.quantity = params;
            this.updateValues();
        },
    },
};
</script>

<style lang="scss" scoped>
tr:nth-child(even),
thead tr {
    background-color: var(--color-grey-nuance-9);
}

.shipping-time {
    color: black;
}
.acodis {
    .shipping-time {
        color: white;
    }
    .dj-action-btn-outlined::v-deep .btn-outlined {
        background-color: transparent;
        border: 1px var(--color-secondary) solid !important;
        color: var(--color-secondary);
    }
}
</style>
