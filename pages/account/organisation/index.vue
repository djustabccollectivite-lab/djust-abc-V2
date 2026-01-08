<template lang="html">
    <OrganisationPage />
</template>
<script>
import OrganisationPage from '@components/pages/account/organisation/organisation.vue';

export default {
    middleware: 'auth',
    transition: 'zoom',
    layout(context) {
        return context.store.state.app.layoutType;
    },

    components: {
        OrganisationPage,
    },
};
</script>

<style lang="scss" scoped></style>
