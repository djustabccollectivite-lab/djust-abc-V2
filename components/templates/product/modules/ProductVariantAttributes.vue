<template>
    <div v-if="attributsList">
        <div v-for="attribute in attributes" :key="attribute.id" class="variant-content">
            <div v-if="attribute.selected !== -1" class="variant-name">
                {{
                    attribute.attribute.name[locale]
                        ? attribute.attribute.name[locale]
                        : Object.values(attribute.attribute.name)[0]
                }}
                :
            </div>
            <div class="variants-values">
                <v-btn-toggle
                    v-if="attribute.selected != -1"
                    v-model="attributsList[findAttributIndex(attribute.attribute.id)].selected"
                    tile
                    group
                    style="display: inline-block"
                >
                    <v-btn
                        v-for="attributeValue in attribute.attributeValues"
                        v-show="attributeValue?.value != null"
                        :key="attributeValue.id"
                        class="attribut"
                        :value="attributeValue.code"
                        :disabled="!hasOffer({ attributeId: attribute.attribute.id, valueId: attributeValue?.value })"
                        @click="
                            !isSelected({ attributeId: attribute.attribute.id, valueId: attributeValue?.value })
                                ? select({ attributId: attribute.attribute.id, valueId: attributeValue?.value })
                                : null
                        "
                    >
                        {{ attributeValue?.value }}
                    </v-btn>
                </v-btn-toggle>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DjProductVariantAttributes',
    props: {
        attributes: {
            type: Array,
            default: () => [],
        },
        offerToDisplay: {
            type: [Object, Boolean],
            default: () => [] | false,
        },
    },
    data: () => ({
        attributsList: null,
        selectedAttributeValues: [],
    }),
    computed: {
        locale() {
            return this.$i18n.localeProperties.code.toUpperCase();
        },
    },
    async mounted() {
        const attributesList = [...this.attributes];
        const offerVariant = this.offerToDisplay.offerInventory.variant.attributeValues;
        attributesList.forEach((attribut) => {
            const variantAttribut = offerVariant.find((a) => a.attribute.id === attribut.attribute.id);
            let valueAttribute = '';

            if (variantAttribut?.value) {
                switch (variantAttribut?.attribute.type) {
                    case 'LIST_TEXT':
                        valueAttribute = variantAttribut.value[0];
                        break;
                    case 'LIST_METRIC':
                    case 'METRIC':
                        valueAttribute = `${variantAttribut.value.selectedValue} ${variantAttribut.value.unit}`;
                        break;
                    case 'LIST_COLOR':
                        valueAttribute = variantAttribut.value[0].label;
                        break;
                    default:
                        valueAttribute = variantAttribut.value;
                        break;
                }
            }
            attribut.selected = attribut.attributeValues.findIndex((a) => {
                return a.value === valueAttribute;
            });
        });

        this.attributsList = attributesList;
        this.selectedAttributeValues = attributesList.map((attribut) => ({
            attributId: attribut.attribute.id,
            valueId: attribut.selected !== -1 ? attribut.attributeValues[attribut.selected].value : null,
        }));
        await this.$core.useOffer.findVariantIdToDisplay(this.selectedAttributeValues);
        $nuxt.$emit('findVariantIdToDisplay', this.selectedAttributeValues);
    },
    methods: {
        hasOffer(attribute) {
            return this.$core.useOffer.hasAttributeValueAtLeastOneOffer(attribute);
        },
        isSelected({ attributeId, valueId }) {
            return this.selectedAttributeValues.some(
                (selectedAttribute) =>
                    selectedAttribute.attributId === attributeId && selectedAttribute.valueId === valueId,
            );
        },
        findAttributIndex(value) {
            return this.attributsList && this.attributsList.findIndex((attrib) => attrib.attribute.id === value);
        },
        select(payload) {
            const attributs = [...this.attributsList];
            this.selectedAttributeValues = attributs.map((attribut) => ({
                attributId: attribut.attribute.id,
                valueId:
                    payload?.attributId === attribut.attribute.id
                        ? payload.valueId
                        : attribut.attributeValues[attribut.selected]?.value,
            }));
            this.$nuxt.$emit('findOfferIdToDisplay', this.selectedAttributeValues);
            this.$nuxt.$emit('findVariantIdToDisplay', this.selectedAttributeValues);
        },
    },
};
</script>

<style lang="scss" scoped>
.attribut {
    border-radius: 3px !important;
    border: 1px solid #d8d8d8 !important;
    font-size: 12px !important;
    height: 36px !important;
    min-width: 98px !important;
}

.attribute-name {
    padding-top: 14px;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
}

.v-btn--active {
    border: 1px solid #5c5c5c !important;
}

.btnToggleVariant {
    display: inline-block;

    @media (max-width: 550px) {
        display: flex;
        flex-direction: column;
    }
}

.disable-events {
    pointer-events: none;
    cursor: not-allowed;
    background-color: gray;
    color: white;
    border: none;
}
.v-btn[disabled] {
    cursor: not-allowed !important;
    background-color: gray !important;
    color: white !important;
    border: none !important;
}
</style>
