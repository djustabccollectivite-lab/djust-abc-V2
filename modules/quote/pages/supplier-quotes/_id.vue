<template lang="">
    <section class="dj-home--fob">
        <SupplierQuotes :supplierQuote="supplierQuote"  />
    </section>
</template>
<script>
import { defineComponent, useRoute, useContext, ref } from '@nuxtjs/composition-api';
import SupplierQuotes from '@modules/quote/components/supplierQuote.vue';
export default defineComponent({
    name: 'supplier-quote-page',
    auth: process.env.store_type === 'private' ? null : false,
    transition: 'zoom',
    layout(context) {
        return context.store.state.app.layoutType;
    },
    components: {
        SupplierQuotes,
    },
    data() {
        return {
            supplierQuote: null
        }
    },
    async created() {
        const id = this.$route.params.id;
        this.supplierQuote = await this.$core.useQuote.getSupplierQuoteById(id);
    }
});
</script>
<style lang="scss">
.dj-home--fob {
    //max-width: 1280px;
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
</style>