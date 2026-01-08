<template lang="html">
    <AuthLayout
        :title="$t('validation.successValidationTitle')"
        :linkText="$t('resetPassword.backButton')"
        :linkUrl="'/auth/login'"
        :remove="remove"
    >
        <Validation />
    </AuthLayout>
</template>

<script>
export default {
    name: 'ValidationPage',
    transition: 'zoom',
    components: {
        Validation,
    },
};
</script>

<style lang="scss" scoped>
.dj-tab-list {
    padding-left: 0;
}
</style>
