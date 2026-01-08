<template lang="">
    <v-radio v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
        <slot />
    </v-radio>
</template>
<script>
export default {
    name: 'DjRadio',
};
</script>
<style lang=""></style>
