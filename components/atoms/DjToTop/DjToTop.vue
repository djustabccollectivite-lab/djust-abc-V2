<template>
  <v-btn
    class="dj-to-top"
    v-scroll="onScroll"
    v-show="fab"
    dark
    fab
    fixed
    bottom
    right
    @click="toTop"
  >
    <i class="icon-arrow-up dj-to-top__icon"></i>
  </v-btn>
</template>

<script>
export default {
  name: "DjToTop",
  data: () => ({
    fab: false
  }),
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return;
      const top = window.scrollY || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
