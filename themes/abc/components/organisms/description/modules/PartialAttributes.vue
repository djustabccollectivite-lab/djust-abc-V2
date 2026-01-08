<template>
    <table class="table--attributes w-full">
        <tbody>
            <tr v-for="attribute in attributesList" :key="attribute.id">
                <td class="text-black font-700">
                    {{ attribute.attribute.name[Object.keys(attribute.attribute.name)[0]] }}
                </td>
                <td v-if="attribute.attribute.type === 'TEXT'">
                    <span>{{ attribute.value }}</span>
                </td>
                <td v-if="attribute.attribute.type === 'LONG_TEXT'">{{ attribute.value }}</td>
                <td v-if="attribute.attribute.type === 'COLOR'">{{ attribute.value }}</td>
                <td v-if="attribute.attribute.type === 'DATE'">{{ attribute.value }}</td>
                <td v-if="attribute.attribute.type === 'NUMBER'">{{ attribute.value }}</td>
                <td v-if="attribute.attribute.type === 'METRIC'">
                    {{ attribute.value.selectedValue + attribute.value.unit }}
                </td>
                <td v-if="attribute.attribute.type === 'LIST_TEXT'">
                    <span v-for="value in attribute.value" :key="value.id" class="pr-3">{{ value }}</span>
                </td>
                <td v-if="attribute.attribute.type === 'LIST_METRIC'">
                    <span v-for="value in attribute.value" :key="value.id" class="pr-3">{{
                        value.selectedValue + value.unit
                    }}</span>
                </td>
                <td v-if="attribute.attribute.type === 'LIST_COLOR'">
                    <span v-for="value in attribute.value" :key="value.id" class="pr-3">{{ value.label }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'PartialAttributes',
    props: {
        attributes: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    computed: {
        attributesList() {
            return this.attributes ? this.attributes.filter((attribute) => attribute.value) : [];
        },
    },
};
</script>

<style lang="scss" scoped>
.table--attributes tbody tr td:first-child {
    background-color: var(--color-grey-nuance-9);
    font-weight: 700;
    width: 283px;
}

.table--attributes tbody > tr > td {
    vertical-align: middle;
    padding: 16px 24px;
    border: 1px solid var(--color-grey-nuance-6);
    color: var(--color-black);
}
</style>
