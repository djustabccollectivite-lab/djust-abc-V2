<template>
    <div class="copyright">
        <p class="text-white m-0" v-html="$t(`footer.copyright.${client}`)"></p>
    </div>
</template>
<script>
export default {
    name: 'FooterCopyright',
    computed: {
        client() {
            return this.$config.clientName.toLowerCase();
        },
    },
};
</script>

<style lang="scss" scoped>
.copyright {
    margin-top: 48px;
    @media screen and (min-width: 960px) {
        margin-top: 16px;
    }
}
</style>
