<template>
    <div class="dj-home--fob">
        <style>
            :root {
                --homepage-image: url('{{ homepageimage }}');
            }
        </style>
        <div class="dj-content">
            <card-statics-h :orders="ordersList" />
        </div>
        <div class="dj-content">
            <div class="dj-section-1">
                <div class="dj-section-left">
                    <DjCard :title="'Accès aux catégories'" :Nopadding="true">
                        <DjCategoriesBox :categories="categories" />
                    </DjCard>
                </div>
            </div>
        </div>
        <div class="dj-content">
            <div class="dj-section-2">
                <div class="">
                    <DjCard :title="'Vos dernières commandes'">
                        <table-recent-order-summary :orders="ordersList?.slice(0, 5)" />
                    </DjCard>
                </div>
                <div class="">
                    <DjCard :title="'Vos dernières listes de favoris'">
                        <TableRecentBuyingList :buyinglists="buyinglists"></TableRecentBuyingList>
                    </DjCard>
                </div>
            </div>
        </div>
        <div class="dj-content">
            <div class="dj-section-2">
                <div class="">
                    <DjCard :title="'Nouveautés'" :link="'/list'" :linkText="$t('common.showMore')" :Nopadding="true">
                        <table-shop-products-summary :products="products" />
                    </DjCard>
                </div>
                <div class="">
                    <DjCard
                        :title="'Derniers produits vus'"
                        :link="'/list'"
                        :linkText="$t('common.showMore')"
                        :Nopadding="true"
                    >
                        <table-shop-products-summary :products="lastProducts" />
                    </DjCard>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CardStaticsH from '@components/pages/homepage/b2b/modules/CardStaticsH.vue';
import TableRecentOrderSummary from '@components/pages/homepage/b2b/modules/DjTableRecentOrderSummary.vue';
import TableRecentBuyingList from '@components/pages/homepage/b2b/modules/DjTableRecentBuyingList.vue';
import TableShopProductsSummary from '@components/pages/homepage/b2b/modules/DjTableShopProductsSummary/DjTableShopProductsSummary.vue';
import DjCategoriesBox from '@components/organisms/DjCategoriesBox/DjCategoriesBox.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
export default {
    components: {
        DjCategoriesBox,
        CardStaticsH,
        TableRecentOrderSummary,
        TableRecentBuyingList,
        TableShopProductsSummary,
        DjCard,
    },
    layout(context) {
        return context.store.state.app.layoutType;
    },
    data() {
        return {
            products: [],
            lastProducts: [],
            ordersList: [],
            block: {},
            homepageimage: null,
        };
    },
    computed: {
        layoutType() {
            return this.$store.state.app.layoutType;
        },
        buyinglists() {
            return this.$store.state.wishlist.items;
        },
        categories() {
            return this.$store.state.categories.categories;
        },
        quotes() {
            return this.$store.state.quote.quotes.slice(0, 5);
        },
        styleimage() {
            return "background: url('" + this.homepageimage + "') cover no-repeat";
        },
    },
    async created() {
        this.$store.commit('app/toggleDrawer', false);
        this.block = {
            currency: 'EUR',
            categoryIds: '',
            locale: 'FR',
            pageSize: 4,
            pageNumber: 1,
        };
        const params = this.$core.createRequest.RequestAPIgetProductThumbnails(this.block);
        this.products = await this.$core.useThumbnails.getFeatureProducts(params);
        if (process.client) {
            this.lastProducts = await this.$core.useThumbnails.getFeatureProducts({
                productSku: JSON.parse(localStorage.getItem('lastProducts')),
            });
        }
        this.$core.useOrder.getOrdersList();
        this.homepageimage = await this.$core.useStoryblok.getHomePageImage();
        this.ordersList = await this.$core.useOrder.getOrdersList();
    },
};
</script>

<style lang="scss" scoped>
.buttonImage {
    margin-top: auto;
    text-align: center;
    margin-bottom: 19px;
}

.btn-image {
    border: 2px solid #ffffff !important;
    box-sizing: border-box;
    border-radius: 32px;
    color: #ffffff !important;
    padding: 10px 36px;
}
.bg {
    background: var(--homepage-image);
    background-size: cover;
    background-repeat: no-repeat;
    min-width: 100%;
    min-height: 100%;
    height: 445px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.dj-home--fob {
    width: 100%;
    background: #ffffff;
    margin-left: auto;
    margin-right: auto;
    padding-top: 24px;
    padding-bottom: 24px;
    @media (min-width: 640px) {
        padding-left: 24px;
        padding-right: 24px;
    }
    @media (min-width: 1024px) {
        padding-left: 48px;
        padding-right: 48px;
    }
}
.dj-content {
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
    @media (min-width: 640px) {
        padding-top: 0px;
        padding-bottom: 0px;
    }
}
.dj-section-1 {
    padding-top: 81px;
    display: grid;
    align-items: flex-start;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 26px;

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 26px;
    }
    .dj-section-left {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 1rem;

        @media (min-width: 1024px) {
            grid-column: span 2 / span 2;
        }
    }
    .dj-section-right {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 1rem;
    }
}
.dj-section-2 {
    padding-top: 81px;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 26px;

    @media (min-width: 1024px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .dj-section-item {
        display: flex;
        flex-shrink: 0;
        position: relative;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        margin-left: 0.75rem;
        margin-left: 0.875rem;
        align-items: center;
    }
}
</style>