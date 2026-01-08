<template>
    <client-only>
        <v-app>
            <v-main>
                <nuxt></nuxt>
                <dj-notify />
                <app-customizer v-if="showCustomizer" slot="customizer" />
            </v-main>
        </v-app>
    </client-only>
</template>

<script>
import DjNotify from '@components/molecules/DjNotify/DjNotify.vue';

export default {
    name: 'Blank',
    components: { DjNotify },
    data() {
        return {
            showCustomizer: this.$config.customizer,
        };
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
