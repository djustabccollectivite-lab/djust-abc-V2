<template lang="html">
    <AuthLayout
        :key="increment"
        :title="title"
        :linkText="$t('forgotPassword.backButton')"
        :linkUrl="'/auth/login'"
        :remove="remove"
    >
        <template #description v-if="!remove">
            <p>
                {{ $t('forgotPassword.description') }}
            </p>
        </template>
        <ForgotPasswordTemplate />
    </AuthLayout>
</template>

<script>
import ForgotPasswordTemplate from '@components/templates/auth/forgotPasswordTemplate.vue';
import AuthLayout from '@components/templates/auth/AuthLayout.vue';

export default {
    name: 'ForgotPasswordPages',
    components: {
        ForgotPasswordTemplate,
        AuthLayout,
    },
    created() {
        this.$nuxt.$on('removeTitle', (val) => {
            this.title = this.$t('forgotPassword.successMsg');
            this.remove = val;
        });
    },
    data() {
        return {
            title: this.$t('forgotPassword.title'),
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
