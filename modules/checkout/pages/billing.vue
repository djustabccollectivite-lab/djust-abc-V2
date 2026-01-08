<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <Billing />
    </section>
</template>
<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import Billing from '@modules/checkout/components/Billing.vue';

export default {
    middleware: ['checkout', 'canOrder'],
    layout(context) {
        return context.store.state.app.layoutType;
    },
    components: {
        Billing,
        BreadCrumb
    },
    transition: 'zoom',
    data: context => {
        return {
            breadCrumb: [
                {
                    //text: $t('common.breadscrum.home'),
                    //text:this.context.$i18n.t('common.breadscrum.home'),
                    text: context.$i18n.t('common.breadscrum.home'),
                    url: context.localePath('/')
                },
                {
                    text: context.$i18n.t('common.breadscrum.shoppingCart'),
                    url: context.localePath('/checkout/shopping-cart')
                },
                {
                    text: context.$i18n.t('common.breadscrum.billing')
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
