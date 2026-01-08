<template>
    <div v-if="order" class="abc-container">
        <div class="text-center mt-12">
            <SvgIcon name="checkmark-xl" />
            <h1 class="my-10 text-black uppercase font-700 size-16">
                MERCI <span class="text-primary">{{ $auth.user.firstName }}</span> POUR VOTRE COMMANDE
            </h1>
            <div class="mb-0 text-grey-4 font-700 size-16 mb-6">
                N° de commande : <b>{{ order.reference }}</b>
            </div>
            <div v-if="iban" class="text-left p-4 w-50 mx-auto border border-grey-4 rounded-lg mb-6">
                <h3 class="text">
                    {{ $t('checkout.orderConfirmation.paymentDetails') }}
                </h3>
                <p class="text">
                    {{ $t('checkout.orderConfirmation.beneficiary') }}:
                    <b>{{ beneficiary }}</b>
                </p>
                <p class="text">
                    {{ $t('checkout.orderConfirmation.iban') }}:
                    <b>{{ iban }}</b>
                </p>
                <p class="text">
                    {{ $t('checkout.orderConfirmation.bic') }}:
                    <b>{{ bic }}</b>
                </p>
                <p class="text">
                    {{ $t('checkout.orderConfirmation.reference') }}:
                    <b>{{ reference }}</b>
                </p>
                <p class="text m-0">
                    {{ $t('checkout.orderConfirmation.totalAmount') }}:
                    <b v-html="bankTransferTotalAmount" />
                </p>
            </div>
            <div class="text-grey-4 mb-10 mx-auto" style="max-width: 797px">
                Votre commande a bien été enregistrée et transmise à notre équipe commerciale. Après vérification, vous
                recevrez un mail de confirmation définitive de votre commande. Si besoin, nos équipes prendront contact
                avec vous directement.
            </div>
        </div>
        <section aria-labelledby="summary-heading" class="mt-16 bg-grey rounded p-4">
            <div class="hidden-on-desktop mb-4">
                <div class="font-700 size-24 text-black mb-4">
                    {{ $t('checkout.orderValidation.order') }} {{ order.reference }}
                </div>
                <div class="text-grey-4 mb-6">
                    Commande passée
                    <time :datetime="order.createdAt" class="date">{{ dateFormated(order.createdAt) }}</time>
                </div>
            </div>
            <div class="hidden-on-mobile mb-6">
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <div class="font-700 size-24 text-black">
                        {{ $t('checkout.orderValidation.order') }} {{ order.reference }}
                    </div>
                    <div class="text-grey-4 text-right">
                        Commande passée
                        <time :datetime="order.createdAt" class="date">{{ dateFormated(order.createdAt) }}</time>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-4 px-4">
                    <div class="rounded bg-white p-4">
                        <div class="text-grey-4 font-700">Adresse de livraison</div>
                        <div class="mt-3">
                            <div class="text-grey-4 mb-1">
                                {{ order.orderLogistics[0].shippingAddressSnapshot.fullName }}
                            </div>
                            <div class="text-grey-4 mb-1">
                                {{ order.orderLogistics[0].shippingAddressSnapshot.address }}
                            </div>
                            <div class="text-grey-4">{{ order.orderLogistics[0].shippingAddressSnapshot.city }}</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4 px-4">
                    <div class="rounded bg-white p-4">
                        <div class="text-grey-4 font-700">Adresse de facturation</div>
                        <div class="mt-3">
                            <div class="text-grey-4 mb-1">
                                {{ order.orderLogistics[0].billingAddressSnapshot.fullName }}
                            </div>
                            <div class="text-grey-4 mb-1">
                                {{ order.orderLogistics[0].billingAddressSnapshot.address }}
                            </div>
                            <div class="text-grey-4">{{ order.orderLogistics[0].billingAddressSnapshot.city }}</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4 px-4">
                    <div class="d-flex justify-content-between align-items-center pb-1 border-bottom">
                        <div class="font-700 size-14 text-grey-4">Total produits HT</div>
                        <div class="font-700 size-16 text-grey-3" v-html="totalOrderValidatedWithVatAndShipping"></div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center pb-1 border-bottom mt-2">
                        <div class="font-700 size-14 text-grey-4">Total TVA</div>
                        <div class="font-700 size-16 text-grey-3" v-html="totalOrderValidatedVAT"></div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center pb-1 border-bottom mt-2">
                        <div class="font-700 size-14 text-grey-4">Total Eco part</div>
                        <div class="font-700 size-16 text-grey-3">{{ resultEcoTax }}</div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center pb-1 mt-2">
                        <div class="font-700 size-14 text-grey-4">Total TTC</div>
                        <div class="font-700 size-18 text-primary" v-html="totalOrderValidated"></div>
                    </div>
                </div>
            </div>
        </section>
        <div class="font-700 size-16 text-center mt-10 mb-16">
            Vous retrouverez toutes vos commandes dans la rubrique "Commandes" de votre compte
            <SvgIcon name="user-small" class="ml-1" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'OrderValidationModule',
    components: { SvgIcon },
    props: {
        orderCommercialId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            order: null,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
            iban: (state) => state.pay.iban,
            beneficiary: (state) => state.pay.beneficiary,
            bic: (state) => state.pay.bic,
            reference: (state) => state.pay.reference,
            totalAmount: (state) => state.pay.totalAmount,
        }),
        nbShippingParcels() {
            return this.order.orderLogistics.length;
        },
        bankTransferTotalAmount() {
            return this.$core.useHelper.formatCurrencyAuto(this.totalAmount / 100, this.currency);
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
        totalOrderValidatedWithVatAndShipping() {
            return this.$core.getCart.getTotalOrderCommercialWithoutVatAndShipping(this.order, this.currency);
        },
        resultEcoTax() {
            const totalAmountEcoPart = this.order.orderLogistics[0].lines.reduce((currentTotal, item) => {
                const ecoTax =
                    item.customFieldValues.find((customField) => customField.customField.externalId === 'TOTAL_ECOPART')
                        ?.value ?? 0;
                return currentTotal + ecoTax;
            }, 0);
            return this.$purjus.utils.formatPrice(totalAmountEcoPart, this.currency);
        },
    },
    async created() {
        if (this.orderCommercialId) {
            this.order = await this.$purjus.useOrders.getCommercialOrderById(this.orderCommercialId);
        }
    },
    methods: {
        dateFormated(date) {
            return moment(String(date)).format('DD/MM/YYYY hh:mm');
        },
    },
};
</script>
