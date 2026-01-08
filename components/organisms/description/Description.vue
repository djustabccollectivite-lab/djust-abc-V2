<template>
    <component :is="DesctiptionType" v-bind="{ ...$props, ...$attrs }" v-on="$listeners"> </component>
</template>
<script>
import DefaultDescription from '@components/organisms/description/DefaultDescription.vue';
import DescriptionFullContent from '@components/organisms/description/DescriptionFullContent.vue';

export default {
    name: 'Description',
    components: {
        DefaultDescription,
        DescriptionFullContent,
    },
    props: {
        type: {
            type: String,
            default: 'tabs',
            validator: function (value) {
                return ['tabs', 'full'].indexOf(value) !== -1;
            },
        },
    },
    computed: {
        DesctiptionType() {
            if (this.type == 'full') {
                return 'DescriptionFullContent';
            } else {
                return 'DefaultDescription';
            }
        },
    },
};
</script>
<style lang=""></style>
