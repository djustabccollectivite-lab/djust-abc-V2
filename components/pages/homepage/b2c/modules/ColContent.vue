<template>
    <div>
        <div class="ps-banner">
            <img v-if="content.Image.filename" :src="`${content.Image.filename}`" alt="djust" />
            <div v-if="content.Text" v-html="markdownReturn(i.Text)" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        content: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        markdownReturn(value) {
            return value ? marked(value) : null;
        },
    },
};
</script>
