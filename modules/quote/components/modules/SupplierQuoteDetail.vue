<template>
    <div>
        <v-tab-item v-for="(supplier,index) in masterQuote.supplierQuotes" :key="index">
            <div>
                <div class="row">
                    <v-col sm="6" cols="12" class="spacing">
                        <v-card height="100%">
                            <v-card-title>
                                <div class="title__h4 dj-quotes__title">
                                    {{ $t('account.quotes.statutOfYourquote') }}
                                </div>
                            </v-card-title>

                            <v-card-text class="p-0">
                                <TimelineQuote :status="supplier.status"></TimelineQuote>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col sm="6" cols="12" class="spacing">
                        <v-card height="100%">
                            <v-card-title>
                                <div class="title__h4">{{ $t('account.quotes.quoteInformations') }}</div>
                            </v-card-title>

                            <v-card-text class="p-0">
                                <ul class="dj-quote__list">
                                    <li class="dj-quote__list__item">
                                        <span>{{ $t('account.quotes.createdAt') }}</span>
                                        <span class="dj-quote__list__item__label">{{
                                                supplier.createdAt
                                            }}</span>
                                    </li>
                                    <li class="dj-quote__list__item">
                                    <span>
                                        {{ $t('account.quotes.masterQuoteName') }}
                                    </span>
                                        <span class="dj-quote__list__item__label">{{
                                                masterQuote.name
                                            }}</span>
                                    </li>
                                    <li class="dj-quote__list__item">
                                        <span> {{ $t('account.quotes.supplierName') }}</span>
                                        <span class="dj-quote__list__item__label">{{
                                                supplier.supplier.name
                                            }}</span>
                                    </li>
                                    <li class="dj-quote__list__item">
                                        <span> {{ $t('account.quotes.NumberOfProducts') }}</span>
                                        <span class="dj-quote__list__item__label"
                                        >{{ supplier.quoteLines.length }}
                                    </span>
                                    </li>
                                    <li class="dj-quote__list__item">
                                        <span>{{ $t('account.quotes.status') }}</span>
                                        <span class="dj-quote__list__item__label">
                                        {{ $core.getQuote.getStatusQuote(supplier.status) }}
                                    </span>
                                    </li>
                                </ul>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col sm="12" cols="12" class="spacing">
                        <v-card height="100%">
                            <v-card-title>
                                <div class="title__h4">{{ $t('account.quotes.listOfProducts') }} :</div>
                            </v-card-title>
                            <div class="table-responsive">
                                <table
                                        v-if="TestLoading === false"
                                        class="table dj-table--responsive dj-table--shopping-cart"
                                >
                                    <thead>
                                    <tr>
                                        <th>
                                            {{ $t('account.quotes.product') }}
                                        </th>
                                        <th>
                                            {{ $t('account.quotes.quantity&address') }}
                                        </th>

                                        <th>
                                            {{ $t('account.quotes.quantity') }}
                                        </th>
                                        <th>
                                            {{ $t('account.quotes.uprice') }}
                                        </th>
                                        <th class="total">
                                            {{ $t('account.quotes.tprice') }}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                            v-for="quoteLine in supplier.quoteLines"
                                            v-bind:key="quoteLine.id"
                                    >
                                        <td data-label="Product">
                                            <product-table-traitement
                                                    :product="findProduct(quoteLine)"
                                            ></product-table-traitement>
                                        </td>
                                        <td data-label="Quantity & Address">
                                            <div
                                                    class="dj-product--cart"
                                                    v-for="dl in quoteLine.quoteDeliveryLines"
                                                    :key="dl.quantity + Math.random(10)"
                                            >
                                                <div>
                                                    <span v-if="dl.shippingAddress.fullName">
                                                        {{ dl.shippingAddress.fullName }}</span
                                                    >
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Quantity">
                                            <div class="dj-product--price">
                                                <span class=""> {{ quoteLine.quantity }}</span>
                                            </div>
                                        </td>
                                        <td data-label="Unit Price">
                                            <div class="dj-product--price">
                                                <span
                                                        class="mt-1"
                                                        v-if="quoteLine.price === null"
                                                >
                                                    {{
                                                        $t('account.quotes.waitingForTreatment')
                                                    }}</span
                                                >
                                                <span
                                                        v-else
                                                        v-html="
                                                        $core.getApp.getFormatPrice(
                                                            quoteLine.price,
                                                            currency
                                                        )
                                                    "
                                                ></span>
                                            </div>
                                        </td>

                                        <td data-label="Total Price" class="text-right">
                                            <div class="dj-product--price">
                                                <span
                                                        class="mt-1"
                                                        v-if="quoteLine.price === null"
                                                >
                                                    {{
                                                        $t('account.quotes.waitingForTreatment')
                                                    }}</span
                                                >
                                                <span
                                                        class="mt-1 text-h4"
                                                        v-else
                                                        v-html="
                                                        $core.getQuote.getSupplierQuoteLineTotalAmount(
                                                            quoteLine,
                                                            currency
                                                        )
                                                    "
                                                ></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="supplier.quoteLines.price" class="total">
                                        <td colspan="3"></td>
                                        <td>
                                            <div class="title__h4 totalLabel">
                                                {{ $t('account.quotes.totalproductte') }}
                                            </div>
                                        </td>
                                        <td style="text-align: right; vertical-align: middle">
                                            <div class="dj-product--price">
                                                <span
                                                        class="mt-1"
                                                        v-if="supplier.quoteLines.price === null"
                                                >
                                                    {{
                                                        $t('account.quotes.waitingForTreatment')
                                                    }}</span
                                                >
                                                <span
                                                        class="mt-1 text-h4"
                                                        v-else
                                                        v-html="
                                                        $core.getQuote.getSupplierQuoteTotalProductsNoTax(
                                                            supplier,
                                                            currency
                                                        )
                                                    "
                                                ></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="supplier.quoteLines.price" class="total">
                                        <td colspan="3"></td>
                                        <td>
                                            <div class="title__h4 totalLabel">
                                                {{ $t('account.quotes.totalproducttax') }}
                                            </div>
                                        </td>
                                        <td style="text-align: right; vertical-align: middle">
                                            <div class="dj-product--price">
                                                <span
                                                        class="mt-1"
                                                        v-if="supplier.quoteLines.price === null"
                                                >
                                                    {{
                                                        $t('account.quotes.waitingForTreatment')
                                                    }}</span
                                                >
                                                <span
                                                        class="mt-1 text-h4"
                                                        v-else
                                                        v-html="
                                                        $core.getQuote.getSupplierQuoteTotalProductsTax(
                                                            supplier,
                                                            currency
                                                        )
                                                    "
                                                ></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="supplier.quoteLines.price" class="total">
                                        <td colspan="3"></td>
                                        <td>
                                            <div class="title__h4 totalLabel">
                                                {{ $t('account.quotes.totalshippingte') }}
                                            </div>
                                        </td>
                                        <td style="text-align: right; vertical-align: middle">
                                            <div class="dj-product--price">
                                                <span
                                                        class="mt-1"
                                                        v-if="supplier.quoteLines.price === null"
                                                >
                                                    {{
                                                        $t('account.quotes.waitingForTreatment')
                                                    }}</span
                                                >
                                                <span
                                                        class="mt-1 text-h4"
                                                        v-else
                                                        v-html="
                                                        $core.getQuote.getSupplierQuoteTotalShippingNotTax(
                                                            supplier,
                                                            currency
                                                        )
                                                    "
                                                ></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="supplier.quoteLines.price" class="total">
                                        <td colspan="3"></td>
                                        <td>
                                            <div class="title__h4 totalLabel">
                                                {{ $t('account.quotes.totalshippingtax') }}
                                            </div>
                                        </td>
                                        <td style="text-align: right; vertical-align: middle">
                                            <div class="dj-product--price">
                                                <span
                                                        class="mt-1"
                                                        v-if="supplier.quoteLines.price === null"
                                                >
                                                    {{
                                                        $t('account.quotes.waitingForTreatment')
                                                    }}</span
                                                >
                                                <span
                                                        class="mt-1 text-h4"
                                                        v-else
                                                        v-html="
                                                        $core.getQuote.getSupplierQuoteTotalShippingTax(
                                                            supplier,
                                                            currency
                                                        )
                                                    "
                                                ></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="supplier.quoteLines.price" class="total">
                                        <td colspan="3"></td>
                                        <td>
                                            <div class="title__h4 totalLabel">
                                                {{ $t('account.quotes.totalti') }}
                                            </div>
                                        </td>
                                        <td style="text-align: right; vertical-align: middle">
                                            <div class="dj-product--price">
                                                <span
                                                        class="mt-1"
                                                        v-if="supplier.quoteLines.price === null"
                                                >
                                                    {{
                                                        $t('account.quotes.waitingForTreatment')
                                                    }}</span
                                                >
                                                <span
                                                        class="mt-1 text-h4"
                                                        v-else
                                                        v-html="
                                                        $core.getQuote.getSupplierQuoteTotalTax(
                                                            supplier,
                                                            currency
                                                        )
                                                    "
                                                ></span>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </v-card>
                    </v-col>
                </div>
            </div>
            <div class="d-flex justify-content-end align-items-center">
                <button-Refuse-quote
                        v-if="supplier.status === 'WAITING_FOR_CUSTOMER'"
                        styleB="button"
                        :masterQuoteId="masterQuote.id"
                        :supplierQuoteId="supplier.id"
                        class="mr-4"
                />
                <button-Accept-quote
                        v-if="supplier.status === 'WAITING_FOR_CUSTOMER'"
                        styleB="button"
                        :supplier="supplier"
                        :quoteId="supplier.id"
                />
            </div>
            <hr />
            <div class="title__h3">Comments</div>
            <div class="messages" :key="increment">
                <div class="message-wrap" v-if="supplier.customerSupplierThread">
                    <template
                            v-for="item in supplier.customerSupplierThread?.messages.slice().reverse()"
                    >
                        <div
                                class="message-list me"
                                :key="masterQuote.id"
                                v-if="masterQuote.name === supplier.customerName"
                        >
                            <div class="msg">
                                <p>
                                    {{ masterQuote.message }}
                                </p>
                            </div>
                            <div class="time">
                                {{ masterQuote.name }} - {{ dateFormated(masterQuote.messageDate) }}
                            </div>
                        </div>
                        <div class="message-list" v-else :key="masterQuote.id">
                            <div class="msg">
                                <p>{{ masterQuote.message }}</p>
                            </div>
                            <div class="time">
                                {{ masterQuote.name }} - {{ dateFormated(masterQuote.messageDate) }}
                            </div>
                        </div>
                    </template>
                </div>
                <div class="message-footer">
                    <div class="comments-action">

                        <v-textarea
                                solo
                                rows="1"
                                v-model="message"
                                hide-details
                                background-color="#F4F4F4"
                                style="border-radius: 20px;"
                                :label="$t('account.quotes.step3message')"
                        ></v-textarea>
                        <div
                                class="ml-3"
                                @click.prevent="
                            sendMessage(supplier.id, masterQuote.id, supplier.customerName)
                        "
                        >
                            <DjButton text="Envoyer" :isDisabled="!message" styleButton="light" />
                        </div>
                    </div>
                </div>
            </div>
        </v-tab-item>
    </div>
</template>
<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import ButtonAcceptQuote from '@modules/quote/components/modules/ButtonAcceptQuote';
import ButtonRefuseQuote from '@modules/quote/components/modules/ButtonRefuseQuote';
import ProductTableTraitement from '@modules/quote/components/modules/ProductTableTraitement';
import TimelineQuote from '@modules/quote/components/modules/TimelineQuote';
import moment from 'moment';

export default {
    name: 'SupplierQuoteDetail',
    components: {
        DjButton,
        ButtonAcceptQuote,
        ButtonRefuseQuote,
        ProductTableTraitement,
        TimelineQuote,
    },
    props: {
        masterQuote: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            TestLoading: true,
            message: null,
            increment: 0,
        };
    },
    methods: {
        dateFormated(date) {
            return moment(String(date)).format('DD/MM/YYYY hh:mm');
        },
        async sendMessage(supplierQuoteId, masterQuoteId, username) {
            const request = {
                message: this.message,
                username: username,
            };
            await this.$core.useQuote.sendMessageFromSupplierQuote(supplierQuoteId, masterQuoteId, request);
            this.increment++;
            this.message = '';
        },
    },
};
</script>
<style lang="">
</style>
