<template>
    <client-only>
    <component :is="HomeType"></component>
</client-only>
</template>
<script>
import HomeB2b from '@components/pages/homepage/b2b/HomeB2b.vue';
import HomeB2c from '@components/pages/homepage/b2c/HomeB2c.vue';

export default {
    name: 'HomePage',
    auth: false,
    components: {
        HomeB2b,
        HomeB2c,
    },
    computed: {
        HomeType() {
            return this.$config.homeType === 'b2b' ? 'HomeB2b' : 'HomeB2c';
        },
    },
    layout(context) {
        return context.store.state.app.layoutType;
    },
};
</script>
