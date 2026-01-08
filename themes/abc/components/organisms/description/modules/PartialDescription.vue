<template>
    <div v-if="description" class="text-black" v-html="description"></div>
</template>

<script>
export default {
    name: 'PartialDescription',
    props: {
        description: {
            type: String,
            required: true,
            default: '',
        },
    },
};
</script>
