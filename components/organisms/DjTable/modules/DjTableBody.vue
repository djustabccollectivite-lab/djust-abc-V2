<template>
    <tbody>
        <slot />
    </tbody>
</template>
<script>
export default {
    name: 'DjTableBody',
    inject: ['table'],
    mounted() {
        if (!this.$slots.default) return;
        this.table.updateColumnsCount(this.$slots.default.filter((node) => node.tag).length);
    },
};
</script>
