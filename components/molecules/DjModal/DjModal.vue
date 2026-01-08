<template lang="">
    <v-dialog v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
        <slot />
    </v-dialog>
</template>
<script>
export default {
    name: 'DjModal',
};
</script>
<style lang=""></style>
