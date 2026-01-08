<template>
    <client-only>
        <Register />
    </client-only>
</template>

<script>
import Register from '@components/templates/auth/register.vue';

export default {
    name: 'RegisterPage',
    components: {
        Register,
    },
    auth: false,
    layout(context) {
        return context.$config.mode === 'private' ? 'blank' : context.store.state.app.layoutType;
    },
    transition: 'zoom',
};
</script>
