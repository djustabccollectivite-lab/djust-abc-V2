<template>
    <client-only>
        <ForgotPassword />
    </client-only>
</template>
<script>
import ForgotPassword from '@components/pages/auth/forgotPassword.vue';

export default {
    name: 'ForgotPage',
    //transition: 'zoom',
    auth: false,

    components: {
        ForgotPassword,
    },
    layout(context) {
        return context.$config.mode == 'private' ? 'blank' : 'horizontal';
    },
};
</script>