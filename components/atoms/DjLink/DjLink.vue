<template>
  <component v-on="$listeners" v-bind="{ ...$props, ...$attrs }" :is="to ? 'nuxt-link' : href ? 'a' : 'button'" :to="to"
    :href="href" :target="target">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'DjLink',
  props: {
    to: {
      type: String | Object,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: "",
    },
  },
};
</script>
