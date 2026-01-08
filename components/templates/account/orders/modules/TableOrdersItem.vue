<template>
    <div class="dj-section__order order-details-bg">
        <div class="rounded-lg mb-0 border d-flex flex-column justify-content-start overflow-x-auto">
            <div class="px-2 rounded-lg d-grid align-items-center justify-content-start bg-white">
                <DjLink :to="'/account/orders/' + order.id" class="font-weight-bold text-wrap">
                    # {{ order.reference }}
                </DjLink>
                <div class="d-flex flex-column align-items-center">
                    <p class="mb-0 order-date text-center order-text-color order-text-font-size">
                        {{ orderDateFormated.split(' ')[1] }}
                    </p>
                    <p class="mb-0 order-date text-center order-text-color order-text-font-size">
                        {{ orderDateFormated.split(' ')[0] }}
                    </p>
                </div>
                <p class="mb-0 text-center font-weight-bold order-text-color order-text-font-size">
                    {{ order.lines.length }}
                </p>
                <div class="d-flex flex-column align-items-center">
                    <p
                        class="mb-0 font-weight-bold order-text-color order-text-font-size"
                        v-html="totalOrderPriceWithTax"
                    ></p>
                    <p class="mb-0 total-subtext font-weight-normal order-text-color">
                        {{ $t('account.orders.vatIncluded') }}
                    </p>
                </div>
                <DjBadge :class="shippingBadgeClass" class="text-wrap">{{
                    $t(`account.orders.shippingStatus.${order.status}`)
                }}</DjBadge>
                <DjBadge :class="paymentBadgeClass" class="text-wrap">{{
                    $t(`account.orders.paymentStatus.${order.paymentStatus}`)
                }}</DjBadge>
                <div class="d-flex justify-content-center">
                    <div @click="toggleShowDetails" class="btn-icon-wrapper">
                        <DjButton
                            shape="icon"
                            :iconDisplayed="true"
                            :textDisplayed="false"
                            styleButton="outline"
                            :icon="chevron"
                            :text="''"
                        />
                    </div>
                </div>
            </div>
            <!-- Dropdown content -->
            <TableProducts
                v-if="showDetails"
                :products="products"
                :status="order.status"
                :orderId="order.id"
                :shippingAddress="order.shippingAddressSnapshot"
                @confirmDelivery="confirmDelivery"
                @validateOrder="validateOrder"
                @refuseOrder="refuseOrder"
                @openClaimModal="openClaimModal"
                @writeReview="writeReview"
            />
        </div>

        <DjModal v-model="dialogReview" width="600">
            <DjCard :title="$t('account.orders.review.title')">
                <div class="pl-2">
                    <div class="pa-2"></div>

                    <ValidationObserver tag="form" ref="formReview">
                        <div>
                            <ValidationProvider
                                mode="eager"
                                v-slot="{ errors }"
                                :name="$t('account.orders.review.message')"
                                rules="required|max:50000|min:3"
                            >
                                <v-textarea
                                    v-model="reviewMessage"
                                    :label="$t('account.orders.review.message')"
                                    :error-messages="errors[0]"
                                    class="mr-4"
                                    dense
                                    outlined
                                />
                            </ValidationProvider>

                            <div class="d-flex align-items-center">
                                <p>Donnez une note à votre commande :</p>

                                <v-rating
                                    v-model="rating"
                                    background-color="indigo lighten-3"
                                    color="indigo"
                                    large
                                    class="mb-4"
                                />
                            </div>

                            <div @click.prevent="handleCreateReview()">
                                <DjButton
                                    styleButton="secondary"
                                    :text="$t('account.orders.review.validate')"
                                    :fullWidth="true"
                                    :isDisabled="isDisabledForReview"
                                />
                            </div>
                        </div>
                    </ValidationObserver>
                </div>
            </DjCard>
        </DjModal>

        <DjModal v-model="dialogClaim" width="600">
            <DjCard :title="$t('account.orders.complaint.title')">
                <div class="pl-2">
                    <div class="pa-2"></div>

                    <ValidationObserver ref="form">
                        <div>
                            <ValidationProvider mode="eager" v-slot="{ errors }" name="reason" rules="required">
                                <v-select
                                    v-model="reason"
                                    :items="reasonList"
                                    :label="$t('account.orders.complaint.motif')"
                                    :error-messages="errors[0]"
                                    item-text="label"
                                    item-value="id"
                                    class="mr-4"
                                    validate-on-blur
                                    return-object
                                    dense
                                    outlined
                                    v-on:change="changeReason"
                                />
                            </ValidationProvider>

                            <ValidationProvider mode="eager" v-slot="{ errors }" name="subreason" rules="required">
                                <v-select
                                    v-model="subreason"
                                    v-show="reason"
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
                                mode="eager"
                                v-slot="{ errors }"
                                name="product"
                                rules="required"
                            >
                                <VRadioGroup
                                    dense
                                    v-model="orderItemSelected"
                                    v-for="orderItem in order.lines"
                                    :key="orderItem.id"
                                    class="d-flex flex-row mt-0"
                                    :error-messages="errors[0]"
                                >
                                    <div class="d-flex">
                                        <ProductOrderSelect
                                            :product="orderItem"
                                            :isSelected="orderItemSelected == orderItem.id"
                                            :line="false"
                                        />
                                    </div>
                                </VRadioGroup>
                            </ValidationProvider>

                            <ValidationProvider
                                mode="eager"
                                v-slot="{ errors }"
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
                                    styleButton="secondary"
                                    :text="$t('account.orders.complaint.validate')"
                                    :fullWidth="true"
                                    :isDisabled="IsDisabled"
                                >
                                </DjButton>
                            </div>
                        </div>
                    </ValidationObserver>
                </div>
            </DjCard>
        </DjModal>
        <DjModal v-model="vendorModal" width="600">
            <DjCard :title="$t('account.orders.vendor.vendorMessage')">
                <div class="pl-2">
                    {{ order.fulfillmentMessage }}
                </div>
            </DjCard>
        </DjModal>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import TableOrdersItemLine from '@components/templates/account/orders/modules/TableOrdersItemLine.vue';
import moment from 'moment';
import OrderTimeline from '@components/templates/account/orders/modules/OrderTimeline.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjRadio from '@components/atoms/DjRadio/DjRadio.vue';
import ProductOrderSelect from '@components/organisms/productCard/ProductOrderSelect.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjBadge from '@components/atoms/DjBadge/DjBadge.vue';
import DjRating from '@components/atoms/DjRating/DjRating.vue';
import DjInputNumber from '@components/atoms/DjInput/DjInputNumber.vue';
import TableProducts from '@components/templates/account/orders/modules/TableProducts.vue';

export default {
    name: 'TableOrder',
    components: {
        DjButton,
        TableOrdersItemLine,
        OrderTimeline,
        DjLink,
        DjCard,
        DjModal,
        ValidationObserver,
        ValidationProvider,
        DjRadio,
        ProductOrderSelect,
        DjBadge,
        DjRating,
        DjInputNumber,
        TableProducts,
    },
    props: {
        reasonList: {
            type: Array,
            default: () => [],
        },
        order: {
            type: Object,
            default: () => {},
        },
        validation: {
            type: Boolean,
            defaut: false,
        },
    },
    data: () => ({
        e6: 1,
        dialogClaim: false,
        vendorModal: false,
        reason: null,
        subreason: null,
        message: null,
        reviewMessage: null,
        subReasonList: [],
        orderItemSelected: null,
        dialogReview: false,
        rating: 3,
        isIncidentDeclared: false,
        showDetails: false,
    }),
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        IsDisabled() {
            if (this.reason && this.reason.claimReasonType === 'ORDER_MESSAGING') {
                if (!this.subreason || !this.message) {
                    return true;
                }
            } else if (
                (this.reason && this.reason.claimReasonType === 'INCIDENT_OPEN') ||
                'REFUND' ||
                'OFFER_MESSAGING' ||
                'CANCELATION'
            ) {
                if (!this.subreason || !this.orderItemSelected || !this.message) {
                    return true;
                }
            } else {
                return false;
            }
        },
        incidentDeclared() {
            if (['SHIPPED', 'PARTIALLY_SHIPPED', 'COMPLETED', 'WAITING_SHIPMENT'].includes(this.order.status)) {
                return this.isIncidentDeclared || this.order.incidentDeclared;
            }
            return true;
        },
        isDisabledForReview() {
            return !this.reviewMessage;
        },
        //TODO passer en getter
        totalOrderPrice() {
            return this.$core.useHelper.formatCurrencyAuto(
                this.order.orderLogisticPrices.totalProductWithoutTax,
                this.currency
            );
        },
        totalOrderPriceWithTax() {
            return this.$core.useHelper.formatCurrencyAuto(
                this.order.orderLogisticPrices.totalOrderPrice,
                this.currency
            );
        },
        //TODO passer en getter
        orderDateFormated() {
            return moment(String(this.order.createdAt)).format('DD/MM/YYYY hh:mm');
        },
        shippingTrackingUrl() {
            return this.$core.getOrder.getShippingTrackingURL(this.order);
        },
        chevron() {
            return this.showDetails ? 'icon-chevron-down' : 'icon-chevron-up';
        },
        products() {
            return this.order.lines;
        },
        shippingBadgeClass() {
            return this.$core.useHelper.orderBadgeClassNew[this.order.status];
        },
        paymentBadgeClass() {
            return this.$core.useHelper.paymentBadgeClassNew[this.order.paymentStatus];
        },
    },
    methods: {
        openClaimModal() {
            if (!this.incidentDeclared) {
                this.dialogClaim = true;
            }
        },
        openVendorMessage() {
            this.vendorModal = true;
        },
        async changeReason(r) {
            this.subreason = null;
            this.subReasonList = await this.$core.useOrder.getAllSubReasonTypes(r.claimReasonType);
        },
        writeReview() {
            this.dialogReview = true;
        },
        async confirmDelivery() {
            try {
                await this.$core.useOrder.confirmOrderDelivery(this.order.id).then((response) => {
                    if (response.status == 200) {
                        this.$toast.success(this.$t('notification.order.update'));
                        this.$emit('reload-orders');
                    } else {
                        this.$toast.error(this.$t('notification.order.error'));
                    }
                });
            } catch (e) {
                this.$toast.error(this.$t('notification.order.error'));
            }
        },
        validateOrder() {
            const succes = this.$core.useOrder.validateOrder(this.order.id);
            if (succes) {
                this.$toast.success(this.$t('notification.order.update'));
            } else {
                this.$toast.error(this.$t('notification.order.error'));
            }
        },
        refuseOrder() {
            const succes = this.$core.useOrder.unvalidateOrder(this.order.id);
            if (succes) {
                this.$toast.success(this.$t('notification.order.update'));
            } else {
                this.$toast.error(this.$t('notification.order.error'));
            }
        },
        async handleCreateReview() {
            if (!this.$refs.formReview.validate()) {
                return;
            }
            const succes = await this.$core.useOrder.createOrderReview(this.order.id, {
                comment: this.reviewMessage,
                grade: this.rating,
            });

            if (succes) {
                this.$toast.success(this.$t('notification.postReview.update'));
                this.dialogReview = false;
            } else {
                this.$toast.error(this.$t('notification.postReview.error'));
            }
        },
        async handleCreateClaim() {
            if (this.reason && this.reason.claimReasonType === 'ORDER_MESSAGING') {
                if (this.$refs.form.fields.message.invalid || this.$refs.form.fields.subreason.invalid) {
                    this.$toast.error(this.$t('notification.order.error'));
                    return;
                }
            } else {
                if (
                    this.$refs.form.fields.subreason.invalid ||
                    this.$refs.form.fields.product.invalid ||
                    this.$refs.form.fields.message.invalid
                ) {
                    this.$toast.error(this.$t('notification.order.error'));
                    return;
                }
            }
            const request = {
                message: this.message,
                reasonCode: this.subreason.externalId,
                lineId: this.orderItemSelected,
            };

            const succes = await this.$core.useOrder.createClaim(this.order.id, request);

            if (succes) {
                this.$toast.success(this.$t('notification.order.update'));
                this.dialogClaim = false;
                this.isIncidentDeclared = true;
            } else {
                this.$toast.error(this.$t('notification.order.error'));
                this.dialogClaim = false;
            }
            this.reason = null;
            this.subreason = null;
            this.orderItemSelected = null;
            this.message = '';
            if (this.$refs.form) {
                this.$refs.form.reset();
            }
        },
        toggleShowDetails() {
            this.showDetails = !this.showDetails;
        },
    },
};
</script>

<style lang="scss">
.divider {
    padding-left: 30px;
}

.red {
    background-color: red;
}

.green {
    background-color: green;
}

.order-bloc_stepper {
    border-right: 0px solid #ccc;
    display: flex;
    flex-direction: column;
    min-width: 250px;
    padding: 2rem;
}

.steps-vertical {
    display: flex;
    flex-direction: column;
}

.steps-vertical .step-item + .step-item {
    margin-left: 0;
    margin-top: 25px;
}

.steps {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: flex-start;
}

.step-link {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 12px;
    color: #1b2e4b;
}

.step-number {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: var(--font-1st);
    color: #8392a5;
    border: 2px solid #8392a5;
    border-radius: 100%;

    &.decline {
        background-color: #dc3545 !important;
        border-color: #dc3545 !important;
    }
}

.step-item {
    display: inline-block;
    position: relative;

    &.complete {
        .step-number {
            background-color: #276542;
            border-color: #276542;
            color: #fff;
        }

        .step-title {
            color: #276542;
        }
    }

    &.active {
        .step-number {
            background-color: #10b759;
            border-color: #10b759;
            color: #fff;
        }

        .step-title {
            color: #10b759;
        }
    }

    &.decline {
        .step-number {
            background-color: #dc3545;
            border-color: #dc3545;
            color: #fff;
        }

        .step-title {
            color: #dc3545 !important;
        }
    }
}

.step-item.complete .step-link {
    color: #10b759;
}

@media (max-width: 420px) {
    .mobileFlex {
        display: flex;
        flex-direction: column;
    }

    .flexRow {
        display: flex;
        flex-direction: row;
    }
}

.steps-sm .step-link {
    font-size: 11px;
    font-weight: 600;
    font-family: var(--font-1st);
    text-transform: uppercase;
    letter-spacing: 0.2px;
}

.steps-sm .step-number {
    width: 25px;
    height: 25px;
}

*,
:after,
:before {
    box-sizing: border-box;
}

.steps-vertical .step-title {
    width: auto;
    white-space: normal;
}

@media (min-width: 768px) {
    .step-title {
        width: auto;
        overflow: visible;
        text-overflow: inherit;
    }
}

@media (min-width: 576px) {
    .step-title {
        margin-left: 10px;
        width: auto;
        white-space: normal;
    }
}

@media (max-width: 576px) {
    .step-title {
        margin-left: 5px;
        width: auto;
        white-space: normal;
    }
}

.steps-vertical .step-item + .step-item:before {
    content: '';
    position: absolute;
    top: -20px;
    left: 12px;
    height: 15px;
    width: 1px;
    background-color: #cdd4e0;
    display: block;
}

.steps-sm .step-item + .step-item:before {
    font-size: 12px;
}

.disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
}

.dj-section-invoice__content {
    @media (max-width: 850px) {
        display: flex;
        flex-direction: column;
    }
}

.problemOrder {
    @media (max-width: 500px) {
        display: flex;
        font-size: 13px;
        width: 65px;
        height: 60px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
}

.mobile {
    @media (max-width: 850px) {
        max-width: 100% !important;
        width: 100% !important;
    }
}
.logisticStatus {
    a {
        font-size: 11px;
        text-decoration: underline;
    }
}

.order-date {
    max-width: 8rem;
}

.total-text {
    font-weight: 700;
}

.total-subtext {
    font-size: 1rem;
    font-weight: 500;
}

.d-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(10rem, 1fr));
    gap: 10px;
    padding: 20px;
    overflow-x: auto; /* Ajoute une barre de défilement horizontale si nécessaire */
    white-space: nowrap; /* Empêche le renvoi à la ligne des éléments fils */
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-content: space-between;

    &.grid-item:not(:last-child) {
        border-bottom: 1px solid #dee2e6;
    }
}

.order-text {
    &-color {
        color: var(--color-link, #000);
    }
    &-font-size {
        font-size: 12px;
    }
}

.order-details-bg {
    background-color: var(--background-global);
}

.btn-icon-wrapper .dj-btn--icon {
    font-size: 2rem;
}

.order-dropdown-body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    margin-top: 2rem;

    & > .product-list {
        width: 70%;
    }

    & > .order-data {
        min-width: 25%;
        gap: 5px;
    }

    @media (max-width: 1230px) {
        & > .product-list,
        & > .order-data {
            width: 100%;
            max-width: initial;
        }

        & > .product-list {
            margin-top: 3rem;
        }
    }
}

.product-img {
    width: 36px;
    height: auto;
}
</style>
