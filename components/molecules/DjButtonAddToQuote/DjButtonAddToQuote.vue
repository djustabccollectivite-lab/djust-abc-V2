<template>
    <div>
        <div @click.prevent="chooseQuote">
            <DjButton
                :text="textButton ? textButton : $t('product.buttonAddToQuote.button')"
                :iconDisplayed="iconDisplayed"
                :isDisabled="isDisabled"
                :styleButton="styleButton"
                :shape="styleB"
                :iconColor="iconColor"
                :textDisplayed="textDisplayed"
                icon="icon-papers"
                :size="size"
                :fullWidth="fullWidth"
            />
        </div>
        <DjModal v-model="dialogQuote" width="500">
            <DjCard :title="$t('product.buttonAddToQuote.chooseMessage')" :withActions="true">
                <div v-click-outside="onClickOutside">
                    <div v-if="quotes.length > 0">
                        <div class="pa-2">
                            <p>
                                {{ $t('product.buttonAddToQuote.selectMessage') }}
                            </p>
                        </div>
                        <DjList class="pl-3">
                            <DjListItem v-for="n in quotes" :key="n.id">
                                <DjLink class="dj-btn dj-btn--secondary mr-3" @click="handleAddToQuote(n.id)">
                                    {{ n.name }}
                                </DjLink>
                            </DjListItem>
                        </DjList>
                    </div>
                    <div class="pl-2">
                        <div class="pa-2">
                            <p>
                                {{ $t('product.buttonAddToQuote.createMessage') }}
                            </p>
                        </div>
                        <div class="">
                            <ValidationObserver ref="form">
                                <v-form>
                                    <ValidationProvider
                                        v-slot="{ errors }"
                                        mode="eager"
                                        :name="$t('product.buttonAddToQuote.createField')"
                                        rules="required|min:3|max:200"
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
                                    <DjLink
                                        class="dj-btn dj-btn--secondary mr-4"
                                        :disabled="createDisabled"
                                        @click.prevent="handleCreateQuote()"
                                    >
                                        {{ $t('product.buttonAddToQuote.createButton') }}
                                    </DjLink>
                                </v-form>
                            </ValidationObserver>
                        </div>
                    </div>
                </div>
                <template #actions>
                    <DjSpacer></DjSpacer>
                </template>
            </DjCard>
        </DjModal>
    </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjSpacer from '@components/atoms/DjSpacer/DjSpacer.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';

import DjList from '@components/organisms/DjList/DjList';

import { computed, defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default defineComponent({
    name: 'DjButtonAddToQuote',
    components: {
        DjButton,
        DjModal,
        DjCard,
        DjSpacer,
        DjLink,
        DjInput,
        DjList,
        ValidationObserver,
        ValidationProvider,
    },
    props: {
        styleB: {
            type: String,
            require: true,
            default: 'button',
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
        productId: {
            type: String,
            require: true,
            default: null,
        },
        quotesLines: {
            type: Array,
            require: true,
            default: () => [],
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        styleButton: {
            type: String,
            require: false,
            default: 'primary',
        },
        textDisplayed: {
            type: Boolean,
            require: false,
            default: true,
        },
        iconDisplayed: {
            type: Boolean,
            require: false,
            default: true,
        },
        iconColor: {
            type: Boolean,
            require: false,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        textButton: {
            type: String,
            require: false,
            default: '',
        },
        size: {
            type: String,
            require: false,
            default: 'standard',
        },
        supplierId: {
            type: String,
            require: false,
            default: '',
        },
    },
    setup(props) {
        const ctx = useContext();
        const router = useRouter();
        const quotes = computed(() => ctx.store.state.quote.quotes.filter((e) => e.supplierQuotes.length === 0));
        const dialogQuote = ref(false);
        const quoteName = ref(null);
        const createDisabled = computed(
            () => !quoteName.value || quoteName.value.length < 3 || quoteName.value.length > 200,
        );

        function handleCreateQuote() {
            if (ctx.$auth.loggedIn) {
                if (!quoteName) {
                    ctx.$toast.error('Error');
                } else {
                    dialogQuote.value = false;
                    ctx.store.commit('app/setSearch', dialogQuote.value);
                    let item;
                    if (props.quotesLines.length > 0) {
                        item = {
                            masterQuoteDetailsToAdd: props.quotesLines,
                        };
                    } else {
                        item = {
                            masterQuoteDetailsToAdd: [
                                {
                                    productVariantId: props.productId,
                                    quantity: props.quantity,
                                },
                            ],
                        };
                    }
                    const res = ctx.$core.useQuote.createMasterQuote({
                        name: quoteName.value,
                        add: true,
                        productToAdd: item,
                    });
                    res
                        ? ctx.$toast.success(`${props.productName}` + ctx.app.i18n.t('notification.product.quote'))
                        : ctx.$toast.error(ctx.app.i18n.t('notification.product.quotealreadyexist'));
                }
            } else {
                router.push(ctx.localePath('/auth/login'));
            }
        }

        function chooseQuote() {
            if (ctx.$auth.loggedIn) {
                dialogQuote.value = true;
                ctx.store.commit('app/setSearch', dialogQuote.value);
            } else {
                router.push(ctx.localePath('/auth/login'));
            }
        }

        async function handleAddToQuote(quoteId) {
            const data = {
                productId: this.productId,
                supplierId: this.supplierId,
            };
            this.$store.commit('quote/setSupplierId', data);
            if (ctx.$auth.loggedIn) {
                dialogQuote.value = false;
                ctx.store.commit('app/setSearch', dialogQuote.value);
                try {
                    let item;
                    const masterQuote = await this.$core.useQuote.getMasterQuoteByID(quoteId);
                    const { masterQuoteDetails } = masterQuote;
                    for (const details of masterQuoteDetails) {
                        if (this.productId === details.productVariant.id) {
                            item = {
                                masterQuoteDetailsToAdd: {
                                    productVariantId: props.productId,
                                    quantity: details.quantity + props.quantity,
                                },
                            };
                            ctx.$core.useQuote.updateMasterQuote(quoteId, {
                                item,
                            });
                            break;
                        }
                    }
                    if (!item) {
                        if (props.quotesLines.length > 0) {
                            item = {
                                masterQuoteDetailsToAdd: props.quotesLines,
                            };
                        } else {
                            item = {
                                masterQuoteDetailsToAdd: [
                                    {
                                        productVariantId: props.productId,
                                        quantity: props.quantity,
                                    },
                                ],
                            };
                        }
                        ctx.$core.useQuote.addProductToQuote({
                            masterQuoteId: quoteId,
                            data: item,
                        });
                    }

                    ctx.$toast.success(`${props.productName}` + ctx.app.i18n.t('notification.product.quote'));
                } catch (error) {}
            } else {
                router.push(ctx.localePath('/auth/login'));
            }
        }
        function onClickOutside() {
            if (dialogQuote.value) {
                ctx.store.commit('app/setSearch', false);
            }
        }
        return {
            createDisabled,
            onClickOutside,
            quotes,
            dialogQuote,
            quoteName,
            handleCreateQuote,
            chooseQuote,
            handleAddToQuote,
        };
    },
});
</script>
