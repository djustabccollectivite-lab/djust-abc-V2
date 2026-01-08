<template lang="">
    <v-alert v-bind="{ ...$props, ...$attrs }" v-on="$listeners"> <slot /> </v-alert>
</template>
<script>
export default {
    name: 'DjAlert',
};
</script>
<style lang=""></style>
