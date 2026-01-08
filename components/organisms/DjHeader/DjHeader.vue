<template lang="">
    <component :is="HeaderComponent"> </component>
</template>
<script>
import DjHeaderHorizontal from '@components/organisms/DjHeader/Horizontal/DjHeaderHorizontal.vue';
import DjHeaderVertical from '@components/organisms/DjHeader/Vertical/DjHeaderVertical.vue';

export default {
    name: 'DjHeader',
    components: {
        DjHeaderVertical,
        DjHeaderHorizontal,
    },
    props: {
        type: {
            type: String,
            default: 'horizontal',
        },
    },
    computed: {
        HeaderComponent() {
            return this.type == 'horizontal' ? 'DjHeaderHorizontal' : 'DjHeaderVertical';
        },
    },
};
</script>
<style lang=""></style>
