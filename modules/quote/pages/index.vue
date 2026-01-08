<template lang="html">
    <section class="ps-page--my-account">
        <quotes @refresh="refresh" :key="increment" />
    </section>
</template>

<script>
import Quotes from '@modules/quote/components/quotes.vue';

export default {
    name: 'PageQuotes',
    components: {
        Quotes,
    },
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition: 'zoom',
    middleware: ['quote'],
    data: () => {
        return {
            increment: Math.random(),
        };
    },
    created() {
        this.$nuxt.$on('refresh', () => {
            this.increment++;
        });
    },

    beforeDestroy() {
        this.$nuxt.$off('refresh');
    },

    methods: {
        refresh() {
            this.increment++;
        },
    },
};
</script>

<style lang="scss" scoped></style>
