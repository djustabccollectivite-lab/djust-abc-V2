<template>
    <main v-if="homeComponents" id="homepage">
        <template v-for="block in homeComponents">
            <component :is="getComponent(block.component)" :key="block._uid" :block="block"></component>
        </template>
    </main>
</template>

<script>
import Slider from '@components/pages/homepage/b2c/modules/Slider.vue';
import FeaturesBlock from '@components/pages/homepage/b2c/modules/FeaturesBlock.vue';
import DjFeaturedProducts from '@components/organisms/DjFeaturedProducts/DjFeaturedProducts_HP.vue';
import LogosSlider from '@components/pages/homepage/b2c/modules/LogosSlider.vue';
import LastProducts from '@components/pages/homepage/b2c/modules/LastProducts.vue';
import BestPrices from '~/purjus/components/abc/homepage/BestPrices.vue';
import LogosTrust from '~/purjus/components/abc/homepage/LogosTrust.vue';

export default {
    name: 'Home',
    components: {
        FeaturesBlock,
        DjFeaturedProducts,
        LastProducts,
        Slider,
        LogosSlider,
        BestPrices,
        LogosTrust,
    },
    transition: 'zoom',
    data() {
        return {
            homeComponents: [],
        };
    },
    async created() {
        this.homeComponents = await this.$core.useStoryblok.getHomePage();
    },
    methods: {
        getComponent(component) {
            let result = null;
            switch (component) {
                case 'slider':
                    result = 'Slider';
                    break;
                case 'FeaturesBlock':
                    result = 'FeaturesBlock';
                    break;
                case 'featureProducts':
                    result = 'DjFeaturedProducts';
                    break;
                case 'LogosSlider':
                    result = 'LogosSlider';
                    break;
                case 'lastProducts':
                    result = 'lastProducts';
                    break;
                case 'bestPrices':
                    result = 'BestPrices';
                    break;
                case 'logosTrust':
                    result = 'LogosTrust';
                    break;
            }
            return result;
        },
    },
};
</script>
