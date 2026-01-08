<template lang="html">
    <div>
        <bread-crumb :breadcrumb="breadCrumb" />
        <div class="dj-faq-page">
            <faqs />
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import Faqs from '@components/pages/cms/Faqs.vue';

export default {
    components: {
        Faqs,
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
                    text: 'Home',
                    url: '/',
                },
                {
                    text: 'Frequently Asked Questions',
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.dj-faq-page{
    width: 100%;
    background: #ffffff;
    margin-left: auto;
    margin-right: auto;
    padding-top: 24px;
    padding-bottom: 24px;
    @media (min-width: 640px) {
        padding-left: 24px;
        padding-right: 24px;
    }
    @media (min-width: 1024px) {
        padding-left: 48px;
        padding-right: 48px;
    }
}
</style>
