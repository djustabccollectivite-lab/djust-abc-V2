<template>
    <div class="dj-section__swiper" :style="{ backgroundColor: backgroundColor }">
        <div class="dj-container dj-container__swiper widthStyle" :style="{ width: width }">
            <div class="dj-section__header dj-section__header__white">
                <div class="title__h4 TitleHeader">{{ title }}</div>
                <DjLink v-if="withlink" class="linkHeader" :to="'list'">
                    {{ $t('common.seeAllOffers') }}
                    <i class="icon icon-chevron-right"></i>
                </DjLink>
            </div>
            <div class="dj-section__content">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    name: 'DjSwiperBlock',
    components: { DjLink },
    props: {
        title: {
            type: String,
            default: '',
        },
        backgroundColor: {
            type: String,
            default: 'transparent',
        },
        withlink: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: '94%',
        },
    },
};
</script>

<style lang="scss" scoped>
.linkHeader {
    display: flex;
    justify-content: flex-end;
    flex: auto;
    align-items: center;
    font-weight: 500;
    line-height: 1em;
    color: var(--color-link);
    i {
        transform: translateY(1px);
        margin-left: 0.25em;
        font-size: 0.85em;
        line-height: 1em;
    }
    &:hover {
        color: var(--color-link);
    }
}
.TitleHeader {
    display: flex;
    justify-content: flex-start;
    flex: auto;
    align-items: center;
    font-weight: 500;
    line-height: 1em;
    color: var(--color-link);
}
.widthStyle {
    max-width: 100%;
}
</style>
