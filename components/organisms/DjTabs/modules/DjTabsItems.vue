<template lang="">
    <v-tabs-items v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
        <slot />
    </v-tabs-items>
</template>
<script>
import Vue from 'vue';
import DjTabItem from '@components/organisms/DjTabs/modules/DjTabItem.vue';

Vue.component('DjTabItem', DjTabItem);

export default {
    name: 'DjTabsItems',
};
</script>
<style lang=""></style>
