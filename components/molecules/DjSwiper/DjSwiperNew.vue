<template>
    <div class="swiper-container align-center">
        <div class="swiper-controls__ctas">
            <DjButton
                class="swiper-arrow"
                :class="[prevControler]"
                :text-displayed="false"
                styleButton="slide-primary"
                shape="icon"
                size="small"
                :iconDisplayed="true"
                icon="icon-chevron-left"
            />
        </div>
        <slot name="carousel">
            <div v-swiper="options" class="dj-carousel">
                <div class="swiper-wrapper swiper align-start">
                    <slot name="slides" />
                </div>
                <div v-if="options.pagination !== false" class="swiper-pagination swiper-pagination-bullets"></div>
            </div>
        </slot>
        <div class="swiper-controls__ctas">
            <DjButton
                class="swiper-arrow"
                :class="[nextControler]"
                :text-displayed="false"
                styleButton="slide-primary"
                shape="icon"
                size="small"
                :iconDisplayed="true"
                icon="icon-chevron-right"
            />
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api';
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default defineComponent({
    components: { DjButton },
    props: {
        options: {
            required: true,
            type: Object,
        },
        identifier: {
            required: true,
            type: String,
        },
    },
    setup(props) {
        const prevControler = computed(() => {
            return `swiper-${props.identifier}-prev`;
        });
        const nextControler = computed(() => {
            return `swiper-${props.identifier}-next`;
        });

        return { prevControler, nextControler };
    },
});
</script>

<style lang="scss" scoped>
.swiper {
    &__slide {
        width: auto;
    }
}
.swiper-container {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 0;
    gap: 32px;

    @media (min-width: 1024px) {
        gap: 64px;
    }
}
.swiper-arrow {
    position: inherit;

    &:hover {
        background-color: transparent;
    }

    .v-application a {
        color: var(--color-primary) !important;
    }
}

.dj-carousel {
    position: unset !important;
}
</style>
