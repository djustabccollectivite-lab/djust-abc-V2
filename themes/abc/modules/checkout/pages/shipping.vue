<template lang="html">
    <client-only>
        <section class="ps-page--my-account">
            <BreadCrumb :breadcrumb="breadCrumb" />
            <Shipping />
        </section>
    </client-only>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import Shipping from '@modules/checkout/components/Shipping.vue';

export default {
    components: {
        Shipping,
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
                    text: context.$i18n.t('common.breadscrum.shipping'),
                },
            ],
        };
    },
};
</script>
