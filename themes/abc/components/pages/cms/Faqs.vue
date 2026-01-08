<template>
    <div class="abc-container grid grid-col-12 mt-10 mb-16">
        <div class="abc-small-container">
            <div>
                <h2 class="text-center font-700 uppercase size-24"> {{$t('faq.title')}} </h2>
                <p class="m-0 text-center size-14" v-html="$t('faq.subtitle')"></p>
                <div class="d-flex align-items-center justify-content-center">
                    <SvgIcon name="phone"/>
                    <p class="m-0 pl-1" v-html="$t('faq.phone')"></p>
                </div>
                <div class="d-flex align-items-center justify-content-center">
                    <SvgIcon name="mail"/>
                    <p class="m-0 pl-1" v-html="$t('faq.email')"></p>
                </div>
            </div>
            <div class="questions">
                <v-expansion-panels flat accordion multiple>
                    <v-expansion-panel v-for="(item,i) in faqs" :key="i">
                        <v-expansion-panel-header>
                            <h3 class="size-16 font-700 uppercase m-0">
                                {{ item.faq.question }}
                            </h3>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p class="m-0">
                                {{ item.faq.answer }}
                            </p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </div>
    </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'Faqs',
    components: {
        DjLink,
        DjButton,
        SvgIcon
    },
    data() {
        return {
            pageFaq:null,
            // faqs à enlever quand on recevra devraies données ; penser à revoir le v-expansion-panel
            faqs: [
                {
                    title: 'Question1',
                    faq: {
                            question: "Question 1 faq",
                            answer: "Est magnam sapiente exercitationem minus. Autem alias porro expedita et deserunt quo. Voluptas et a reprehenderit accusantium voluptates quasi. Nostrum blanditiis quidem dolor possimus porro fuga aspernatur doloremque vitae. Illo accusamus exercitationem quas atque sit autem consequuntur asperiores in. Praesentium reprehenderit et est accusamus saepe minima non sed. Quia animi voluptatem sapiente est. In magni et eos aut sint quia vero. Nesciunt veritatis delectus aliquid veritatis sed et. Aut eius asperiores consectetur dolor. Minus eligendi tempora quam quis tempore aspernatur molestiae cum. Consequatur dignissimos laborum similique nihil illo tempore. Similique accusantium eius molestias non perferendis delectus quia ducimus nemo. Nisi nobis aliquid."
                        }
                },
                {
                    title: 'Question2',
                    faq: {
                            question: "Question 2 faq",
                            answer: "Est magnam sapiente exercitationem minus. Autem alias porro expedita et deserunt quo. Voluptas et a reprehenderit accusantium voluptates quasi. Nostrum blanditiis quidem dolor possimus porro fuga aspernatur doloremque vitae. Illo accusamus exercitationem quas atque sit autem consequuntur asperiores in. Praesentium reprehenderit et est accusamus saepe minima non sed. Quia animi voluptatem sapiente est. In magni et eos aut sint quia vero. Nesciunt veritatis delectus aliquid veritatis sed et. Aut eius asperiores consectetur dolor. Minus eligendi tempora quam quis tempore aspernatur molestiae cum. Consequatur dignissimos laborum similique nihil illo tempore. Similique accusantium eius molestias non perferendis delectus quia ducimus nemo. Nisi nobis aliquid."
                        }
                },
                {
                    title: 'Question3',
                    faq: {
                            question: "Question 3 faq",
                            answer: "Est magnam sapiente exercitationem minus. Autem alias porro expedita et deserunt quo. Voluptas et a reprehenderit accusantium voluptates quasi. Nostrum blanditiis quidem dolor possimus porro fuga aspernatur doloremque vitae. Illo accusamus exercitationem quas atque sit autem consequuntur asperiores in. Praesentium reprehenderit et est accusamus saepe minima non sed. Quia animi voluptatem sapiente est. In magni et eos aut sint quia vero. Nesciunt veritatis delectus aliquid veritatis sed et. Aut eius asperiores consectetur dolor. Minus eligendi tempora quam quis tempore aspernatur molestiae cum. Consequatur dignissimos laborum similique nihil illo tempore. Similique accusantium eius molestias non perferendis delectus quia ducimus nemo. Nisi nobis aliquid."
                        }
                },
            ]
        };
    },
    async created () {
        this.pageFaq = this.$config.storyblok_faq_page ? await this.$core.useStoryblok.getFaqPage() : null;
    },
};
</script>

<style lang="scss" scoped>
.questions {
    margin-top: 16px;
    @media screen and (min-width: 960px) {
        margin-top: 40px;
    }
}
.v-expansion-panels :not(:first-child) {
    margin-top: -1px;
}
.v-expansion-panel {
    border: 1px solid var(--color-grey-nuance-6);
    border-radius: 4px;
}
</style>
