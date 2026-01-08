<template lang="html">
    <div class="dj-client-say">
        <div class="container">
            <div class="dj-section__header">
                <div class="title__h3">What client say</div>
                <div class="ps-section__nav">
                    <a class="dj-carousel__prev" href="#">
                        <i class="icon-chevron-left"></i>
                    </a>
                    <a class="dj-carousel__next" href="#">
                        <i class="icon-chevron-right"></i>
                    </a>
                </div>
            </div>
            <div class="dj-section__content">
                <div class="dj-carousel" v-swiper:mySwiper="carouseSetting">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="dj-block--testimonial">
                                <div class="dj-block__header">
                                    <img src="~/static/img/users/1.jpg" alt="djust" />
                                </div>
                                <div class="dj-block__content">
                                    <i class="icon-quote-close"></i>
                                    <div class="title__h4">
                                        Kanye West
                                        <span>Head Chef at BBQ Restaurant</span>
                                    </div>
                                    <p>
                                        Sed elit quam, iaculis sed semper sit amet udin vitae nibh. at magna akal
                                        semperFusce commodo molestie luctus.Lorem ipsum Dolor tusima olatiup.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="dj-block--testimonial">
                                <div class="dj-block__header">
                                    <img src="~/static/img/users/2.png" alt="djust" />
                                </div>
                                <div class="dj-block__content">
                                    <i class="icon-quote-close"></i>
                                    <div class="title__h4">
                                        Anabella Kleva
                                        <span>Boss at TocoToco</span>
                                    </div>
                                    <p>
                                        Sed elit quam, iaculis sed semper sit amet udin vitae nibh. at magna akal
                                        semperFusce commodo molestie luctus.Lorem ipsum Dolor tusima olatiup.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="dj-block--testimonial">
                                <div class="dj-block__header">
                                    <img src="~/static/img/users/3.jpg" alt="djust" />
                                </div>
                                <div class="dj-block__content">
                                    <i class="icon-quote-close"></i>
                                    <div class="title__h4">
                                        William Roles
                                        <span>Head Chef at BBQ Restaurant</span>
                                    </div>
                                    <p>
                                        Sed elit quam, iaculis sed semper sit amet udin vitae nibh. at magna akal
                                        semperFusce commodo molestie luctus.Lorem ipsum Dolor tusima olatiup.
                                    </p>
                                </div>
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
    name: 'ClientSay',
    data() {
        return {
            carouseSetting: {
                loop: false,
                slidesPerView: 2,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.dj-carousel__next',
                    prevEl: '.dj-carousel__prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 1,
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
