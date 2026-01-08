<template>
    <section class="account-layout">
        <BreadCrumb :breadcrumb="breadCrumb" />
        <UserInformationTemplate />
    </section>
</template>
<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import UserInformationTemplate from '@components/templates/account/profile/UserInformation.vue';

export default {
    name: 'UserInformationPage',
    components: {
        UserInformationTemplate,
        BreadCrumb,
    },
    data: (context) => {
        return {
            breadCrumb: [
                {
                    text: context.$i18n.t('common.breadscrum.home'),
                    url: context.localePath('/'),
                },
                {
                    text: context.$i18n.t('common.breadscrum.userInformation'),
                },
            ],
        };
    },
};
</script>
