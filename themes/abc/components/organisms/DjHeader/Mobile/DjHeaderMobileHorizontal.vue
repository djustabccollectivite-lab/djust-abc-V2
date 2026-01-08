<template>
    <header class="p-2 header-shadow mb-2 is_mobile bg-white">
        <div class="d-flex justify-space-between">
            <nuxt-link to="/">
                <img v-if="headerLogo" :src="`${headerLogo}`" :alt="headerLogo.alt" width="50"/>
            </nuxt-link>
            <mobile-header-actions :isMenuOpen="isMenuOpen" />
        </div>
    </header>
</template>

<script>
import MobileHeaderActions from '@components/organisms/DjHeader/Mobile/modules/MobileHeaderActions.vue';

export default {
    name: 'HeaderMobile',
    components: { MobileHeaderActions },
    props: {
        isMenuOpen: {
            type: Boolean,
            required: true
        }
    },
    data: () => ({
        headerLogo: null,
    }),
    async created() {
        this.headerLogo = await this.$core.useStoryblok.getLogo();
    },
};
</script>

<style lang="scss" scoped>
.header-shadow {
    box-shadow: 0 2px 4px 1px rgba(105, 105, 105, 0.25);
    position: sticky;
    top: 0;
    z-index: 150;
}
</style>
