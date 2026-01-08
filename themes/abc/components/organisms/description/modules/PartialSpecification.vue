<template>
    <table class="table--attributes w-full">
        <tbody>
            <tr v-for="specification in specifications" :key="specification.id">
                <td class="text-black font-700">{{ specification.attribute.name[locale] }}</td>
                <td>
                    <a target="_blank" :href="specification.value" class="underline text-link">Télécharger</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'PartialSpecification',
    props: {
        specifications: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    computed: {
        locale() {
            return this.$i18n.localeProperties.code.toUpperCase();
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
