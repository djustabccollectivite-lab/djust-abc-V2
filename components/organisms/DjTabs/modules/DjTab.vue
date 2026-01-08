<template lang="">
    <v-tab v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
        <slot />
    </v-tab>
</template>
<script>
export default {
    name: 'DjTab',
};
</script>
<style lang=""></style>
