<template>
  <client-only>
    <div class="dj-product__thumbnail" data-vertical="true">
      <figure>
        <div class="ps-wrapper">
          <div class="dj-product__gallery dj-carousel inside swiper" v-swiper:swiperGallery="swiperOptionTop">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="image in images" :key="image.url">
                <div v-if="productTagsToDisplay.length > 0 && tag" class="dj-product__badge__zone">
                  <div v-for="tag in productTagsToDisplay" class="dj-product__badge mb-1" :key="tag">
                    {{ tag }}
                  </div>
                </div>
                <DjImage :src="image.url" />
              </div>
            </div>
            <div class="swiper-nav">
              <span class="swiper-arrow swiper-prev">
                <i class="icon-chevron-left"></i>
              </span>
              <div class="swiper-arrow swiper-next">
                <i class="icon-chevron-right"></i>
              </div>
            </div>
            <div class="swiper-pagination swiper-pagination-bullets"></div>
          </div>
        </div>
      </figure>
    </div>
  </client-only>
</template>

<script>
import DjImage from '@components/atoms/DjImage/DjImage.vue';

export default {
  name: 'DjThumbnailCountDown',
  components: {
    DjImage,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    productInfos: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    productTagsToDisplay() {
      return this.$core.getProduct.getProductTags(this.productInfos);
    },
  },
  data: () => ({
    swiperOptionTop: {
      loop: false,
      loopedSlides: 45,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
    },
    swiperOptionThumbs: {
      direction: 'vertical',
      loop: false,
      loopedSlides: 4,
      spaceBetween: 10,
      slidesPerView: 4,
      touchRatio: 0,
      slideToClickedSlide: true,
      breakpoints: {
        1024: {
          slidesPerView: 3,
          direction: 'horizontal',
        },
      },
    },
  }),
  methods: {
    handleClickSlide(index) {
      this.activeSlide = index;
      this.swiperVariants.activeIndex = index;
      this.swiperGallery.slideTo(index, 500, false);
    },
  },
};
</script>
