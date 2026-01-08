<template>
    <client-only>
        <ResetPassword :token="token" />
    </client-only>
</template>
<script>
import ResetPassword from '@components/pages/auth/resetPassword.vue';

export default {
    name: 'ResetPage',
    transition: 'zoom',
    auth: false,

    components: {
        ResetPassword,
    },
    layout(context) {
        return context.$config.mode == 'private' ? 'blank' : 'horizontal';
    },
    computed: {
        token() {
            return this.$route.query.accessToken;
        },
    },
};
</script>
<style lang="scss">
.home-enter-active,
.home-leave-active {
    transition: all 0.5s ease;
    animation: flipInX 0.5s;
}
.home-enter,
.home-leave-active {
    opacity: 0;
}

@keyframes flipInX {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>
