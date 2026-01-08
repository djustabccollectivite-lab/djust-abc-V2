<template lang="">
    <v-tabs v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
        <slot />
    </v-tabs>
</template>
<script>
import Vue from 'vue';
import DjTab from '@components/organisms/DjTabs/modules/DjTab.vue';
import DjTabsSlider from '@components/organisms/DjTabs/modules/DjTabsSlider.vue';
import DjTabsItems from '@components/organisms/DjTabs/modules/DjTabsItems.vue';

Vue.component('DjTab', DjTab);
Vue.component('DjTabsSlider', DjTabsSlider);
Vue.component('DjTabsItems', DjTabsItems);

export default {
    name: 'DjTabs',
};
</script>
<style lang=""></style>
