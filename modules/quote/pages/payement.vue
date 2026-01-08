<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <payment-quote />
    </section>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import PaymentQuote from '@modules/quote/components/PayementQuote.vue';

export default {
    name: 'PayementQuote',
    transition: 'zoom',
    middleware: ['quote'],
    components: {
        PaymentQuote,
        BreadCrumb,
    },

    layout(context) {
        return context.store.state.app.layoutType;
    },

    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/',
                },
                {
                    text: 'Quotes',
                    url: '/quotes',
                },
                {
                    text: 'Payement',
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped></style>
