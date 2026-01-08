<template>
    <table class="table dj-table-homepage">
        <slot />
    </table>
</template>
<script>
import Vue from 'vue';
import DjTableRow from '@components/organisms/DjTable/modules/DjTableRow.vue';
import DjTableBody from '@components/organisms/DjTable/modules/DjTableBody.vue';
import DjTableData from '@components/organisms/DjTable/modules/DjTableData.vue';
import DjTableHeader from '@components/organisms/DjTable/modules/DjTableHeader.vue';
import DjTableHeading from '@components/organisms/DjTable/modules/DjTableHeading.vue';
Vue.component('DjTableRow', DjTableRow);
Vue.component('DjTableData', DjTableData);
Vue.component('DjTableHeader', DjTableHeader);
Vue.component('DjTableHeading', DjTableHeading);
Vue.component('DjTableBody', DjTableBody);

export default {
    name: 'DjTable',
    provide() {
        const table = {};
        Object.defineProperty(table, 'updateColumnsCount', {
            value: this.updateColumnsCount,
        });
        return { table };
    },
    methods: {
        updateColumnsCount(columnsCount) {
            this.$el.style.setProperty('--_table-column-width', Math.ceil(columnsCount / 2));
        },
    },
};
</script>
<style lang="scss"></style>
