<template>
    <section class="ps-page--my-account">
        <OrderValidationModule :orderCommercialId="orderCommercialId" />
    </section>
</template>

<script>
import OrderValidationModule from '@modules/checkout/components/OrderValidation.vue';

export default {
    name: 'OrderValidation',
    components: {
        OrderValidationModule,
    },
    layout(context) {
        return context.store.state.app.layoutType;
    },
    middleware: ['checkout', 'canOrder'],
    transition: 'zoom',
    data(context) {
        return {
            orderCommercialId: context.$route.query ? context.$route.query.orderCommercialId : '',
            status: context.$route.query ? context.$route.query.returnType : '',
        };
    },
    created() {
        if (this.status === 'success') {
            this.$toast.success('Le paiement est validé');
        }
    },
};
</script>
