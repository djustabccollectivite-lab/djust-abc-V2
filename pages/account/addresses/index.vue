<template lang="html">
    <Addresses />
</template>

<script>
import Addresses from '@components/pages/account/addresses/addresses.vue';

export default {
    components: {
        Addresses,
    },
    transition: 'zoom',
    layout(context) {
        return context.store.state.app.layoutType;
    },
    middleware: 'auth',
    data: () => {
        return {
            increment: 1,
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/',
                },
                {
                    text: 'Adresses',
                },
            ],
        };
    },
    methods: {
        refresh() {
            this.increment++;
        },
    },
};
</script>

<style lang="scss" scoped></style>
