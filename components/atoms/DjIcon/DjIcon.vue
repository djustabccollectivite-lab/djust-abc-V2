<template>
    <v-icon v-bind="{ ...$props, ...$attrs }" v-on="$listeners"> <slot /></v-icon>
</template>

<script>
export default {
    name: 'DjIcon',
};
</script>

<style lang="scss" scoped></style>
