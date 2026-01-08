<template>
    <tr class="">
        <slot />
    </tr>
</template>
<script>
export default {
    name: 'DjTableRow',
    inject: ['table'],
    mounted() {
        if (!this.$slots.default) return;
        this.table.updateColumnsCount(this.$slots.default.filter((node) => node.tag).length);
    },
};
</script>
