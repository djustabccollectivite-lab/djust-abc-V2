<template>
    <ManifPage />
</template>

<script>
import ManifPage from '@components/pages/manif/manif.vue';
export default {
    name: 'manif',
    components: { ManifPage },
    auth: process.env.store_type === 'private' ? null : false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
};
</script>

<style></style>
