<template>
    <DjAccountLayout :idAccountLink="accountLayoutCommandes">
        <div v-if="order">
            <div class="shadow rounded-extra-lg mb-8">
                <div class="d-flex align-items-center bg-black navigation-header pl-6">
                    <span class="text-white font-700 size-24">
                        {{ `${$t('checkout.orderValidation.order')} # ${order.orderCommercialReference}` }}
                    </span>
                </div>
                <div class="row px-4 pt-4 pb-2">
                    <div class="col col-12 col-lg-8">
                        <div class="d-flex align-items-center gap-4 mb-2">
                            <div class="property-label__wide">{{ $t(`account.orderTracking.orderId`) }}</div>
                            <div class="font-700 size-16"># {{ order.orderCommercialReference }}</div>
                        </div>
                        <div class="d-flex align-items-center gap-4 mb-2">
                            <div class="property-label__wide">{{ $t('account.orders.invoice.OrderPlaced') }}</div>
                            <div class="font-700 size-16">{{ orderDateFormated }}</div>
                        </div>
                        <div class="d-flex align-items-center gap-4 mb-2">
                            <div class="property-label__wide">{{ $t('account.orders.invoice.soldBy') }}</div>
                            <div class="font-700 size-16">{{ order.supplierSnapshot.name }}</div>
                        </div>
                        <div class="d-flex align-items-center gap-4 mb-2">
                            <div class="property-label__wide">{{ $t('account.orders.invoice.numberOfProducts') }}</div>
                            <div class="font-700 size-16">{{ order.lines.length }}</div>
                        </div>
                        <div class="d-flex align-items-center gap-4">
                            <div class="property-label__wide">Référence commande</div>
                            <div class="font-700 size-16">{{ referenceOrder ?? 'Non renseigné' }}</div>
                        </div>
                    </div>
                    <div class="col col-12 col-lg-4 d-flex flex-column gap-4">
                        <nuxt-link to="/account/orders">
                            <DjButton
                                :text="$t(`account.orderTracking.orderDetail.back`)"
                                :iconDisplayed="true"
                                shape="button"
                                variant="outlined"
                                icon="arrow-left-small"
                                :fullWidth="true"
                            />
                        </nuxt-link>
                        <div @click.prevent="dialogClaim = true">
                            <DjButton
                                :text="$t('account.orders.invoice.buttons.problemWithOrder')"
                                :iconDisplayed="false"
                                shape="button"
                                variant="outlined"
                                :fullWidth="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="shadow rounded-extra-lg mb-6">
                <div class="d-flex align-items-center bg-black navigation-header pl-6">
                    <span class="text-white font-700 size-24"> Produits commandés </span>
                </div>
                <div v-if="isDesktop" class="p-4">
                    <div class="px-2">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th class="uppercase border-top-0">{{ $t('account.orders.invoice.product') }}</th>
                                    <th class="text-center uppercase border-top-0">
                                        {{ $t('account.orders.invoice.price') }}
                                    </th>
                                    <th class="text-center uppercase border-top-0">
                                        {{ $t('account.orders.invoice.quantity') }}
                                    </th>
                                    <th class="text-center uppercase border-top-0">
                                        {{ $t('account.orders.invoice.amount') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="item in order.lines">
                                    <TableOrdersItemLine v-if="item" :key="item.id" :line="item" />
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else class="p-6">
                    <template v-for="(line, index) in order.lines">
                        <div :key="index" class="shadow d-flex align-items-center gap-4 mb-4 p-2 rounded-lg">
                            <div>
                                <nuxt-link :to="localePath(`/product/${line.orderLogisticLineProductDto.sku}`)">
                                    <DjImage
                                        v-if="line.orderLogisticLineProductDto.thumbnail"
                                        class="img_size"
                                        :src="line.orderLogisticLineProductDto.thumbnail"
                                        :alt="line.orderLogisticLineProductDto.name"
                                    />
                                    <DjImage
                                        v-else
                                        class="img_size"
                                        :src="line.orderLogisticLineProductDto.mainImageUrl"
                                        :alt="line.orderLogisticLineProductDto.name"
                                    />
                                </nuxt-link>
                            </div>
                            <div>
                                <nuxt-link :to="localePath(`/product/${line.orderLogisticLineProductDto.sku}`)">
                                    <span class="text-blue font-700 size-16">
                                        {{
                                            line.orderLogisticLineProductDto.title
                                                ? line.orderLogisticLineProductDto.title
                                                : line.orderLogisticLineProductDto.name
                                        }}
                                    </span>
                                </nuxt-link>
                                <div v-if="line.orderLogisticLineProductDto.brand" class="text-grey-5 d-flex">
                                    <div class="property-label">Marque</div>
                                    <div class="font-700">{{ line.orderLogisticLineProductDto.brand }}</div>
                                </div>
                                <div v-if="line?.orderLogisticLineProductVariantDto?.mpn" class="text-grey-5 d-flex">
                                    <div class="property-label">Réf</div>
                                    <div class="font-700">{{ line?.orderLogisticLineProductVariantDto?.mpn }}</div>
                                </div>
                                <div class="text-grey-5 d-flex">
                                    <div class="property-label">Quantité</div>
                                    <div class="text-black font-700">
                                        {{ $core.getOrder.getQuantity(line, currency) }}
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="property-label">Prix HT</div>
                                    <div
                                        class="text-black font-700"
                                        v-html="$core.getOrder.getProductUnitPrice(line, currency)"
                                    ></div>
                                </div>
                                <div class="text-grey-6 d-flex">
                                    <div class="property-label">+Eco-part</div>
                                    <div class="text-grey-6 font-700">dont XX,XX € HT</div>
                                </div>
                                <div class="d-flex">
                                    <div class="property-label">Prix total</div>
                                    <div
                                        class="text-black font-700"
                                        v-html="$core.getOrder.getProductTotalPrice(line, currency)"
                                    ></div>
                                </div>
                                <div class="text-grey-6 d-flex">
                                    <div class="property-label">+Eco-part</div>
                                    <div class="text-grey-6 font-700">dont XX,XX € HT</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="shadow rounded-extra-lg mb-2">
                <div class="d-flex align-items-center bg-black navigation-header pl-6">
                    <span class="text-white font-700 size-24"> Informations de livraison </span>
                </div>
                <div class="row px-4 pt-6">
                    <div class="col-md-6 col-12">
                        <div class="text-primary font-700 size-24 d-flex align-items-center gap-2 mb-4">
                            <SvgIcon name="pin-point" />
                            {{ $t(`account.orderTracking.orderDetail.shippingAddress`) }}
                        </div>
                        <div class="p-4">
                            <div class="font-700 size-18 mb-2">
                                {{ order.shippingAddressSnapshot.label }}
                            </div>
                            <div class="d-flex align-items-center gap-4 mb-2">
                                <div class="property-label">{{ $t(`account.orderTracking.orderDetail.name`) }}</div>
                                <div class="font-700 size-16">
                                    {{ order.shippingAddressSnapshot.fullName }}
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-4 mb-2">
                                <div class="property-label">{{ $t(`account.orderTracking.orderDetail.address`) }}</div>
                                <div class="font-700 size-16">
                                    {{ order.shippingAddressSnapshot.address }}
                                    {{ order.shippingAddressSnapshot.additionalAddress }}
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-4 mb-2">
                                <div class="property-label">{{ $t(`account.orderTracking.orderDetail.city`) }}</div>
                                <div class="font-700 size-16">
                                    {{ order.shippingAddressSnapshot.zipcode }}
                                    {{ order.shippingAddressSnapshot.city }}
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-4 mb-2">
                                <div class="property-label">{{ $t(`account.orderTracking.orderDetail.country`) }}</div>
                                <div class="font-700 size-16">
                                    {{ order.shippingAddressSnapshot.country }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="text-primary font-700 size-24 d-flex align-items-center gap-2 mb-4">
                            <SvgIcon name="pin-point" />
                            {{ $t(`account.orderTracking.orderDetail.billingAddress`) }}
                        </div>
                        <div class="p-4">
                            <div class="font-700 size-18 mb-2">
                                {{ order.billingAddressSnapshot.label }}
                            </div>
                            <div class="d-flex align-items-center gap-4 mb-2">
                                <div class="property-label">{{ $t(`account.orderTracking.orderDetail.name`) }}</div>
                                <div class="font-700 size-16">
                                    {{ order.billingAddressSnapshot.fullName }}
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-4 mb-2">
                                <div class="property-label">{{ $t(`account.orderTracking.orderDetail.address`) }}</div>
                                <div class="font-700 size-16">
                                    {{ order.billingAddressSnapshot.address }}
                                    {{ order.billingAddressSnapshot.additionalAddress }}
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-4 mb-2">
                                <div class="property-label">{{ $t(`account.orderTracking.orderDetail.city`) }}</div>
                                <div class="font-700 size-16">
                                    {{ order.billingAddressSnapshot.zipcode }}
                                    {{ order.billingAddressSnapshot.city }}
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-4 mb-2">
                                <div class="property-label">{{ $t(`account.orderTracking.orderDetail.country`) }}</div>
                                <div class="font-700 size-16">
                                    {{ order.billingAddressSnapshot.country }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DjModal v-model="dialogClaim" width="600">
                <div>
                    <div class="bg-grey d-flex justify-space-between align-items-center p-4 py-6">
                        <div class="text-blue font-700 size-18">
                            {{ $t('account.orders.complaint.title') }}
                        </div>
                        <div @click.prevent="dialogClaim = false">
                            <SvgIcon name="close-circle" />
                        </div>
                    </div>
                    <div class="p-4 bg-white">
                        <div class="pa-2"></div>
                        <ValidationObserver v-slot="{}" ref="form">
                            <div>
                                <ValidationProvider v-slot="{ errors }" mode="eager" name="subreason" rules="required">
                                    <v-select
                                        v-model="subreason"
                                        :items="subReasonList"
                                        :label="$t('account.orders.complaint.submotif')"
                                        :error-messages="errors[0]"
                                        item-text="label"
                                        item-value="id"
                                        class="mr-4"
                                        validate-on-blur
                                        return-object
                                        dense
                                        outlined
                                    />
                                </ValidationProvider>
                                <ValidationProvider
                                    v-if="reason && reason.claimReasonType !== 'ORDER_MESSAGING'"
                                    v-slot="{ errors }"
                                    mode="eager"
                                    name="product"
                                    rules="required"
                                >
                                    <VRadioGroup
                                        v-for="orderItem in order.lines"
                                        :key="orderItem.id"
                                        v-model="orderItemSelected"
                                        :error-messages="errors[0]"
                                        class="d-flex flex-row mt-0"
                                        dense
                                    >
                                        <div class="d-flex">
                                            <ProductOrderSelect
                                                :product="orderItem"
                                                :isSelected="orderItemSelected === orderItem.id"
                                                :line="false"
                                            />
                                        </div>
                                    </VRadioGroup>
                                </ValidationProvider>
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    mode="eager"
                                    name="message"
                                    rules="required|max:50000|min:3"
                                >
                                    <v-textarea
                                        v-model="message"
                                        :label="$t('account.orders.complaint.message')"
                                        :error-messages="errors[0]"
                                        class="mr-4"
                                        dense
                                        outlined
                                    />
                                </ValidationProvider>
                                <div @click.prevent="handleCreateClaim()">
                                    <DjButton
                                        variant="contained"
                                        :text="$t('account.orders.complaint.validate')"
                                        :fullWidth="true"
                                        :isDisabled="isDisabled"
                                    >
                                    </DjButton>
                                </div>
                            </div>
                        </ValidationObserver>
                    </div>
                </div>
            </DjModal>
        </div>
    </DjAccountLayout>
</template>

<script>
import TableOrdersItemLine from '@components/templates/account/orders/modules/TableOrdersItemLine.vue';
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjImage from '@components/atoms/DjImage/DjImage.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import moment from 'moment/moment';
import { mapState } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import ProductOrderSelect from '@components/organisms/productCard/ProductOrderSelect.vue';

export default {
    name: 'OrderDetailTemplate',
    components: {
        TableOrdersItemLine,
        DjAccountLayout,
        SvgIcon,
        DjButton,
        DjImage,
        DjModal,
        ValidationObserver,
        ValidationProvider,
        ProductOrderSelect,
    },
    props: {
        order: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            accountLayoutCommandes: 'Commandes',
            isDesktop: window.innerWidth > 960,
            dialogClaim: false,
            reason: { claimReasonType: 'INCIDENT_OPEN' },
            subreason: null,
            message: null,
            reviewMessage: null,
            subReasonList: [],
            orderItemSelected: null,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        orderDateFormated() {
            return moment(String(this.order.createdAt)).format('DD/MM/YYYY hh:mm');
        },
        referenceOrder() {
            return this.$purjus.utils.extractOrderCustomFieldValue(this.order, 'REF_COMMANDE');
        },
        isDisabled() {
            if (this.reason && this.reason.claimReasonType === 'ORDER_MESSAGING') {
                if (!this.subreason || !this.message) {
                    return true;
                }
            } else if (
                ['INCIDENT_OPEN', 'REFUND', 'OFFER_MESSAGING', 'CANCELATION'].includes(this.reason?.claimReasonType)
            ) {
                if (!this.subreason || !this.orderItemSelected || !this.message) {
                    return true;
                }
            }
            return false;
        },
    },
    async mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
        this.subReasonList = await this.$core.useOrder.getAllSubReasonTypes(this.reason.claimReasonType);
        await this.$core.useOrder.APIgetAllReasonTypes();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            this.isDesktop = window.innerWidth > 960;
        },
        handleCreateClaim() {
            if (this.reason && this.reason.claimReasonType === 'ORDER_MESSAGING') {
                if (this.$refs.form.fields.message.invalid || this.$refs.form.fields.subreason.invalid) {
                    this.$toast.error(this.$t('notification.order.error'));
                    return;
                }
            } else if (
                this.$refs.form.fields.subreason.invalid ||
                this.$refs.form.fields.product.invalid ||
                this.$refs.form.fields.message.invalid
            ) {
                this.$toast.error(this.$t('notification.order.error'));
                return;
            }
            const request = {
                message: this.message,
                reasonCode: this.subreason.externalId,
                lineId: this.orderItemSelected,
            };
            const response = this.$core.useOrder.createClaim(this.order.id, request);
            if (response) {
                this.$toast.success(this.$t('notification.order.update'));
                this.dialogClaim = false;
            } else {
                this.$toast.error(this.$t('notification.order.error'));
                this.dialogClaim = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.rounded-extra-lg {
    border-radius: 24px;
}

.property-label {
    min-width: 100px;
    &__wide {
        min-width: 150px;
    }
}

.img_size {
    width: 100%;
    max-width: 118px;
    max-height: 118px;
    min-width: 118px;
    min-height: 118px;
}
</style>
