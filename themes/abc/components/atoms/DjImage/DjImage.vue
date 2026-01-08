<template>
    <img :src="url" :alt="alt" :class="imageClass" :width="width" />
</template>

<script>
export default {
    name: 'DjImage',
    props: {
        src: {
            type: [Object, String],
            default: '/img/product_placeholder.png',
        },
        width: {
            type: [Number, String],
            default: null,
            validator: (value) => !isNaN(value),
        },
        height: {
            type: [Number, String],
            default: null,
            validator: (value) => !isNaN(value),
        },
        sizeType: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: '/img/product_placeholder.svg',
        },
        alt: {
            type: String,
            default: '',
        },
        imageClass: {
            type: String,
            default: '',
        },
        isFixed: {
            type: Boolean,
            default: false,
        },
        lazyLoad: {
            type: Boolean,
            default: true,
        },
        imageTag: {
            type: String,
            default: 'img',
            validator: (value) => ['', 'img', 'v-img'].includes(value),
        },
        source: {
            type: String,
            default: 'origin', // Can be storyblok or origin
        },
    },
    data() {
        return {
            url: '',
            filteredSrc: '',
        };
    },
    created() {
        if (this.source === 'origin' && this.src) {
            if (typeof this.src !== 'string') {
                const { ...data } = this.src;

                if (this.src?.urls) {
                    data.urls = this.src.urls.filter((obj) => {
                        return obj.sizeType !== 'BO';
                    });
                } else if (this.src?.pictureUrls) {
                    data.urls = this.src.pictureUrls.filter((obj) => {
                        return obj.sizeType !== 'BO' && obj.main;
                    });
                }

                this.filteredSrc = data;
            }

            if (typeof this.src === 'string') {
                this.url = this.src;
            } else if (this.sizeType) {
                this.url = this.$core.useHelper.GetImageUrlBySizeType(this.filteredSrc, this.sizeType);
            } else if (this.width && this.height) {
                this.url = this.$core.useHelper.GetImageUrlByDimensions(this.filteredSrc, this.width, this.height);
            } else if (!this.width) {
                this.url = this.$core.useHelper.GetImageUrlByHeight(this.filteredSrc, this.height);
            } else if (!this.height) {
                this.url = this.$core.useHelper.GetImageUrlByWidth(this.filteredSrc, this.width);
            } else {
                this.url = this.placeholder;
            }
        } else if (this.source === 'storyblok') {
            if (this.width || this.height) {
                this.url = this.useHelper.OptimizeImageStoryblok(this.src, `${this.width ?? 0}x${this.height ?? 0}`);
            } else {
                this.url = this.placeholder;
            }
        }
    },
};
</script>
