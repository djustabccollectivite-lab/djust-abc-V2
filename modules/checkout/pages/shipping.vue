<template lang="html">
    <client-only>
        <section class="ps-page--my-account">
            <bread-crumb :breadcrumb="breadCrumb" />
            <shipping />
        </section>
    </client-only>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import Shipping from '@modules/checkout/components/Shipping.vue';

export default {
    middleware: ['checkout', 'canOrder'],
    layout(context) {
        return context.store.state.app.layoutType;
    },
    components: {
        Shipping,
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
                    text: context.$i18n.t('common.breadscrum.shipping')
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
