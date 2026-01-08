<template>
    <LayoutError :error="error" />
</template>

<script>
import LayoutError from '@components/layouts/error.vue';

export default {
    name: 'ErrorLayout',
    components: { LayoutError },
    props: {
        error: {
            type: Object,
            default: () => {},
        },
    },
};
</script>
