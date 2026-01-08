<template>
    <section class="account-layout">
        <BreadCrumb :breadcrumb="breadCrumb" />
        <ContactForm />
    </section>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import ContactForm from '@components/pages/cms/ContactForm.vue';
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';

export default {
    components: {
        BreadCrumb,
        ContactForm,
        DjAccountLayout,
        DjCard,
    },
    auth: process.env.store_type === 'private' ? null : false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition: 'zoom',
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Page d’accueil',
                    url: '/',
                },
                {
                    text: 'Nous contacter',
                },
            ],
        };
    },
};
</script>
