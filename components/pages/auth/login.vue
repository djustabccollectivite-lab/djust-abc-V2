<template>
    <AuthLayout :title="$t('login.title')">
        <Login />
    </AuthLayout>
</template>

<script>
import Login from '@components/templates/auth/login.vue';
import AuthLayout from '@components/templates/auth/AuthLayout.vue';

export default {
    name: 'LoginPage',
    components: {
        Login,
        AuthLayout,
    },
};
</script>
