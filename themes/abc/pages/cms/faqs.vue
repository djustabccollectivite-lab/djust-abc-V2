<template>
    <div class="abc-container">
        <BreadCrumb :breadcrumb="breadCrumb" />
        <div style="padding: 20px 0">
            <iframe :src="iframeUrl" width="100%" height="880px"></iframe>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';

export default {
    components: {
        BreadCrumb,
    },
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
                    text: 'Questions fréquentes',
                },
            ],
        };
    },
    computed: {
        iframeUrl() {
            return this.$config.faqIframeUrl;
        },
    },
    auth: true,
};
</script>
