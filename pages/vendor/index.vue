<template lang="html">
    <VendorListPage />
</template>

<script>
import VendorListPage from '@components/pages/vendor/vendorList.vue';

export default {
    name: 'VendorsPage',
    auth: process.env.store_type === 'private' ? null : false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
    components: {
        VendorListPage,
    },
};
</script>

<style lang="scss" scoped></style>
