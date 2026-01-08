<template>
    <div v-if="quotes" class="tab-content mb-10">
        <div class="font-700 size-24 uppercase">{{ $t('account.quotes.quotesSend') }}</div>
        <v-tabs
            v-model="tabs"
            center-active
            show-arrows
            active-class="text-primary"
            color="var(--color-primary)"
            class="tabs-responsive"
            @change="supplierQuoteTab = 0"
        >
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab v-for="quote in quotes" :key="parseInt(quote.id)">
                {{ $core.getQuote.getQuoteName(quote) }}
            </v-tab>
        </v-tabs>
        <v-divider class="mt-0"></v-divider>
        <v-tabs-items v-model="tabs">
            <v-tab-item v-for="quote in quotes" :key="parseInt(quote.id)">
                <div v-if="quote.supplierQuotes.length > 0">
                    <div class="text-black font-700 size-18 mt-6">
                        {{ $t('account.quotes.step3') }}
                    </div>
                </div>
                <div v-if="quote.supplierQuotes.length > 0">
                    <v-tabs
                        v-if="quote.supplierQuotes.length > 0"
                        background-color="tansparent"
                        active-class="order__active"
                        class="tabs__order"
                        :value="supplierQuoteTab"
                        style="overflow: hidden"
                        show-arrows
                    >
                        <v-tabs-slider color="transparent"></v-tabs-slider>
                        <v-tab
                            v-for="(supplierDetails, index) in quote.supplierQuotes"
                            :key="parseInt(supplierDetails.id)"
                            v-model="supplierQuoteTab"
                            @change="updateTabs(index)"
                        >
                            {{ supplierDetails.supplier.name }}
                        </v-tab>
                    </v-tabs>
                    <v-divider class="mt-0"></v-divider>
                    <v-tabs-items :value="supplierQuoteTab">
                        <v-tab-item v-for="supplier in quote.supplierQuotes" :key="parseInt(supplier.id)">
                            <div>
                                <div class="row mt-4">
                                    <div class="col-12 col-md-6 order-md-2">
                                        <div class="font-700 size-18">{{ $t('account.quotes.quoteInformations') }}</div>
                                        <div class="mt-2">
                                            <div class="my-4">
                                                {{ $t('account.quotes.createdAt') }}
                                                {{ formatDate(supplier.createdAt) }}
                                            </div>
                                            <div>{{ $t('account.quotes.masterQuoteName') }}: {{ quote.name }}</div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 order-md-1">
                                        <div class="size-18 font-700 mb-6">
                                            {{ $t('account.quotes.statutOfYourquote') }}
                                        </div>
                                        <div class="d-flex gap-2 mb-2 flex-row flex-md-column">
                                            <div class="uppercase text-primary font-700 size-16 d-flex">
                                                <div
                                                    class="p-1 rounded-circle text-white status-size bg-primary mr-2 size-14 lh-1"
                                                >
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
                                                <div
                                                    class="p-1 rounded-circle status-size bg-black text-white mr-2 size-14 lh-1"
                                                >
                                                    2
                                                </div>
                                                Envoyé
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="font-700 size-18 mt-6 mb-4">
                                        {{ $t('account.quotes.listOfProducts') }}
                                    </div>
                                    <div class="hidden-on-mobile">
                                        <div class="d-flex justify-content-between mt-4">
                                            <div class="font-700 size-16 uppercase text-grey-4 pb-4">
                                                {{ $t('account.quotes.product') }}
                                            </div>
                                            <div class="font-700 size-16 uppercase text-grey-4 pb-4 pr-4 text-right">
                                                {{ $t('account.quotes.quantity&address') }}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        v-for="quoteLine in supplier.quoteLines"
                                        :key="quoteLine.id"
                                        class="d-flex align-items-center justify-content-between bg-grey rounded p-2"
                                    >
                                        <ProductTableTraitement
                                            :sku="$core.getProductVariant.getProductSku(quoteLine.productVariant)"
                                        />
                                        <div class="d-flex font-600 text-black gap-1">
                                            <div>
                                                {{ quoteLine.quantity }} quantité.s -
                                                {{ quoteLine.quoteDeliveryLines[0].shippingAddress.fullName }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end gap-4 mt-6">
                                        <div class="font-700 size-16">
                                            {{ $t('account.quotes.totalproductte') }}
                                        </div>
                                        <div v-if="supplier.quoteLines.price === null">
                                            {{ $t('account.quotes.waitingForTreatment') }}
                                        </div>
                                        <div
                                            v-else
                                            v-html="
                                                $core.getQuote.getSupplierQuoteTotalProductsNoTax(supplier, currency)
                                            "
                                        ></div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end gap-4">
                                        <div class="font-700 size-16">
                                            {{ $t('account.quotes.totalproducttax') }}
                                        </div>
                                        <div v-if="supplier.quoteLines.price === null">
                                            {{ $t('account.quotes.waitingForTreatment') }}
                                        </div>
                                        <div
                                            v-else
                                            v-html="$core.getQuote.getSupplierQuoteTotalProductsTax(supplier, currency)"
                                        ></div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end gap-4">
                                        <div class="font-700 size-16">
                                            {{ $t('account.quotes.totalshippingte') }}
                                        </div>
                                        <div v-if="supplier.quoteLines.price === null">
                                            {{ $t('account.quotes.waitingForTreatment') }}
                                        </div>
                                        <div
                                            v-else
                                            v-html="
                                                $core.getQuote.getSupplierQuoteTotalShippingNotTax(supplier, currency)
                                            "
                                        ></div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end gap-4">
                                        <div class="font-700 size-16">
                                            {{ $t('account.quotes.totalshippingtax') }}
                                        </div>
                                        <div v-if="supplier.quoteLines.price === null">
                                            {{ $t('account.quotes.waitingForTreatment') }}
                                        </div>
                                        <div
                                            v-else
                                            v-html="$core.getQuote.getSupplierQuoteTotalShippingTax(supplier, currency)"
                                        ></div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end gap-4">
                                        <div class="font-700 size-16">
                                            {{ $t('account.quotes.totalti') }}
                                        </div>
                                        <div v-if="supplier.quoteLines.price === null">
                                            {{ $t('account.quotes.waitingForTreatment') }}
                                        </div>
                                        <div
                                            v-else
                                            v-html="$core.getQuote.getSupplierQuoteTotalTax(supplier, currency)"
                                        ></div>
                                    </div>
                                </div>
                                <hr />
                                <div class="font-700 size-18 mt-4 mb-6">Commentaires</div>
                                <div :key="increment" class="messages">
                                    <div v-if="supplier.customerThread" class="message-wrap">
                                        <template v-for="thread in supplier.customerThread.slice().reverse()">
                                            <div
                                                v-if="thread.name === supplier.customerName"
                                                :key="thread.id"
                                                class="pl-8"
                                            >
                                                <div class="border p-2 rounded-xl mb-1 bg-grey-2">
                                                    {{ thread.message }}
                                                </div>
                                                <div class="mb-2 text-right font-600">
                                                    {{ thread.name }} - {{ formatDate(thread.messageDate) }}
                                                </div>
                                            </div>
                                            <div v-else :key="thread.id" class="pr-8">
                                                <div class="border p-2 rounded-xl mb-1">
                                                    <p>{{ thread.message }}</p>
                                                </div>
                                                <div class="mb-2 text-left font-600">
                                                    {{ thread.name }} - {{ formatDate(thread.messageDate) }}
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                    <div class="mt-4">
                                        <v-textarea
                                            v-model="message"
                                            solo
                                            rows="6"
                                            hide-details
                                            background-color="#F4F4F4"
                                            style="border-radius: 20px"
                                            :label="$t('account.quotes.step3message')"
                                        ></v-textarea>
                                        <div
                                            class="d-flex justify-content-end mt-4"
                                            @click.prevent="sendMessage(supplier.id, quote.id, supplier.customerName)"
                                        >
                                            <DjButton
                                                text="Envoyer"
                                                :isDisabled="!message"
                                                shape="button"
                                                variant="contained"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-tab-item>
                    </v-tabs-items>
                </div>

                <div class="d-flex align-items-center gap-4 mt-6">
                    <div class="font-700 size-18">
                        {{ $t('account.quotes.step2') }}
                    </div>
                </div>
                <div class="my-4 px-1">
                    <div class="shadow p-4 rounded">
                        {{ $core.getAddress.getFullAddress(quote.supplierQuotes[0].billingAddress) }}
                    </div>
                </div>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import ProductTableTraitement from '@modules/quote/components/modules/ProductTableTraitement.vue';
import moment from 'moment';
import { mapState } from 'vuex';

export default {
    name: 'TraitementQuote',
    components: {
        ProductTableTraitement,
        DjButton,
    },
    props: {
        quotes: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            tabs: null,
            supplierQuoteTab: 0,
            message: null,
            increment: 0,
            refresh: 0,
        };
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
            suppliers: (state) => state.quote.suppliers,
        }),
    },
    methods: {
        formatDate(date) {
            return moment(String(date)).format('DD/MM/YYYY hh:mm');
        },
        async sendMessage(supplierQuoteId, masterQuoteId, username) {
            const request = {
                message: this.message,
                username,
            };
            await this.$core.useQuote.sendMessageFromSupplierQuote(supplierQuoteId, masterQuoteId, request);
            this.increment++;
            this.message = '';
        },
        updateTabs(id) {
            this.supplierQuoteTab = id;
        },
    },
};
</script>

<style lang="scss" scoped>
.v-slide-group__content {
    flex-wrap: wrap !important;
}

.v-tab {
    font-size: 14px;
}
.v-tab--active {
    font-weight: 700;
    border-bottom: 2px solid var(--color-primary);
}
.status-size {
    width: 23px;
    height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<style lang="scss">
.tabs-responsive .v-slide-group__content {
    flex-wrap: wrap !important;
}
</style>
