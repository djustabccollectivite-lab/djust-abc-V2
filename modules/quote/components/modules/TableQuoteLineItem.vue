<template>
    <tr v-if="product">
        <td>
            <div class="dj-product--cart">
                <a href="#" @click.prevent="handleRemoveProductFromMasterQuote(quoteLine.id)">
                    <i class="icon-cross-circle"></i>
                </a>
            </div>
        </td>
        <td :data-label="$t('account.quotes.product')">
            <div class="dj-product--cart">
                <DjLink :to="localePath(`/product/${productSku}`)">
                    <ProductSmall
                        :key="refreshIndex"
                        :product="product"
                        :image="productImg"
                        :name="productTitle"
                        :navigationCategoryName="productCategory"
                        :sku="product.sku"
                    />
                </DjLink>
            </div>
        </td>
        <td :data-label="$t('account.quotes.supplierName')">
            <div class="dj-product--cart">
                <suppliers-list-select
                    :productId="$core.getProductVariant.getProductId(quoteLine.productVariant)"
                    :MasterQuoteId="item.id"
                    :QuoteLineId="quoteLine.id"
                ></suppliers-list-select>
            </div>
        </td>
        <td :data-label="$t('account.quotes.quantity')">
            <div v-for="n in quoteLine.deliveryLines.length" :key="n" class="dj-product--cart form-group--number p-3">
                <quantity-quote-line
                    :id="quoteLine.id"
                    :key="n"
                    :quoteLine="quoteLine"
                    :Line="quoteLine.deliveryLines[n - 1]"
                    :MasterQuoteId="item.id"
                />
            </div>
        </td>
        <td :data-label="$t('account.quotes.shippingAddress')">
            <div v-for="n in quoteLine.deliveryLines.length" :key="n" class="dj-product--cart form-group--number p-3">
                <shipping-quote-line
                    :id="quoteLine.id"
                    :key="n"
                    :Line="quoteLine.deliveryLines[n - 1]"
                    :MasterQuoteId="item.id"
                />
            </div>
        </td>
        <td :data-label="$t('account.quotes.actions')">
            <div class="dj-product--cart">
                <button class="dj-btn dj-btn--light" @click="addLine()">
                    <span class="button__text">
                        {{ $t('checkout.shipping.splitDelivery') }}
                    </span>
                </button>
            </div>
        </td>
    </tr>
</template>

<script>
import ShippingQuoteLine from '@modules/quote/components/modules/ShippingQuoteLine.vue';
import QuantityQuoteLine from '@modules/quote/components/modules/QuantityQuoteLine.vue';
import SuppliersListSelect from '@modules/quote/components/modules/SuppliersListSelect.vue';
import ProductSmall from '@components/organisms/productCard/ProductSmall.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    components: {
        ShippingQuoteLine,
        QuantityQuoteLine,
        SuppliersListSelect,
        ProductSmall,
        DjLink,
    },
    props: {
        quoteLine: {
            type: Object,
            required: false,
            default: () => {},
        },
        item: {
            type: Object,
            required: false,
            default: () => {},
        },
        indexOfTab: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            skus: [],
            addressShippingData: [],
            selectedSuppliers: [],
            product: null,
            refreshIndex: 1,
        };
    },
    computed: {
        shippingAddress() {
            return this.$store.state.user.addressShippingList;
        },
        locale() {
            return this.$i18n.localeProperties.code.toUpperCase();
        },
        productSku() {
            if (!this.product) {
                return;
            }
            return this.$core.getProduct.getProductSku(this.product);
        },
        productImg() {
            return this.$core.getProduct.getProductMainImage(this.product);
        },
        productTitle() {
            return this.$core.getProduct.getProductTitle(this.product);
        },
        productCategory() {
            return this.$core.getProduct.getProductCategory(this.product);
        },
    },

    async created() {
        this.product = await this.$core.useProduct.getProductsBySku(
            this.$core.getProductVariant.getProductSku(this.quoteLine.productVariant),
        );
        this.$core.useUser.getUserShippingAddressList();
        this.initFirstDelivery(this.quoteLine);
    },

    methods: {
        addLine() {
            if (this.shippingAddress.length > 1) {
                this.addNewDeliveryLine(this.item.id, this.quoteLine.id);
            } else {
                this.$toast.error(this.$t('notification.quote.delivery'));
            }
        },
        addNewDeliveryLine(MasterQuoteId, QuoteLineId) {
            const line = {
                quantity: 1,
                addressId: this.shippingAddress[0].id,
                id: Math.random(),
            };
            this.$store.commit('quote/addDeliveryLine', {
                line,
                MasterQuoteId,
                QuoteLineId,
            });
        },
        initFirstDelivery(QuoteLine) {
            if (QuoteLine.deliveryLines.length === 0) {
                const Line = {
                    quantity: QuoteLine.quantity,
                    addressId: this.shippingAddress ? this.shippingAddress[0].id : null,
                    id: Math.random(),
                };
                this.$store.commit('quote/addDeliveryLine', {
                    line: Line,
                    MasterQuoteId: this.item.id,
                    QuoteLineId: QuoteLine.id,
                });
            }
        },
        async handleRemoveProductFromMasterQuote(id) {
            const body = {
                masterQuoteDetailsToRemove: [id],
            };
            try {
                await this.$core.useQuote.removeProductFromQuote({
                    masterQuoteId: this.item.id,
                    quoteLineId: this.quoteLine.id,
                    data: body,
                });
            } catch (error) {
                this.$toast.error(this.$t('notification.quote.removeFailed'));
                return;
            }
            this.$nuxt.$emit('refreshProductToShowAfterDelete', this.indexOfTab);
            this.$toast.success(this.$t('notification.quote.remove'));
            this.refreshIndex++;
        },
    },
};
</script>
