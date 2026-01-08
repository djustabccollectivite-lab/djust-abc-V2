<template lang="html">
    <AuthLayout :title="title" :linkText="$t('forgotPassword.backButton')" :linkUrl="'/auth/login'" :remove="remove">
        <Register />
    </AuthLayout>
</template>

<script>
import Register from '@components/templates/auth/register.vue';
import AuthLayout from '@components/templates/auth/AuthLayout.vue';

export default {
    name: 'RegisterPage',
    transition: 'zoom',
    components: {
        Register,
        AuthLayout,
    },
    created() {
        this.$nuxt.$on('removeTitle', (val) => {
            this.title = '';
            this.remove = val;
        });
        this.$nuxt.$on('changeTitle', (val) => {
            this.title = val;
        });
    },
    data() {
        return {
            title: 'Créez votre compte',
            increment: 1,
            remove: false,
        };
    },
    methods: {
        removeTitle() {
            this.increment++;
        },
    },
};
</script>

<style lang="scss" scoped></style>
