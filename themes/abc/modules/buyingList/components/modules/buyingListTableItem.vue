<template>
    <tr v-if="isDesktop">
        <td>
            <a href="#" @click.prevent="handleRemoveItemFromWishlist(buyinglistItem.id)">
                <SvgIcon name="delete-circle" />
            </a>
        </td>
        <td>
            <ProductCart
                :productSku="buyinglistItem.offerInventory.variant.skuProduct"
                :productImage="$core.getCart.getProductImage(buyinglistItem)"
                :productName="buyinglistItem.offerInventory.variant.name"
                :supplierName="buyinglistItem.supplier.name"
                :productExternalId="buyinglistItem.offerInventory.variant.externalId"
                :productBrand="buyinglistItem.offerInventory.brand"
                :offerQuantityInStock="buyinglistItem.offerInventory.stock"
                :isOnQuote="isOnQuote"
                :isDesktop="isDesktop"
            />
        </td>
        <td class="price-size text-center">
            <div
                v-if="isPriceDisplayed"
                class="font-700 size-16 text-black"
                v-html="
                    !disableButtonForTag
                        ? $core.getCart.getProductUnitPrice(buyinglistItem, $core.getApp.getCurrency(app))
                        : 'offre expirée'
                "
            ></div>
            <div v-if="ecoTax && isPriceDisplayed" class="font-400 text-grey-6">
                <span>Dont éco-part. </span>
                <span v-html="ecoTax"></span>
            </div>
        </td>
        <td class="quantity-size">
            <DjQuantity
                :quantityIncrement="$core.getCart.getProductPerPack(buyinglistItem)"
                :quantityValue="quantity"
                :displayTitle="false"
                :showIncrement="true"
                :isDisabled="disableButtonForTag"
                @child-quantity="quantityValue"
            />
            <div v-if="minOrder && minOrder > 1" class="size-12">
                {{
                    $tc('product.tabs.offers.minoforder', minOrder, {
                        minOrder,
                    })
                }}
            </div>
        </td>
        <td class="price-size text-center">
            <div
                v-if="isPriceDisplayed"
                class="font-700 size-16 text-black"
                v-html="
                    !disableButtonForTag
                        ? $core.getCart.getProductTotalPrice(buyinglistItem, $core.getApp.getCurrency(app))
                        : 'offre expirée'
                "
            ></div>
            <div v-if="totalEcoTax && isPriceDisplayed" class="font-400 text-grey-6">
                <span>Dont éco-part. </span>
                <span v-html="totalEcoTax"></span>
            </div>
        </td>
        <td class="actions d-flex flex-column gap-2">
            <DjButtonAddToCart
                :quantity="parseInt(quantity)"
                :offerId="buyinglistItem.offerPrice.externalId"
                :quantityInStock="buyinglistItem.offerInventory.stock"
                :minOrderQuantity="buyinglistItem.offerInventory.minOrderQuantity"
                shape="button"
                variant="contained"
                :fullWidth="true"
                :isDisabled="buyinglistItem.offerInventory.stock === 0 || !checkStatusOfOffer || isOnQuote"
            />
            <DjButtonAddToQuote
                :quantity="$core.getCart.getQuantity(buyinglistItem)"
                :productId="$core.getCart.getProductId(buyinglistItem)"
                :productName="buyinglistItem.productName"
                shape="button"
                variant="contained"
                :fullWidth="true"
            />
        </td>
    </tr>
    <div v-else>
        <div>
            <ProductCart
                :productSku="buyinglistItem.offerInventory.variant.skuProduct"
                :productImage="buyinglistItem.offerInventory.variant.productMediaInfoDTO"
                :productName="buyinglistItem.offerInventory.name"
                :supplierName="buyinglistItem.supplier.name"
                :productExternalId="buyinglistItem.offerInventory.variant.externalId"
                :productBrand="buyinglistItem.offerInventory.brand"
                :offerQuantityInStock="buyinglistItem.offerInventory.stock"
                :isOnQuote="isOnQuote"
                :isDesktop="isDesktop"
            />
        </div>
        <div class="bg-grey rounded p-2 mt-2">
            <div class="d-flex align-items-center">
                <div class="text-grey-4 quantity-size">Montant HT :</div>
                <div
                    class="font-700 size-16 text-black"
                    v-html="
                        !disableButtonForTag
                            ? $core.getCart.getProductUnitPrice(buyinglistItem, $core.getApp.getCurrency(app))
                            : 'offre expirée'
                    "
                ></div>
                <div v-if="ecoTax" class="font-400 text-grey-6">
                    <span>Dont éco-part. </span>
                    <span v-html="ecoTax"></span>
                </div>
            </div>
            <div class="d-flex align-items-center mb-2">
                <div class="text-grey-4 quantity-size">Montant Total :</div>
                <div
                    class="font-700 size-16 text-black"
                    v-html="
                        !disableButtonForTag
                            ? $core.getCart.getProductTotalPrice(buyinglistItem, $core.getApp.getCurrency(app))
                            : 'offre expirée'
                    "
                ></div>
                <div v-if="totalEcoTax" class="font-400 text-grey-6">
                    <span>Dont éco-part. </span>
                    <span v-html="totalEcoTax"></span>
                </div>
            </div>
            <div class="d-flex justify-content-center mb-2">
                <DjQuantity
                    :quantityIncrement="buyinglistItem.offerPrice.itemPerPack"
                    :quantityValue="quantity"
                    :displayTitle="false"
                    :showIncrement="true"
                    :isDisabled="disableButtonForTag"
                    @child-quantity="quantityValue"
                />
                <div v-if="minOrder && minOrder > 1" class="size-12">
                    {{ $tc('product.tabs.offers.minoforder', minOrder, { minOrder }) }}
                </div>
            </div>
            <div class="d-flex flex-column gap-2">
                <DjButtonAddToCart
                    :quantity="parseInt(quantity)"
                    :offerId="buyinglistItem.offerInventory.variant.externalId"
                    :quantityInStock="buyinglistItem.offerInventory.stock"
                    :minOrderQuantity="buyinglistItem.offerInventory.minOrderQuantity"
                    shape="button"
                    variant="contained"
                    :fullWidth="true"
                    :isDisabled="
                        $core.getOffer.getOfferStock(buyinglistItem) === 0 || !checkStatusOfOffer || disableButtonForTag
                    "
                />
                <DjButtonAddToQuote
                    :quantity="buyinglistItem.quantity"
                    :productId="buyinglistItem.offerInventory.variant.id"
                    :productName="buyinglistItem.productName"
                    shape="button"
                    variant="outlined"
                    :fullWidth="true"
                />
                <div @click.prevent="handleRemoveItemFromWishlist(buyinglistItem.id)">
                    <DjButton
                        text="Retirer de la wishlist"
                        shape="button"
                        variant="outlined"
                        :fullWidth="true"
                        :iconDisplayed="true"
                        icon="trash-small"
                        class="bg-white"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductCart from '@components/organisms/productCard/ProductCart.vue';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjButtonAddToQuote from '@components/molecules/DjButtonAddToQuote/DjButtonAddToQuote.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import { mapState } from 'vuex';

export default {
    name: 'BuyingListTableItem',
    components: { ProductCart, DjButtonAddToCart, DjButtonAddToQuote, DjQuantity, SvgIcon, DjButton },
    props: {
        buyinglistItem: {
            type: Object,
            default: () => {},
        },
        buyingListId: {
            type: String,
            required: true,
            default: '',
        },
        isDesktop: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data() {
        return {
            minOrder: 1,
            quantity: 1,
            accountInformation: null,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        app() {
            return this.$store.state.app;
        },
        stock() {
            return this.$core.getOffer.getOfferStock(this.buyinglistItem);
        },
        checkStatusOfOffer() {
            return this.buyinglistItem.offerInventory.status !== 'INACTIVE';
        },
        customerTags() {
            const tags = [];
            if (this.accountInformation) {
                this.accountInformation.customerTags.forEach((tagCustomer) => {
                    tags.push(tagCustomer.id);
                });
            }
            return tags;
        },
        offerForThisCustomersTag() {
            if (!this.buyinglistItem.offerPrice.customerTagId && !this.buyinglistItem.offerPrice.customerAccountId) {
                return true;
            }
            return this.customerTags.includes(this.buyinglistItem.offerPrice.customerTagId);
        },
        offerForThisAccount() {
            return this.accountInformation?.id === this.buyinglistItem.offerPrice.customerAccountId;
        },
        disableButtonForTag() {
            return !this.offerForThisAccount && !this.offerForThisCustomersTag;
        },
        ecoTax() {
            const customFieldValue =
                this.buyinglistItem.offerInventory.customFieldValues.find(
                    (customField) => customField.customField.externalId === 'ecoparticipation',
                ) ?? 0;
            return this.$purjus.utils.formatPrice(customFieldValue?.value?.value, this.currency);
        },
        totalEcoTax() {
            const customFieldValue =
                this.buyinglistItem.offerInventory.customFieldValues.find(
                    (customField) => customField.customField.externalId === 'ecoparticipation',
                ) ?? 0;
            return this.$purjus.utils.formatPrice(customFieldValue?.value?.value * this.quantity, this.currency);
        },
        isOnQuote() {
            const onQuote = this.$purjus.utils.extractOfferCustomFieldValue(this.buyinglistItem, 'devis');
            return onQuote ? onQuote[0] === 'TRUE' : false;
        },
        isPriceDisplayed() {
            const offerPrice = this.$core.getOffer.getFirstPriceFromOfferPrice(this.buyinglistItem.offerPrice);
            return offerPrice !== null && offerPrice !== 0;
        },
    },
    async created() {
        this.quantity = this.buyinglistItem.quantity;
        this.minOrder = this.buyinglistItem.offerInventory.minOrderQuantity;
        this.accountInformation = await this.$core.useUser.getCustomerAccount();
    },
    methods: {
        handleRemoveItemFromWishlist(itemId) {
            this.$core.useWishlist.deleteItemToWishlist({ data: [itemId], buyingListId: this.buyingListId });
            this.$toast.success(this.$t('notification.product.rmWishlist1'));
        },
        quantityValue(params) {
            this.quantity = params;
            const buyingListCart = {
                buyingListtId: this.buyingListId,
                data: [
                    {
                        offerPriceId: this.buyinglistItem.offerPrice.id,
                        quantity: this.quantity,
                    },
                ],
            };
            this.$core.useWishlist.addItemToWishlist(buyingListCart);
        },
    },
};
</script>

<style lang="scss" scoped>
.actions {
    width: 230px;
}

.quantity-size {
    width: 120px;
}

.price-size {
    width: 185px;
}

td {
    vertical-align: middle;
}
</style>
