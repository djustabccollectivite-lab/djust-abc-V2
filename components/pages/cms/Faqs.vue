<template lang="html">
    <div>
        <div class="dj-faq-page" v-if="pageFaq">
            <div class="dj-faq-header">
                <h2 class="dj-faq-header-title">{{  pageFaq.title }}</h2>
                <p class="dj-faq-header-subtitle" v-html="pageFaq.subtitle">
             </p>
            </div>
            <div v-for="(item, index) in pageFaq.faqs" :key="index">
                <div class="title__h4 dj-faq-title heading">{{ item.title }}</div>
                <div class="pt-5 mt-5 pb-10">
                    <dl class="dj-faq-qr-block">
                        <div class="pb-4" v-for="(faq,i) in item.faq" :key="i">
                            <dt class="dj-faq-question">{{ faq.question }}</dt>
                            <dd class="dj-faq-answer">{{ faq.answer }}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="dj-faq-header">
                <h2 class="dj-faq-header-title"> {{$t('faq.title')}} </h2>
                <p class="dj-faq-header-subtitle">{{$t('faq.subtitle')}} </p>
                <DjLink :to="localePath('/cms/contact-us')">
                            <DjButton
                                text="Contact"
                                :iconDisplayed="true"
                                styleButton="primary"
                                icon="icon-bubble-text"
                            />
                </DjLink>
             </div>
        </div>
    </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default {
    name: 'Faqs',
    components: {
        DjLink,
        DjButton
    },
    data() {
        return {
            pageFaq:null,
        };
    },
    async created () {
        this.pageFaq = this.$config.storyblok_faq_page ? await this.$core.useStoryblok.getFaqPage() : null;
    },
};
</script>

<style lang="scss" scoped>
.dj-faq-page {
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    padding-right: 10px;
}
.dj-faq-header{
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    margin-bottom: 70px;
}
.dj-faq-header-subtitle{
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
}
.dj-faq-title {
    color:var(--color-secondary);
    padding-bottom: 8px;
    border-bottom: 2px solid;
    color: var(--color-secondary);
    padding: 8px;
    border-bottom: 2px solid;
    /* border-color: #e5e7eb; */
    background-color: #e5e7eb26;
    font-size:20px;
}
.dj-faq-qr-block {
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 32px;
        row-gap: 48px;
        margin-top: 0px;
    }
}
.dj-faq-question {
    line-height: 1.5rem;
    font-size: 16px;
    font-weight: 500;
}
.dj-faq-answer {
    margin-top: 0.5rem;
    color: #6b7280;
    // font-size: 1rem;
    // line-height: 1.5rem;
}
</style>
