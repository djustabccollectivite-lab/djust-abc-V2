<template lang="html">
</template>

<script>

export default {
    
    auth: process.env.store_type === 'private' ? null : false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition() {
        return 'fadeIn';
    },
};
</script>

<style lang="scss" scoped></style>
