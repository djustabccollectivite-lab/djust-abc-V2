<template>
    <div class="ps-page--single ps-page--vendor">
        <div class="container">
            <bread-crumb :breadcrumb="breadCrumb" />
        </div>
        <VendorStore v-if="supplier" :supplier="supplier" :supplierId="this.$route.params.id" />
    </div>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import VendorStore from '@components/templates/vendor/VendorStore.vue';

export default {
    name: 'VendorPage',
    components: {
        BreadCrumb,
        VendorStore,
    },
    props: {
        supplierId: {
            type: String,
            default: '0',
        },
    },
    data() {
        return {
            breadCrumb: [
                {
                    text: 'Accueil',
                    url: '/',
                },
                {
                    text: 'Boutique vendeur',
                },
            ],
            supplier: null,
            products: null,
            block: {},
        };
    },
    async created() {
        this.supplier = await this.$core.useSupplier.getSupplierDetail(this.supplierId);
    },
};
</script>

<style lang="scss" scoped></style>
