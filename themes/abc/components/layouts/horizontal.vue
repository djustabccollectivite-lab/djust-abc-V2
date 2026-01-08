<template>
    <client-only>

    <v-app>
        <main :class="clientName.toLowerCase()" class="d-flex flex-column">
            <DjToTop />
            <DjHeaderMobileHorizontal :isMenuOpen="false" />
            <DjHeader type="horizontal" />
            <div class="flex-grow-1">
                <nuxt />
            </div>
            <DjNotify />
            <DjFooter :showLinks="false" :fullWidth="true" />
            <DjMobileDrawerHorizontal />
            <DjCartSidebar :openCart="showcartmodal" @closeCart="closeCart" @opencartmodel="showCart" />
        </main>
    </v-app>
    </client-only>

</template>

<script>
import WidgetUserWelcome from '@components/organisms/widgets/WidgetUserWelcome.vue';
import WidgetTotalOrderSidebar from '@components/organisms/widgets/WidgetTotalOrderSidebar.vue';
import Newsletters from '@components/organisms/commons/Newsletters.vue';
import DjNotify from '@components/molecules/DjNotify/DjNotify.vue';
import DjCartSidebar from '@components/organisms/DjCartSidebar/DjCartSidebar.vue';
import DjHeader from '@components/organisms/DjHeader/DjHeader.vue';
import DjHeaderMobileHorizontal from '@components/organisms/DjHeader/Mobile/DjHeaderMobileHorizontal.vue';
import DjMobileDrawerHorizontal from '@components/organisms/DjHeader/Mobile/DjMobileDrawerHorizontal.vue';
import DjFooter from '@components/organisms/DjFooter/DjFooter.vue';
import DjToTop from '@components/atoms/DjToTop/DjToTop.vue';

export default {
    name: 'Horizontal',
    middleware: ['mode'],
    components: {
        DjFooter,
        DjNotify,
        DjMobileDrawerHorizontal,
        DjHeaderMobileHorizontal,
        WidgetTotalOrderSidebar,
        WidgetUserWelcome,
        DjHeader,
        Newsletters,
        DjCartSidebar,
        DjToTop
    },
    data() {
        return {
            clientName: this.$config.clientName.toUpperCase(),
            themeName: this.$config.theme,
            showcartmodal: false,
            showCustomizer: this.$config.customizer,
            active: false
        };
    },
    computed: {
        admin() {
            return this.$route.query.admin;
        }
    },
    created() {
        this.$nuxt.$on('opencartmodel', val => {
            this.showcartmodal = val;
        });
        setTimeout(
            function () {
                this.active = true;
            }.bind(this),
            3000
        );
    },
    head() {
        return {
            title: this.$config.title,
            titleTemplate: this.$config.titleTemplate,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$config.description
                },
                {
                    hid: 'robots',
                    name: 'robots',
                    content: `${this.$config.app_env}`
                }
            ],
            link: [
                {
                    rel: 'stylesheet',
                    href: this.$config.styleFile ? `https://storage.googleapis.com/eu.artifacts.frontclient.appspot.com/style/${this.$config.styleFile}` : ""
                },
                { rel: 'icon', type: 'image/x-icon', href: `/${this.$config.favicon}` }
            ]
        };
    },
    methods: {
        showCart() {
            this.showcartmodal = true;
        },
        closeCart() {
            this.showcartmodal = false;
        }
    }
};
</script>

<style lang="scss" scoped>
main {
    min-height: 100vh;
}
</style>