<template>
    <client-only>
        <AuthLayout
            :key="increment"
            :title="$t('firstLogin.title')"
            :linkText="$t('forgotPassword.backButton')"
            :linkUrl="'/auth/login'"
            :remove="remove"
        >
            <template #description v-if="!remove">
                <p>
                    {{ $t('firstLogin.description') }}
                </p>
            </template>
            <ForgotPasswordTemplate :buttonName="$t('firstLogin.button')" />
        </AuthLayout>
    </client-only>
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
    auth: false,

    layout(context) {
        return context.$config.mode == 'private' ? 'blank' : 'horizontal';
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
