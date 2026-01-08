<template>
    <section class="ps-page--my-account">
        <div class="container">
            <BreadCrumb :breadcrumb="breadCrumb" />
        </div>
        <OrdersTemplate />
    </section>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import OrdersTemplate from '@components/templates/account/orders/orders.vue';

export default {
    components: {
        OrdersTemplate,
        BreadCrumb,
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

<style lang="scss" scoped></style>
