<template>
    <div id="shop-widgets" class="facets">
        <div v-if="brandFilter">
            <picture v-if="brandFilter.logo">
                <img :src="brandFilter.logo + '/m/0x100'" :alt="brandFilter.description ?? brandFilter.name" />
            </picture>
            <p v-if="brandFilter.description" class="mt-4">{{ brandFilter.description }}</p>
        </div>

        <aside class="widget widget_shop">
            <div class="text-black font-700 size-24 mb-6">{{ $t('shop.filters.title') }}</div>

            <template v-if="attributes && facets && attributes.length > 0">
                <div v-for="facet in attributes" :key="facet.name" @click="checkbox">
                    <DjFacetValue :key="increment" :facet="facet" />
                </div>
            </template>
            <div v-if="customSupplier.length > 0">
                <div v-for="buckets in customSupplier[0]?.buckets" :key="buckets.id">
                    <div class="title__h4 widget-title">
                        {{ buckets.name }}
                    </div>
                    <figure>
                        <v-checkbox
                            v-for="facet in $core.useHelper.sorted(buckets.values)"
                            :key="facet"
                            v-model="customFieldsSupplier"
                            :value="buckets.name + '|' + facet"
                            :label="facet"
                            dense
                            @click="checkbox"
                        />
                    </figure>
                </div>
            </div>
            <div v-if="customFields?.length > 0">
                <div v-for="buckets in customFields" :key="buckets.id">
                    <div class="title__h4 widget-title">{{ buckets.name }}</div>
                    <figure>
                        <v-checkbox
                            v-for="facet in buckets.values"
                            :key="facet"
                            v-model="customField"
                            :value="buckets.id + '|' + facet"
                            :label="facet"
                            dense
                            @click="checkbox"
                        />
                    </figure>
                </div>
            </div>
            <div v-if="customFieldsOffers?.length > 0">
                <div v-for="buckets in customFieldsOffers" :key="buckets.id">
                    <div class="title__h4 widget-title">{{ buckets.name }}</div>
                    <figure>
                        <v-checkbox
                            v-for="facet in buckets.values"
                            :key="facet"
                            v-model="customFieldsOffer"
                            :value="buckets.name + '|' + facet"
                            :label="facet"
                            dense
                            @click="checkbox"
                        />
                    </figure>
                </div>
            </div>
        </aside>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DjFacetValue from '@components/atoms/DjFacetValue/DjFacetValue.vue';
import { findCurrentCategoryExternalId } from '~/purjus/helpers/common/categoriesHelper';

export default {
    name: 'ShopWidget',
    components: { DjFacetValue },
    data() {
        return {
            filter_brand: [],
            filter_supplier: null,
            filter_attribute: null,
            page: 0,
            keyword: this.$route.query.keyword,
            customFieldsSupplier: [],
            customFieldsOffer: [],
            customField: [],
            brandSearch: '',
            supplierSearch: '',
            increment: 0,
            brandFilter: null,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        facets() {
            return this.$store.state.shop.facets;
        },
        brand() {
            return this.$store.state.shop.facets?.brands ?? [];
        },
        suppliers() {
            return this.$store.state.shop.facets?.suppliers ?? [];
        },
        attributes() {
            this.increment++;
            return this.$store.state.shop.facets?.attributes ?? [];
        },
        customSupplier() {
            // Avec le search V2 Actuelle on en a pas faut attendre le dev

            // return this.$store.state.shop.facets
            //     ? this.$store.state.shop.facets?.filter((item) => item?.type === 'customFields_supplier')
            //     : [];
            return [];
        },
        customFields() {
            return this.$store.state.shop.facets?.customFields ?? [];
        },
        customFieldsOffers() {
            return this.$store.state.shop.facets?.customFieldsOffers ?? [];
        },
    },
    watch: {
        async $route(to) {
            const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + to.fullPath);
            const categoriesList = await this.$core.useCategories.getCategoriesList();
            const currentCategoryId = findCurrentCategoryExternalId(categoriesList, this.$route.params.id);
            this.currentProductFilters(currentProductFilters);
            await this.$core.useShop.getFiltredProductListv2(currentCategoryId, currentProductFilters, 'PRODUCT');
        },
    },
    created() {
        const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
        this.currentProductFilters(currentProductFilters);
    },
    async mounted() {
        await this.getBrandFilterForShowLogo();
    },
    methods: {
        async getBrandFilterForShowLogo() {
            const brandName = this.$route.query.filter_brand;
            if (!brandName) {
                return;
            }
            const homeComponents = await this.$core.useStoryblok.getHomePage();
            const HpLogosSlider = homeComponents.find((el) => el.component === 'LogosSlider');
            const brandLogo = HpLogosSlider.logos.find((el) => el.link.includes(brandName));

            this.brandFilter = {
                name: brandName,
                logo: brandLogo?.image?.filename,
                description: brandLogo?.image?.name,
            };
        },
        checkbox() {
            this.$nuxt.$emit('newPaginationNumber', 1);
            this.page = 0;
        },
        processFilter(filters, property, facet) {
            const filterArray = filters?.[property];
            if (filterArray) {
                filterArray.forEach((filterItem, index) => {
                    if (filterItem === facet) {
                        filters[property].splice(index, 1);
                    }
                });
            }
            this.currentProductFilters(filters);
        },
        currentProductFilters(filters) {
            this.filter_brand = filters.filter_brand;
            this.filter_supplier = filters.filter_supplier;
            this.filter_attribute = filters.filter_attribute;
            this.customFieldsSupplier = filters.customFieldsSupplier;
            this.customFieldsOffer = filters.customFieldsOffer;
            this.customField = filters.customField;
            this.page = filters.page;
            this.keyword = filters.keyword;
        },
    },
};
</script>
<style>
.facets {
    margin-top: 40px;
    @media screen and (min-width: 768px) {
        margin-top: 82px;
    }
}
</style>
