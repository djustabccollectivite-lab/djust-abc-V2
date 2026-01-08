<template lang="html">
    <span class="dj-rating">
        <i class="fa" :class="nb >= 1 ? 'fa-star' : 'fa-star-o'"></i>
        <i class="fa" :class="nb >= 2 ? 'fa-star' : 'fa-star-o'"></i>
        <i class="fa" :class="nb >= 3 ? 'fa-star' : 'fa-star-o'"></i>
        <i class="fa" :class="nb >= 4 ? 'fa-star' : 'fa-star-o'"></i>
        <i class="fa" :class="nb >= 5 ? 'fa-star' : 'fa-star-o'"></i>
    </span>
</template>

<script>
export default {
    name: 'Rating',
    props: {
        nb: {
            type: Number|String,
            default: 0,
        },
    },
};
</script>

<style lang="scss" scoped></style>
