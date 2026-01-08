<template>
    <div>
        <v-row v-if="block" class="pa-0 ma-0 mt-2">
            <v-col
                v-for="col in block.columns"
                :key="col.id"
                :cols="
                    block.columns.length === 1
                        ? 12
                        : block.columns.length === 2
                        ? 12
                        : block.columns.length === 3
                        ? 12
                        : null
                "
                :sm="
                    block.columns.length === 1
                        ? 12
                        : block.columns.length === 2
                        ? 6
                        : block.columns.length === 3
                        ? 4
                        : null
                "
                :md="
                    block.columns.length === 1
                        ? 12
                        : block.columns.length === 2
                        ? 6
                        : block.columns.length === 3
                        ? 4
                        : null
                "
            >
                <col-content :content="col" />
            </v-col>
        </v-row>
    </div>
</template>
<script>
import ColContent from '@components/pages/homepage/b2c/modules/ColContent.vue';
export default {
    components: {
        ColContent,
    },
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
};
</script>
