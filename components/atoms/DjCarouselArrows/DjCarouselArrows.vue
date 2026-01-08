<template>
    <div class="swiper-nav container">
        <div :class="`swiper-arrow swiper-prev ${type === 'simple' ? 'simple' : ''}`">
            <i class="icon-chevron-left" />
        </div>
        <div :class="`swiper-arrow swiper-next ${type === 'simple' ? 'simple' : ''}`">
            <i class="icon-chevron-right" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'CarouselArrows',
    props: {
        type: {
            type: String,
            default: '',
        },
    },
};
</script>
