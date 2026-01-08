<template lang="html">
    <DjCard :title="title" link="/list" linkText="View Full Products" classCss="dj-block--categories-box">
        <table-shop-products-summary />
    </DjCard>
</template>

<script>
import TableShopProductsSummary from '@components/templates/DjTableShopProductsSummary/DjTableShopProductsSummary.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';

export default {
    name: 'card-shop-products',
    components: { TableShopProductsSummary, DjCard },
    props: {
        title: {
            type: String,
            default: 'New Arrivals',
        },
    },
};
</script>

<style lang="scss" scoped>
.bg-djust {
    color: #fff !important;
    background-color: var(--color-primary) !important;
}
</style>
