<template>
    <div v-if="quotes">
        <div class="hidden-on-desktop">
            <v-expand-transition>
                <v-select
                    v-model="selectedQuote"
                    :items="quotes"
                    item-text="name"
                    item-value="id"
                    outlined
                    hide-details
                    return-object
                    @change="updateTabsToShow"
                />
            </v-expand-transition>
        </div>
        <div class="hidden-on-mobile">
            <div class="font-700 size-24 uppercase">{{ $t('account.quotes.pendingQuote') }}</div>
            <v-tabs
                v-model="tabsToShow"
                center-active
                active-class="text-primary"
                style="overflow: hidden"
                color="var(--color-primary)"
            >
                <v-tab v-for="quote in quotes" :key="quote.id">
                    <div class="size-14">
                        {{ $core.getQuote.getQuoteName(quote) }}
                    </div>
                </v-tab>
            </v-tabs>
            <v-divider class="mt-0"></v-divider>
        </div>

        <v-tabs-items v-model="tabsToShow" class="pt-4">
            <v-tab-item v-for="(quote, indexOfTab) in quotes" :key="quote.id">
                <div class="d-flex flex-column gap-4">
                    <div class="row">
                        <div class="col-12 col-md-6 order-md-2">
                            <div class="size-18 font-700 mb-2">Informations</div>
                            <div>
                                Nom : <span class="font-700">{{ quote.name }}</span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 order-md-1">
                            <div class="size-18 font-700 mb-6">Status de votre devis</div>
                            <div class="d-flex gap-2 mb-2 flex-row flex-md-column">
                                <div class="uppercase text-primary font-700 size-16 d-flex">
                                    <div class="p-1 rounded-circle text-white status-size bg-primary mr-2 size-14 lh-1">
                                        1
                                    </div>
                                    Créé
                                </div>
                                <div class="hidden-on-mobile size-16 pl-2 text-grey-6">|</div>
                                <v-divider
                                    color="var(--color-grey-nuance-6)"
                                    class="hidden-on-desktop"
                                    style="max-width: 16px"
                                />
                                <div class="uppercase text-black font-700 size-16 d-flex">
                                    <div class="p-1 rounded-circle status-size bg-black text-white mr-2 size-14 lh-1">
                                        2
                                    </div>
                                    Envoyé
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="size-18 font-700">1. {{ $t('account.quotes.step1') }}</div>
                    <v-expand-transition>
                        <div>
                            <div class="hidden-on-mobile">
                                <div class="d-flex justify-content-between">
                                    <div class="font-700 size-16 text-grey-4 pb-4 pl-4">
                                        {{ $t('account.quotes.product') }}
                                    </div>
                                    <div class="font-700 size-16 text-grey-4 pb-4 pr-4 text-right">
                                        {{ $t('account.quotes.quantity') }}
                                    </div>
                                </div>
                            </div>
                            <div
                                v-for="(quoteLine, index) in $core.getQuote.getMasterQuoteLines(quote)"
                                :key="index"
                                class="mb-4"
                            >
                                <TableQuoteLineItem
                                    :key="index"
                                    :quoteLine="quoteLine"
                                    :indexOfTab="indexOfTab"
                                    :item="quote"
                                />
                            </div>
                        </div>
                    </v-expand-transition>
                    <div class="size-18 font-700">2. {{ $t('account.quotes.step2') }}</div>
                    <v-select
                        v-model="selectedBillingAddress"
                        :items="billingAddress"
                        item-text="name"
                        item-value="id"
                        outlined
                        hide-details
                    >
                    </v-select>
                    <div class="size-18 font-700">3. {{ $t('account.quotes.step4') }}</div>
                    <v-select
                        v-model="selectedShippingAddress"
                        :items="shippingAddress"
                        item-text="name"
                        item-value="id"
                        outlined
                        hide-details
                    >
                    </v-select>
                    <div class="size-18 font-700">4. {{ $t('account.quotes.commentsTitle') }}</div>
                    <div class="size-14 font-400">{{ $t('account.quotes.commentsMessage') }}</div>
                    <v-textarea
                        v-model="comments"
                        :label="$t('account.quotes.step3message')"
                        name="input-7-4"
                        solo
                        hide-details
                        background-color="var(--color-grey-nuance-3)"
                    >
                    </v-textarea>
                    <div class="d-flex gap-2 cta-quote mb-6">
                        <ButtonDeleteQuote :masterQuote="quote" />
                        <ButtonValidateQuote
                            :billingAddress="selectedBillingAddress"
                            :masterQuote="quote"
                            :comments="comments"
                        />
                    </div>
                </div>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ButtonValidateQuote from '@modules/quote/components/modules/ButtonValidateQuote.vue';
import ButtonDeleteQuote from '@modules/quote/components/modules/ButtonDeleteQuote.vue';
import TableQuoteLineItem from '@modules/quote/components/modules/TableQuoteLineItem.vue';

export default {
    name: 'CreationQuote',
    components: {
        ButtonValidateQuote,
        ButtonDeleteQuote,
        TableQuoteLineItem,
    },
    props: {
        quotes: {
            type: Array,
            default: () => [],
        },
        quoteToShow: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            skus: [],
            masterQuotes: [],
            selectedQuote: null,
            selectedBillingAddress: null,
            selectedShippingAddress: null,
            comments: null,
            tabsToShow: 0,
        };
    },
    async created() {
        this.tabsToShow = this.quoteToShow;
        await this.$core.useUser.getUserBillingAddressList();
        await this.$core.useUser.getUserShippingAddressList();
        if (this.quotes) {
            this.selectedQuote = this.quotes[0].id;
        }
        if (this.billingAddress) {
            this.selectedBillingAddress = this.billingAddress[0].id;
        }
        if (this.shippingAddress) {
            this.selectedShippingAddress = this.shippingAddress[0].id;
        }
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        billingAddress() {
            if (this.$store.state.user.addressBillingList) {
                return this.$store.state.user.addressBillingList.map((res) => ({
                    id: res.id,
                    name: this.$core.getAddress.getFullAddress(res),
                }));
            }
            return null;
        },
        shippingAddress() {
            if (this.$store.state.user.addressShippingList) {
                return this.$store.state.user.addressShippingList.map((res) => ({
                    name: this.$core.getAddress.getFullAddress(res),
                    id: res.id,
                }));
            }
            return null;
        },
    },
    methods: {
        updateTabsToShow() {
            const selectedIndex = this.quotes.indexOf(this.selectedQuote);
            this.tabsToShow = selectedIndex ?? 0;
        },
    },
};
</script>

<style lang="scss" scoped>
.cta-quote {
    justify-content: center;
    @media screen and (min-width: 960px) {
        justify-content: end;
    }
}

.status-size {
    width: 23px;
    height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
