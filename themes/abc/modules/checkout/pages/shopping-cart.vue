<template>
    <section class="ps-page--my-account">
        <BreadCrumb :breadcrumb="breadCrumb" />
        <ShoppingCart />
    </section>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import ShoppingCart from '@modules/checkout/components/ShoppingCart.vue';

export default {
    name: 'ShoppingCartPage',
    components: {
        BreadCrumb,
        ShoppingCart,
    },
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition: 'zoom',
    data(context) {
        return {
            breadCrumb: [
                {
                    text: context.$i18n.t('common.breadscrum.home'),
                    url: '/',
                },
                {
                    text: context.$i18n.t('common.breadscrum.shoppingCart'),
                },
            ],
        };
    },
};
</script>
