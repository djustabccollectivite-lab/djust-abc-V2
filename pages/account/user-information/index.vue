<template lang="html">
    <UserInformationPage />
</template>
<script>
import UserInformationPage from '@components/pages/account/profile/user-information.vue';

export default {
    name: 'UserProfilePage',
    middleware: 'auth',
    transition: 'zoom',
    layout(context) {
        return context.store.state.app.layoutType;
    },

    components: {
        UserInformationPage,
    },
};
</script>

<style lang="scss" scoped></style>
