<template>
    <client-only>
        <LoginPage2 />
    </client-only>
</template>
<script>
import LoginPage2 from '@components/pages/auth/login.vue';
export default {
    name: 'LoginPage',
    auth: false,
    components: {
        LoginPage2,
    },
    layout(context) {
        return context.$config.mode == 'private' ? 'blank' : context.store.state.app.layoutType;
    },
};
</script>
