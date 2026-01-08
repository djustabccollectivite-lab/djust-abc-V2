<template>
    <div class="table-responsive">
        <table class="table table-bordered dj-table dj-table--specification">
            <tbody>
                <tr v-for="attribute in attributesList" :key="attribute.id">
                    <td>{{ attribute.attribute.name[Object.keys(attribute.attribute.name)[0]] }}</td>
                    <td v-if="attribute.attribute.type === 'TEXT'">
                        <a v-if="textLink(attribute.value)" :href="attribute.value" target="_blank">{{
                            $t('product.tabs.viewMore')
                        }}</a>
                        <span v-else>{{ attribute.value }}</span>
                    </td>
                    <td v-if="attribute.attribute.type === 'LONG_TEXT'">{{ attribute.value }}</td>
                    <td v-if="attribute.attribute.type === 'COLOR'">{{ attribute.value }}</td>
                    <td v-if="attribute.attribute.type === 'DATE'">{{ attribute.value }}</td>
                    <td v-if="attribute.attribute.type === 'NUMBER'">{{ attribute.value }}</td>
                    <td v-if="attribute.attribute.type === 'METRIC'">
                        {{ attribute.value.selectedValue + attribute.value.unit }}
                    </td>
                    <td v-if="attribute.attribute.type === 'LIST_TEXT'">
                        <span class="pr-3" v-for="value in attribute.value" :key="value.id">{{ value }}</span>
                    </td>
                    <td v-if="attribute.attribute.type === 'LIST_METRIC'">
                        <span class="pr-3" v-for="value in attribute.value" :key="value.id">{{
                            value.selectedValue + value.unit
                        }}</span>
                    </td>
                    <td v-if="attribute.attribute.type === 'LIST_COLOR'">
                        <span class="pr-3" v-for="value in attribute.value" :key="value.id">{{ value.label }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import DjBadge from '@components/atoms/DjBadge/DjBadge.vue';
export default defineComponent({
    name: 'PartialAttributes',
    components: {
        DjBadge,
    },
    props: {
        attributes: {
            type: Array,
            require: true,
            default: () => [],
        },
    },
    setup(props) {
        const attributesList = computed(() => {
            const output = [];
            if (props.attributes) {
                props.attributes.forEach((attribute) => (attribute.value ? output.push(attribute) : null));
            }
            return output;
        });
        const textLink = function (text) {
            var re = new RegExp('^(http|https)://', 'i');
            return re.test(text);
        };

        return { attributesList, textLink };
    },
});
</script>

<style lang="scss" scoped></style>
