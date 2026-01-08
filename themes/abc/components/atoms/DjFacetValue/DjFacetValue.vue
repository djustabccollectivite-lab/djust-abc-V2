<template>
    <div>
        <div class="font-500 size-16">
            {{ facet.name }}
        </div>
        <figure>
            <template v-for="value in $core.useHelper.sortedName(facetValue)">
                <v-checkbox
                    v-if="value"
                    :key="value + facet.name"
                    v-model="facetValue_"
                    :value="facet.name + '|' + value"
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
            this.$route.query.attributes = { facetName: this.facet.name, values: this.facetValue_ };
            this.$store.commit('shop/setSelectedFacets', { facetName: this.facet.name, values: this.facetValue_ });

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
                currentProductFilters,
            );

            this.$router.push(link);
        },
        currentProductFilters(filters) {
            this.facetValue_ = filters.filter_attribute.filter((filter) => filter.startsWith(`${this.facet.name}|`));
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
