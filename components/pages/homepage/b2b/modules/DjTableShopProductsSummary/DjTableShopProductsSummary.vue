<template>
    <ul role="list" class="dj-product--list">
        <li v-for="product in products" :key="product.id" class="dj-product--item">
            <ProductThumbnailHorizontal :shadow="false" :product="product" />
        </li>
    </ul>
</template>

<script>
import ProductThumbnailHorizontal from '@components/organisms/productCard/ProductThumbnailHorizontal.vue';

import TableShopProductsSummaryItem from '@components/pages/homepage/b2b/modules/DjTableShopProductsSummary/modules/DjTableShopProductsSummaryItem.vue';
import Loading from '@components/atoms/DjLoading/DjLoading.vue';
import DjTable from '@components/organisms/DjTable/DjTable.vue';

export default {
    name: 'TableShopProductsSummary',
    components: { TableShopProductsSummaryItem, Loading, DjTable, ProductThumbnailHorizontal },
    props: {
        products: {
            type: Array,
            require: true,
            default: () => [],
        },
    },
    data() {
        return {
            //products: [],
            block: {},
            TestLoading: true,
            page: 1,
            pageSize: 12,
            items: [
                { id: 1 },
                { id: 1 },
                { id: 1 },
                { id: 1 },
                // More items...
            ],
        };
    },
    async created() {
        this.$store.commit('app/toggleDrawer', false);
        this.block = {
            currency: 'USD',
            categoryIds: 1,
            locale: 'EN',
            size: 4,
            pageNumber: 1,
            paged: true,
        };
        if (this.products) {
            setTimeout(
                function () {
                    this.TestLoading = false;
                }.bind(this),
                150
            );
        }
    },
    computed: {
        total() {
            return this.products ? this.products.length : 0;
        },
        paginationLenght() {
            if (this.total % 12 === 0) {
                return parseInt(this.total / this.pageSize);
            } else {
                return parseInt(this.total / 12 + 1);
            }
        },
    },
    methods: {
        async handleChangePagination(value) {
            const paramsa = {
                _start: value === 1 ? 0 : (value - 1) * 12,
                _limit: 12,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-product--list {
    margin-top: 0.875rem;
    .dj-product--item {
        overflow: hidden;
        padding: 0rem;
        margin-bottom: 2px;
        background-color: #ffffff;
        @media (min-width: 640px) {
            border-radius: 0.375rem;
        }
        &:hover {
            background-color: #f3f3f3;
        }
    }
}
.dj-product__title {
    font-size: 12px !important;
}
</style>
