<template>
    <DjLink
        v-if="linkPath"
        :href="isExternalLink ? linkPath : null"
        :to="isExternalLink ? null : linkPath"
        class="dj-bottom-item px-16 mx-4 py-1 d-flex align-items-center gap-1"
    >
        <SvgIcon :name="icon" />
        {{ text }}
    </DjLink>
    <div v-else class="dj-bottom-item px-16 mx-4 py-1 d-flex align-items-center gap-1">
        <SvgIcon :name="icon" />
        {{ text }}
    </div>
</template>

<script>
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import DjLink from '~/components/atoms/DjLink/DjLink.vue';

export default {
    name: 'HeaderBottomItems',
    components: {
        DjLink,
        SvgIcon,
    },
    props: {
        link: {
            type: Object,
            default: null,
        },
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
        return {
            isExternalLink: false,
            linkPath: null,
        };
    },
    mounted() {
        this.isExternalLink = this.link?.url !== '';
        this.linkPath = this.link?.url !== '' ? this.link?.url : this.link.cached_url;
    },
};
</script>
