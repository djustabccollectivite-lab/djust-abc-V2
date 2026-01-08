<template>
    <thead>
        <tr class="">
            <slot />
        </tr>
    </thead>
</template>
<script>
export default {
    name: 'DjTableHeading',
    inject: ['table'],
    mounted() {
        if (!this.$slots.default) return;
        this.table.updateColumnsCount(this.$slots.default.filter((node) => node.tag).length);
    },
};
</script>
