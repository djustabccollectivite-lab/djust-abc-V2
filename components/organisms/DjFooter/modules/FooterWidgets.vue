<template>
    <div class="dj-footer__widgets">
        <aside class="widget widget_footer widget_contact-us">
            <img :src="logo" alt="Djust" class="mb-10" />
            <div class="title__h4 widget-title">
                {{ $t('footer.widgetHeading.contactUs') }}
            </div>
            <div class="widget_content">
                <p>
                    <a :href="'mailto:' + this.$config.email">{{ this.$config.email }}</a>
                </p>
            </div>

        </aside>
        <aside class="widget widget_footer">
            <div class="title__h4 widget-title">
                {{ $t('footer.widgetHeading.quickLink') }}
            </div>
            <ul class="dj-list--link">
                <li>
                    <DjLink :to="localePath('/presentation')">Marketplace</DjLink>
                </li>
                <li>
                    <a :href="$config.website" target="_blank">{{ this.$config.themeName }}</a>
                </li>
                <li>
                    <DjLink :to="localePath('/vendor')">{{ $t('supplier.suppliers') }}</DjLink>
                </li>
            </ul>
        </aside>
        <aside class="widget widget_footer">
            <div class="title__h4 widget-title">
                {{ $t('footer.widgetHeading.company') }}
            </div>
            <ul class="dj-list--link">
                <li v-for="(item, index) in categories" :key="index">
                    <DjLink :to="'/list/' + item.id">{{ item.name }}</DjLink>
                </li>
            </ul>
        </aside>
        <aside class="widget widget_footer">
            <div class="title__h4 widget-title">
                {{ $t('footer.widgetHeading.bussiness') }}
            </div>
            <ul class="dj-list--link">
                <li>
                    <a :href="ml" target="_blank">
                        {{ $t('footer.widgetHeading.legalNotice') }}
                    </a>
                </li>
                <li>
                    <a :href="cgu" target="_blank">
                        {{ $t('footer.widgetHeading.termsOfService') }}
                    </a>
                </li>
                <li>
                    <a :href="rgpd" target="_blank">
                        {{ $t('footer.widgetHeading.gdpr') }}
                    </a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    name: 'FooterWidgets',
    components: {
        DjLink
    },
    data() {
        return {
            logo: null,
            rgpd: null,
            ml: null,
            cgu: null
        };
    },
    async created() {
        this.logo = await this.$core.useStoryblok.getLogoWithColor();
        //this.rgpd = await this.$core.useStoryblok.getRgpdFile();
        //this.ml = await this.$core.useStoryblok.getMlFile();
        //this.cgu = await this.$core.useStoryblok.getCguFile();
    },
    methods: {
        //         downloadFile({ url, label }) {
        //             this.$axios.get(url, { responseType: 'blob' })
        //             .then(response => {
        //                 const blob = new Blob([response.data], { type: 'application/pdf' })
        //                 const link = document.createElement('a')
        //                 link.href = URL.createObjectURL(blob)
        //                 link.download = label
        //                 link.click()
        //                 URL.revokeObjectURL(link.href)
        //         }).catch(console.error)
        //   }
    },
    computed: {
        // logo() {
        //     return this.$store.state.storyblok.logoWithColor
        // },
        categories() {
            return this.$store.state.categories.categories.filter((categorie, idx) => idx < 4);
        }
    }
};
</script>
