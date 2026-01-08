<template lang="">
    <v-tab-item v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
        <slot />
    </v-tab-item>
</template>
<script>
export default {
    name: 'DjTabItem',
};
</script>
<style lang=""></style>
