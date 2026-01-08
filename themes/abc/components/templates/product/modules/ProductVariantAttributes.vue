<template>
    <div class="mt-6 mb-10">
        <div v-for="(criteria, index) in allCriteria" :key="index">
            <div class="mt-4">
                <div class="text-grey-4 font-700 size-18 mb-2">
                    {{ criteria }}
                </div>
                <div class="d-flex flex-wrap justify-content-start gap-4">
                    <div
                        v-for="(option, index2) in options.filter(
                            (optionToFilter) => optionToFilter.criteria === criteria,
                        )"
                        :key="index2"
                    >
                        <div :class="['py-2 px-4 rounded', option.status]" @click="() => handleSelectOption(option)">
                            {{ option.value }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DjProductVariantAttributes',
    props: {
        offers: {
            type: Array,
            default: () => [],
        },
        selectedOffer: {
            type: Object,
            required: false,
            default: () => {},
        },
    },
    emits: ['onOfferChange'],
    data: () => ({
        options: [],
        selectedVariant: [],
        selectedOptions: [],
        allCriteria: [],
        excludedPrefixes: ['FT_', 'Caracteristique_', 'VD_', 'Reference_Catalogue'],
    }),
    mounted() {
        // On crée les différentes combinaisons possibles
        const options = [];
        const allCriteria = [];
        this.offers.forEach((offer) => {
            offer.offerInventory.variant.attributeValues.forEach((attribute) => {
                const value = attribute.value[0];
                const criteria = attribute.attribute.name.FR;
                const externalId = attribute.attribute.externalId;
                if (this.excludedPrefixes.some((prefix) => externalId.startsWith(prefix))) {
                    return;
                }
                if (!allCriteria.includes(criteria)) {
                    allCriteria.push(criteria);
                }
                if (!options.find((variant) => variant.value === value && variant.criteria === criteria)) {
                    options.push({ criteria, value, status: 'active' });
                }
            });
        });
        // On récupère les valeurs par défaut dans la selectedOffer
        this.selectedOffer.offerInventory.variant.attributeValues.forEach((attribute) => {
            const criteria = attribute.attribute.name.FR;
            const value = attribute.value[0];
            this.selectedOptions.push({ criteria, value });
        });

        // On met à jour les options
        this.options = options.map((option) => {
            const selectedOption = this.selectedOptions.find(
                (selectedOption) => selectedOption.criteria === option.criteria,
            );
            if (selectedOption.value === option.value) {
                option.status = 'selected';
            }
            return option;
        });
        this.allCriteria = allCriteria;
    },
    methods: {
        handleSelectOption(option) {
            if (option.status === 'selected') {
                return;
            }
            // Mettre à jour selectedOptions
            this.selectedOptions = this.selectedOptions.map((selectedOption) => {
                if (selectedOption.criteria === option.criteria) {
                    selectedOption.value = option.value;
                }
                return selectedOption;
            });
            // Récupérer le variant (offer) disponible selon les critères choisis
            const filteredOptions =
                this.offers.find((variant) => {
                    const options = variant.offerInventory.variant.attributeValues
                        .filter((attribute) => {
                            const externalId = attribute.attribute.externalId;
                            return !this.excludedPrefixes.some((prefix) => externalId.startsWith(prefix));
                        })
                        .map((attribute) => {
                            const criteria = attribute.attribute.name.FR;
                            const value = attribute.value[0];
                            return { criteria, value };
                        });
                    return options.every((option) => {
                        const selectedOption = this.selectedOptions.find(
                            (selectedOption) => selectedOption.criteria === option.criteria,
                        );
                        return selectedOption.value === option.value;
                    });
                }) ?? null;
            // Mise à jour des status
            this.options = this.options.map((option) => {
                const selectedOption = this.selectedOptions.find(
                    (selectedOption) => selectedOption.criteria === option.criteria,
                );
                if (selectedOption.value === option.value) {
                    option.status = 'selected';
                } else {
                    option.status = 'active';
                }
                return option;
            });
            this.$emit('onOfferChange', filteredOptions);
        },
    },
};
</script>

<style lang="scss" scoped>
.selected {
    border: 1px solid var(--color-primary);
    background-color: var(--color-primary);
    color: var(--color-black);
}

.active {
    border: 1px solid var(--color-black);
    background-color: var(--color-white);
    cursor: pointer;
}

.inactive {
    border: 1px solid var(--color-grey-nuance-6);
    background-color: var(--color-grey-nuance-6);
    color: var(--color-white);
    cursor: not-allowed;
}

.acodis {
    .selected {
        border: 1px solid var(--color-secondary);
        background-color: var(--color-secondary);
        color: white;
    }

    .active {
        border: 1px solid var(--color-beige);
        background-color: var(--color-white);
        color: var(--color-beige);
        cursor: pointer;
    }
}
</style>
