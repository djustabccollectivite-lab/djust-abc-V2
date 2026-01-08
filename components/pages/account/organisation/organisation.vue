<template>
    <section class="ps-page--my-account">
        <div class="container">
            <BreadCrumb :breadcrumb="breadCrumb" />
        </div>
        <OrganisationTemplate />
    </section>
</template>
<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import OrganisationTemplate from '@components/templates/account/organisation/organisation.vue';

export default {
    name: 'UserInformationPage',
    components: {
        OrganisationTemplate,
        BreadCrumb,
    },
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Page d’accueil',
                    url: '/',
                },
                {
                    text: 'Organisations',
                },
            ],
        };
    },
};
</script>
