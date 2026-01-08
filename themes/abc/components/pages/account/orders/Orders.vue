<template>
    <section class="account-layout">
        <BreadCrumb :breadcrumb="breadCrumb" />
        <OrdersTemplate />
    </section>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import OrdersTemplate from '@components/templates/account/orders/orders.vue';

export default {
    components: {
        BreadCrumb,
        OrdersTemplate,
    },
    data() {
        return {
            breadCrumb: [
                {
                    text: this.$t('common.breadscrum.home'),
                    url: '/',
                },
                {
                    text: this.$t('header.accountMenu.orders'),
                },
            ],
        };
    },
};
</script>
