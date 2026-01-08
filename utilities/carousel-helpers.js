export const carouselFullwidth = {
    loop: false,
    slidesPerView: 4,
    spaceBetween: 20,
    scrollbar: {
        draggable: true,
    },
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: false,
    },
    breakpoints: {
        1680: {
            slidesPerView: 4,
        },
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
};
export const carouselStandard = {
    loop: false,
    slidesPerView: 5,
    spaceBetween: 10,
    autoHeight: false,
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },
    breakpoints: {
        1680: {
            slidesPerView: 4,
        },
        1366: {
            slidesPerView: 4,
        },
        1200: {
            pagination: false,
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
};
export const carouselSingle = {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 1,
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
    },
};
