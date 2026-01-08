<template lang="">
    <v-radio-group v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
        <slot />
    </v-radio-group>
</template>
<script>
export default {
    name: 'DjRadioGroup',
};
</script>
<style lang=""></style>
