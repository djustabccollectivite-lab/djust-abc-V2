<template lang="html">
    <div class="ps-home-ads">
        <div class="dj-container">
            <div class="row">
                <div :class="classes" v-for="img in imgs" :key="img.id">
                    <nuxt-link :to="`${img.link}`" class="dj-collection">
                        <img :src="`${img.img}`" :alt="`${img.alt}`" />
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeAdsColumns',
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        imgs() {
            return this.block.data.imgs ? this.block.data.imgs : [];
        },
        nbColumns() {
            return this.block.data.imgs ? this.block.data.imgs.length : 1;
        },
        classes() {
            let classCol = '';
            switch (this.nbColumns) {
                case 1:
                    classCol = 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12';
                    break;
                case 2:
                    classCol = 'col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12';
                    break;
                case 3:
                    classCol = 'col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12';
                    break;
                default:
                    classCol = 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12';
                    break;
            }
            return classCol;
        },
    },
};
</script>

<style lang="scss" scoped></style>
