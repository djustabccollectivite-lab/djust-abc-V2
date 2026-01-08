<template lang="">
    <v-navigation-drawer v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
        <slot />
    </v-navigation-drawer>
</template>
<script>
export default {
    name: 'DjNavigationDrawer',
};
</script>
<style lang=""></style>
