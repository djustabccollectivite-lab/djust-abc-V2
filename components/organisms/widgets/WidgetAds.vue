<template lang="html">
    <section>
        <aside class="widget widget_ads">
            <nuxt-link to="/">
                <a>
                    <img :src="`${adsImage}`" alt="djust" width="100%" />
                </a>
            </nuxt-link>
        </aside>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import ProductThumbnail from '@components/organisms/productCard/ProductThumbnail.vue';

export default {
    name: 'ProductWidgets',
    components: { ProductThumbnail },
    props: {
        collectionSlug: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            adsImage: null,
        };
    },

    async fetch() {
        this.adsImage = await this.$core.useStoryblok.getAdsImage();
    },

    computed: {
        ...mapState({
            collections: (state) => state.collection.collections,
        }),
        products() {
            return null;
            //return collections
        },
    },
};
</script>

<style lang="scss" scoped></style>
