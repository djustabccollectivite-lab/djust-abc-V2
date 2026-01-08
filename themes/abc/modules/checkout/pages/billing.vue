<template>
    <section class="ps-page--my-account">
        <BreadCrumb :breadcrumb="breadCrumb" />
        <Billing />
    </section>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import Billing from '@modules/checkout/components/Billing.vue';

export default {
    components: {
        Billing,
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
                    text: context.$i18n.t('common.breadscrum.billing'),
                },
            ],
        };
    },
};
</script>
