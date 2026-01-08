<template>
    <div>
        <div class="dj-shipping-layout" v-if="order">
            <div class="dj-validation-block">
                <i class="icon-checkmark-circle"></i>
                <h1 class="message">
                    {{ $t('checkout.orderConfirmation.thanks') }}
                    <span class="name">{{ $auth.user.firstName }}</span>
                    {{ $t('checkout.orderConfirmation.forYourOrder') }}
                </h1>
                <br />
                <p class="subMsg">
                    {{ $t('checkout.orderConfirmation.orderNumber') }} <b>{{ order.reference }}</b>
                </p>
                <p class="text">
                    {{ $t('checkout.orderConfirmation.yourOrder') }}
                    <b>{{ order.reference }}</b>
                    {{ $t('checkout.orderConfirmation.hasBeenCreated') }}
                </p>
            </div>

            <section aria-labelledby="summary-heading" class="mt-16 orderDetails">
                <div class="dj-order-validation">
                    <div class="dj-order-header">
                        <h1 class="dj-order-title">{{ $t('checkout.orderValidation.order') }} {{ order.reference }}</h1>
                    </div>
                    <p class="dj-order-date">
                        {{ $t('checkout.orderConfirmation.orderConfirmed') }}
                        <time :datetime="order.createdAt" class="date">{{ dateFormated(order.createdAt) }}</time>
                    </p>
                </div>
                <div class="dj-order-payment">
                    <dl class="billingDetails">
                        <div>
                            <dt class="titleText">{{ $t('checkout.orderConfirmation.orderDetails') }}</dt>
                            <dd class="mt-3 title">
                                <span class="block">
                                    {{ $t('checkout.orderConfirmation.shippingParcels') }}
                                    <b>{{ order.orderLogistics.length }}</b>
                                </span>
                            </dd>
                        </div>
                        <div>
                            <dt class="titleText">{{ $t('checkout.orderConfirmation.invoicingAddress') }}</dt>
                            <dd class="mt-3 title">
                                <span class="block">{{ order.orderLogistics[0].billingAddressSnapshot.fullName }}</span>
                                <span class="block">{{ order.orderLogistics[0].billingAddressSnapshot.address }}</span>
                                <span class="block">{{ order.orderLogistics[0].billingAddressSnapshot.city }}</span>
                            </dd>
                        </div>
                    </dl>

                    <dl class="paymentinfo">
                        <div class="pb-4 item first">
                            <dt class="text">{{ $t('checkout.orderConfirmation.totalOrderWithoutVat') }}</dt>
                            <dd class="titleText" v-html="totalOrderValidatedWithoutVatAndShipping"></dd>
                        </div>
                        <div class="py-4 item">
                            <dt class="text">{{ $t('checkout.orderConfirmation.totalShippingFees') }}</dt>
                            <dd class="titleText" v-html="totalOrderValidatedWithShipping"></dd>
                        </div>
                        <div class="py-4 item">
                            <dt class="text">{{ $t('checkout.orderConfirmation.totalVatAmount') }}</dt>
                            <dd class="titleText" v-html="totalOrderValidatedVAT"></dd>
                        </div>
                        <div class="pt-4 item">
                            <dt class="text">{{ $t('checkout.orderConfirmation.totalOrderAmount') }}</dt>
                            <dd class="total" v-html="totalOrderValidated"></dd>
                        </div>
                    </dl>
                </div>
            </section>
            <section aria-labelledby="products-heading" class="mt-6">
                <div class="mt-5">
                    <div v-for="order in order.orderLogistics" :key="order.id" class="dj-order-products">
                        <template v-for="item in order.lines">
                            <OrderValidationLine v-if="item" :key="item.id" :line="item" :orderLogistic="order" />
                        </template>
                        <div class="dj-order-status">
                            <p class="titleStatus">
                                {{ order.status }}
                                <time :datetime="order.updatedAt">{{ dateFormated(order.updatedAt) }}</time> <br />
                            </p>
                            <div class="mt-6" aria-hidden="true">
                                <div class="dj-status-timeline">
                                    <div class="statusBar" :style="{ width: `calc((1 * 2 + 1) / 8 * 100%)` }" />
                                </div>
                                <div class="statusList">
                                    <div class="StatusColor">{{ $t('checkout.orderConfirmation.passedOrder') }}</div>
                                    <div
                                        :class="[
                                            order.status == 'WAITING_SUPPLIER_APPROVAL' ? 'StatusColor' : '',
                                            'StatusTextCenter',
                                        ]"
                                    >
                                        {{ $t('checkout.orderConfirmation.processing') }}
                                    </div>
                                    <div :class="[order.status == 'CREATED' ? 'StatusColor' : '', 'StatusTextCenter']">
                                        {{ $t('checkout.orderConfirmation.shipped') }}
                                    </div>
                                    <div :class="[order.status == 'SHIPPED' ? 'StatusColor' : '', 'StatusTextRight']">
                                        {{ $t('checkout.orderConfirmation.delivered') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import OrderValidationLine from '@modules/checkout/components/modules/OrderValidationLine.vue';
import DjSteps from '@components/atoms/DjSteps/DjSteps.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';

export default {
    components: { OrderValidationLine, DjSteps, DjIcon },
    name: 'OrderValidationModule',
    props: {
        orderCommercialId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            orderValidated: null,
        };
    },
    async created() {
        this.orderValidated = this.orderCommercialId
            ? await this.$core.useOrder.getCommercialOrderbyid(this.orderCommercialId)
            : null;
        if (this.orderValidated) this.$core.useCart.deleteCart();
    },
    methods: {
        dateFormated(date) {
            return moment(String(date)).format('DD/MM/YYYY hh:mm');
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        order() {
            let orderFromStore = this.$store.state.cart.orderValidated;
            return orderFromStore ?? this.orderValidated;
        },
        totalOrderValidated() {
            return this.$core.getCart.getTotalOrderCommercial(this.order, this.currency);
        },
        totalOrderValidatedWithShipping() {
            return this.$core.getCart.getTotalOrderCommercialShipping(this.order, this.currency);
        },
        totalOrderValidatedVAT() {
            return this.$core.getCart.getTotalOrderCommercialTax(this.order, this.currency);
        },
        totalOrderValidatedWithoutVatAndShipping() {
            return this.$core.getCart.getTotalOrderCommercialWithoutVatAndShipping(this.order, this.currency);
        },
        steps() {
            return [
                {
                    id: '01',
                    name: this.$t('checkout.breadcrumb.basketHeading'),
                    description: this.$t('checkout.breadcrumb.basketDescription'),
                    href: '/checkout/shopping-cart',
                    status: 'complete',
                },
                {
                    id: '02',
                    name: this.$t('checkout.breadcrumb.billingHeading'),
                    description: this.$t('checkout.breadcrumb.billingDescription'),
                    href: '/checkout/billing',
                    status: 'complete',
                },
                {
                    id: '03',
                    name: this.$t('checkout.breadcrumb.shippingHeading'),
                    description: this.$t('checkout.breadcrumb.shippingDescription'),
                    href: '/checkout/shipping',
                    status: 'complete',
                },
                {
                    id: '04',
                    name: this.$t('checkout.breadcrumb.paymentHeading'),
                    description: this.$t('checkout.breadcrumb.paymentDescription'),
                    href: '/checkout/payment',
                    status: 'complete',
                },
                {
                    id: '05',
                    name: this.$t('checkout.breadcrumb.confirmationHeading'),
                    description: this.$t('checkout.breadcrumb.confirmationDescription'),
                    href: '/checkout/order-validation',
                    status: 'complete',
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-shipping-layout {
    width: 100%;
    background: #ffffff;
    margin-left: auto;
    margin-right: auto;
    padding-top: 24px;
    padding-bottom: 24px;
    @media (min-width: 640px) {
        padding-left: 24px;
        padding-right: 24px;
    }
    @media (min-width: 1024px) {
        padding-left: 48px;
        padding-right: 48px;
    }
}

.dj-order-validation {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 0.5rem;

    @media (min-width: 640px) {
        display: flex;
        padding-left: 0;
        padding-right: 0;
        margin-top: 0;
        justify-content: space-between;
        align-items: baseline;
    }
    .dj-order-header {
        display: flex;
        @media (min-width: 640px) {
            margin-left: 1rem;
            align-items: baseline;
        }
        .dj-order-title {
            color: var(--color-body);
            font-family: var(--font-1st);
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 38px;
            letter-spacing: -0.025em;

            @media (min-width: 640px) {
                font-family: var(--font-1st);
                font-style: normal;
                font-weight: 700;
                font-size: 25px;
                line-height: 38px;
            }
        }
        .dj-order-link {
            display: none;
            color: var(--color-primary);
            font-family: var(--font-1st);
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 30px;
            padding-left: 10px;

            @media (min-width: 640px) {
                display: block;
            }
            &:hover {
                color: var(--color-secondary);
            }
        }
    }
    .dj-order-date {
        color: #4b5563;
        font-family: var(--font-1st);
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 30px;
        .date {
            color: #111827;
            font-weight: 500;
        }
    }
    .dj-order-invoice-link {
        color: var(--color-primary);
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 30px;
        @media (min-width: 640px) {
            display: none;
        }
        &:hover {
            color: var(--color-secondary);
        }
    }
}
.dj-order-products {
    background-color: #ffffff;
    border-top: 1px;
    border-bottom: 1px;
    border-color: #e5e7eb;
    margin-bottom: 3rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    @media (min-width: 640px) {
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
    }

    .dj-order-status {
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        border-top: 1px solid;
        border-color: #e5e7eb;

        @media (min-width: 640px) {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }

        @media (min-width: 1024px) {
            padding: 2rem;
        }
        .titleStatus {
            color: #111827;
            font-size: 1.5rem;
            line-height: 1.25rem;
            font-weight: 500;
        }
        .dj-status-timeline {
            overflow: hidden;
            background-color: #e5e7eb;
            border-radius: 9999px;
            .statusBar {
                background-color: var(--color-primary);
                height: 0.5rem;
                border-radius: 9999px;
            }
        }
        .statusList {
            display: none;
            margin-top: 1.5rem;
            color: #4b5563;
            font-size: 1.2rem;
            line-height: 1.25rem;
            font-weight: 600;
            grid-template-columns: repeat(4, minmax(0, 1fr));

            @media (min-width: 640px) {
                display: grid;
            }
            .StatusColor {
                color: var(--color-primary);
            }
            .StatusTextCenter {
                text-align: center;
            }
            .StatusTextRight {
                text-align: right;
            }
        }
    }
}
.orderDetails {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    background-color: #f3f4f6;

    @media (min-width: 640px) {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        border-radius: 0.5rem;
    }
}
.dj-order-payment {
    @media (min-width: 1024px) {
        display: grid;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 2rem;
        padding-right: 2rem;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        column-gap: 2rem;
    }
    .billingDetails {
        display: grid;
        font-size: 0.875rem;
        line-height: 1.25rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.5rem;

        @media (min-width: 640px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        @media (min-width: 768px) {
            column-gap: 2rem;
        }
        @media (min-width: 1024px) {
            grid-column: span 7 / span 7;
        }
    }
    .paymentinfo {
        margin-top: 2rem;
        font-size: 1.8rem;
        line-height: 1.25rem;
        @media (min-width: 1024px) {
            margin-top: 0;
            grid-column: span 5 / span 5;
        }
        .item {
            border-top: 1px solid;
            border-color: #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
                color: #4b5563;
            }
            .total {
                color: var(--color-primary);
                font-weight: 500;
            }
        }
        .first {
            border: none;
        }
    }
}
.titleText {
    color: var(--color-body);
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.25rem;
}
.block {
    display: block;
}
.blockInfo {
    display: flex;
    margin-top: -0.25rem;
    margin-left: -1rem;
    flex-wrap: wrap;
    .info {
        margin-top: 1rem;
        margin-left: 1rem;
        flex-shrink: 0;
    }
}

.dj-validation-block {
    margin-top: 5rem;
    text-align: center;
    i {
        font-size: 5rem;
        color: green;
        padding-bottom: 2rem;
    }
    .message {
        .name {
            color: var(--color-primary);
        }
        margin-top: 2rem;
        color: var(--color-body);
        font-size: 2.875rem;
        line-height: 1.9rem;
        font-weight: 600;
        letter-spacing: 0.025em;
        text-transform: uppercase;
    }
    .subMsg {
        margin-top: 0.5rem;
        font-size: 1.25rem;
        line-height: 2.5rem;
        font-weight: 800;
        letter-spacing: -0.025em;

        @media (min-width: 640px) {
            font-size: 2rem;
            line-height: 1;
        }
    }
    .text {
        margin-top: 0.5rem;
        color: #6b7280;
        font-size: 1.5rem;
        line-height: 1.5rem;
    }
    .trackingBlock {
        margin-top: 3rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 500;
    }
}
</style>
