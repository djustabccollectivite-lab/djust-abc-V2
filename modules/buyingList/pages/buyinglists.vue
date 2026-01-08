<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <buying-list />
    </section>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import BuyingList from '@modules/buyingList/components/BuyingList.vue';

export default {
    components: {
        BuyingList,
        BreadCrumb,
    },
    layout(context) {
        return context.store.state.app.layoutType;
    },
    middleware: ['buyinglist', 'auth'],
    transition: 'zoom',
    data: (context) => {
        return {
            breadCrumb: [
                {
                    text: context.$i18n.t('common.breadscrum.home'),
                    url: '/',
                },
                {
                    text: context.$i18n.t('common.breadscrum.favorites'),
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped></style>
