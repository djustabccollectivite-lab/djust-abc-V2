<template>
    <div id="shop-widgets" class="factes">
        <aside class="widget widget_shop">
            <div v-if="brand && brand.length > 0">
                <div class="title__h4 widget-title">{{ $t('facets.brands') }}</div>
                <DjInput
                    class="input"
                    density="compact"
                    v-model="brandSearch"
                    :label="$t('header.search.brand')"
                    underlined
                />
                <figure class="facet_scroll">
                    <v-checkbox
                        v-for="facet in filtersBrandList"
                        v-model="filter_brand"
                        :value="facet.values[0]"
                        :label="facet.values[0]"
                        :key="facet.values[0]"
                        dense
                        @click="checkbox"
                    />
                </figure>
            </div>
            <div v-if="suppliers && suppliers.length > 0">
                <div class="title__h4 widget-title">{{ $t('facets.vendors') }}</div>
                <DjInput
                    class="input"
                    density="compact"
                    v-model="supplierSearch"
                    :label="$t('header.search.supplier')"
                    underlined
                />
                <figure class="facet_scroll">
                    <v-checkbox
                        v-for="facet in filtersSupplierList"
                        v-model="filter_supplier"
                        :value="facet.name"
                        :label="facet.name"
                        :key="facet.id + facet.name"
                        dense
                        @click="checkbox"
                    />
                </figure>
            </div>
            <template v-if="attributes && facets && attributes.length > 0">
                <div v-for="facet in attributes[0].buckets" :key="facet.key" @click="checkbox">
                    <DjFacetValue :facet="facet" />
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
                            v-model="customFieldsSupplier"
                            :value="buckets.name + '|' + facet"
                            :label="facet"
                            :key="facet"
                            dense
                            @click="checkbox"
                        />
                    </figure>
                </div>
            </div>
            <div v-if="customOffer.length > 0">
                <div v-for="buckets in customOffer[0]?.buckets" :key="buckets.id">
                    <div class="title__h4 widget-title">
                        {{ buckets.name }}
                    </div>
                    <figure>
                        <v-checkbox
                            v-for="facet in $core.useHelper.sorted(buckets.values)"
                            v-model="customFieldsOffer"
                            :value="buckets.name + '|' + facet"
                            :label="facet"
                            :key="facet"
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
import DjInput from '@components/atoms/DjInput/DjInput.vue';

export default {
    name: 'ShopWidget',
    components: { DjFacetValue, DjInput },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        facets() {
            return this.$store.state.shop.facets;
        },
        brand() {
            return this.$store.state.shop.facets.filter((item) => item.type === 'BRAND')
                ? this.$store.state.shop.facets.filter((item) => item.type === 'BRAND')
                : [];
        },
        suppliers() {
            return this.$store.state.shop.facets.filter((item) => item.type === 'SUPPLIER')
                ? this.$store.state.shop.facets.filter((item) => item.type === 'SUPPLIER')
                : [];
        },
        attributes() {
            return this.$store.state.shop.facets.filter((item) => item.type === 'attributes')
                ? this.$store.state.shop.facets.filter((item) => item.type === 'attributes')
                : [];
        },
        customSupplier() {
            return this.$store.state.shop.facets.filter((item) => item.type === 'customFields_supplier')
                ? this.$store.state.shop.facets.filter((item) => item.type === 'customFields_supplier')
                : [];
        },
        customOffer() {
            return this.$store.state.shop.facets.filter((item) => item.type === 'customFields_offer')
                ? this.$store.state.shop.facets.filter((item) => item.type === 'customFields_offer')
                : [];
        },
        selectedAttributes() {
            return this.$store.state.shop.facetsSelected;
        },
        productFilters() {
            return {
                filter_brand: Array.isArray(this.filter_brand) ? this.filter_brand : [this.filter_brand],
                filter_supplier: this.filter_supplier,
                filter_attribute: Array.isArray(this.filter_attribute)
                    ? this.filter_attribute
                    : [this.filter_attribute],

                customFieldsSupplier: Array.isArray(this.customFieldsSupplier)
                    ? this.customFieldsSupplier
                    : [this.customFieldsSupplier],
                customFieldsOffer: Array.isArray(this.customFieldsOffer)
                    ? this.customFieldsOffer
                    : [this.customFieldsOffer],
                page: this.page,
                keyword: this.keyword,
            };
        },
        filtersBrandList() {
            return this.$core.getShop.filterList(this.brand, this.brandSearch.toUpperCase(), this.filter_brand);
        },
        filtersSupplierList() {
            return this.$core.getShop.filterList(
                this.suppliers,
                this.supplierSearch.toUpperCase(),
                this.filter_supplier
            );
        },
    },
    data() {
        return {
            filter_brand: [],
            filter_supplier: null,
            filter_attribute: null,
            page: 0,
            keyword: this.$route.query.keyword,
            customFieldsSupplier: [],
            customFieldsOffer: [],
            brandSearch: '',
            supplierSearch: '',
        };
    },
    created() {
        this.$root.$on('resetAttributes', () => {
            this.resetFilters();
        });
        this.$root.$on('update-facet', (facet) => {
            const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
            this.processFilter(currentProductFilters, 'filter_brand', facet);
            this.processFilter(currentProductFilters, 'filter_supplier', facet);
            this.processFilter(currentProductFilters, 'filter_attribute', facet);
            this.processFilter(currentProductFilters, 'customFieldsSupplier', facet);
            this.processFilter(currentProductFilters, 'customFieldsOffer', facet);
            this.$nuxt.$emit('facetsChange', this.productFilters);
        });
        const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
        this.currentProductFilters(currentProductFilters);
    },
    mounted() {
        this.$nuxt.$emit('facetsChange', this.productFilters);
    },
    methods: {
        checkbox() {
            this.$root.$emit('newPaginationNumber', 1);
            this.$nuxt.$emit('facetsChange', this.productFilters);
            this.page = 0;
        },
        resetFilters() {
            this.$router.push(this.localePath('/search/#'));
        },
        processFilter(filters, property, facet) {
            const filterArray = filters?.[property];
            if (filterArray) {
                filterArray.forEach((filterItem, index) => {
                    if (filterItem === facet) {
                        filters[property].splice(index, 1);
                        return;
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
            this.page = filters.page;
            this.keyword = filters.keyword;
        },
    },
    watch: {
        $route(to, from) {
            const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + to.fullPath);
            this.$core.useShop.getFiltredProductList(this.$route.params.id, currentProductFilters);
            this.currentProductFilters(currentProductFilters);
        },

        productFilters: {
            handler(currentValue, oldValue) {
                const link = this.$core.useHelper.generateLink(
                    window.location.pathname,
                    this.$route.params.id,
                    this.productFilters
                );

                this.$router.push(link);
            },
            deep: true,
        },
    },
};
</script>
<style>
.facet_scroll {
    overflow: auto;
    height: 350px;
    margin-bottom: 15px;
}
.input {
    height: 65px;
}
</style>
