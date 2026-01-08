<template>
    <section class="ps-page--my-account">
        <div class="container">
            <DjBreadCrumb :breadcrumb="breadCrumb" />
        </div>
        <addresses @refresh="refresh" :key="increment" />
    </section>
</template>

<script>
import DjBreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import Addresses from '@components/templates/account/addresses/Addresses.vue';

export default {
    name: 'AddressesPage',
    components: {
        Addresses,
        DjBreadCrumb,
    },
    data: () => {
        return {
            increment: 1,
            breadCrumb: [
                {
                    text: 'Page d’accueil',
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
