<template lang="html">
    <div class="dj-top-categories">
        <div class="dj-container">
            <div class="title__h3">{{ $t('homeDefault.topCategories') }}</div>
            <div class="row">
                <div
                    v-for="categorie in categoriesToDisplay"
                    :key="categorie.id"
                    class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6"
                >
                    <div class="dj-block--category">
                        <nuxt-link :to="`${categorie.categoryLink}`" class="dj-block__overlay"> </nuxt-link>
                        <img :src="`http://localhost:1337${categorie.categoryImage.url}`" :alt="`${categorie.alt}`" />
                        <p>{{ categorie.categoryName }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeDefaultTopCategories',
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        categoriesToDisplay() {
            return this.block.item_category;
        },
    },
};
</script>

<style lang="scss" scoped></style>
