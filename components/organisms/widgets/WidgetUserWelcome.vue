<template lang="html">
    <div class="dj-block pb-10">
        <div class="dj-block__left">
            <img :src="`${logo}`" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'WidgetUserWelcome',
    data() {
        return {
            logo: null,
        };
    },
    async fetch() {
        this.logo = await this.$core.useStoryblok.getLogo();
    },
};
</script>

<style lang="scss" scoped></style>
