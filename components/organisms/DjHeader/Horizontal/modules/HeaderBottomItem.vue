<template lang="html">
    <div class="header__bottom_item">
        <i :class="`icon-${icon}`"></i>
        {{ text }}
    </div>
</template>

<script>
export default {
    name: 'HeaderBottomItems',
    props: {
        text: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
    },

    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.header__bottom_item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    //padding: 10px;
    //border-right: 1px solid #dadada;
    max-width: 30%;
    width: 100%;

    color: var(--color-header-bottom-item, #000000);
    margin-bottom: 0;
    line-height: 30px;

    i {
        padding-right: 10px;
        font-size: 20px;
        color: var(--header-bottom-icon-color, black);
    }
}
</style>
