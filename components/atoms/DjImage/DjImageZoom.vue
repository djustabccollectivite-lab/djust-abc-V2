<template>
    <div class="zoom-in-image">
        <div class="image-container" @mousemove="updateZoom($event)" @mouseleave="updateZoomInit($event)" @click="onclickZoom($event)">
            <img :src="url" :alt="alt" :style="imageStyle" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'DjImage',
    props: {
        src: {
            type: Object | String,
            default: '/img/product_placeholder.svg',
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
            default: 'origin', //Can be storyblok or origin
        },
    },
    data() {
        return {
            url: '',
            filteredSrc: '',
            isZoomed: false,
            zoomValue: 3,
            imageStyle: {
                transform: 'scale(1)',
                transformOrigin: '0 0', 
            },
        };
    },
    methods: {
        zoomIn() {
            this.isZoomed = true;
        },
        zoomOut() {
            this.isZoomed = false;
        },
        updateZoom(event) {
            const container = event.currentTarget;
            const x = (event.offsetX / container.offsetWidth) * 100;
            const y = (event.offsetY / container.offsetHeight) * 100;
            this.imageStyle.transformOrigin = `${x}% ${y}%`;
            this.imageStyle.transform = `scale(${this.zoomValue})`;

        },
        updateZoomInit(event) {
            this.imageStyle.transformOrigin = `0 0`;
            this.imageStyle.transform = 'scale(1)'; 
            this.zoomValue = 3
        },
        onclickZoom(event) {
            this.zoomValue = this.zoomValue + 1
            const container = event.currentTarget;
            const x = (event.offsetX / container.offsetWidth) * 100;
            const y = (event.offsetY / container.offsetHeight) * 100;
            this.imageStyle.transformOrigin = `${x}% ${y}%`;
            this.imageStyle.transform = `scale(${this.zoomValue})`;
        }
    },
    created() {
        if (this.source === 'origin') {
            if (this.src) {
                if (typeof this.src !== 'string') {
                    let { urls, ...filteredSrc } = this.src;
                    filteredSrc.urls = this.src.urls.filter(function (obj) {
                        return obj.sizeType !== 'BO';
                    });
                    this.filteredSrc = filteredSrc;
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
            }
        } else if (this.source === 'storyblok') {
            if (this.width && this.height) {
                const optionTaille = this.width + 'x' + this.height;
                this.url = this.useHelper.OptimizeImageStoryblok(this.src, optionTaille);
            } else if (!this.width) {
                const optionTaille = '0x' + this.height;
                this.url = this.useHelper.OptimizeImageStoryblok(this.src, optionTaille);
            } else if (!this.height) {
                const optionTaille = this.width + 'x0';
                this.url = this.useHelper.OptimizeImageStoryblok(this.src, optionTaille);
            } else {
                this.url = this.placeholder;
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.zoom-in-image {
    position: relative;
}

.image-container {
    overflow: hidden;
    cursor: zoom-in;
}

.image-container img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
}
</style>
