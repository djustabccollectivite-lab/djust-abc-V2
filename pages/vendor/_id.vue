<template lang="html">
    <VendorPage :supplierId="supplierId" />
</template>

<script>
import VendorPage from '@components/pages/vendor/vendorDetail.vue';

export default {
    layout(context) {
        return context.store.state.app.layoutType;
    },
    auth: process.env.store_type === 'private' ? null : false,
    components: {
        VendorPage,
    },
    data() {
        return {
            supplierId: this.$route.params.id,
        };
    },
};
</script>

<style lang="scss" scoped></style>
