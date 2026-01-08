<template>
    <Search :keyword="this.$route.query.keyword" />
</template>

<script>
import Search from '@components/pages/search/search.vue';

export default {
    components: {
        Search,
    },
    auth: false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition() {
        return 'fadeIn';
    },
};
</script>
