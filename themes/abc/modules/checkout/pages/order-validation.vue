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
    transition: 'zoom',
    data(context) {
        return {
            orderCommercialId: context.$route.query ? context.$route.query.orderCommercialId : '',
        };
    },
    created() {
        if (this.orderCommercialId) {
            this.$toast.success('Commande envoyée');
        } else {
            this.$router.push(this.localePath(`/`));
        }
    },
};
</script>
