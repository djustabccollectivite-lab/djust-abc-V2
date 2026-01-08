<template lang="html">
    <Search :keyword="$route.query.keyword" />
</template>

<script>
import Search from '@components/pages/search/search.vue';

export default {
    name: 'SearchResultPage',
    components: {
        Search,
    },
    auth: process.env.store_type === 'private' ? null : false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition() {
        return 'fadeIn';
    },
};
</script>

<style lang="scss" scoped></style>
