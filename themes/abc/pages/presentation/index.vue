<template>
    <div>
        <BreadCrumb :breadcrumb="breadCrumb" />
        <Presentation />
    </div>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import Presentation from '@components/pages/presentation/presentation.vue';

export default {
    components: {
        BreadCrumb,
        Presentation,
    },
    auth: false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition: 'zoom',
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Accueil',
                    url: '/',
                },
                {
                    text: "Présentation de l'entreprise",
                },
            ],
        };
    },
};
</script>
