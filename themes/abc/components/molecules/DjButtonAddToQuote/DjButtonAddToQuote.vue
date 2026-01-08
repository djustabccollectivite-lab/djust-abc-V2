<template>
    <div :class="['bg-white', fullWidth ? 'w-full' : '']">
        <div @click.prevent="chooseQuote">
            <DjButton
                :text="textButton ? textButton : $t('product.buttonAddToQuote.button')"
                :iconDisplayed="iconDisplayed"
                :isDisabled="isDisabled"
                :variant="variant"
                :shape="shape"
                :iconColor="iconColor"
                :textDisplayed="textDisplayed"
                :icon="shape === 'icon' ? 'quote-big' : 'quote-small'"
                :size="size"
                :fullWidth="fullWidth"
            />
        </div>
        <DjModal v-model="dialogQuote" width="500">
            <div class="bg-white pb-2">
                <div class="text-700 size-18 bg-grey py-4 text-center">
                    {{ $t('product.buttonAddToQuote.chooseMessage') }}
                </div>
                <div v-click-outside="onClickOutside">
                    <div v-if="quotes.length > 0">
                        <div class="pa-2">
                            <p>
                                {{ $t('product.buttonAddToQuote.selectMessage') }}
                            </p>
                        </div>
                        <div class="pl-3">
                            <div v-for="n in quotes" :key="n.id" class="mb-2">
                                <div class="mr-3" @click="handleAddToQuote(n.id)">
                                    <DjButton :text="n.name" shape="button" variant="outlined" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pl-2">
                        <div class="pa-2">
                            <p>
                                {{ $t('product.buttonAddToQuote.createMessage') }}
                            </p>
                        </div>
                        <div>
                            <ValidationObserver ref="form">
                                <v-form>
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        mode="eager"
                                        :name="$t('product.buttonAddToQuote.createField')"
                                        rules="required"
                                    >
                                        <DjInput
                                            v-model="quoteName"
                                            :label="$t('product.buttonAddToQuote.createField')"
                                            :error-messages="errors[0]"
                                            type="text"
                                            class="mr-4"
                                            outlined
                                        />
                                    </ValidationProvider>
                                    <div @click.prevent="handleCreateQuote()">
                                        <DjButton
                                            :text="$t('product.buttonAddToQuote.createButton')"
                                            shape="button"
                                            variant="contained"
                                            :disabled="!quoteName"
                                        />
                                    </div>
                                </v-form>
                            </ValidationObserver>
                        </div>
                    </div>
                </div>
            </div>
        </DjModal>
    </div>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
    name: 'DjButtonAddToQuote',
    components: {
        DjButton,
        DjModal,
        DjInput,
        ValidationObserver,
        ValidationProvider,
    },
    props: {
        shape: {
            type: String,
            required: true,
            default: 'button',
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        productName: {
            type: String,
            required: true,
            default: 'produit',
        },
        productId: {
            type: String,
            required: true,
            default: null,
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        variant: {
            type: String,
            required: false,
            default: 'primary',
        },
        textDisplayed: {
            type: Boolean,
            required: false,
            default: true,
        },
        iconDisplayed: {
            type: Boolean,
            required: false,
            default: true,
        },
        iconColor: {
            type: String,
            required: false,
            default: '',
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        textButton: {
            type: String,
            required: false,
            default: '',
        },
        size: {
            type: String,
            required: false,
            default: 'standard',
        },
        supplierId: {
            type: String,
            required: false,
            default: '',
        },
    },
    data() {
        return {
            dialogQuote: false,
            quoteName: '',
        };
    },
    computed: {
        quotes() {
            return this.$store.state.quote.quotes.filter((e) => e.supplierQuotes.length === 0);
        },
    },
    methods: {
        async handleCreateQuote() {
            if (this.$auth.loggedIn) {
                const quoteAlreadyExist = this.quotes.some((quote) => quote.name === this.quoteName);
                if (!this.quoteName) {
                    this.$toast.error('Veuillez saisir un nom à votre demande de devis');
                } else if (quoteAlreadyExist) {
                    this.$toast.error('Devis déjà existant. Veuillez choisir un autre nom.');
                } else {
                    this.dialogQuote = false;
                    this.$store.commit('app/setSearch', this.dialogQuote);
                    const item = {
                        masterQuoteDetailsToAdd: [
                            {
                                productVariantId: this.productId,
                                quantity: this.quantity,
                            },
                        ],
                    };
                    const response = await this.$core.useQuote.createMasterQuote({
                        name: this.quoteName,
                        add: true,
                        productToAdd: item,
                    });
                    if (response) {
                        this.$toast.success(`${this.productName}` + this.$i18n.t('notification.product.quote'));
                    } else {
                        this.$toast.error(this.$i18n.t('notification.product.quotealreadyexist'));
                    }
                }
            } else {
                // Sauvegarder l'URL actuelle pour redirection après connexion
                const currentUrl = this.$route.fullPath;
                this.$router.push({
                    path: this.localePath('/auth/login'),
                    query: { redirect: currentUrl },
                });
            }
        },
        chooseQuote() {
            if (this.$auth.loggedIn) {
                this.dialogQuote = true;
                this.$store.commit('app/setSearch', this.dialogQuote);
            } else {
                // Sauvegarder l'URL actuelle pour redirection après connexion
                const currentUrl = this.$route.fullPath;
                this.$router.push({
                    path: this.localePath('/auth/login'),
                    query: { redirect: currentUrl },
                });
            }
        },
        handleAddToQuote(quoteId) {
            const data = {
                productId: this.productId,
                supplierId: this.supplierId,
            };
            this.$store.commit('quote/setSupplierId', data);
            if (this.$auth.loggedIn) {
                this.dialogQuote = false;
                this.$store.commit('app/setSearch', this.dialogQuote);
                const item = {
                    masterQuoteDetailsToAdd: [
                        {
                            productVariantId: this.productId,
                            quantity: this.quantity,
                        },
                    ],
                };
                this.$core.useQuote.addProductToQuote({
                    masterQuoteId: quoteId,
                    data: item,
                });
                this.$toast.success(`${this.productName}` + this.$i18n.t('notification.product.quote'));
            } else {
                // Sauvegarder l'URL actuelle pour redirection après connexion
                const currentUrl = this.$route.fullPath;
                this.$router.push({
                    path: this.localePath('/auth/login'),
                    query: { redirect: currentUrl },
                });
            }
        },
        onClickOutside() {
            if (this.dialogQuote) {
                this.$store.commit('app/setSearch', false);
            }
        },
    },
};
</script>
