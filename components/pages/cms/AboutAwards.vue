<template lang="html">
    <div class="dj-about-awards">
        <div class="container">
            <div class="dj-section__header">
                <div class="title__h4">Awards & Recognition</div>
                <p>
                    Industry leaders and influencers recognize Overstock as one of the most trust worthy retail
                    companies in the U.S., ranking high for both customer and employee satisfaction.
                </p>
            </div>
            <div class="dj-section__content">
                <div class="dj-carousel" v-swiper:mySwiper="swiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="item">
                                <nuxt-link to="/page/blank">
                                    <a><img src="/img/awards/1.png" alt="djust" /></a>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="item">
                                <nuxt-link to="/page/blank">
                                    <a><img src="/img/awards/2.png" alt="djust" /></a>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="item">
                                <nuxt-link to="/page/blank">
                                    <a><img src="/img/awards/3.png" alt="djust" /></a>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="item">
                                <nuxt-link to="/page/blank">
                                    <a><img src="/img/awards/4.png" alt="djust" /></a>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="item">
                                <nuxt-link to="/page/blank">
                                    <a><img src="/img/awards/5.png" alt="djust" /></a>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutAwards',
    data() {
        return {
            swiperOption: {
                loop: false,
                slidesPerView: 5,
                spaceBetween: 1,

                breakpoints: {
                    1366: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                },
            },
        };
    },
};
</script>

<style lang="scss" scoped></style>
