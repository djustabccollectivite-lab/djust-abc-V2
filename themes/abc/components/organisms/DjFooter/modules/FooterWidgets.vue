<template>
    <div v-if="footer" class="d-flex footer">
        <aside>
            <img
                :src="footer ? footer.logo.filename : ''"
                :alt="$config.clientName"
                class="footer-abc-logo bg-white p-2"
            />
            <div class="d-flex justify-content-between align-items-start mt-8">
                <div class="text-white uppercase m-0">
                    {{ $t('footer.widgetHeading.contactUs') }}
                </div>
                <button type="button" class="hidden-on-desktop text-white" @click="toggleMenuContact">
                    <SvgIcon :name="isMenuContactOpen ? 'minus' : 'plus'" />
                </button>
            </div>
            <div v-show="isMenuContactOpen" class="mt-4">
                <div v-if="footer" class="d-flex flex-column gap-2">
                    <div>
                        <a v-if="emailFooter" :href="'mailto:' + emailFooter" class="font-700 underline text-white">{{
                            emailFooter
                        }}</a>
                    </div>
                    <div v-for="(item, index) in footer.phones" :key="index">
                        <a :href="item ? 'tel:' + item.phone : ''" class="font-400 text-white">
                            {{ item ? item.phone : '' }}
                        </a>
                    </div>
                    <div class="text-white">{{ footer?.address ?? '' }}</div>
                    <div class="text-white">{{ footer?.city ?? '' }}</div>
                    <div class="d-flex">
                        <a
                            v-for="(item, index) in footer.socialmedia"
                            :key="index"
                            :href="item.link"
                            target="_blank"
                            class="pr-4"
                        >
                            <SvgIcon :name="item.icon" class="text-white" />
                        </a>
                    </div>
                </div>
            </div>
        </aside>
        <aside v-if="newsletter" class="footer-aside">
            <div class="d-flex justify-content-between align-items-start">
                <div class="text-white uppercase m-0">
                    {{ newsletter.title }}
                </div>
                <button type="button" class="hidden-on-desktop text-white" @click="toggleMenuNewsletter">
                    <SvgIcon :name="isMenuNewsletterOpen ? 'minus' : 'plus'" />
                </button>
            </div>
            <div v-show="isMenuNewsletterOpen" class="mt-4">
                <div class="d-flex flex-column gap-2 align-items-start">
                    <div class="text-white newsletter-description">
                        {{ newsletter.description }}
                    </div>
                    <button type="button" class="dj-btn dj-btn--sm dj-btn--secondary mt-1" @click="newsletterRedirect">
                        {{ newsletter.button_text }}
                    </button>
                </div>
            </div>
        </aside>
        <aside class="footer-aside">
            <div class="d-flex justify-content-between align-items-start">
                <div class="text-white uppercase m-0">
                    {{ $t('footer.widgetHeading.presentation') }}
                </div>
                <button type="button" class="hidden-on-desktop text-white" @click="toggleMenuPresentation">
                    <SvgIcon :name="isMenuPresentationOpen ? 'minus' : 'plus'" />
                </button>
            </div>
            <div v-show="isMenuPresentationOpen" class="mt-4">
                <ul class="mb-0 d-flex flex-column gap-2">
                    <li>
                        <nuxt-link :to="localePath('/presentation')" class="text-white"
                            >Présentation de l’entreprise</nuxt-link
                        >
                    </li>
                    <li>
                        <nuxt-link :to="localePath('/cms/faqs')" class="text-white">{{ clientName }} Smart</nuxt-link>
                    </li>
                </ul>
            </div>
        </aside>
        <aside class="footer-aside">
            <div class="d-flex justify-content-between align-items-start">
                <div class="text-white uppercase m-0">
                    {{ $t('footer.widgetHeading.products') }}
                </div>
                <button type="button" class="hidden-on-desktop text-white" @click="toggleMenuProducts">
                    <SvgIcon :name="isMenuProductsOpen ? 'minus' : 'plus'" />
                </button>
            </div>
            <div v-show="isMenuProductsOpen && categories.length > 0" class="mt-4">
                <ul class="mb-0 d-flex flex-column gap-2">
                    <li v-for="(item, index) in categories" :key="index">
                        <nuxt-link :to="`/list/${slugify(item.name)}`" class="text-white">{{ item.name }}</nuxt-link>
                    </li>
                </ul>
            </div>
        </aside>
        <aside class="footer-aside">
            <div class="d-flex justify-content-between align-items-start">
                <div class="text-white uppercase m-0">
                    {{ $t('footer.widgetHeading.legalInformation') }}
                </div>
                <button type="button" class="hidden-on-desktop text-white" @click="toggleMenuInformations">
                    <SvgIcon :name="isMenuInformationsOpen ? 'minus' : 'plus'" />
                </button>
            </div>
            <div v-show="isMenuInformationsOpen" class="mt-4">
                <ul class="mb-0 d-flex flex-column gap-2">
                    <li v-for="(item, index) in footer.documents" :key="index">
                        <a class="text-white" href="#" @click.prevent="downloadFile(item.file.filename, item.text)"
                            >{{ item.text }}
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
</template>

<script>
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import { slugify } from '~/purjus/helpers/common/urlHelper';

export default {
    name: 'FooterWidgets',
    components: {
        SvgIcon,
    },
    data() {
        return {
            footer: null,
            isMenuContactOpen: false,
            isMenuPresentationOpen: false,
            isMenuProductsOpen: false,
            isMenuInformationsOpen: false,
            isMenuNewsletterOpen: false,
            newsletter: null,
        };
    },
    computed: {
        categories() {
            return this.$store.state.categories.categories.slice(0, 8);
        },
        emailFooter() {
            return this.footer?.email ? this.footer.email : this.$config.email;
        },
        clientName() {
            return this.$config.clientName;
        },
    },
    async created() {
        this.footer = await this.$core.useStoryblok.getFooter();
        this.newsletter = this.footer.newsletter[0];
    },
    beforeMount() {
        this.$core.useCategories.getCategoriesList();
    },
    mounted() {
        this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize);
    },
    methods: {
        slugify,
        downloadFile(url, filename) {
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'media-type',
            };
            const proxyUrl = 'https://s3.amazonaws.com/';
            const cleanedUrl = url ? url.replace('https://', '') : null;
            const UrlWithProxy = proxyUrl + cleanedUrl;

            fetch(UrlWithProxy, { headers, method: 'GET' }).then(function (t) {
                return t.blob().then((b) => {
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(b);
                    a.setAttribute('download', filename);
                    a.click();
                });
            });
        },
        toggleMenuContact() {
            this.isMenuContactOpen = !this.isMenuContactOpen;
        },
        toggleMenuPresentation() {
            this.isMenuPresentationOpen = !this.isMenuPresentationOpen;
        },
        toggleMenuProducts() {
            this.isMenuProductsOpen = !this.isMenuProductsOpen;
        },
        toggleMenuInformations() {
            this.isMenuInformationsOpen = !this.isMenuInformationsOpen;
        },
        toggleMenuNewsletter() {
            this.isMenuNewsletterOpen = !this.isMenuNewsletterOpen;
        },
        checkScreenSize() {
            if (window.innerWidth >= 960) {
                this.isMenuContactOpen = true;
                this.isMenuPresentationOpen = true;
                this.isMenuProductsOpen = true;
                this.isMenuInformationsOpen = true;
                this.isMenuNewsletterOpen = true;
            } else {
                this.isMenuContactOpen = false;
                this.isMenuPresentationOpen = false;
                this.isMenuProductsOpen = false;
                this.isMenuInformationsOpen = false;
                this.isMenuNewsletterOpen = false;
            }
        },
        newsletterRedirect() {
            this.$router.push('/cms/contact-us?redirectedFrom=newsletter');
        },
    },
};
</script>

<style lang="scss" scoped>
.footer {
    flex-direction: column;
    @media screen and (min-width: 960px) {
        flex-direction: row;
        justify-content: space-between;
    }
    &-aside {
        margin-top: 48px;
        @media screen and (min-width: 960px) {
            margin-top: 0;
        }
    }
    &-abc-logo {
        max-width: 100px;
    }

    .newsletter-description {
        @media screen and (min-width: 960px) {
            max-width: 300px;
        }
    }
}
</style>
