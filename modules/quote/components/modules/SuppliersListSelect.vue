<template>
    <div class="dj-product__content_page">
        <v-text-field v-if="suppliersList.length == 1" v-model="defaultSupplier" label="Supplier" solo readonly>
        </v-text-field>
        <v-autocomplete
            v-else
            v-model="selectedSuppliers"
            :items="suppliersList"
            item-text="name"
            item-value="id"
            auto-select-first
            small-chips
            deletable-chips
            multiple
            solo
            :change="onChangeSuppliers()"
        ></v-autocomplete>
    </div>
</template>

<script>
export default {
    name: 'SuppliersListSelect',
    props: {
        productId: {
            type: String,
            default: null,
        },
        MasterQuoteId: {
            type: String,
            default: null,
        },
        QuoteLineId: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            suppliersList: [],
            selectedSuppliers: [],
            defaultSupplier: null,
        };
    },
    async created() {
        this.suppliersList = await this.$core.useProduct.getListSuppliersbyProductVariantId(this.productId);
        if (this.suppliersList.length == 1) {
            this.selectedSuppliers = [this.suppliersList[0].id];
            this.defaultSupplier = this.suppliersList[0].name;
            const data = {
                MasterQuoteId: this.MasterQuoteId,
                QuoteLineId: this.QuoteLineId,
                suppliersIds: this.selectedSuppliers,
            };
            this.$store.commit('quote/setQuoteLineSuppliers', data);
        } else {
            // TEMPORAIRE
            let data = this.$store.state.quote.supplierId;
            if (data) {
                if (data.productId === this.productId && data.supplierId) {
                    this.selectedSuppliers = [data.supplierId];
                }
            }
        }
    },
    methods: {
        onChangeSuppliers() {
            const data = {
                MasterQuoteId: this.MasterQuoteId,
                QuoteLineId: this.QuoteLineId,
                suppliersIds: this.selectedSuppliers,
            };
            this.$store.commit('quote/setQuoteLineSuppliers', data);
        },
    },
};
</script>

<style></style>
