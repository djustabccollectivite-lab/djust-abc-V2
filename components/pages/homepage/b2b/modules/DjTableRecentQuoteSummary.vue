<template lang="html">
    <div class="table-responsive">
        <DjTable>
            <DjTableHeading>
                <DjTableHeader> ID </DjTableHeader>
                <DjTableHeader> Nom </DjTableHeader>
                <DjTableHeader> Statut </DjTableHeader>
            </DjTableHeading>
            <DjTableBody>
                <DjTableRow v-for="(quote, index) in quotes" :key="index">
                    <DjTableData>
                        <DjLink href="/quotes">
                            <strong>#{{ quote.id }}</strong>
                        </DjLink>
                    </DjTableData>

                    <DjTableData>
                        <DjLink href="/quotes">
                            <strong>{{ quote.name }}</strong>
                        </DjLink>
                    </DjTableData>

                    <DjTableData v-html="QuoteStatus(quote)"> </DjTableData>
                </DjTableRow>
            </DjTableBody>
        </DjTable>
    </div>
</template>

<script>
import DjTable from '@components/organisms/DjTable/DjTable.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
export default {
    name: 'TableRecentQuoteSummary',
    components: {
        DjTable,
        DjLink,
    },
    props: {
        quotes: {
            type: Array,
            default: () => [],
        },
    },

    methods: {
        QuoteStatus(quote) {
            let s1 = " <span class='dj-badge status1' > En attente </span>";
            let s2 = "<span class='dj-badge status3' > Proposition Réalisée </span>";
            let s3 = "<span class='dj-badge status3' > Finalisée </span>";
            if (quote.supplierQuotes.length === 0) {
                return s1;
            } else {
                let c1 = quote.supplierQuotes.filter((s) => s.status == 'VALIDATED').length;
                let c2 = quote.supplierQuotes.filter((s) => s.status == 'WAITING_FOR_CUSTOMER').length;

                if (c1) {
                    return s3;
                } else if (c2) {
                    return s2;
                }
            }
            return s1;
        },
    },
};
</script>

<style lang="scss" scoped></style>
