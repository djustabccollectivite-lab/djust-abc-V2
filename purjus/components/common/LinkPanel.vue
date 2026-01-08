<template>
    <v-expansion-panels>
        <v-expansion-panel :style="{ '--panel-color': panelColor }">
            <v-expansion-panel-header>
                <div class="panel-header-title">{{ panelTitle }}</div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <div class="d-flex flex-column panel-list-wrapper">
                    <div v-for="data in panelData" :key="data.id">
                        <DjLink :href="localePath(`/list/${data.id}`)">
                            {{ data.name }}
                        </DjLink>
                    </div>
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import DjLink from '~/components/atoms/DjLink/DjLink.vue';

export default {
    name: 'LinkPanel',
    components: { DjLink },
    props: {
        panelData: {
            type: Array,
            required: true,
        },
        panelTitle: {
            type: String,
            required: true,
        },
        panelColor: {
            type: String,
            default: '#ffffff',
        },
    },
};
</script>

<style lang="scss" scoped>
.panel-header-title {
    font-size: 24px;
    font-weight: 500;
}
.v-expansion-panel {
    background-color: var(--panel-color) !important;
    &::before {
        box-shadow: none;
    }
}
.v-expansion-panel-header {
    padding: 16px 0;
}
.panel-list-wrapper {
    gap: 16px;
}
</style>
