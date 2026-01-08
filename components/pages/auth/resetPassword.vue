<template lang="html">
    <AuthLayout
        :key="increment"
        :title="title"
        :linkText="$t('resetPassword.backButton')"
        :linkUrl="'/auth/login'"
        :remove="remove"
    >
        <template #description v-if="!remove">
            <p>
                {{ $t('resetPassword.description') }}
            </p>
        </template>
        <ResetPasswordTemplate :token="token" />
    </AuthLayout>
</template>

<script>
import ResetPasswordTemplate from '@components/templates/auth/resetPasswordTemplate.vue';
import AuthLayout from '@components/templates/auth/AuthLayout.vue';

export default {
    name: 'ResetPasswordPages',
    components: {
        ResetPasswordTemplate,
        AuthLayout,
    },
    props: {
        token: {
            type: String,
            default: '',
        },
    },
    created() {
        this.$nuxt.$on('removeTitle', (val) => {
            this.title = this.$t('forgotPassword.successMsg');
            this.remove = val;
        });
    },
    data() {
        return {
            title: this.$t('resetPassword.title'),
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

<style lang="scss"></style>
