<template>
    <div class="ps-page--my-account">
        <div class="container">
            <BreadCrumb :breadcrumb="breadCrumb" />
        </div>
        <DjAccountLayout :idAccountLink="accountLayoutContact">
            <DjCard headerColor="var(--color-secondary)" :title="$t('page.contact.contactUsForAnyQuestions')">
                <ContactForm />
            </DjCard>
        </DjAccountLayout>
    </div>
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
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition: 'zoom',
    data: () => {
        return {
            accountLayoutContact: 'Contact',
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
