<template lang="html">
    <div class="ps-page--single">
        <!-- <about-us/> -->
    </div>
</template>

<script>
import AboutUs from '@components/pages/cms/about-us.vue';

export default {
    components: {
        AboutUs,
    },
    auth: process.env.store_type === 'private' ? null : false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition: 'zoom',
};
</script>

<style lang="scss" scoped></style>
