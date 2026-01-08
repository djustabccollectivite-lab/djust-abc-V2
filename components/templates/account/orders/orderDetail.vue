<template>
    <DjAccountLayout :idAccountLink="accountLayoutCommandes">
        <DjCard
            headerColor="var(--color-secondary)"
            :title="`${$t('checkout.orderValidation.order')} # ${order.orderCommercialReference}`"
            class="mb-4"
        >
            <div class="grid-col-3">
                <div class="d-flex flex-column">
                    <div class="d-flex flex-row align-items-center justify-content-between mb-2">
                        <p class="mb-0">{{ $t('account.orderTracking.orderId').toUpperCase() }} :</p>
                        <p class="mb-0 font-weight-bold"># {{ order.orderCommercialReference }}</p>
                    </div>
                    <div class="d-flex flex-row align-items-center justify-content-between mb-2">
                        <p class="mb-0">{{ $t('account.orders.orderDate').toUpperCase() }} :</p>
                        <p class="mb-0 font-weight-bold">{{ orderDateFormated }}</p>
                    </div>
                    <div class="d-flex flex-row align-items-center justify-content-between mb-2">
                        <p class="mb-0">{{ $t('account.orders.soldBy').toUpperCase() }} :</p>
                        <p class="mb-0 font-weight-bold">{{ order.supplierSnapshot.name }}</p>
                    </div>
                    <div class="d-flex flex-row align-items-center justify-content-between">
                        <p class="mb-0">{{ $t('account.orders.shipment').toUpperCase() }} :</p>
                        <DjBadge :class="$core.useHelper.orderBadgeClassNew[order.status]" class="text-wrap">{{
                            $t(`account.orders.shippingStatus.${order.status}`)
                        }}</DjBadge>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <div class="d-flex flex-row align-items-center justify-content-between mb-2">
                        <p class="mb-0">{{ $t('account.quotes.NumberOfProducts').toUpperCase() }} :</p>
                        <p class="mb-0 font-weight-bold">{{ order.lines.length }}</p>
                    </div>
                    <div class="d-flex flex-row align-items-center justify-content-between">
                        <p class="mb-0">{{ $t('account.orders.paymentTracking').toUpperCase() }} :</p>
                        <DjBadge :class="$core.useHelper.paymentBadgeClassNew[order.paymentStatus]" class="text-wrap">{{
                            $t(`account.orders.paymentStatus.${order.paymentStatus}`)
                        }}</DjBadge>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <DjLink class="outline-link" to="/account/orders">
                        <div>
                            <DjIcon class="icon-arrow-left" size="1.5rem" />
                            <DjLink to="/account/orders">
                                {{ $t('account.orderTracking.orderDetail.back') }}
                            </DjLink>
                        </div>
                    </DjLink>
                    <div v-if="needConfirm" @click="confirmDelivery">
                        <DjButton
                            class="mb-2"
                            :fullWidth="true"
                            styleButton="primary"
                            :text="$t('account.orders.invoice.buttons.confirmDelivery')"
                        />
                    </div>
                    <template v-if="needValidate">
                        <div @click="validateOrder">
                            <DjButton
                                class="mb-2"
                                :fullWidth="true"
                                styleButton="primary"
                                :text="$t('account.orders.invoice.buttons.validateOrder')"
                            />
                        </div>
                        <div @click="refuseOrder">
                            <DjButton
                                :fullWidth="true"
                                styleButton="primary"
                                :text="$t('account.orders.invoice.buttons.refuseOrder')"
                            />
                        </div>
                    </template>
                    <div v-if="canDeclareIncident" @click="openClaimModal">
                        <DjButton
                            class="mb-2"
                            :fullWidth="true"
                            styleButton="outline"
                            :text="$t('account.orders.invoice.buttons.problemWithOrder')"
                        />
                    </div>
                    <div v-if="canWriteReview" @click="writeReview">
                        <DjButton
                            :fullWidth="true"
                            styleButton="outline"
                            :text="$t('account.orders.invoice.buttons.writeProductReview')"
                        />
                    </div>
                </div>
            </div>
        </DjCard>
        <DjCard headerColor="var(--color-secondary)" title="Product ordered" class="mb-4">
            <div class="product-container">
                <div class="product-list">
                    <div class="product-grid p-2 border-bottom">
                        <p class="mb-0 text-center font-weight-bold order-text-color">
                            {{ $t('account.orders.orderProductsTable.productName').toUpperCase() }}
                        </p>
                        <p class="mb-0 text-center font-weight-bold order-text-color">
                            {{ $t('account.orders.orderProductsTable.price').toUpperCase() }}
                        </p>
                        <p class="mb-0 text-center font-weight-bold order-text-color">
                            {{ $t('account.orders.orderProductsTable.quantity').toUpperCase() }}
                        </p>
                        <p class="mb-0 text-center font-weight-bold order-text-color">
                            {{ $t('account.orders.orderProductsTable.totalPrice').toUpperCase() }}
                        </p>
                    </div>
                    <div
                        v-for="(product, indexProduct) in lines"
                        :key="indexProduct"
                        class="product-grid p-2 grid-item"
                    >
                        <div class="d-flex align-items-center">
                            <img
                                :src="product.orderLogisticLineProductDto.mainImageUrl"
                                alt="product img"
                                class="mr-2 product-img"
                            />
                            <p class="mb-0 order-text-color order-text-font-size text-wrap">
                                {{ product.orderLogisticLineProductDto.name }}
                            </p>
                        </div>
                        <p
                            class="mb-0 text-center order-text-color order-text-font-size"
                            v-html="productUnitPrice(product)"
                        ></p>
                        <p class="mb-0 text-center order-text-color order-text-font-size">{{ product.quantity }}</p>
                        <p
                            class="mb-0 text-center order-text-color order-text-font-size"
                            v-html="totalProductPriceWithoutTax(product)"
                        ></p>
                    </div>
                    <div class="mt-2">
                        <DjPagination
                            :currentPage="linesPage"
                            :lastPage="totalLinesPages"
                            @prevPagination="prevPagination"
                            @nextPagination="nextPagination"
                            @moveToPage="moveToPage"
                        />
                    </div>
                </div>
            </div>
        </DjCard>
        <DjCard headerColor="var(--color-secondary)" title="Delivery informations">
            <div class="d-flex flex-row justify-content-between">
                <div class="w-45">
                    <header class="border-bottom">
                        <p class="mb-0 pb-2 display-2">Billing address</p>
                    </header>
                    <p class="mt-2 mb-0 font-weight-bold">{{ order.billingAddressSnapshot.fullName }}</p>
                    <div class="d-flex flex-row align-items-center">
                        <p class="mb-0 mr-1">{{ $t('account.address.address') }} :</p>
                        <p class="mb-0">{{ order.billingAddressSnapshot.address }}</p>
                    </div>
                    <p class="mb-0">
                        {{ order.billingAddressSnapshot.zipcode }} {{ order.billingAddressSnapshot.city }}
                    </p>
                    <div class="d-flex flex-row align-items-center">
                        <p class="mb-0 mr-1">{{ $t('account.address.country') }} :</p>
                        <p class="mb-0">{{ order.shippingAddressSnapshot.country }}</p>
                    </div>
                </div>
                <div class="w-45">
                    <header class="border-bottom">
                        <p class="mb-0 pb-2 display-2">Delivery address</p>
                    </header>
                    <p class="mt-2 mb-0 font-weight-bold">{{ order.shippingAddressSnapshot.fullName }}</p>
                    <div class="d-flex flex-row align-items-center">
                        <p class="mb-0 mr-1">{{ $t('account.address.address') }} :</p>
                        <p class="mb-0">{{ order.shippingAddressSnapshot.address }}</p>
                    </div>
                    <p class="mb-0">
                        {{ order.shippingAddressSnapshot.zipcode }} {{ order.shippingAddressSnapshot.city }}
                    </p>
                    <div class="d-flex flex-row align-items-center">
                        <p class="mb-0 mr-1">{{ $t('account.address.country') }} :</p>
                        <p class="mb-0">{{ order.shippingAddressSnapshot.country }}</p>
                    </div>
                </div>
            </div>
        </DjCard>

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
                                ></v-rating>
                            </div>

                            <div @click.prevent="handleCreateReview()">
                                <DjButton
                                    styleButton="secondary"
                                    :text="$t('account.orders.review.validate')"
                                    :fullWidth="true"
                                    :isDisabled="IsDisabledforReview"
                                >
                                </DjButton>
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
    </DjAccountLayout>
</template>

<script>
import TableOrdersItem from '@components/templates/account/orders/modules/TableOrdersItem.vue';
import DjBadge from '@components/atoms/DjBadge/DjBadge.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import moment from 'moment';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import DjPagination from '@components/atoms/DjPagination/DjPagination.vue';
import ProductOrderSelect from '@components/organisms/productCard/ProductOrderSelect.vue';

export default {
    name: 'OrderDetailTemplate',
    components: {
        TableOrdersItem,
        DjBadge,
        DjLink,
        DjAccountLayout,
        DjCard,
        DjButton,
        ValidationObserver,
        ValidationProvider,
        DjModal,
        DjIcon,
        ProductOrderSelect,
        DjPagination,
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
            documents: null,
            dialogClaim: false,
            dialogReview: false,
            reason: null,
            subreason: null,
            message: null,
            reviewMessage: null,
            orderItemSelected: null,
            rating: 3,
            reasonList: [],
            subReasonList: [],
            lines: [],
            linesPage: 0,
            totalLinesPages: 1,
        };
    },
    computed: {
        orderDateFormated() {
            return moment(String(this.order.createdAt)).format('DD/MM/YYYY hh:mm');
        },
        needConfirm() {
            return this.order.status === 'SHIPPED';
        },
        needValidate() {
            return this.order.status === 'WAITING_CUSTOMER_APPROVAL';
        },
        canDeclareIncident() {
            return ['WAITING_SHIPMENT', 'SHIPPED', 'COMPLETED'].includes(this.order.status);
        },
        canWriteReview() {
            return this.order.status === 'COMPLETED';
        },
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
            return ['SHIPPED', 'PARTIALLY_SHIPPED', 'COMPLETED', 'WAITING_SHIPMENT'].includes(this.order.status)
                ? this.order.incidentDeclared
                : true;
        },
        IsDisabledforReview() {
            return this.reviewMessage ? false : true;
        },
    },
    async created() {
        this.documents = this.order ? await this.$core.useOrder.getAllOrderDocuments(this.order.id) : null;
        this.reasonList = await this.$core.useOrder.APIgetAllReasonTypes();
        await this.getLines();
    },
    methods: {
        downloadDocument(documentId, documentName) {
            this.$core.useOrder.getdownloadDocumentByID(this.order.id, documentId, documentName);
        },
        colorOfDocument(documentType) {
            return {
                'icon-file-empty': true,
                igreen: documentType === 'CUSTOMER_INVOICE',
                iblue: documentType === 'SYSTEM_DELIVERY_BILL',
            };
        },
        confirmDelivery() {
            const succes = this.$core.useOrder.confirmOrderDelivery(this.order.id);

            if (succes) {
                this.$toast.success(this.$t('notification.order.update'));
            } else {
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
        openClaimModal() {
            if (!this.incidentDeclared) {
                this.dialogClaim = true;
            }
        },
        writeReview() {
            this.dialogReview = true;
        },
        async changeReason(r) {
            this.subreason = null;
            this.subReasonList = await this.$core.useOrder.getAllSubReasonTypes(r.claimReasonType);
        },
        productUnitPrice(data) {
            return this.$core.useHelper.formatCurrencyAuto(
                data.orderLogisticLinePriceDto.itemPriceWithoutTaxes,
                data.orderLogisticLinePriceDto.currency
            );
        },
        totalProductPriceWithoutTax(data) {
            return this.$core.useHelper.formatCurrencyAuto(
                data.orderLogisticLinePriceDto.totalPriceWithoutTaxes,
                data.orderLogisticLinePriceDto.currency
            );
        },
        async getLines() {
            try {
                const lines = await this.$core.useOrder.getOrdersLinesListPaginate(this.order.id, this.linesPage);
                this.lines = lines.content;
                this.totalLinesPages = lines.totalPages;
            } catch (error) {}
        },
        prevPagination() {
            if (this.linesPage === 0) return;
            --this.linesPage;
            this.getLines();
        },
        nextPagination() {
            if (this.linesPage === this.totalLinesPages) return;
            ++this.linesPage;
            this.getLines();
        },
        moveToPage(page) {
            this.linesPage = page;
            this.getLines();
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
    },
};
</script>

<style lang="scss" scoped>
@import '@assets/scss/components/variables/standard.scss';

.dj-section--account-setting {
    margin-top: 5rem;
}
.document-order {
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
}
.igreen {
    color: #56c34c;
}
.iblue {
    color: #0cb2ea;
}

.w-45 {
    width: 48%;
}

.grid-col-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1;
    gap: 5rem;
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, auto);
        grid-template-rows: repeat(3, 1fr);
        gap: 2rem;
        grid-auto-flow: dense;
        & > div:last-child {
            grid-row: 1;
        }
    }
}

.dj-card .dj-card__content {
    overflow-x: auto;
}

.product-container {
    overflow-x: auto; /* Ajoute une barre de défilement horizontale si nécessaire */
    white-space: nowrap; /* Empêche le renvoi à la ligne des éléments fils */
    min-width: fit-content;
    .product-grid {
        overflow-x: auto;
        display: grid;
        grid-template-columns: repeat(4, minmax(15rem, 1fr));
        align-items: center;
        justify-content: space-between;

        &.grid-item:not(:last-child) {
            border-bottom: 1px solid #dee2e6;
        }
    }

    .product-img {
        width: 36px;
        height: auto;
    }
}

.outline-link {
    border: solid 1px var(--color-primary, grey);
    font-weight: 700;

    &:hover {
        background: $color-button-outlined__hover;
    }

    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    margin-bottom: 1rem;
    cursor: pointer;

    i {
        margin-right: 2rem;
        font-weight: 700;
        color: var(--color-primary, grey);
    }

    a {
        color: var(--color-primary, grey);
    }
}
</style>
