<template>
    <main id="homepage-1">
        <template v-for="block in homeComponents">
            <component :is="getComponent(block.component)" :block="block" :key="block._uid"></component>
        </template>
    </main>
</template>

<script>
import Slider from '@components/pages/homepage/b2c/modules/Slider.vue';
import HomeAdsColumns from '@components/pages/homepage/b2c/modules/HomeAdsColumns.vue';
import HomeAds from '@components/pages/homepage/b2c/modules/HomeAds.vue';
import HomeDefaultTopCategories from '@components/pages/homepage/b2c/modules/HomeDefaultTopCategories.vue';
import Row from '@components/pages/homepage/b2c/modules/RowContent.vue';
import DjFeaturedProducts from '@components/organisms/DjFeaturedProducts/DjFeaturedProducts_HP.vue';
import LastProducts from '@components/pages/homepage/b2c/modules/LastProducts.vue';
import HomeBanner from '@components/pages/homepage/b2c/modules/HomeBanner.vue';
import Swiper from '@components/pages/homepage/b2c/modules/Swiper.vue';
import FeaturesBlock from '@components/pages/homepage/b2c/modules/FeaturesBlock.vue';
import LogosSlider from '@components/pages/homepage/b2c/modules/LogosSlider.vue';
import Newsletters from '@components/organisms/commons/Newsletters.vue';

export default {
    name: 'home',
    transition: 'zoom',
    components: {
        HomeBanner,
        HomeAdsColumns,
        HomeAds,
        Row,
        Newsletters,
        FeaturesBlock,
        HomeDefaultTopCategories,
        DjFeaturedProducts,
        LastProducts,
        Slider,
        Swiper,
        LogosSlider,
    },
    async asyncData({ store }) {
        const components = await this.$core.useStoryblok.getHomePage();
        return {
            homeComponents: components,
            homeNotFullWidth: process.env.home_notfullwidth === 'true' ? true : false,
        };
    },
    data() {
        return {
            homeComponents: [],
            homeNotFullWidth: null,
        };
    },
    head: {
        bodyAttrs: {
            class: 'home-page',
        },
    },
    methods: {
        getComponent(component) {
            let result = null;
            switch (component) {
                case 'slider':
                    result = 'Slider';
                    break;
                case 'featureProducts':
                    result = 'DjFeaturedProducts';
                    break;
                case 'categories':
                    result = 'slider';
                    break;
                case 'grid':
                    result = 'Row';
                    break;
                case 'lastProducts':
                    result = 'lastProducts';
                    break;
                case 'Swiper':
                    result = 'Swiper';
                    break;
                case 'FeaturesBlock':
                    result = 'FeaturesBlock';
                    break;
                case 'LogosSlider':
                    result = 'LogosSlider';
                    break;

                default:
                    console.log(`Sorry, MODULE NOT FOUND`);
            }
            return result;
        },
    },
    async created() {
        this.homeComponents = await this.$core.useStoryblok.getHomePage();
        this.homeNotFullWidth = this.$config.home_notfullwidth === 'true' ? true : false;
    },
};
</script>

<style>
@media (min-width: 1200px) {
    .not-full-width {
        max-width: 1230px !important;
        margin-right: auto;
        margin-left: auto;
    }
}
</style>
