<template functionnel>
    <v-spacer v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
        <slot />
    </v-spacer>
</template>

<script>
export default {
    name: 'DjSpacer',
};
</script>

<style lang="scss" scoped></style>
