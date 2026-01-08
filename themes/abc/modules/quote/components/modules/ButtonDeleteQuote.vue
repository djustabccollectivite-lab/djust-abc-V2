<template>
    <div>
        <div @click.prevent="deleteModal = true">
            <DjButton :text="$t('account.quotes.delete')" shape="button" variant="outlined" :fullWidth="true" />
        </div>
        <v-dialog v-model="deleteModal" max-width="600">
            <div class="bg-white p-4">
                <div class="font-700 size-16 mb-4">
                    {{ $t('notification.quote.deleteQuote') }}
                </div>
                <div class="mb-6">
                    {{ $t('notification.quote.deleteValidationMessage') }}
                </div>
                <div class="d-flex justify-content-end gap-6">
                    <div @click.prevent="handleDeleteQuote()">
                        <DjButton :text="$t('account.organisation.yesButton')" shape="button" variant="contained" />
                    </div>
                    <div @click.prevent="deleteModal = false">
                        <DjButton :text="$t('account.organisation.noButton')" shape="button" variant="outlined" />
                    </div>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default {
    name: 'ButtonDeleteQuote',
    components: { DjButton },
    props: {
        masterQuote: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    data() {
        return {
            deleteModal: false,
        };
    },
    methods: {
        handleDeleteQuote() {
            this.$core.useQuote
                .deleteMasterQuote({
                    masterQuoteId: this.masterQuote.id,
                })
                .then(() => {
                    this.$toast.success(this.$i18n.t('notification.quote.delete'));
                    this.deleteModal = false;
                });
        },
    },
};
</script>
