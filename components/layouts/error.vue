<template>
    <div class="ps-page--404">
        <div class="container">
            <div class="dj-section__content">
                <figure v-if="error.statusCode === 404">
                    <img src="~/static/img/404.jpg" alt="" />

                    <div class="title__h3">{{ $t('layouts.error.pageNotFound.title') }}</div>

                    <p v-html="$t('layouts.error.pageNotFound.text')"></p>
                </figure>
                <figure v-else>
                    <div class="title__h3">{{ $t('layouts.error.otherError.title') }}</div>
                    <p v-html="$t('layouts.error.otherError.text')" />
                    <pre class="block-error"><code>{{ error }}</code></pre>
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Error',
    layout(context) {
        return context.store.state.app.layoutType;
    },
    props: {
        error: {
            type: Object,
            default: () => ({}),
        },
    },
    head() {
        return {
            title: `${this.$config.title} - ${this.error.statusCode === 404 ? this.pageNotFound : this.otherError}`,
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
                    content: `${this.$config.app_env}`,
                },
            ],
            link: [
                {
                    rel: 'stylesheet',
                    href: this.$config.styleFile
                        ? `https://storage.googleapis.com/eu.artifacts.frontclient.appspot.com/style/${this.$config.styleFile}`
                        : '',
                },
                { rel: 'icon', type: 'image/x-icon', href: `/${this.$config.favicon}` },
            ],
        };
    },
    methods: {
        toggleError() {
            this.showError = !this.showError;
        },
    },
};
</script>

<style lang="scss" scoped>
.block-error {
    width: fit-content;
    margin: 20px auto 0;
    text-align: left;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.6;
    color: #333;

    code {
        color: #d14;
    }
}
</style>
