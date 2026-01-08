<template>
    <div>
        <div @click.prevent="supp = true">
            <button-ui
                :text="$t('account.quotes.refusethisquote')"
                styleButton="light"
                :shape="styleB"
                :size="size"
            />
        </div>
        <v-dialog v-model="supp" max-width="600">
            <v-card>
                <v-card-title class="text-h5">
                    {{ $t('account.quotes.refuseDialogHeading') }}
                </v-card-title>
                <v-card-text class="text-h5">
                    {{ $t('account.quotes.refuseDialogDescription') }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <div @click.prevent="handleRefuseQuote()" class="p-10">
                        <button-ui
                            :text="$t('account.organisation.yesButton')"
                            styleButton="light"
                            :shape="'button'"
                            :size="'small'"
                        />
                    </div>
                    <div @click.prevent="supp = false" class="p-1">
                        <button-ui
                            :text="$t('account.organisation.noButton')"
                            styleButton="light"
                            :shape="'button'"
                            :size="'small'"
                        />
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import ButtonUi from '@components/atoms/DjButton/DjButton.vue';

export default defineComponent({
    name: 'ButtonDeleteQuote',
    components: { ButtonUi },
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
        masterQuoteId: {
            type: String,
            require: false,
            default: null,
        },
        supplierQuoteId: {
            type: String,
            require: false,
            default: null,
        },
    },
    setup(props) {
        const productToCart = ref(false);
        var supp = ref(false);
        const ctx = useContext();
        async function handleRefuseQuote() {
            let data = {
                masterQuoteId: props.masterQuoteId,
                supplierQuoteId: props.supplierQuoteId,
            };

            ctx.$core.useQuote.refuseSupplierQuote(data).then((res) => {
                ctx.$toast.success(ctx.app.i18n.t('notification.quote.refuse'));

                // this.$notify({
                //     group: 'success',
                //     title: 'SupplierQuote Refuse ',
                //     text: this.$t('notification.quote.refuse')
                // });
            });

            $nuxt.$emit('refresh', 'refresh');
            this.supp = false;
        }

        return { productToCart, supp, handleRefuseQuote };
    },
});
</script>
