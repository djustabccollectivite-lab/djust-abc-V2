<template>
  <client-only>
  <div class="ps-page--404">
    <div class="container">
      <div class="dj-section__content">
        <figure v-if="error.statusCode === 404">
          <img src="~/static/img/404.jpg" alt="" />

          <div class="title__h3">{{ $t('layouts.error.pageNotFound.title') }}</div>

          <p v-html="$t('layouts.error.pageNotFound.text')"></p>
        </figure>

        <figure v-else>
          <p v-html="$t('layouts.error.pageNotFound.text')"></p>
        </figure>
      </div>
    </div>
  </div>
</client-only>
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
  data: () => ({
      pageNotFound: '404 Not Found',
      otherError: 'An error has occurred',
  }),
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
