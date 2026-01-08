<template>
    <section class="abc-container">
        <BreadCrumb :breadcrumb="breadCrumb" />
        <BuyingList />
    </section>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import BuyingList from '@modules/buyingList/components/BuyingList.vue';

export default {
    transition: 'zoom',
    components: {
        BuyingList,
        BreadCrumb,
    },
    middleware: ['buyinglist', 'auth'],
    layout(context) {
        return context.store.state.app.layoutType;
    },
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Page d’accueil',
                    url: '/',
                },
                {
                    text: 'Listes de favoris',
                },
            ],
        };
    },
};
</script>
