<template>
    <component
        :is="componentThumbnail"
        v-bind="{ ...$props, ...$attrs }"
        v-on="$listeners"
    />
</template>

<script>
import DjThumbnailDefault from '@components/molecules/DjThumbnail/modules/DjThumbnailDefault.vue';
import DjThumbnailCountDown from '@components/molecules/DjThumbnail/modules/DjThumbnailCountDown.vue';
import DjThumbnailQuickView from '@components/molecules/DjThumbnail/modules/DjThumbnailQuickView.vue';

export default {
    name: 'DjThumbnail',
    components: {
        DjThumbnailDefault,
        DjThumbnailCountDown,
        DjThumbnailQuickView,
    },
    props: {
        type: {
            type: String,
            default: 'default',
            validator (value) {
                return ['default', 'countDown', 'quickView'].includes(value);
            },
        },
    },
    computed: {
        componentThumbnail() {
            switch (this.type) {
                case 'default':
                    return 'DjThumbnailDefault';
                case 'countDown':
                    return 'DjThumbnailCountDown';
                case 'quickView':
                    return 'DjThumbnailQuickView';
                default:
                    return 'DjThumbnailDefault';
            }
        },
    },
};
</script>
