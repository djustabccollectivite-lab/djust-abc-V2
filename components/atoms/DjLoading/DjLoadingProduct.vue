<template lang="html">
    <v-skeleton-loader v-if="show" indeterminate type="image, article" />
</template>

<script>
export default {
    name: 'LoadingProduct',
    data() {
        return {
            show: true,
        };
    },

    beforeDestroy() {
        this.show = false;
    },
};
</script>

<style lang="scss" scoped></style>
