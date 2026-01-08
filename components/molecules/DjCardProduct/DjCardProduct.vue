<template>
    <div class="dj-card__product" :class="classCss">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'DjCardProduct',
    components: {},
    props: {
        classCss: {
            type: String,
            default: '',
            required: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-card__product {
    width: 100%;
    box-shadow: var(--shadow-card__product, 0 4px 10px rgb(0 0 0 / 3%));
    border-radius: var(--radius-product-thumbnail);
    background-color: var(--background-product-thumbnail);
    &:hover {
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12));
    }
}
</style>
