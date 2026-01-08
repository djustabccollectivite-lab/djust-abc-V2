<template>
    <div>
        <div class="title__h4 widget-title">
            {{ facet.key }}
        </div>
        <figure>
            <template v-for="value in $core.useHelper.sorted(facetValue)">
                <v-checkbox
                    v-if="value"
                    v-model="facetValue_"
                    :key="value + facet.key"
                    :value="facet.key + '|' + value"
                    :label="removeDecimal(value)"
                    dense
                    @click="handleFilterByFacet()"
                />
            </template>
        </figure>
    </div>
</template>

<script>
export default {
    name: 'DjFacetValue',
    props: {
        facet: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            facetValue_: [],
            facetValue: [],
            facetsValues: null,
        };
    },
    created() {
        this.$root.$on('resetAttributes', () => {
            this.facetValue_ = [];
            this.$store.commit('shop/setSelectedFacets', { facetName: this.facet.key, values: this.facetValue_ });
        });
        this.$root.$on('update-facet', (facet) => {
            if (this.facetValue_) {
                this.facetValue_.forEach((filterItem, index) => {
                    if (filterItem === facet) {
                        this.facetValue_.splice(index, 1);
                    }
                });
            }
        });
        if (this.facet?.values) {
            this.facetsValues = [...this.facet?.values];
            const facetsValuesSorted = this.facetsValues.sort((a, b) => {
                const numA = parseFloat(a);
                const numB = parseFloat(b);

                if (!isNaN(numA) && !isNaN(numB)) {
                    return numA - numB;
                }
                if (!isNaN(numA)) {
                    return -1;
                }
                if (!isNaN(numB)) {
                    return 1;
                }
                return a.localeCompare(b);
            });
            facetsValuesSorted.forEach((facetValue) => {
                this.facetValue.push(facetValue);
            });
        }
        const currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
        if (currentProductFilters?.filter_attribute) {
            this.currentProductFilters(currentProductFilters);
        }
    },
    methods: {
        handleFilterByFacet() {
            this.$route.query.attributes = { facetName: this.facet.key, values: this.facetValue_ };
            this.$store.commit('shop/setSelectedFacets', { facetName: this.facet.key, values: this.facetValue_ });

            let currentProductFilters = this.$core.useHelper.parseLink(window.location.origin + this.$route.fullPath);
            const facetsToSend = { ...this.$store.state.shop.facetsSelected };
            const facetRequest = [];

            for (const key in facetsToSend) {
                if (facetsToSend[key]) {
                    facetsToSend[key].forEach((item) => {
                        const value = item;
                        facetRequest.push(value);
                    });
                }
            }
            currentProductFilters = { ...currentProductFilters, filter_attribute: facetRequest };
            const link = this.$core.useHelper.generateLink(
                window.location.pathname,
                this.$route.params.id,
                currentProductFilters
            );

            this.$router.push(link);
        },
        currentProductFilters(filters) {
            this.facetValue_ = filters.filter_attribute;
        },
        removeDecimal(str) {
            if (isNaN(Number(str)) === false) {
                return String(Math.floor(str));
            }
            return str;
        },
    },
};
</script>
