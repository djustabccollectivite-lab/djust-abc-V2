<template lang="html">
    <footer class="dj-footer">
        <div class="dj-container">
            <FooterWidgets v-if="showWidgets" />
            <FooterLinks v-if="showLinks" />
            <FooterCopyright v-if="showCopyright" />
        </div>
    </footer>
</template>

<script>
import FooterWidgets from '@components/organisms/DjFooter/modules/FooterWidgets.vue';
import FooterCopyright from '@components/organisms/DjFooter/modules/FooterCopyright.vue';
import FooterLinks from '@components/organisms/DjFooter/modules/FooterLinks.vue';
export default {
    name: 'DjFooter',
    components: { FooterWidgets, FooterCopyright, FooterLinks },
    props: {
        showWidgets: {
            type: Boolean,
            default: true,
        },
        showLinks: {
            type: Boolean,
            default: true,
        },
        showCopyright: {
            type: Boolean,
            default: true,
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped></style>
