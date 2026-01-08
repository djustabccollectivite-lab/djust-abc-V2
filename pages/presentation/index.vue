<template lang="html">
    <presenation />
</template>

<script>
import presenation from '@components/pages/presentation/presentation.vue';

export default {
    components: {
        presenation,
    },
    auth: process.env.store_type === 'private' ? null : false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition: 'zoom',
};
</script>

<style lang="scss" scoped></style>
