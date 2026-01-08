<template>
    <div v-if="product" class="product d-flex align-items-center justify-content-between rounded">
        <div data-label="Product" class="d-flex align-items-center">
            <div class="p-3 shadow-sm">
                <div class="pointer" @click.prevent="handleRemoveProductFromMasterQuote(quoteLine.id)">
                    <SvgIcon name="cross" />
                </div>
            </div>
            <div>
                <nuxt-link :to="localePath(`/product/${productSku}`)">
                    <div class="d-flex align-items-center">
                        <div class="product-thumbnail-image rounded ml-1">
                            <div v-if="productImg">
                                <DjImage :src="productImg" :alt="productTitle" />
                            </div>
                        </div>
                        <div class="d-flex flex-column justify-content-center px-2 py-2">
                            <div class="title-info size-16 font-700">
                                {{ productTitle }}
                            </div>
                            <div class="sub-info size-14">
                                {{ $t('account.quotes.productReference') }} :
                                <span class="font-700">{{ productReference }}</span>
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <div data-label="Quantity" class="quantity">
            <div v-for="n in quoteLine.deliveryLines.length" :key="n" class="pr-2">
                <QuantityQuoteLine
                    :id="quoteLine.id"
                    :key="n"
                    :line="quoteLine.deliveryLines[n - 1]"
                    :masterQuoteId="item.id"
                />
            </div>
        </div>
    </div>
</template>

<script>
import QuantityQuoteLine from '@modules/quote/components/modules/QuantityQuoteLine.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import DjImage from '@components/atoms/DjImage/DjImage.vue';

export default {
    components: {
        QuantityQuoteLine,
        SvgIcon,
        DjImage,
    },
    props: {
        quoteLine: {
            type: Object,
            required: true,
            default: () => {},
        },
        item: {
            type: Object,
            required: true,
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
            return this.$core.getProduct.getProductMainImage(this.quoteLine.productVariant);
        },
        productTitle() {
            return this.quoteLine.productVariant.name;
        },
        productReference() {
            return this.quoteLine.productVariant.externalId;
        },
    },

    async created() {
        this.product = await this.$core.useProduct.getProductsBySku(
            this.$core.getProductVariant.getProductSku(this.quoteLine.productVariant),
        );
        this.$core.useUser.getUserShippingAddressList();
        this.initFirstDelivery(this.quoteLine);
        this.updateSuppliersList();
    },
    methods: {
        async updateSuppliersList() {
            this.suppliersList = await this.$core.useProduct.getListSuppliersbyProductVariantId(
                this.quoteLine.productVariant.id,
            );
            this.selectedSuppliers = [this.suppliersList[0].id];
            const data = {
                MasterQuoteId: this.item.id,
                QuoteLineId: this.quoteLine.id,
                suppliersIds: [this.suppliersList[0].id],
            };
            this.$store.commit('quote/setQuoteLineSuppliers', data);
        },
        addLine() {
            if (this.shippingAddress.length > 1) {
                this.addNewDeliveryLine(this.item.id, this.quoteLine.id);
            } else {
                this.$toast.error(this.$t('notification.quote.delivery'));
            }
        },
        addNewDeliveryLine(masterQuoteId, quoteLineId) {
            const line = {
                quantity: 1,
                addressId: this.shippingAddress[0].id,
                id: Math.random(),
            };
            this.$store.commit('quote/addDeliveryLine', {
                line,
                MasterQuoteId: masterQuoteId,
                QuoteLineId: quoteLineId,
            });
        },
        initFirstDelivery(quoteLine) {
            if (quoteLine.deliveryLines.length === 0) {
                const line = {
                    quantity: quoteLine.quantity,
                    addressId: this.shippingAddress ? this.shippingAddress[0].id : null,
                    id: Math.random(),
                };
                this.$store.commit('quote/addDeliveryLine', {
                    line,
                    MasterQuoteId: this.item.id,
                    QuoteLineId: quoteLine.id,
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

<style lang="scss" scoped>
.product {
    &-thumbnail-image {
        min-height: 60px;
        img {
            max-height: 60px;
            max-width: 60px;
        }
    }
}

@media screen and (min-width: 960px) {
    .product {
        background-color: var(--color-grey-nuance-9);
    }
}

.quantity {
    min-width: 100px;
    width: 100px;
}

.acodis {
    .title-info {
        color: var(--color-primary);
    }
    .sub-info {
        color: var(--color-beige);
    }
}
</style>
