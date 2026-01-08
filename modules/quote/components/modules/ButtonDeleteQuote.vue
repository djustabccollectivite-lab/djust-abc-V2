<template>
    <div>
        <div @click.prevent="supp = true">
            <DjButton :text="$t('account.quotes.delete')" styleButton="light" :shape="styleB" :size="size" />
        </div>
        <v-dialog v-model="supp" max-width="600">
            <v-card>
                <v-card-title class="text-h5">
                  {{ $t('notification.quote.deleteQuote') }}
                </v-card-title>

                <v-card-text class="text-h5">
                  {{ $t('notification.quote.deleteValidationMessage') }}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <div @click.prevent="handleDeleteQuote()" class="p-10">
                        <DjButton
                            :text="$t('account.organisation.yesButton')"
                            :iconDisplayed="true"
                            styleButton="light"
                            :shape="'button'"
                            icon="icon-check-square"
                            :size="'small'"
                        />
                    </div>
                    <div @click.prevent="supp = false" class="p-1">
                        <DjButton
                            :text="$t('account.organisation.noButton')"
                            :iconDisplayed="true"
                            styleButton="light"
                            :shape="'button'"
                            icon="icon-cross-square"
                            :size="'small'"
                        />
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api';
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default defineComponent({
    name: 'ButtonDeleteQuote',
    components: { DjButton },
    props: {
        styleB: {
            type: String,
            require: true,
            default: 'button',
        },
        size: {
            type: String,
            require: false,
            default: 'standard',
        },
        quantity: {
            type: Number,
            require: true,
            default: 1,
        },
        productName: {
            type: String,
            require: true,
            default: 'produit',
        },
        productSupplier: {
            type: String,
            require: true,
        },
        productPicture: {
            type: String,
            require: false,
        },
        offerId: {
            type: String,
            require: true,
            default: null,
        },
        displayReturn: {
            type: Boolean,
            require: false,
            default: true,
        },
        MasterquoteId: {
            type: String,
            require: true,
            default: null,
        },
    },
    setup(props) {
        const productToCart = ref(false);
        var supp = ref(false);
        const ctx = useContext();
        const router = useRouter();
        async function handleDeleteQuote() {
            ctx.$core.useQuote
                .deleteMasterQuote({
                    masterQuoteId: this.MasterquoteId,
                })
                .then((res) => {
                    ctx.$toast.success(ctx.app.i18n.t('notification.quote.delete'));

                    //     this.$notify({
                    //     group: 'success',
                    //     title: 'Success!',
                    //     text: this.$t('notification.quote.delete')
                    // });
                    this.supp = false;
                });
        }

        return { productToCart, supp, handleDeleteQuote };
    },
});
</script>
