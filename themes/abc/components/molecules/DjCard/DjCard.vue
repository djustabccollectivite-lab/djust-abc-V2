<template>
    <div class="dj-card" :style="{ padding: padding }" :class="classCss">
        <div class="dj-card__header" v-if="title" :style="{ backgroundColor: headerColor }">
            <div class="title__h4" :style="{ color: headerTextColor }">{{ title }}</div>
            <slot name="title"></slot>
        </div>
        <div class="dj-card__header_slot" :style="{ backgroundColor: headerColor }" v-if="slotHeader">
            <slot name="title"></slot>
        </div>
        <div :class="!Nopadding ? 'dj-card__content' : ''">
            <slot></slot>
        </div>

        <div class="dj-card__actions" v-if="withActions">
            <slot name="actions"></slot>
        </div>
        <div class="dj-card__footer" v-if="linkText">
            <DjLink class="dj-card__morelink" :to="link">
                {{ linkText }}
            </DjLink>
        </div>
    </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    name: 'DjCard',
    components: {
        DjLink,
    },
    props: {
        withActions: {
            type: Boolean,
            required: false,
            default: false,
        },
        classCss: {
            type: String,
            default: '',
            required: false,
        },
        title: {
            type: String,
            default: null,
            required: false,
        },
        link: {
            type: String,
            default: '/',
        },
        linkText: {
            type: String,
            required: false,
        },
        padding: {
            type: String,
            default: '0px',
        },
        Nopadding: {
            type: Boolean,
            default: false,
        },
        headerColor: {
            type: String,
            default: 'var(--color-default-card-header,#ffffff)',
        },
        headerTextColor: {
            type: String,
            default: '#FFFFFF',
        },
        slotHeader: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped></style>
