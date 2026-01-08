<template>
    <div v-if="page" class="presentation abc-container grid grid-col-12">
        <div class="presentation-container abc-small-container grid grid-col-12">
            <div class="presentation-image">
                <DjImage :src="page.image.filename" />
            </div>
            <div class="presentation-text">
                <div>
                    <span class="uppercase text-black font-700 size-16">{{ page.title }}</span>
                </div>
                <div class="mt-4">
                    <span class="text-black size-14" v-html="page.description"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DjImage from '@components/atoms/DjImage/DjImage.vue';

export default {
    name: 'Presentation',
    components: {
        DjImage,
    },
    data() {
        return {
            page: null,
        };
    },
    async created() {
        this.page = await this.$core.useStoryblok.getPresentationPage();
    },
};
</script>

<style lang="scss" scoped>
.presentation {
    &-container {
        gap: 16px;
        @media screen and (min-width: 1240px) {
            align-items: center;
            gap: 40px;
            padding-top: 40px;
            padding-bottom: 40px;
        }
    }
    &-image {
        grid-column: 5/9;
        @media screen and (min-width: 1240px) {
            grid-column: span 4;
            order: 2;
        }
    }
    &-text {
        grid-column: span 12;
        @media screen and (min-width: 1240px) {
            grid-column: span 8;
            order: 1;
        }
    } 
}
</style>
