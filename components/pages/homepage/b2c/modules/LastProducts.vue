<template>
    <div v-if="localStore" class="dj-lastProducts">
        <DjProductsSlider
            :title="localStore ? block.title : 'Derniers produits vus'"
            :products="products"
            :displayLine="false"
        />
    </div>
</template>

<script>
import DjProductsSlider from '@components/organisms/DjProductsSlider/DjProductsSlider.vue';

export default {
    name: 'LastSeenProducts',
    components: { DjProductsSlider },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        user() {
            return this.$auth.$storage.getUniversal('user');
        },

        line() {
            return this.block.data.line === 'true' ? true : false;
        },
    },
    data() {
        return {
            newwkey: 30928,
            products: [],
            localStore: JSON.parse(localStorage.getItem('lastProducts')),
        };
    },
    watch: {
        auth: function () {
            this.$forceUpdate();
            this.newwkey += 1;
        },
    },
    async mounted() {
        if (this.$auth.loggedIn) await this.$core.useQuote.getAllMasterQuotes(null);
        if (this.localStore) {
            this.products = await this.$core.useThumbnails.getFeatureProducts({
                productSku: JSON.parse(localStorage.getItem('lastProducts')),
            });
        }
    },
    beforeDestroy() {
        this.products = [];
    },
};
</script>
<style lang="scss" scoped>
.dj-lastProducts {
    padding: 20px 40px;
}
</style>
