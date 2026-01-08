<template lang="html">
    <v-app>
        <main class="ps-main">
            <DjHeaderMobileVertical />
            <DjMobileDrawerVertical />
            <div class="ps-main__sidebar">
                <div class="dj-sidebar">
                    <div class="dj-sidebar__top">
                        <widget-user-welcome />
                        <widget-total-order-sidebar />
                    </div>
                    <div class="dj-sidebar__content">
                        <div class="dj-sidebar__center">
                            <menu-sidebar />
                        </div>
                    </div>
                    <div class="dj-sidebar__footer">
                        <!-- <footer-copyright /> -->
                    </div>
                </div>
            </div>
            <div class="ps-main__wrapper">
                <DjHeader type="vertical" />
                <nuxt />
            </div>
            <DjCartSidebar :openCart="showcartmodal" @closeCart="closeCart" @opencartmodel="showCart" />
            <app-customizer v-if="showCustomizer" slot="customizer" />
        </main>
    </v-app>
</template>

<script>
import DjCartSidebar from '@components/organisms/DjCartSidebar/DjCartSidebar';
import WidgetUserWelcome from '@components/organisms/widgets/WidgetUserWelcome';
import WidgetTotalOrderSidebar from '@components/organisms/widgets/WidgetTotalOrderSidebar';
//import FooterCopyright from "@components/shared/footers/FooterCopyright";
import MenuSidebar from '@components/organisms/menu/MenuSidebar';
import DjHeaderMobileVertical from '@components/organisms/DjHeader/Mobile/DjHeaderMobileVertical';
import DjMobileDrawerVertical from '@components/organisms/DjHeader/Mobile/DjMobileDrawerVertical';
import DjHeader from '@components/organisms/DjHeader/DjHeader';

export default {
    name: 'Vertical',
    //middleware: ['mode'],
    components: {
        DjHeader,
        DjCartSidebar,
        DjMobileDrawerVertical,
        DjHeaderMobileVertical,
        MenuSidebar,
        //FooterCopyright,
        WidgetTotalOrderSidebar,
        WidgetUserWelcome,
    },
    data() {
        return {
            showcartmodal: false,
            showCustomizer: this.$config.customizer,
        };
    },
    created() {
        this.$nuxt.$on('opencartmodel', (val) => {
            this.showcartmodal = val;
        });
    },
    methods: {
        showCart(item) {
            this.showcartmodal = item;
        },
        closeCart(item) {
            this.showcartmodal = item;
        },
    },
    head() {
        return {
            title: this.$config.title,
            titleTemplate: this.$config.titleTemplate,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$config.description,
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
                { rel: 'icon', type: 'image/x-icon', href: `/${this.$config.favicon}` },
            ],
        };
    },
};
</script>

<style lang="scss" scoped></style>
