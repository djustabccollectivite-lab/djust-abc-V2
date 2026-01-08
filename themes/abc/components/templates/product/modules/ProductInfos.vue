<template>
    <div class="mb-2 d-flex justify-space-between">
        <div>
            <h1 class="text-black mb-4">{{ product.name['FR'] }}</h1>
            <div class="mb-4">
                {{ $t('product.réference') }}:
                {{ variantSelected?.offerInventory?.variant.externalId }}
            </div>
            <div v-if="referenceCatalogue" class="mb-4">
                {{ $t('product.réference_catalogue') }}:
                {{ referenceCatalogue }}
            </div>
            <div v-if="product.brand" class="mb-4">
                {{ $t('product.brand') }}:
                <span
                    class="text-capitalize"
                    style="cursor: pointer"
                    @click="$router.push(`/search?filter_brand=${product.brand}`)"
                >
                    {{ product.brand }}
                </span>
            </div>
        </div>
        <div v-if="brandFilter" style="max-width: 150px">
            <a :href="`/search?filter_brand=${product.brand}`">
                <img
                    v-if="brandFilter.logo"
                    :src="brandFilter.logo + '/m/0x100'"
                    :alt="brandFilter.description ?? brandFilter.name"
                    class="brand-logo"
                />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductInfos',
    props: {
        product: {
            type: Object,
            default: () => {},
        },
        variantSelected: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            brandFilter: null,
        };
    },
    computed: {
        referenceCatalogue() {
            if (!this.variantSelected?.offerInventory?.variant?.attributeValues) {
                return null;
            }

            const referenceAttribute = this.variantSelected.offerInventory.variant.attributeValues.find(
                (attribute) => attribute?.attribute?.externalId === 'Reference_Catalogue',
            );

            return referenceAttribute?.value || null;
        },
    },
    async mounted() {
        this.brandFilter = await this.$purjus.abc.useAbcLogosHelper.getBrandFilterForShowLogo(this.product.brand);
    },
};
</script>
