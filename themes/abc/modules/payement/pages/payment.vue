<template>
    <section class="ps-page--my-account">
        <div class="">
            <bread-crumb :breadcrumb="breadCrumb" />
            <payment :key="componentKey" @retryPayment="componentKey++" />
        </div>
    </section>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import Payment from '@modules/payement/components/Payment.vue';

export default {
    components: {
        Payment,
        BreadCrumb,
    },
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition: 'zoom',

    data: (context) => {
        return {
            breadCrumb: [
                {
                    text: context.$i18n.t('common.breadscrum.home'),
                    url: context.localePath('/'),
                },
                {
                    text: context.$i18n.t('common.breadscrum.shoppingCart'),
                    url: context.localePath('/checkout/shopping-cart'),
                },
                {
                    text: context.$i18n.t('common.breadscrum.payment'),
                },
            ],
            status: context.$route.query ? context.$route.query.returnType : '',
            componentKey: 0,
        };
    },
    created() {
        this.$store.commit('pay/setResetPayData');
        switch (this.status) {
            case 'aborted':
                this.$toast.warning('Vous avez annulé votre paiement');
                break;
            case 'error':
                this.$toast.error(
                    'Impossible de terminer la transaction. Veuillez utiliser un autre mode de paiement.'
                );
                break;

            default:
                break;
        }
    },
};
</script>

<style lang="scss" scoped></style>
