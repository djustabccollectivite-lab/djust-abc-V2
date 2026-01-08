<template>
    <div class="mt-10 px-10">
        <h1 class="font-700 size-24 text-blue mt-12 mb-8 uppercase">{{ title }}</h1>
        <div class="row">
            <div v-for="(item, index) in blocks" :key="index" class="col col-12 col-md-6 col-lg-3 px-2">
                <div class="feature d-flex align-items-center p-4">
                    <div class="px-2 mr-2">
                        <SvgIcon :name="item.icon" />
                    </div>
                    <div>
                        <div class="text-black font-700 size-16 text-uppercase">
                            {{ item.title }}
                        </div>
                        <div class="text-black-3">
                            {{ item.text }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'FeaturesBlock',
    components: { SvgIcon },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        title() {
            const titleBlock = this.block.items.find((component) => component.component === 'featureProducts');
            return titleBlock?.title;
        },
        blocks() {
            return this.block.items.filter((component) => component.component === 'FeatureItem');
        },
    },
};
</script>

<style lang="scss" scoped>
.feature {
    gap: 8px;
    height: 100%;
    border-radius: 4px;
    @media screen and (min-width: 960px) {
        box-shadow: 0 2px 4px 1px rgba(105, 105, 105, 0.25) !important;
    }
}
</style>
