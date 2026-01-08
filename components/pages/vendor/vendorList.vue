<template>
    <div class="ps-page--single ps-page--vendor">
        <div class="container">
            <BreadCrumb :breadcrumb="breadcrumbItems" />
        </div>
        <VendorList />
    </div>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import VendorList from '@components/templates/vendor/VendorList.vue';

export default {
    name: 'VendorListTemplate',
    components: {
        BreadCrumb,
        VendorList,
    },
    data() {
        return {
            breadcrumbItems: [
                {
                    text: this.$t('supplier.home'),
                    url: '/',
                },
                {
                    text: this.$t('supplier.storeList'),
                },
            ],
        };
    },
};
</script>
