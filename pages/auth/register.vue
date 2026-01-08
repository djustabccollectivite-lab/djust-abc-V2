<template lang="html">
    <client-only>
        <Register />
    </client-only>
</template>
<script>
import Register from '@components/pages/auth/register.vue';
export default {
    name: 'RegisterPage',
    components: {
        Register,
    },
    auth: false,

    //middleware: ['mode'],
    layout(context) {
        return context.$config.mode == 'private' ? 'blank' : context.store.state.app.layoutType;
    },
    transition: 'zoom',
};
</script>
<style lang=""></style>
