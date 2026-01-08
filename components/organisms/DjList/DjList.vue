<template functional>
    <ul
        :class="[data.class, data.staticClass, 'dj-list']"
        :style="[data.style, data.staticStyle]"
        v-bind="data.attrs"
        v-on="listeners"
    >
        <slot />
    </ul>
</template>
<script>
import DjListItem from '@components/organisms/DjList/modules/DjListItem.vue';
import Vue from 'vue';
Vue.component('DjListItem', DjListItem);
export default {
    name: 'DjList',
};
</script>
<style lang="scss">
.dj-list {
    list-style: none;
    padding: 0;
    margin: 0;
    .dj-list__item {
        margin: 0;
        padding: 0;
        color: var(--color-body);
    }
}
</style>
