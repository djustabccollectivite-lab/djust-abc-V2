<template>
    <div class="table-responsive">
        <div class="mt-4">
            <ul role="list">
                <li v-for="productDocument in documents" :key="productDocument">
                    <a @click.prevent="redirectToDocumentPage(productDocument.document)">
                        <u>{{ productDocument.supplierName }} - {{ variantToDisplay.name }}</u>
                    </a>

                    <a @click.prevent="redirectToDocumentPage(productDocument.document)">
                        &nbsp; <DjIcon size="small">icon-download2</DjIcon>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';

export default {
    name: 'PartialSpecification',
    components: {
        DjIcon,
    },
    props: {
        documents: {
            type: Array,
            required: true,
        },
    },
    computed: {
        ...mapState({
            variantToDisplay: (state) => state.offers.variantToDisplay,
        }),
    },
    methods: {
        redirectToDocumentPage(url) {
            window.open(url, '_blank');
        },
    },
};
</script>
